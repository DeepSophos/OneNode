from peewee import *
from config import SRC_LOG_LEVELS, IS_KB_PATH
import os
import logging

log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["DB"])

# Check if the file exists


DB = SqliteDatabase(f"{IS_KB_PATH}/webui.db")
DB.connect()
