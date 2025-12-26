from fastapi import APIRouter, UploadFile, File, BackgroundTasks
from fastapi import Depends, HTTPException, status
from starlette.responses import StreamingResponse, FileResponse


from pydantic import BaseModel
import aiohttp


from utils.utils import get_admin_user
from utils.misc import calculate_sha256, get_gravatar_url

from constants import ERROR_MESSAGES


router = APIRouter()


@router.get("/gravatar")
async def get_gravatar(
    email: str,
):
    return get_gravatar_url(email)


