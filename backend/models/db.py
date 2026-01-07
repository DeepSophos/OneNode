from peewee import SqliteDatabase
from config import SRC_LOG_LEVELS, IS_KB_PATH
import os
import logging

log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["DB"])
print(f"sqlite db: {IS_KB_PATH}/admin_db.db")

DB = SqliteDatabase(f"{IS_KB_PATH}/admin_db.db", pragmas={"journal_mode": "wal"})
DB.connect()
