import os
import asyncio
import json
import zipfile
import shutil
import glob
from typing import Optional
from zoneinfo import ZoneInfo

from playhouse.shortcuts import model_to_dict

from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    status,
    Request,
    UploadFile,
    File,
    Form,
    Header
)
from fastapi.middleware.cors import CORSMiddleware
from utils.utils import get_current_user, get_admin_user, path_to_index_name, verify_token
import config
from config import (
    FILE_FORMAT_SUPPORT,
    SRC_LOG_LEVELS,
    FAILURE_IMAGE,
    FRONTEND_BUILD_DIR,
    LIMIT_CAPACITY_MB_CO,
    LIMIT_CAPACITY_MB_ST,
    SYSTEM_NAME,
    SYSTEM_WELCOME,
    SYSTEM_WELCOME_TITLE,
    KB_USAGE_COUNT,
    USED_INFO
)
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel
from typing import List
from constants import ERROR_MESSAGES
from fastapi.responses import JSONResponse
import logging
import models.kbm as kbm
from datetime import datetime
from dateutil.relativedelta import relativedelta
from pathlib import Path
from apps.web.models.users import Users
from fastapi.responses import FileResponse

version_flag = os.environ.get("VERSION_CODE", "CO0824VL32I8XXXX")[:2]

log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["BACKEND"])

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/GetVersion")
def get_version():
    if version_flag == "EN":
        return "企业版"
    elif version_flag == "ST":
        return "标准版"
    else:
        return "社区版"



class UserDefaultPathForm(BaseModel):
    unit_path: str


@app.post("/SetUserDefaultPath")
def set_user_default_path(user_default_path: UserDefaultPathForm, user=Depends(get_current_user)):
    try:
        kbm.update_config("user_default_path", user_default_path.unit_path)
        return {"status": "successfully"}

    except Exception as e:
        log.exception(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

# 登录页获取系统名称和logo
@app.get("/GetSystemName")
def get_system_name():
    try:
        system_name = kbm.get_config("system_name")
        system_logo = kbm.get_config("system_logo")
        login_bg = kbm.get_config("login_bg")
        allCompanyName = kbm.get_config("allCompanyName")
        allCompanyUrl = kbm.get_config("allCompanyUrl")
        return {"system_name": system_name or SYSTEM_NAME,
                "system_logo": system_logo or '',
                "login_bg": login_bg or '',
                "allCompanyName":allCompanyName or '',
                "allCompanyUrl": allCompanyUrl or ''}
    except Exception as e:
        log.exception(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )



@app.get("/GetSystemInfo")
def get_system_name(authorization: str = Header(...)):
    try:
        system_name = kbm.get_config("system_name")
        system_welcome = kbm.get_config("system_welcome")
        system_welcome_title = kbm.get_config("system_welcome_title")
        show_system_title = kbm.get_config("show_system_title")
        show_system_welcome = kbm.get_config("show_system_welcome")
        system_logo = kbm.get_config("system_logo")
        login_bg = kbm.get_config("login_bg")
        allCompanyName =kbm.get_config("allCompanyName")
        allCompanyUrl = kbm.get_config("allCompanyUrl")
        failedAnswer = kbm.get_config("failedAnswer")
        token_duration =kbm.get_config("sdk_access_token_duration")
        token_enabled =kbm.get_config("sdk_access_token_enabled")
        token = authorization[len("Bearer "):].strip()
        token_valid = verify_token(token) is not False
        sdk_dev_doc = kbm.get_config("sdk_dev_doc") or "true"
        kbman_super_enabled = kbm.get_config("kbman_super_enabled") or "true"
        system_info = {
            "system_name": system_name or SYSTEM_NAME,
            "system_welcome": system_welcome or SYSTEM_WELCOME,
            "system_welcome_title": system_welcome_title or SYSTEM_WELCOME_TITLE,
            "show_system_title": show_system_title or "true",
            "show_system_welcome": show_system_welcome or "true",
            "system_logo": system_logo or '',
            "login_bg": login_bg or '',
            "token_valid": token_valid,
            "allCompanyName":allCompanyName,
            "allCompanyUrl": allCompanyUrl,
            "failedAnswer": failedAnswer,
            "token_enabled": token_enabled,
            "token_duration": token_duration,
            "gpu_number": config.GPU_NUMBER,
            "sdk_dev_doc": sdk_dev_doc,
            "kbman_super_enabled":kbman_super_enabled
        }
        return system_info
    except Exception as e:
        log.exception(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.get("/GetAnswerCorrection")
def get_config_info(user=Depends(get_current_user)):
    try:
        config_info = kbm.get_config('answer_correction') or 'review'
        return config_info
    except Exception as e:
        log.exception(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


class ConfigInfo(BaseModel):
    key: str
    value: str


@app.post("/UpdateConfigInfo")
def update_system_info(config_info: ConfigInfo, user=Depends(get_current_user)):
    try:
        kbm.update_config(config_info.key, config_info.value)
        return {"status": "successfully"}
    except Exception as e:
        log.exception(e)

