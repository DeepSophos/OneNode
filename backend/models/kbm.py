import os
import json
from peewee import (
    fn,
    Model,
    CharField,
    AutoField,
    TextField,
    DateField,
    IntegerField,
    DateTimeField,
    FloatField,
    SqliteDatabase
)
from models.db import DB
from datetime import datetime
import threading
from pydantic import BaseModel
from typing import Optional
from typing_extensions import TypedDict
from playhouse.shortcuts import model_to_dict
import uuid
import shutil


class Config(Model):
    id = AutoField()
    key = CharField()
    value = CharField()

    class Meta:
        database = DB

class DocManTables:
    def __init__(self, db):
        self.db = db
        with DB.atomic():
            self.db.create_tables([Config])

docman_tables = DocManTables(DB)

def get_config(key: str):
    info = Config.get_or_none(Config.key == key)
    if info is not None:
        return info.value
    return ''

def update_config(key: str, value: str):
    try:
        info = Config.get_or_none(Config.key == key)
        if info is not None:
            info.value = value
            with DB.atomic():
                info.save()
        else:
            # 如果记录不存在，创建新记录
            with DB.atomic():
                Config.create(key=key.strip(), value=value.strip())
        return True
    except Exception as e:
        print(f"更新 Config 失败: {e}")
        return False

def delete_config(key: str):
    try:
        with DB.atomic():
            deleted_count = Config.delete().where(
                Config.key == key
            ).execute()
        return deleted_count > 0
    except Exception as e:
        print(f"删除 config 失败: {e}")
        return False

if __name__ == '__main__':
    increase_kb_version()
    version = get_kb_version()
    update_kb_version(version, {
        "chunks": {
            "success": 1,
            "failed": 0
        },
        "tables": {
            "success": 1,
            "failed": 0
        },
        "images": {
            "success": 1,
            "failed": 0
        }
    })

