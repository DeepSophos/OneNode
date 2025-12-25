import logging
import random
import requests
from urllib.parse import quote
from fastapi import Response, Request
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Tuple, Optional
from apps.web.models.storage import ExpiringStorage

from config import (
SRC_LOG_LEVELS,
SMS_BASE_URL,
SMS_TOKEN,
SMS_TEMPLATE
)

log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["MODELS"])
router = APIRouter()

# 初始化存储实例
code_storage = ExpiringStorage()
send_records = ExpiringStorage()

CODE_KEY_PREFIX = "sms_code:"
LIMIT_MINUTE_PREFIX = "limit:minute:"
LIMIT_HOUR_PREFIX = "limit:hour:"


# 请求模型
class SendVerificationRequest(BaseModel):
    phone: str = Field(..., min_length=11, max_length=11, description="11位手机号码")


# 生成验证码
def generate_verification_code(length: int = 6) -> str:
    """生成指定长度的数字验证码"""
    return ''.join(str(random.randint(0, 9)) for _ in range(length))


# 检查发送限制
def check_send_limit(phone: str) -> Tuple[bool, str]:
    """检查发送频率限制"""
    # 1分钟内限制
    key_minute = f"{LIMIT_MINUTE_PREFIX}{phone}"
    if send_records.get(key_minute):
        return False, "1分钟内只能发送一次验证码"

    # 1小时内限制
    key_hour = f"{LIMIT_HOUR_PREFIX}{phone}"
    hour_count = send_records.get(key_hour) or 0
    if int(hour_count) >= 5:
        return False, "1小时内最多发送5次验证码"

    return True, ""


# 更新发送记录
def update_send_limit(phone: str) -> None:
    """更新发送记录"""
    # 1分钟限制
    key_minute = f"{LIMIT_MINUTE_PREFIX}{phone}"
    send_records.set(key_minute, "1", 60)  # 60秒有效期

    # 1小时限制
    key_hour = f"{LIMIT_HOUR_PREFIX}{phone}"
    current_count = send_records.get(key_hour) or 0
    send_records.set(key_hour, str(int(current_count) + 1), 3600)  # 3600秒有效期


# 验证短信验证码
def verify_code_internal(phone: str, code: str) -> bool:
    """
    内部使用的验证码验证函数
    :param phone: 手机号
    :param code: 验证码
    :return: 验证结果（True/False）
    """
    # 验证手机号格式
    if not (phone.isdigit() and len(phone) == 11):
        return False

    # 验证验证码格式
    if not (code.isdigit() and len(code) == 6):
        return False

    # 获取存储的验证码
    code_key = f"{CODE_KEY_PREFIX}{phone}"
    stored_code = code_storage.get(code_key)

    # 验证结果
    if not stored_code:
        return False

    if stored_code == code:
        # 验证成功后删除验证码，防止重复使用
        code_storage.delete(code_key)
        return True
    else:
        return False


def send_sms(phone: str, code: str) -> bool:
    """
    发送短信验证码
    :param phone: 手机号
    :param code: 验证码
    :return: 发送是否成功
    """
    try:
        content = SMS_TEMPLATE.format(code=code)
        encoded_content = quote(content)
        base_url = SMS_BASE_URL
        headers = {
            "Authorization": f"{SMS_TOKEN}",
            "Content-Type": "application/json"
        }
        params = {
            "phone": phone,
            "content": encoded_content
        }

        # 发送请求
        response = requests.get(base_url,headers=headers, params=params)
        response.raise_for_status()

        result = response.json()
        if result.find("result=0") != -1:
            return True
        else:
            log.info(f"短信发送失败: {result}")
            return False

    except requests.exceptions.RequestException as e:
        log.info(f"短信发送失败: {e}")
        return False
    except Exception as e:
        log.info(f"处理短信时发生意外错误: {e}")
        return False


# 发送验证码接口
@router.post("/send-verification", response_model=dict)
async def send_verification(request: SendVerificationRequest):
    phone = request.phone
    # 验证手机号是否为数字
    if not phone.isdigit():
        return {
            "success": False,
            "message": "请提供有效的11位手机号",
        }

    # 检查手机号是否已发送验证码
    code_key = f"{CODE_KEY_PREFIX}{phone}"
    if code_storage.get(code_key):
        return {
            "success": False,
            "message": "验证码还在有效期内，请勿重新发送",
        }

    # 检查发送频率限制
    can_send, msg = check_send_limit(phone)
    if not can_send:
        return {
            "success": False,
            "message": msg,
        }

    # 生成验证码
    code = generate_verification_code()

    if send_sms(phone, code):
        code_key = f"{CODE_KEY_PREFIX}{phone}"
        code_storage.set(code_key, code, 600)
        # print(f'短信验证码: {code}')
        # 更新发送记录
        update_send_limit(phone)
    else:
        return {
            "success": False,
            "message": "短信发送失败,请检查手机号是否正确",
        }
    return {
        "success": True,
        "message": "验证码已发送，10分钟内有效",
        "expires_in": 600
    }
