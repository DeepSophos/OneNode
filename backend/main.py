import os
import json
import os
import time
import sys
import logging
import config
import re
import datetime
from starlette.responses import Response
from fastapi import FastAPI, Request, Depends, status
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from pathlib import Path
from agent.main import app as agent_app
from apps.web.main import app as webui_app
from pydantic import BaseModel

from config import (
    CONFIG_DATA,
    WEBUI_NAME,
    ENV,
    VERSION,
    FRONTEND_BUILD_DIR,
    GLOBAL_LOG_LEVEL,
    SRC_LOG_LEVELS,
    FILE_FORMAT_SUPPORT,
    IS_KB_PATH,
    USED_INFO,
    staged_folder
)
from constants import ERROR_MESSAGES

logging.basicConfig(stream=sys.stdout, level=GLOBAL_LOG_LEVEL)
log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["MAIN"])

class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        try:
            return await super().get_response(path, scope)
        except (HTTPException, StarletteHTTPException) as ex:
            if ex.status_code == 404:
                return await super().get_response("index.html", scope)
            else:
                raise ex


app = FastAPI(docs_url="/docs" if ENV == "dev" else None, redoc_url=None)

logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
# Optionally, adjust the main Uvicorn logger
#logging.getLogger("uvicorn").setLevel(logging.WARNING)

class DynamicCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        if request.method == "OPTIONS":
            response = Response(status_code=200)
            response.headers["Access-Control-Allow-Origin"] = "*"
            response.headers["Access-Control-Allow-Credentials"] = "true"
            response.headers["Access-Control-Allow-Methods"] = "*"
            response.headers["Access-Control-Allow-Headers"] = "*"
            return response

        response = await call_next(request)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Methods"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "*"
        return response

app.add_middleware(DynamicCORSMiddleware)


@app.middleware("http")
async def check_url(request: Request, call_next):
    start_time = int(time.time())
    response = await call_next(request)
    process_time = int(time.time()) - start_time
    response.headers["X-Process-Time"] = str(process_time)

    return response

app.mount("/api/v1", webui_app)
app.mount("/agents/api/v1", agent_app)


@app.get("/api/config")
async def get_app_config():
    # Checking and Handling the Absence of 'ui' in CONFIG_DATA

    default_locale = "zh-CN"
    if "ui" in CONFIG_DATA:
        default_locale = CONFIG_DATA["ui"].get("default_locale", "zh-US")

    # The Rest of the Function Now Uses the Variables Defined Above
    return {
        "status": True,
        "name": WEBUI_NAME,
        "version": VERSION,
        "default_locale": default_locale,
        "support_file_formats": FILE_FORMAT_SUPPORT
    }


@app.get("/api/version_info")
async def get_app_version_info():
    try:
        current_path = os.getcwd()
        lines = open(f"{current_path}/../build/version.rc", "r").readlines()
        interface_commit_id = lines[1].split(' ')[1].split('=')[1]
        interface_branch_name = lines[2].split(' ')[1].split('=')[1]
        return JSONResponse(
            content={
                "current": open(f"{current_path}/version.txt", "r").read().strip(),
                "repos":   [
                    {
                        "repo_name": "sapientia",
                        "branch_name": "main",
                        "commit_id":   "N.A."
                    },
                    {
                        "repo_name": "interface",
                        "branch_name": interface_branch_name,
                        "commit_id": interface_commit_id
                    }
                ]
            },
            status_code=200
        )
    except Exception as e:
        print(e)
        pass
    raise HTTPException(status_code=500, detail=f"Server error: get version info failed.")



@app.get("/api/version")
async def get_app_config():
    return {
        "version": VERSION,
    }



@app.get("/api/version/updates")
async def get_app_latest_release_version():
    raise HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail=ERROR_MESSAGES.RATE_LIMIT_EXCEEDED,
    )

@app.get("/api/planinfo")
async def get_plan_info():
    return {
        'version': config.LICENSE.get('version'),
        'sub_version': config.LICENSE.get('sub_version'),
        'chat_count': config.LICENSE.get('chat_count', -1), #-1表示无次数限制
        'used_chat_count': get_used_chat_count(),
        'volume': config.LICENSE.get('volume', -1), #-1表示无容量限制
        'used_volume_mb': USED_INFO.get('used_volume_mb', 0)
    }


def get_used_chat_count():
    """获取当天的使用次数，自动重置"""
    today = datetime.date.today().isoformat()  # 格式：2024-01-15

    # 如果不是今天的数据，重置
    if USED_INFO.get('last_reset_date', '') != today:
        USED_INFO['used_chat_count'] = 0
        USED_INFO['last_reset_date'] = today

    return USED_INFO.get('used_chat_count', 0)

app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/staged", StaticFiles(directory=staged_folder), name="staged")


app.mount(
    "/",
    SPAStaticFiles(directory=FRONTEND_BUILD_DIR, html=True),
    name="spa-static-files",
)


def replace_single_file_simple(base_url):
    current_dir = Path(__file__).parent
    file_path = current_dir / "static" / "embedPdf" / "embedpdf-8670f7f3.js"
    new_url = f"{base_url}/static/embedPdf/pdfium.wasm"
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        pattern = r'(const\s+Xn\s*=\s*")[^"]*(")'
        replacement = r'\1' + new_url + r'\2'
        new_content, count = re.subn(pattern, replacement, content)

        if count > 0:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

            DynamicCORSMiddleware._replace_called = True
            return True
        else:
            return False

    except Exception as e:
        return False

