# tests/test_file_list_sse.py

import json
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


def extract_file_list_from_sse(url: str, payload: dict, timeout=45) -> List[str]:
    """
    通过 SSE 读取流式响应，尝试找到 type=="files" 的 content 数组
    返回提取到的文件名列表
    """
    files = []

    headers = {
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
        # 如果需要认证，请在这里加上 Authorization / Cookie 等
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1M2E5NWI1LWI3MWQtNGI2Yi1iMDIzLTk0MzkxOTBlNTY3YSIsImV4cCI6MTc2OTQzMTYxN30.k5kwONhbDEXydv8bnkJ6ZaYcBiNjU38g1AfYoyJE2XI",
    }

    try:
        with requests.post(
            url,
            json=payload,
            headers=headers,
            stream=True,
            timeout=(10, timeout)   # connect timeout 10s, read timeout 45s
        ) as resp:
            resp.raise_for_status()

            client = SSEClient(resp)

            print("开始接收 SSE 事件...\n")

            for event in client.events():
                if event.event == "message" and event.data:
                    try:
                        data = json.loads(event.data)
                        print("←", json.dumps(data, ensure_ascii=False, indent=2))

                        # 你的业务逻辑判断
                        if data.get("channel") == "response" and \
                           data.get("data", {}).get("type") == "files":

                            content = data["data"].get("content", [])
                            if isinstance(content, list):
                                files.extend(content)
                                print(f"找到文件列表（累计 {len(files)} 条）")

                    except json.JSONDecodeError:
                        print("非 JSON 数据:", event.data)
                    except Exception as e:
                        print("解析单条事件出错:", str(e))

                elif event.event in ("error", "exception"):
                    print("服务端报错事件:", event.data)
                    break

            print("\nSSE 流结束")

    except requests.exceptions.RequestException as e:
        pytest.fail(f"请求失败: {e}")

    return files


# ================== 测试用例 ==================

@pytest.mark.parametrize("fetch_state, import_state, expected_min_files", [
    (None, None, 0),           # 全部
    ("success", None, 1),      # 至少应该有成功上传的文件（根据你的业务预期改）
    (None, "failed", 0),
    ("failed", "failed", 0),
])
def test_get_file_list(fetch_state, import_state, expected_min_files):
    """
    测试不同过滤条件下能否正确拿到文件列表
    """
    payload = build_payload(
        page=1,
        page_length=20,
        fetch_state=fetch_state,
        import_state=import_state,
        new_ctx=False
    )

    files = extract_file_list_from_sse(API_URL, payload)

    print(f"\n最终得到的文件列表（{len(files)} 条）：")
    for f in files:
        print("  •", f)

    # 根据你的业务实际情况修改断言条件
    assert isinstance(files, list)
    assert len(files) >= expected_min_files, \
        f"预期至少 {expected_min_files} 个文件，实际得到 {len(files)} 个"


@pytest.mark.xfail(reason="仅用于演示如何发送 new_ctx=true 的情况")
def test_new_context():
    payload = build_payload(new_ctx=True)
    files = extract_file_list_from_sse(API_URL, payload)
    assert len(files) >= 0   # 只是演示，实际断言根据业务


if __name__ == "__main__":
    # 本地调试方便
    payload = build_payload(fetch_state="success")
    files = extract_file_list_from_sse(API_URL, payload)
    print("直接运行得到的文件：", files)