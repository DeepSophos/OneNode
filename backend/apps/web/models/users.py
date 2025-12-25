from pydantic import BaseModel
from peewee import *
from playhouse.shortcuts import model_to_dict
from typing import List, Union, Optional
import time
from utils.misc import get_gravatar_url

from apps.web.internal.db import DB


####################
# User DB Schema
####################


class User(Model):
    id = CharField(unique=True)
    name = CharField()
    email = CharField()
    role = CharField()
    scope_set = CharField(null=True)
    profile_image_url = CharField()
    timestamp = DateField()

    class Meta:
        database = DB


class UserModel(BaseModel):
    id: str
    name: str
    email: str
    role: str = "pending"
    scope_set: str
    profile_image_url: str = "/user.png"
    timestamp: int  # timestamp in epoch


####################
# Forms
####################


class UserRoleUpdateForm(BaseModel):
    id: str
    role: str


class UserUpdateForm(BaseModel):
    name: str
    email: str
    profile_image_url: str
    password: Optional[str] = None

class register(BaseModel):
    name: str



class UsersTable:
    def __init__(self, db):
        self.db = db
        self.db.create_tables([User])

    def insert_new_user(
        self, id: str, name: str, email: str, role: str = "pending"
    ) -> Optional[UserModel]:
        from docman import perm_tree

        user = UserModel(
            **{
                "id": id,
                "name": name,
                "email": email,
                "role": role,
                "scope_set": "basic",
                "profile_image_url": "/user.png",
                "timestamp": int(time.time()),
            }
        )
        result = User.create(**user.model_dump())
        if result:
            unit_path = perm_tree.get_user_default_unit(name)
            perm_tree.add_user_to_unit(id, unit_path)

            return user
        else:
            return None

    def get_user_by_id(self, id: str) -> Optional[UserModel]:
        try:
            user = User.get(User.id == id)
            return UserModel(**model_to_dict(user))
        except:
            return None

    def get_user_by_email(self, email: str) -> Optional[UserModel]:
        try:
            user = User.get(User.email == email)
            return UserModel(**model_to_dict(user))
        except:
            return None

    def get_user_by_name(self, name: str) -> Optional[UserModel]:
        try:
            user = User.get(User.name == name)
            return UserModel(**model_to_dict(user))
        except:
            return None


    def get_users(self, skip: int = 0, limit: int = 50) -> List[UserModel]:
        return [
            UserModel(**model_to_dict(user))
            for user in User.select()
            # .limit(limit).offset(skip)
        ]

    def get_num_users(self) -> Optional[int]:
        return User.select().count()

    def update_user_role_by_id(self, id: str, role: str) -> Optional[UserModel]:
        try:
            query = User.update(role=role).where(User.id == id)
            query.execute()

            user = User.get(User.id == id)
            return UserModel(**model_to_dict(user))
        except:
            return None

    def update_user_profile_image_url_by_id(
        self, id: str, profile_image_url: str
    ) -> Optional[UserModel]:
        try:
            query = User.update(profile_image_url=profile_image_url).where(
                User.id == id
            )
            query.execute()

            user = User.get(User.id == id)
            return UserModel(**model_to_dict(user))
        except:
            return None

    def update_user_by_id(self, id: str, updated: dict) -> Optional[UserModel]:
        try:
            query = User.update(**updated).where(User.id == id)
            query.execute()

            user = User.get(User.id == id)
            return UserModel(**model_to_dict(user))
        except:
            return None

    def delete_user_by_id(self, id: str) -> bool:
        try:
            query = User.delete().where(User.id == id)
            query.execute()  # Remove the rows, return number of rows removed.
            return True
        except:
            return False


Users = UsersTable(DB)
