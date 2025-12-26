from fastapi import Response, Request
from fastapi import Depends, FastAPI, HTTPException, status
from typing import List
from fastapi import APIRouter, File, UploadFile
from pydantic import BaseModel
import config
import os


from apps.web.models.users import Users

from utils.utils import (
    get_password_hash,
    get_current_user,
    get_admin_user,
    create_token,
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
    return {"status": status}


@router.get("/get_white_list_num")
async def get_white_list_num():
    return {
        "data": config.LICERSE["white_list_num"]
    }


@router.get("/get_white_list")
async def get_white_list():
    origins = []
    return origins


class WhiteListForm(BaseModel):
    origins: List[str]


@router.post("/set_white_list")
async def set_white_list(from_date: WhiteListForm):
    return {
        "status": status
    }


@router.delete("/del_white_list")
async def del_white_list(from_date: WhiteListForm):
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
