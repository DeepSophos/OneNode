from fastapi import Response, Request
from fastapi import Depends, FastAPI, HTTPException, status
from datetime import datetime, timedelta
from typing import List, Union

from fastapi import APIRouter, status
from pydantic import BaseModel
import time
import uuid
import re

from apps.web.models.auths import (
    SigninForm,
    SignupForm,
    UpdateProfileForm,
    UpdatePasswordForm,
    UserResponse,
    SigninResponse,
    Auths,
    register
)
from apps.web.models.users import Users

from apps.web.routers.sms import verify_code_internal

from utils.utils import (
    get_password_hash,
    get_current_user,
    get_admin_user,
    create_token,
)
from utils.misc import parse_duration, validate_email_format
from constants import ERROR_MESSAGES, WEBHOOK_MESSAGES
import config

router = APIRouter()


############################
# GetSessionUser
############################


@router.get("/", response_model=UserResponse)
async def get_session_user(user=Depends(get_current_user)):
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "role": user.role,
        "profile_image_url": user.profile_image_url,
    }


############################
# Update Profile
############################


@router.post("/update/profile", response_model=UserResponse)
async def update_profile(
        form_data: UpdateProfileForm, session_user=Depends(get_current_user)
):
    if session_user:
        user = Users.update_user_by_id(
            session_user.id,
            {"profile_image_url": form_data.profile_image_url, "name": form_data.name},
        )
        if user:
            return user
        else:
            raise HTTPException(400, detail=ERROR_MESSAGES.DEFAULT())
    else:
        raise HTTPException(400, detail=ERROR_MESSAGES.INVALID_CRED)


############################
# Update Password
############################


@router.post("/update/password", response_model=bool)
async def update_password(
        form_data: UpdatePasswordForm, session_user=Depends(get_current_user)
):
    if session_user:
        user = Auths.authenticate_user(session_user.email, form_data.password)

        if user:
            hashed = get_password_hash(form_data.new_password)
            return Auths.update_user_password_by_id(user.id, hashed)
        else:
            raise HTTPException(400, detail=ERROR_MESSAGES.INVALID_PASSWORD)
    else:
        raise HTTPException(400, detail=ERROR_MESSAGES.INVALID_CRED)


############################
# SignIn
############################

@router.post("/signin", response_model=SigninResponse)
async def signin(request: Request, form_data: SigninForm):
    if form_data.code:
        if not Users.get_user_by_email(form_data.email.lower()):
            raise HTTPException(400, detail="该手机号未注册")
    user = Auths.authenticate_user(form_data.email.lower(), form_data.password, form_data.code)
    if user:
        JWT_EXPIRES_IN = None
        if not JWT_EXPIRES_IN:
            JWT_EXPIRES_IN = request.app.state.JWT_EXPIRES_IN

        token = create_token(
            data={"id": user.id},
            expires_delta=None if JWT_EXPIRES_IN == '-1' else parse_duration(JWT_EXPIRES_IN)
        )

        return {
            "token": token,
            "token_type": "Bearer",
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": user.role,
            "profile_image_url": user.profile_image_url,
        }
    else:
        raise HTTPException(400, detail=ERROR_MESSAGES.INVALID_CRED)


############################
# SignUp
############################


@router.post("/signup", response_model=SigninResponse)
async def signup(request: Request, form_data: SignupForm):
    if not request.app.state.ENABLE_SIGNUP:
        raise HTTPException(
            status.HTTP_403_FORBIDDEN, detail=ERROR_MESSAGES.ACCESS_PROHIBITED
        )

    # if not validate_email_format(form_data.email.lower()):
    #     raise HTTPException(
    #         status.HTTP_400_BAD_REQUEST, detail=ERROR_MESSAGES.INVALID_EMAIL_FORMAT
    #     )

    if Users.get_user_by_email(form_data.email.lower()):
        raise HTTPException(400, detail=ERROR_MESSAGES.EMAIL_TAKEN)

    if Users.get_user_by_name(form_data.name.lower()):
        raise HTTPException(400, detail=ERROR_MESSAGES.USERNAME_TAKEN)
    if config.LICENSE.get("reg_verify", False):
        if not verify_code_internal(form_data.email, form_data.code):
            raise HTTPException(400, detail="验证码错误")

    try:
        role = (
            "admin"
            if Users.get_num_users() == 0
            else request.app.state.DEFAULT_USER_ROLE
        )

        hashed = get_password_hash(form_data.password)
        user = Auths.insert_new_auth(
            form_data.email.lower(), hashed, form_data.name, role
        )

        if user:
            JWT_EXPIRES_IN = None
            if not JWT_EXPIRES_IN:
                JWT_EXPIRES_IN = request.app.state.JWT_EXPIRES_IN
            elif int(JWT_EXPIRES_IN) > 0:
                JWT_EXPIRES_IN = f"{JWT_EXPIRES_IN}d"

            token = create_token(
                data={"id": user.id},
                expires_delta=None if JWT_EXPIRES_IN == '-1' else parse_duration(JWT_EXPIRES_IN)
            )
            # response.set_cookie(key='token', value=token, httponly=True)

            return {
                "token": token,
                "token_type": "Bearer",
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "role": user.role,
                "profile_image_url": user.profile_image_url,
            }
        else:
            raise HTTPException(500, detail=ERROR_MESSAGES.CREATE_USER_ERROR)
    except Exception as err:
        raise HTTPException(500, detail=ERROR_MESSAGES.DEFAULT(err))


############################
# ToggleSignUp
############################

@router.post("/signup/register/isRegistration", response_model=bool)
async def is_registration(request: Request, form_data: register):
    # 建议添加异常处理
    try:
        user = Users.get_user_by_email(form_data.email.lower())
        return user is not None  # 明确返回布尔值
    except Exception as e:
        # 记录日志并返回适当的错误响应
        raise HTTPException(status_code=500, detail="查询用户时发生错误")


@router.get("/signup/enabled", response_model=bool)
async def get_sign_up_status(request: Request):
    return request.app.state.ENABLE_SIGNUP


@router.get("/signup/enabled/toggle", response_model=bool)
async def toggle_sign_up(request: Request, user=Depends(get_admin_user)):
    request.app.state.ENABLE_SIGNUP = not request.app.state.ENABLE_SIGNUP
    return request.app.state.ENABLE_SIGNUP


############################
# Default User Role
############################


@router.get("/signup/user/role")
async def get_default_user_role(request: Request, user=Depends(get_admin_user)):
    return request.app.state.DEFAULT_USER_ROLE


class UpdateRoleForm(BaseModel):
    role: str


@router.post("/signup/user/role")
async def update_default_user_role(
        request: Request, form_data: UpdateRoleForm, user=Depends(get_admin_user)
):
    if form_data.role in ["pending", "user", "admin"]:
        request.app.state.DEFAULT_USER_ROLE = form_data.role
    return request.app.state.DEFAULT_USER_ROLE


############################
# JWT Expiration
############################


@router.get("/token/expires")
async def get_token_expires_duration(request: Request, user=Depends(get_admin_user)):
    return request.app.state.JWT_EXPIRES_IN


class UpdateJWTExpiresDurationForm(BaseModel):
    duration: str


@router.post("/token/expires/update")
async def update_token_expires_duration(
        request: Request,
        form_data: UpdateJWTExpiresDurationForm,
        user=Depends(get_admin_user),
):
    pattern = r"^(-1|0|(-?\d+(\.\d+)?)(ms|s|m|h|d|w))$"

    # Check if the input string matches the pattern
    if re.match(pattern, form_data.duration):
        request.app.state.JWT_EXPIRES_IN = form_data.duration
        return request.app.state.JWT_EXPIRES_IN
    else:
        return request.app.state.JWT_EXPIRES_IN


@router.get("/register/verify")
async def get_reg_verify():
    return config.LICENSE.get("reg_verify", False)

