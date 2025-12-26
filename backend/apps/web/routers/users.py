from fastapi import Response, Request
from fastapi import Depends, FastAPI, HTTPException, status
from datetime import datetime, timedelta
from typing import List, Union, Optional, Dict

from fastapi import APIRouter
from pydantic import BaseModel
import time
import uuid
import logging
import pathlib

from apps.web.models.users import UserModel, UserUpdateForm, UserRoleUpdateForm, Users, register
from apps.web.models.auths import Auths

from utils.utils import get_current_user, get_password_hash, get_admin_user, create_token
from utils.misc import parse_duration
from constants import ERROR_MESSAGES

from config import SRC_LOG_LEVELS

log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["AGENT"])

router = APIRouter()

############################
# GetUsers
############################


@router.get("/", response_model=List[UserModel])
async def get_users(skip: int = 0, limit: int = 50, user=Depends(get_current_user)):
    return Users.get_users(skip, limit)


############################
# User Permissions
############################


@router.get("/permissions/user")
async def get_user_permissions(request: Request, user=Depends(get_admin_user)):
    return request.app.state.USER_PERMISSIONS


@router.post("/permissions/user")
async def update_user_permissions(
    request: Request, form_data: dict, user=Depends(get_admin_user)
):
    request.app.state.USER_PERMISSIONS = form_data
    return request.app.state.USER_PERMISSIONS



############################
# Apply SDK Token
############################
@router.post("/apply/token", response_model=Dict)
async def apply_token(request: Request, form_data: dict):
    JWT_EXPIRES_IN = None
    secret_dir = pathlib.Path("data") / "secret"
    secret_dir.mkdir(parents=True, exist_ok=True)

    user_id = form_data['user_id']
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST
        )
    try:
        user_path = secret_dir / f"{user_id}"
        if user_path.exists():
            user_token = user_path.read_text().strip()
            return {"sdk_token": user_token}

        is_create = form_data['is_create']
        if is_create is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
            )
        if is_create:
            if not JWT_EXPIRES_IN:
                JWT_EXPIRES_IN = request.app.state.JWT_EXPIRES_IN

            user_token = create_token(
                data={"id": user_id},
                expires_delta=None if JWT_EXPIRES_IN == '-1' else parse_duration(JWT_EXPIRES_IN)
            )
            user_path.write_text(user_token)
            return {"sdk_token": user_token}
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Token not found"
            )
    except IOError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to write token: {str(e)}"
        )


############################
# UpdateUserRole
############################


@router.post("/update/role", response_model=Optional[UserModel])
async def update_user_role(form_data: UserRoleUpdateForm, user=Depends(get_admin_user)):

    if user.id != form_data.id:
        return Users.update_user_role_by_id(form_data.id, form_data.role)

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail=ERROR_MESSAGES.ACTION_PROHIBITED,
    )


@router.post("/register/nameExists", response_model=bool)
async def is_registration(request: Request, form_data: register):
    # 建议添加异常处理
    try:
        user = Users.get_user_by_name(form_data.name.lower())
        return user is not None  # 明确返回布尔值
    except Exception as e:
        # 记录日志并返回适当的错误响应
        raise HTTPException(status_code=500, detail="查询用户时发生错误")


############################
# UpdateUserById
############################
# get_user_by_name

@router.post("/{user_id}/update", response_model=Optional[UserModel])
async def update_user_by_id(
    user_id: str, form_data: UserUpdateForm, session_user=Depends(get_current_user)
):
    user = Users.get_user_by_id(user_id)

    if user:
        if form_data.email.lower() != user.email:
            email_user = Users.get_user_by_email(form_data.email.lower())
            if email_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=ERROR_MESSAGES.EMAIL_TAKEN,
                )

        if form_data.password:
            hashed = get_password_hash(form_data.password)
            log.debug(f"hashed: {hashed}")
            Auths.update_user_password_by_id(user_id, hashed)

        Auths.update_email_by_id(user_id, form_data.email.lower())
        updated_user = Users.update_user_by_id(
            user_id,
            {
                "name": form_data.name,
                "email": form_data.email.lower(),
                "profile_image_url": form_data.profile_image_url,
            },
        )

        if updated_user:
            return updated_user

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(),
        )

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=ERROR_MESSAGES.USER_NOT_FOUND,
    )


############################
# DeleteUserById
############################


@router.delete("/{user_id}", response_model=bool)
async def delete_user_by_id(user_id: str, user=Depends(get_admin_user)):
    num_users = Users.get_num_users()
    if num_users == 1:
        raise HTTPException(
            status_code=200,
            detail='删除失败，不能删除系统中的唯一用户',
        )
    if user.id != user_id:
        result = Auths.delete_auth_by_id(user_id)

        if result:
            return True

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ERROR_MESSAGES.DELETE_USER_ERROR,
        )

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail=ERROR_MESSAGES.ACTION_PROHIBITED,
    )
