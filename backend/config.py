import os
import sys
import logging
from pathlib import Path

from PIL.AvifImagePlugin import SUPPORTED

from constants import ERROR_MESSAGES

WEBUI_NAME = "智点工坊"

ENV = os.environ.get("ENV", "dev")


# Function to parse each section
def parse_section(section):
    items = []
    for li in section.find_all("li"):
        # Extract raw HTML string
        raw_html = str(li)

        # Extract text without HTML tags
        text = li.get_text(separator=" ", strip=True)

        # Split into title and content
        parts = text.split(": ", 1)
        title = parts[0].strip() if len(parts) > 1 else ""
        content = parts[1].strip() if len(parts) > 1 else text

        items.append({"title": title, "content": content, "raw": raw_html})
    return items


log_levels = ["CRITICAL", "ERROR", "WARNING", "INFO", "DEBUG"]

GLOBAL_LOG_LEVEL = os.environ.get("GLOBAL_LOG_LEVEL", "").upper()
if GLOBAL_LOG_LEVEL in log_levels:
    logging.basicConfig(stream=sys.stdout, level=GLOBAL_LOG_LEVEL, force=True)
else:
    GLOBAL_LOG_LEVEL = "INFO"

log = logging.getLogger(__name__)
log.info(f"GLOBAL_LOG_LEVEL: {GLOBAL_LOG_LEVEL}")
log.setLevel(f"{GLOBAL_LOG_LEVEL}")

log_sources = [
    "CONFIG",
    "DB",
    "MAIN",
    "AGENT",
    "BACKEND"
]

SRC_LOG_LEVELS = {}
CONFIG_DATA = {}
VERSION = os.environ.get("VERSION", "0.1.0")
FRONTEND_BUILD_DIR = str(Path(os.getenv("FRONTEND_BUILD_DIR", "../build")))
for source in log_sources:
    log_env_var = source + "_LOG_LEVEL"
    SRC_LOG_LEVELS[source] = os.environ.get(log_env_var, "").upper()
    if SRC_LOG_LEVELS[source] not in log_levels:
        SRC_LOG_LEVELS[source] = GLOBAL_LOG_LEVEL
    log.info(f"{log_env_var}: {SRC_LOG_LEVELS[source]}")

IS_KB_PATH = os.environ.get("IS_KB_PATH", "/is_kb")
FAILURE_IMAGE = os.environ.get("FAILURE_IMAGE", "failure_image.png")
staged_folder = str(Path(IS_KB_PATH) / "staged")

# 知识库限制上传文件容量：单位MB
LIMIT_CAPACITY_MB_CO = 2 * 1024
LIMIT_CAPACITY_MB_ST = 200 * 1024

SYSTEM_NAME = '求索时刻AI'
SYSTEM_WELCOME_TITLE = '我是你的AI助手，很高兴见到你！'
SYSTEM_WELCOME = '欢迎体验全球领先、最易用、高性价比的多模态AI原生知识库系统！'

LLM_SRV1_URL = os.environ.get("LLM_SRV1_URL", "")
LLM_SRV2_URL = os.environ.get("LLM_SRV2_URL", "")
HF_URL = os.environ.get("HF_URL", "")
INTERVL_URL = os.environ.get("INTERVL_URL", "")
OMPT_URL = os.environ.get("OMPT_URL", "")

####################################
# LOGIN Behavior
####################################
ENABLE_SIGNUP = os.environ.get("ENABLE_SIGNUP", "True").lower() == "true"
DEFAULT_USER_ROLE = os.getenv("DEFAULT_USER_ROLE", "kbman")
USER_PERMISSIONS_CHAT_DELETION = (
        os.environ.get("USER_PERMISSIONS_CHAT_DELETION", "True").lower() == "true"
)
USER_PERMISSIONS = {"chat": {"deletion": USER_PERMISSIONS_CHAT_DELETION}}


####################################
# WEBUI_AUTH (Required for security)
####################################

WEBUI_AUTH = True


####################################
# 短信配置
####################################
SMS_BASE_URL = 'http://tmadv.glendale.top/api/sendmessage'
SMS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbXSwiaWF0IjoxNjUyMTUxMTIwLCJleHAiOjE3MTI2NzgzOTksImF1ZCI6IiIsImlzcyI6ImhhbiBjaGFvIiwic3ViIjoiIn0.-i8rPi3qjOjuZ6CS_rbWqQvFsoxFxwVXSG3IDpNq6CU'
SMS_TEMPLATE = '【求索时刻】欢迎您使用，全球领先的企业AI原生知识库系统；本次验证码为：{code}'


####################################
# WEBUI_SECRET_KEY
####################################

WEBUI_SECRET_KEY = os.environ.get(
    "WEBUI_SECRET_KEY",
    os.environ.get(
        "WEBUI_JWT_SECRET_KEY", "t0p-s3cr3t"
    ),  # DEPRECATED: remove at next major version
)

if WEBUI_AUTH and WEBUI_SECRET_KEY == "":
    raise ValueError(ERROR_MESSAGES.ENV_VAR_NOT_FOUND)

SPECIAL_SUPPORTED_FORMATS = []

FILE_FORMAT_SUPPORT = {
    "standard": [".pdf", ".PDF"],
    "office": ['.docx', '.doc', '.ppt', '.pptx', '.xlsx', '.DOCX', '.DOC', '.PPT', '.PPTX', '.XLSX'],
    "image": ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG'],
    "special": SPECIAL_SUPPORTED_FORMATS,
}

FILE_FORMAT_SUPPORT.update({"all": FILE_FORMAT_SUPPORT['standard'] + FILE_FORMAT_SUPPORT['office']
                                   + FILE_FORMAT_SUPPORT['image'] + FILE_FORMAT_SUPPORT['special']})


####################################
# API AUTH
####################################
#LICENSE 格式内容说明
# {
#     'version': 'FULL',            #版本名称 取值：FULL LIGHTWEIGHT SDK TRIAL
#     'sub_version': 'FREE',        #子版本名称 取值：FREE BASIC PRO PLUS ;中小企业:SME 大客户:VIP
#     'machine_code': 'baacd97...', #机器码
#     'exp_stamp': 1766170748,      #过期时间戳
#     'volume': 10,                 #容量 MB
#     'reg_verify': True,           #启用注册验证
#     'white_list_num': 3           #白名单数量
# }
LICENSE = {}
AUTH_STATUS = False
GPU_NUMBER = os.environ.get("GPU_NUMBER", "")
UUID = os.environ.get("SERIAL_NUMBER1", "")
MAC = os.environ.get("SERIAL_NUMBER2", "")
DISKSERIAL = os.environ.get("SERIAL_NUMBER3", "")
ORIGINS=[]
API_WHITELIST = ["/api/v1/configs/upload_license", "/api/v1/configs/set_white_list"]
ALLOW_ORIGIN_REGEX = r"^(https?://)?(localhost|127\.0\.0\.1|192\.168\.[0-9]{1,3}\.[0-9]{1,3}|10\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|172\.(1[6-9]|2[0-9]|3[0-1])\.[0-9]{1,3}\.[0-9]{1,3})(:[0-9]+)?/?$"
KB_USAGE_COUNT = {}

####################################
#已使用信息
#   USED_INFO 格式内容说明
# {
#     'used_chat_count': 100,      #已使用的对话次数
#     'last_reset_date':'yyyy-mm-dd' #上次重置日期
#     'used_volume_mb': 1000,           #已使用的容量 MB
# }
####################################
USED_INFO = {}
