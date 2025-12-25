from fastapi import Response, Request
from fastapi import Depends, FastAPI, HTTPException, status
from datetime import datetime, timedelta
from typing import List, Union

from fastapi import APIRouter, File, UploadFile
from pydantic import BaseModel
import time
import uuid
import models.kbm as kbm
import config
import os


from apps.web.models.users import Users
from auth import encrypt, decrypt

from utils.utils import (
    get_password_hash,
    get_current_user,
    get_admin_user,
    create_token,
    update_cors_origins,
    is_valid_domain_or_ip
)
from utils.misc import get_gravatar_url, validate_email_format
from constants import ERROR_MESSAGES

router = APIRouter()


class SetDefaultModelsForm(BaseModel):
    models: str


############################
# SetDefaultModels
############################


@router.get("/serviceUrl")
async def get_service_url(user=Depends(get_admin_user)):
    return {
        "LLM_SRV1_URL": config.LLM_SRV1_URL,
        "LLM_SRV2_URL": config.LLM_SRV2_URL,
        "HF_URL": config.HF_URL,
        "INTERVL_URL": config.INTERVL_URL,
        "OMPT_URL": config.OMPT_URL
    }

@router.get("/serviceUrl/default")
async def default_service_url(user=Depends(get_admin_user)):
    return {
        "LLM_SRV1_URL": os.environ.get("LLM_SRV1_URL", ""),
        "LLM_SRV2_URL": os.environ.get("LLM_SRV2_URL", ""),
        "HF_URL": os.environ.get("HF_URL", ""),
        "INTERVL_URL": os.environ.get("INTERVL_URL", ""),
        "OMPT_URL": os.environ.get("OMPT_URL", "")
    }

class ServiceUrl(BaseModel):
    LLM_SRV1_URL:str
    LLM_SRV2_URL:str
    HF_URL:str
    INTERVL_URL:str
    OMPT_URL:str

@router.post("/serviceUrl/update")
async def update_service_url(form_data: ServiceUrl, user=Depends(get_admin_user)):
    LLM_SRV1_URL = form_data.LLM_SRV1_URL.strip() if hasattr(form_data, 'LLM_SRV1_URL') else config.LLM_SRV1_URL
    LLM_SRV2_URL = form_data.LLM_SRV2_URL.strip() if hasattr(form_data, 'LLM_SRV2_URL') else config.LLM_SRV2_URL
    HF_URL = form_data.HF_URL.strip() if hasattr(form_data, 'HF_URL') else config.HF_URL
    INTERVL_URL = form_data.INTERVL_URL.strip() if hasattr(form_data, 'INTERVL_URL') else config.INTERVL_URL
    OMPT_URL = form_data.OMPT_URL.strip() if hasattr(form_data, 'OMPT_URL') else config.OMPT_URL

    status = True
    status = kbm.update_config("LLM_SRV1_URL", LLM_SRV1_URL) if status else False
    status = kbm.update_config("LLM_SRV2_URL", LLM_SRV2_URL) if status else False
    status = kbm.update_config("HF_URL", HF_URL) if status else False
    status = kbm.update_config("INTERVL_URL", INTERVL_URL) if status else False
    status = kbm.update_config("OMPT_URL", OMPT_URL) if status else False

    if status:
        config.LLM_SRV1_URL = LLM_SRV1_URL
        config.LLM_SRV2_URL = LLM_SRV2_URL
        config.HF_URL = HF_URL
        if config.INTERVL_URL != INTERVL_URL:
            from utils.iv3_client import reset_client
            reset_client()
        config.INTERVL_URL = INTERVL_URL
        config.OMPT_URL = OMPT_URL

    return {"status": status}


@router.get("/get_white_list_num")
async def get_white_list_num():
    return {
        "data": config.LICERSE["white_list_num"]
    }


@router.get("/get_white_list")
async def get_white_list():
    origins = []
    white_list_c = kbm.get_config("whiteLists")
    if len(white_list_c) > 0:
        white_list = decrypt(white_list_c)
        origins = white_list.split(";")

    return origins


class WhiteListForm(BaseModel):
    origins: List[str]


@router.post("/set_white_list")
async def set_white_list(from_date: WhiteListForm):
    invalid_origins = [item for item in from_date.origins if not is_valid_domain_or_ip(item)]
    if invalid_origins:
        return {
            "status": False,
            "message": f"不是有效的域名或IP：{', '.join(invalid_origins)}"
        }
    origins = []
    white_list_c = kbm.get_config("whiteLists")
    if len(white_list_c) > 0:
        white_list = decrypt(white_list_c)
        origins = white_list.split(";")
    if len(origins) + len(from_date.origins) >= config.LICENSE["white_list_num"]:
        return {
            "status": False,
            "message": "Exceeding the limit"
        }
    origins.extend(from_date.origins)
    origins = list(dict.fromkeys(filter(None, origins)))
    whitelists = ';'.join(origins)
    whitelists_c = encrypt(whitelists)
    status = kbm.update_config("whiteLists", whitelists_c)
    if status:
        update_cors_origins()
    return {
        "status": status
    }


@router.delete("/del_white_list")
async def del_white_list(from_date: WhiteListForm):
    origins = []
    white_list_c = kbm.get_config("whiteLists")
    if len(white_list_c) > 0:
        white_list = decrypt(white_list_c)
        origins = white_list.split(";")
    origins = [x for x in origins if x not in from_date.origins]
    whitelists = ';'.join(origins)
    whitelists_c = encrypt(whitelists)
    status = kbm.update_config("whiteLists", whitelists_c)
    if not status:
        return {
            "status": False,
            "message": "update failed."
        }

    update_cors_origins()
    return {
        "status": True
    }

@router.post("/upload_license")
async def upload_license(file: UploadFile = File(...)):
    if file.filename != "license.bin":
        return {
            "status": False,
            "message": "Invalid file."
        }

    try:
        # 保存文件到当前目录
        file_path = os.path.join(os.getcwd(), "data", "license.bin")
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        return {
            "status": True
        }
    except Exception as e:
        return {
            "status": False,
            "message": str(e)
        }
