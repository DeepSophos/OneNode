import requests
import os
from typing import Union, List
from pydantic import BaseModel
import base64
import time
import json
import struct
import config

class StringModel(BaseModel):
    texts: Union[List[str], str]


class ResponseModel(BaseModel):
    status: bool
    vecs: List[str]


def embedding(texts):
    def base64_float_vec(b64_text):
        binary_data = base64.b64decode(b64_text)
        num_floats = len(binary_data) // 4  # Assuming 4 bytes per float (32-bit floats)
        float_tuple = struct.unpack(f'{num_floats}f', binary_data)
        return list(float_tuple)

    # Create the request payload
    payload = StringModel(texts=texts)

    # Send the POST request
    response = requests.post(f"{config.HF_URL}/hf/embedding", json=payload.dict())

    # Check if the request was successful
    response.raise_for_status()

    # Parse the response
    response_data = response.json()
    vecs = [base64_float_vec(text) for text in response_data['vecs']]
    return vecs


class QAForm(BaseModel):
    question: str
    answers: List[str]


def rerank(question, answers):
    payload = QAForm(question=question, answers=answers)
    response = requests.post(f"{config.HF_URL}/hf/rerank", json=payload.dict())
    response.raise_for_status()
    response_data = response.json()
    scores = json.loads(response_data['scores'])
    if isinstance(scores, (int, float)):
        scores = [scores]
    return scores


class SentenceForm(BaseModel):
    sentence: str


def name_er(sentence):
    payload = SentenceForm(sentence=sentence)
    response = requests.post(f"{config.HF_URL}/hf/name_er", json=payload.dict())
    response.raise_for_status()
    e = json.loads(response.json())
    return e


class SentencePairForm(BaseModel):
    sentence_pair: List[str]


def chunking(sentence_pair):
    payload = SentencePairForm(sentence_pair=sentence_pair)
    response = requests.post(f"{config.HF_URL}/hf/chunking", json=payload.dict())
    response.raise_for_status()
    return json.loads(response.json())


class SentenceForm(BaseModel):
    sentence: str

def bert_token_count(sentence):
    payload = SentenceForm(sentence=sentence)
    response = requests.post(f"{config.HF_URL}/hf/bert_token_count", json=payload.dict())
    response.raise_for_status()
    return response.json()['num_tokens']


def test_name_er():
    def print_entities(sentence):
        entities = name_er(sentence)
        for entity in entities:
            print(f"Entity: {entity['word']}, Label: {entity['entity']}, Score: {entity['score']:.4f}")

    sentence = "Apple is looking at buying UK startup for $1 billion"
    print_entities(sentence)

    sentence = "Apple Inc. is planning to open a new store in New York City next month. CEO Tim Cook expressed excitement about the expansion in a statement last Friday."
    print_entities(sentence)

    sentence = "I feel the parameters are not saved correctly."
    print_entities(sentence)


def test_chunking():
    pairs = [
        "Left context. [SEP] Right context.",
        "They have 6 grandchildren. [SEP] Ane is currently coaching Crestwood High School's Boys Varsity Soccer.",
    ]
    for m in chunking(pairs):
        print(f"label={m[0]['label']}, score={m[0]['score']}")
        print(f"label={m[1]['label']}, score={m[1]['score']}")


def test_embedding():
    texts = [
        "HF client is used for getting embedding of a text",
        "HF client is used for getting embedding of a textxxxx",
        "HF client is used for getting embedding of a texsssst",
        "HF client is used for getting embedding of a text",
        "HF client is used for getting embedding of a textxxxx",
        "HF client is used for getting embedding of a texsssst",
        "HF client is used for getting embedding of a text",
        "HF client is used for getting embedding of a textxxxx",
        "HF client is used for getting embedding of a texsssst",
        "HF client is used for getting embedding of a text",
        "HF client is used for getting embedding of a textxxxx",
        "HF client is used for getting embedding of a texsssst",
        "HF client is used for getting embedding of a text",
        "HF client is used for getting embedding of a textxxxx",
        "HF client is used for getting embedding of a texsssst",
        "HF client is used for getting embedding of a text",
        "HF client is used for getting embedding of a textxxxx",
        "HF client is used for getting embedding of a texsssst",
        "HF client is used for getting embedding of a text",
        "HF client is used for getting embedding of a textxxxx",
        "HF client is used for getting embedding of a texsssst"
    ]

    t0 = time.time()
    # vecs = embedding("HF client is used for getting embedding of a text")
    vecs = embedding(texts)
    delta_t = time.time() - t0
    print(f"delta={delta_t}, len(vecs)={len(vecs)}")
    for v in vecs:
        print(f"vec={v[:8]}")


def test_rerank():
    question = "Why is the sky blue!"
    answers = [
        "The dog is sleeping!",
        "Refraction of light!",
        "sun shining!",
        "Bad weather!"]
    scores = rerank(question, answers)
    print(scores)

def test_token():
    text = "hello, how many tokens does this sentence has?"
    r = bert_token_count(text)
    print(f"sentence: {text}")
    print(f"sentence tokens: {r}")

if __name__ == '__main__':
    # test_rerank()
    # test_embedding()
    # test_rerank()
    # test_embedding()

    # est_name_er()
    # test_chunking()
    test_token()
