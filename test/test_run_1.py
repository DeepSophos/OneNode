# tests/test_file_list_sse.py
import json
import requests
from typing import Iterator, Dict, Any
import pytest
import requests
from sseclient import SSEClient
from typing import List, Optional


# =============================================
#  配置部分（根据你的实际环境修改）
# =============================================
API_URL = "http://127.0.0.1:5173/agents/api/v1/application/run"   # ← 改成真实的URL
APP_NAME = "公估报告智数问答"
AGENT_NAME = "读取同步文件名列表"


def build_payload(
    page: int = 1,
    page_length: int = 12,
    fetch_state: Optional[str] = None,
    import_state: Optional[str] = None,
    new_ctx: bool = False
) -> dict:
    """构造常见的请求体"""
    return {
        "option": {
            "page": page,
            "page_length": page_length,
            "filter": {
                "fetch_state": fetch_state,
                "import_state": import_state
            }
        },
        "app_name": APP_NAME,
        "agent_name": AGENT_NAME,
        "new_ctx": new_ctx
    }


def stream_sse_json(
        url: str,
        payload: dict,
        headers: dict,
        connect_timeout: float = 10.0,
        read_timeout: float = 45.0
) -> Iterator[Dict[str, Any]]:
    """
    以生成器方式逐个 yield 解析后的 JSON 对象

    适合处理大多数 SSE 格式（data: {...} 风格）
    也兼容有些服务把完整 json 直接放在一行的情况
    """
    buffer = ""  # 用于保存跨 chunk 的残余数据

    try:
        with requests.post(
                url,
                json=payload,
                headers=headers,
                stream=True,
                timeout=(connect_timeout, read_timeout)
        ) as resp:
            resp.raise_for_status()

            print("开始接收 SSE 事件...\n")

            for chunk in resp.iter_content(chunk_size=8192, decode_unicode=False):
                if not chunk:
                    continue

                # 尝试用 utf-8 解码，失败就累积到下一次
                try:
                    text = chunk.decode('utf-8')
                except UnicodeDecodeError:
                    buffer += chunk.decode('utf-8', errors='ignore')
                    continue

                buffer += text

                # 处理所有完整的行
                while '\n' in buffer:
                    line, buffer = buffer.split('\n', 1)
                    line = line.rstrip('\r')  # 去除可能的 \r

                    # 跳过空行
                    if not line:
                        continue

                    # 最常见 SSE 格式：data: {json}
                    if line.startswith('data:'):
                        data_str = line[5:].strip()
                        # 有些服务会把多条 data: 拼接起来形成一个完整 json
                        # 这里简单处理：只取 data: 开头的部分
                    else:
                        # 有些服务直接把 json 丢一行，没有 data: 前缀
                        data_str = line

                    try:
                        json_obj = json.loads(data_str)
                        yield json_obj
                    except json.JSONDecodeError as e:
                        print(f"JSON 解析失败: {e}")
                        print(f"原始内容: {data_str[:200]!r}...")
                        # 可以选择 continue / raise / yield 错误信息，看业务需求

            # 最后检查 buffer 里是否还有残余完整的一条（有些服务器不以空行结尾）
            if buffer.strip():
                try:
                    # 尝试处理最后可能没换行的 data
                    if buffer.startswith('data:'):
                        data_str = buffer[5:].strip()
                    else:
                        data_str = buffer.strip()

                    json_obj = json.loads(data_str)
                    yield json_obj
                except json.JSONDecodeError:
                    print(f"最后残余内容无法解析为 JSON: {buffer[:200]!r}...")

        print("\nSSE 流结束")

    except requests.exceptions.RequestException as e:
        pytest.fail(f"请求失败: {e}")
    except Exception as e:
        pytest.fail(f"未知异常: {e}")


# 使用示例
if __name__ == "__main__":
    # 假设你有这样的请求信息
    headers = {
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
        # 如果需要认证，请在这里加上 Authorization / Cookie 等
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1M2E5NWI1LWI3MWQtNGI2Yi1iMDIzLTk0MzkxOTBlNTY3YSIsImV4cCI6MTc2OTQzMTYxN30.k5kwONhbDEXydv8bnkJ6ZaYcBiNjU38g1AfYoyJE2XI",
    }

    payload = build_payload(fetch_state="success")


    print("开始测试 SSE 流式读取...\n")

    for event in stream_sse_json(API_URL, payload, headers):
        # 一般 SSE 里常见的几种字段写法，你可以根据实际接口调整
        if isinstance(event, dict):
            print(event)
            if event.get("agent_name") != "读取同步文件名列表" and event.get("channel") != "response":
                #忽略其它消息
                continue
            if data := event.get("data"):
                if data.get("type") == "files":
                    for file in data.get("content", []):
                        #print(file)
                        pass
