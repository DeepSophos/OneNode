from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import HTTPException, status, Depends
from pydantic import BaseModel
from typing import Union, Optional
from constants import ERROR_MESSAGES
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
import requests
import jwt
import logging
import config
import hashlib
import os
import re
import ipaddress
from apps.web.models.users import Users

logging.getLogger("passlib").setLevel(logging.ERROR)


SESSION_SECRET = config.WEBUI_SECRET_KEY
ALGORITHM = "HS256"

##############
# Auth Utils
##############

bearer_security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return (
        pwd_context.verify(plain_password, hashed_password) if hashed_password else None
    )


def get_password_hash(password):
    return pwd_context.hash(password)


def create_token(data: dict, expires_delta: Union[timedelta, None] = None) -> str:
    payload = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
        payload.update({"exp": expire})

    encoded_jwt = jwt.encode(payload, SESSION_SECRET, algorithm=ALGORITHM)
    return encoded_jwt


def decode_token(token: str) -> Optional[dict]:
    try:
        decoded = jwt.decode(token, SESSION_SECRET, algorithms=[ALGORITHM])
        return decoded
    except Exception as e:
        return None


def extract_token_from_auth_header(auth_header: str):
    return auth_header[len("Bearer ") :]


def get_http_authorization_cred(auth_header: str):
    try:
        scheme, credentials = auth_header.split(" ")
        return HTTPAuthorizationCredentials(scheme=scheme, credentials=credentials)
    except:
        raise ValueError(ERROR_MESSAGES.INVALID_TOKEN)

def verify_token(token: str):
    data = decode_token(token)
    if ((not data) or \
            ("id" not in data) or \
            ("exp" in data and datetime.utcnow().timestamp() >= int(data["exp"])) \
    ):
        return False
    user = None
    user = Users.get_user_by_id(data["id"])
    if not user:
        return False
    return user

def get_current_user(
    auth_token: HTTPAuthorizationCredentials = Depends(bearer_security),
):
    result = verify_token(auth_token.credentials)

    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ERROR_MESSAGES.UNAUTHORIZED
        )

    return result


def get_verified_user(user=Depends(get_current_user)):
    if user.role not in {"user", "admin"}:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ERROR_MESSAGES.ACCESS_PROHIBITED,
        )
    return user


def get_admin_user(user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ERROR_MESSAGES.ACCESS_PROHIBITED,
        )
    return user


def path_to_index_name(file_path):
    path_hexdigest = hashlib.md5(file_path.encode('utf-8')).hexdigest()
    prefix = path_hexdigest[:8]
    filename = os.path.basename(file_path)[:128]

    # Normalize the path (handles different OS path separators)
    normalized_path = os.path.normpath(filename)

    # Split the path into components
    path_components = normalized_path.split(os.sep)

    # Join components, replace invalid characters
    name = "_".join(path_components).lower()
    name = re.sub(r'[\\/*?"<>|,#]+', '_', name)

    # Remove leading -, _, +
    name = re.sub(r'^[-_+]+', '', name)

    # Replace spaces with underscores
    name = name.replace(' ', '_')

    # Remove consecutive underscores
    name = re.sub(r'_+', '_', name)

    # Ensure it's not . or ..
    if name in {'.', '..'}:
        name = 'index_' + name

    return prefix + '-' + name

def is_valid_domain_or_ip(value):
    value = value.strip()
    # 校验IP（带端口）
    try:
        if ":" in value:
            ip_part, port_part = value.rsplit(":", 1)
            ipaddress.ip_address(ip_part)
            if port_part.isdigit() and 0 < int(port_part) < 65536:
                return True
        else:
            ipaddress.ip_address(value)
            return True
    except ValueError:
        pass
    # 校验域名（支持端口）
    domain_regex = re.compile(
        r'^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{1,63})*(\.[A-Za-z]{2,})(:\d{1,5})?$'
    )
    return bool(domain_regex.match(value))


def to_chinese_num(n: int) -> str:
    """单个整数转中文大写：1→一，2→二，...，10→十"""
    units = ['', '十', '百', '千']
    nums = '零一二三四五六七八九'
    if n == 0:
        return '零'
    if n < 0:
        return '负' + to_chinese_num(-n)

    s = ''
    unit_pos = 0
    need_zero = False

    while n > 0:
        digit = n % 10
        if digit > 0:
            if need_zero:
                s = '零' + s
                need_zero = False
            s = nums[digit] + units[unit_pos] + s
        elif unit_pos > 0 and not need_zero:
            need_zero = True
        n //= 10
        unit_pos += 1
    return s or '零'