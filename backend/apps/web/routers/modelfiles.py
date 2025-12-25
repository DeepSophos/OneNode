from fastapi import Depends, FastAPI, HTTPException, status
from datetime import datetime, timedelta
from typing import List, Union, Optional

from fastapi import APIRouter
from pydantic import BaseModel
import json
from apps.web.models.modelfiles import (
    Modelfiles,
    ModelfileForm,
    ModelfileTagNameForm,
    ModelfileUpdateForm,
    ModelfileResponse,
)

from utils.utils import get_current_user, get_admin_user
from constants import ERROR_MESSAGES

router = APIRouter()

############################
# GetModelfiles
############################


@router.get("/", response_model=List[ModelfileResponse])
async def get_modelfiles(
    skip: int = 0, limit: int = 50, user=Depends(get_current_user)
):
    return Modelfiles.get_modelfiles(skip, limit)
