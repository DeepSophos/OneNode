from peewee import SqliteDatabase
from config import SRC_LOG_LEVELS, DATA_DIR
import os
import logging

log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["DB"])
print(f"sqlite db: {DATA_DIR}")

DB = SqliteDatabase(f"{DATA_DIR}/admin_db.db", pragmas={"journal_mode": "wal"})
DB.connect()
