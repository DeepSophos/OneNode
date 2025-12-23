import base64
from openai import OpenAI
from io import BytesIO
from PIL import Image
import os
import config
import aiohttp
import json
import logging
import traceback


log = logging.getLogger(__name__)
log.setLevel('INFO')


client = None
model_name = None

def get_client():
    global client
    global model_name
    if client:
        return client
    try:
        log.info(f"connect to iv3 server: {config.INTERVL_URL}/v1")
        client = OpenAI(api_key="NO_KEY", base_url=f"{config.INTERVL_URL}/v1")
        model_name = client.models.list().data[0].id
    except Exception as e:
        print(e)
        traceback.print_exc()
        client = None
    return client

def reset_client():
    global client, model_name
    client = None
    model_name = None


def load_base64_image(base64_string):
    if base64_string.startswith('data:image'):
        base64_string = base64_string.split(',')[1]

    image_data = base64.b64decode(base64_string)
    image_bytes = BytesIO(image_data)
    image_base64_url = encode_image_to_base64(image_bytes)
    return image_base64_url

def display_image(image_bytes):
    image = Image.open(image_bytes)
    image.show()

def encode_image_to_base64(image_file):
    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return f"data:image/jpeg;base64,{encoded_string}"

def text_conversation(question):
    response = get_client().chat.completions.create(
        model=model_name,
        messages=[{
            'role': 'user',
            'content': [{
                'type': 'text',
                'text': question,
            }],
        }],
        temperature=0.8,
        top_p=0.8
    )

    result = response.choices[0].message.content
    # print(f"User: {question}")
    # print(f"Assistant: {result}")
    return result

def image_path_conversation(question, image_path):
    with open(image_path, "rb") as image_file:
        image_base64_url = encode_image_to_base64(image_file)

    response = get_client().chat.completions.create(
        model=model_name,
        messages=[{
            'role': 'user',
            'content': [{
                'type': 'text',
                'text': question,
            }, {
                'type': 'image_url',
                'image_url': {
                    'url': image_base64_url,
                },
            }],
        }],
        temperature=0.8,
        top_p=0.8
    )

    result = response.choices[0].message.content
    # print(f"User: {question}")
    # print(f"Assistant: {result}")
    return result

def image_conversation(question, images):
    if isinstance(images, str):
        images = [images]
    elif not isinstance(images, list):
        raise ValueError("images 必须是字符串或字符串列表")

    image_content = [
        {
            'type': 'image_url',
            'image_url': {
                'url': img
            }
        }
        for img in images
    ]

    response = get_client().chat.completions.create(
        model=model_name,
        messages=[{
            'role': 'user',
            'content': [{'type': 'text', 'text': question}] + image_content
        }],
        temperature=0.8,
        # frequency_penalty=10,
        top_p=0.8,
        max_tokens = 4096
    )

    return response.choices[0].message.content


async def image_conversation_stream(question, images=None, on_finished: callable = None):
    images = images or []
    image_content = [
        {
            'type': 'image_url',
            'image_url': {
                'url': img
            }
        }
        for img in images
    ]

    content = [{'type': 'text', 'text': question}]
    if image_content:
        content += image_content

    async with aiohttp.ClientSession() as session:
        data = {
            "model": model_name,
            "messages": [{"role": "user", "content": content}],
            "temperature": 0.8,
            "stream": True
        }

        async with session.post(f"{config.INTERVL_URL}/v1/chat/completions", json=data) as response:
            response.raise_for_status()
            buffer = ''
            async for line in response.content:
                if line.strip():
                    try:
                        chunk = json.loads(line.decode('utf-8')[6:])
                        if "choices" in chunk:
                            delta = chunk["choices"][0].get("delta", {})
                            if "content" in delta:
                                text = delta["content"]
                                buffer += text
                                yield "response", text
                            elif "reasoning_content" in delta:
                                text = delta["reasoning_content"]
                                yield "progress", text

                            if chunk["choices"][0].get("finish_reason") is not None:
                                print(chunk["choices"][0].get("finish_reason"))
                                if on_finished is not None:
                                    final_result = await on_finished(buffer, buffer)
                                    yield "final", final_result
                                break

                    except json.JSONDecodeError:
                        logger.error(f"Error parsing chunk: {line}")


def chat(question, image=None, image_path=None):
    if image:
        r = image_conversation(question, image)
    elif image_path:
        r = image_path_conversation(question, image_path)
    else:
        r = text_conversation(question)
    return r

async def async_chat(prompt: str):
    """
    Send an async request to a vLLM server with an OpenAI-compliant API.

    Args:
        prompt (str): The input query or prompt to send to the model.
        api_url (str): The endpoint URL of the vLLM server (e.g., 'http://localhost:8000/v1/chat/completions').
        model (str): The model name to use (default: 'gpt-3.5-turbo').
        api_key (str, optional): API key for authentication, if required.

    Returns:
        dict: The response from the vLLM server.
    """
    get_client()  #read model name
    headers = {
        "Content-Type": "application/json",
    }

    # Prepare the payload in OpenAI-compliant format
    payload = {
        "model": model_name,
        "messages": [
            {"role": "user", "content": [{"type": "text", "text": prompt}]}
        ],
        "temperature": 0.0,
    }

    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(f"{config.INTERVL_URL}/v1/chat/completions", headers=headers, json=payload) as response:
                if response.status == 200:
                    result = await response.json()
                    # Extract the generated text from the response
                    return result["choices"][0]["message"]["content"]
                else:
                    error_text = await response.text()
                    raise Exception(f"Request failed with status {response.status}: {error_text}")
        except Exception as e:
            print(f"Error occurred: {e}")
            return None


if __name__ == '__main__':
#     p1 = """
# 根据你所看到的图片和用户的问题，判断该问题是否需要查找知识库中的额外信息才能回答。
# 当提问是仅关于识别或还原图片中的内容时，不需要查找知识库，请仅回答 "no"。
# 当提问是关于专业领域相关问题或你不太懂的问题时，需要查找知识库。请仅回答 "yes"。
#
# 问题：这个可能是什么疾病？"""
#
#     p2 = """
# 请结合你所看到的图片和用户的问题，理解用户的问题，把图片中与用户问题相关的信息一句话描述出来。
# 仅输出描述的文本。
#
# 问题：这个可能是什么疾病？"""
#     image_path = "/home/zhangxu/Pictures/test1.png"
#     with open(image_path, "rb") as image_file:
#         image_base64_url = encode_image_to_base64(image_file)
#         print(image_conversation(p1, image_base64_url))
#         print(image_conversation(p2, image_base64_url))
    import asyncio
    get_client()
    ret = asyncio.run(async_chat("hello"))
    print(ret)