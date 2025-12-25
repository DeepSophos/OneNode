from fastapi import Depends, Request,Query, HTTPException, status
from datetime import datetime, timedelta
from typing import List, Union, Optional
from utils.utils import get_current_user, get_admin_user
from fastapi import APIRouter
from pydantic import BaseModel
import json
import logging

from apps.web.models.users import Users
from apps.web.models.chats import (
    ChatModel,
    ChatResponse,
    ChatTitleForm,
    ChatForm,
    ChatTitleIdResponse,
    Chats,
    ChatCount,
    totalModel,
    ThreeHourIntervalStats,
    ChatResponse,
    ChatSearchResponse,
    PaginatedResponse
)


from apps.web.models.tags import (
    TagModel,
    ChatIdTagModel,
    ChatIdTagForm,
    ChatTagsResponse,
    Tags,
)
from constants import ERROR_MESSAGES
from config import SRC_LOG_LEVELS
from docman import chat_man

log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["MODELS"])

router = APIRouter()

############################
# GetChats
############################


@router.get("/", response_model=List[ChatTitleIdResponse])
async def get_user_chats(
    user=Depends(get_current_user), skip: int = 0, limit: int = 50
):
    return Chats.get_chat_lists_by_user_id(user.id, skip, limit)


############################
# GetAllChats
############################


@router.get("/all", response_model=List[ChatResponse])
async def get_all_user_chats(user=Depends(get_current_user)):
    return [
        ChatResponse(**{**chat.model_dump(), "chat": json.loads(chat.chat)})
        for chat in Chats.get_all_chats_by_user_id(user.id)
    ]

@router.get("/userChatCount", response_model=List[ChatCount])
async def get_all_user_chats_count():
    return Chats.get_all_chats_group_by_user_id()

@router.get("/userChatStatistics", response_model=Optional[totalModel])
async def get_user_chat_statistics():
    return Chats.get_user_chat_statistics()

@router.get("/3hourStats", response_model=List[ThreeHourIntervalStats])
async def get_user_chat_statistics():
    return Chats.get_3hour_stats()

@router.get("/searchUserCharts/{username}/{start_time}/{end_time}/{page}/{page_size}", response_model=PaginatedResponse)
async def search_chats(username: str, start_time: datetime, end_time: datetime, page: int = 1, page_size: int = 20):
    return Chats.get_chats_by_user_and_time(username, start_time, end_time, page, page_size)


@router.get("/preview/{filename}")
async def preview_image(filename: str):
    DATA_DIR = str(Path(os.getenv("DATA_DIR", "./data")).resolve())
    image_path = Path(DATA_DIR) / "uploads" / filename
    if image_path.exists():
        return image_path
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Image not found"
        )

@router.get("/search", response_model=PaginatedResponse)
async def search(
    username: Optional[str] = Query(None),
    start_time: Optional[datetime] | Optional[str] = Query(None),
    end_time: Optional[datetime]  | Optional[str] = Query(None),
    page: int = Query(1, ge=1, description="页码，从1开始"),
    page_size: int = Query(
        20,
        ge=1,
        le=100,
        description="每页数量 (1-100)"
    )
):
    chats, total, total_pages = Chats.get_paginated_chats(
        username=username,
        start_time=start_time,
        end_time=end_time,
        page=page,
        page_size=page_size
    )

    return PaginatedResponse(
        data=[ChatSearchResponse(
            id=chat.id,
            username=chat.user.name,
            message=chat.chat,
            timestamp=chat.timestamp
        ) for chat in chats],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )
    # return Chats.get_chats_by_user_and_time(username, start_time, end_time, page, page_size)
############################
# GetAllChatsInDB
############################


@router.get("/all/db", response_model=List[ChatResponse])
async def get_all_user_chats_in_db(user=Depends(get_admin_user)):
    return [
        ChatResponse(**{**chat.model_dump(), "chat": json.loads(chat.chat)})
        for chat in Chats.get_all_chats()
    ]


############################
# CreateNewChat
############################


@router.post("/new", response_model=Optional[ChatResponse])
async def create_new_chat(form_data: ChatForm, user=Depends(get_current_user)):
    try:
        chat = Chats.insert_new_chat(user.id, form_data)
        return ChatResponse(**{**chat.model_dump(), "chat": json.loads(chat.chat)})
    except Exception as e:
        log.exception(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=ERROR_MESSAGES.DEFAULT()
        )


############################
# GetAllTags
############################


@router.get("/tags/all", response_model=List[TagModel])
async def get_all_tags(user=Depends(get_current_user)):
    try:
        tags = Tags.get_tags_by_user_id(user.id)
        return tags
    except Exception as e:
        log.exception(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=ERROR_MESSAGES.DEFAULT()
        )


############################
# GetChatsByTags
############################


@router.get("/tags/tag/{tag_name}", response_model=List[ChatTitleIdResponse])
async def get_user_chats_by_tag_name(
    tag_name: str, user=Depends(get_current_user), skip: int = 0, limit: int = 50
):
    chat_ids = [
        chat_id_tag.chat_id
        for chat_id_tag in Tags.get_chat_ids_by_tag_name_and_user_id(tag_name, user.id)
    ]

    chats = Chats.get_chat_lists_by_chat_ids(chat_ids, skip, limit)

    if len(chats) == 0:
        Tags.delete_tag_by_tag_name_and_user_id(tag_name, user.id)

    return chats


############################
# GetChatById
############################


@router.get("/{id}", response_model=Optional[ChatResponse])
async def get_chat_by_id(id: str, user=Depends(get_current_user)):
    chat = Chats.get_chat_by_id_and_user_id(id, user.id)

    if chat:
        return ChatResponse(**{**chat.model_dump(), "chat": json.loads(chat.chat)})
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=ERROR_MESSAGES.NOT_FOUND
        )


############################
# UpdateChatById
############################


@router.post("/{id}", response_model=Optional[ChatResponse])
async def update_chat_by_id(
    id: str, form_data: ChatForm, user=Depends(get_current_user)
):
    chat = Chats.get_chat_by_id_and_user_id(id, user.id)
    if chat:
        updated_chat = {**json.loads(chat.chat), **form_data.chat}

        chat = Chats.update_chat_by_id(id, updated_chat)
        return ChatResponse(**{**chat.model_dump(), "chat": json.loads(chat.chat)})
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ERROR_MESSAGES.ACCESS_PROHIBITED,
        )


############################
# DeleteChatById
############################


@router.delete("/{id}", response_model=bool)
async def delete_chat_by_id(request: Request, id: str, user=Depends(get_current_user)):

    if (
        user.role == "user"
        and not request.app.state.USER_PERMISSIONS["chat"]["deletion"]
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ERROR_MESSAGES.ACCESS_PROHIBITED,
        )

    result = Chats.delete_chat_by_id_and_user_id(id, user.id)
    return result


############################
# GetChatTagsById
############################


@router.get("/{id}/tags", response_model=List[TagModel])
async def get_chat_tags_by_id(id: str, user=Depends(get_current_user)):
    tags = Tags.get_tags_by_chat_id_and_user_id(id, user.id)

    if tags != None:
        return tags
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=ERROR_MESSAGES.NOT_FOUND
        )


############################
# AddChatTagById
############################


@router.post("/{id}/tags", response_model=Optional[ChatIdTagModel])
async def add_chat_tag_by_id(
    id: str, form_data: ChatIdTagForm, user=Depends(get_current_user)
):
    tags = Tags.get_tags_by_chat_id_and_user_id(id, user.id)

    if form_data.tag_name not in tags:
        tag = Tags.add_tag_to_chat(user.id, form_data)

        if tag:
            return tag
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=ERROR_MESSAGES.NOT_FOUND,
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=ERROR_MESSAGES.DEFAULT()
        )

class ChatFeedBackForm(BaseModel):
    question: str
    original_answer: str
    corrected_answer: str
    feedback: str
    scopes: List[str]
    message_id: str

@router.post("/{id}/feedback")
async def feedback_chat_by_id(
    id: str, form_data: ChatFeedBackForm, user=Depends(get_current_user)):
    chat_man.update_chat_feedback({**form_data.model_dump(), "id": form_data.message_id, "user": user.name})
    return {"status": "successfully"}


@router.get("/feedback/list")
async def get_feedback_list(scope: str, feedback: str, user=Depends(get_current_user)):
    docs = chat_man.load_feedback_chats(scope, feedback, selected="all")
    return docs

@router.get("/feedback/list-all")
async def get_feedback_list(feedback: str, user=Depends(get_current_user)):
    docs = chat_man.load_all_feedback_chats(feedback, selected="all")
    return docs

class ReviewFeedBackForm(BaseModel):
    message_id: str
    original_answer: str
    corrected_answer: str
    status: str
    scopes: List[str]
    feedback: str

@router.post("/feedback/review")
async def feedback_review(feedback: ReviewFeedBackForm, user=Depends(get_current_user)):
    chat_man.feedback_review(feedback)
    return True


############################
# DeleteChatTagById
############################


@router.delete("/{id}/tags", response_model=Optional[bool])
async def delete_chat_tag_by_id(
    id: str, form_data: ChatIdTagForm, user=Depends(get_current_user)
):
    result = Tags.delete_tag_by_tag_name_and_chat_id_and_user_id(
        form_data.tag_name, id, user.id
    )

    if result:
        return result
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=ERROR_MESSAGES.NOT_FOUND
        )


############################
# DeleteAllChatTagsById
############################


@router.delete("/{id}/tags/all", response_model=Optional[bool])
async def delete_all_chat_tags_by_id(id: str, user=Depends(get_current_user)):
    result = Tags.delete_tags_by_chat_id_and_user_id(id, user.id)

    if result:
        return result
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=ERROR_MESSAGES.NOT_FOUND
        )


############################
# DeleteAllChats
############################


@router.delete("/", response_model=bool)
async def delete_all_user_chats(request: Request, user=Depends(get_current_user)):

    if (
        user.role == "user"
        and not request.app.state.USER_PERMISSIONS["chat"]["deletion"]
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ERROR_MESSAGES.ACCESS_PROHIBITED,
        )

    result = Chats.delete_chats_by_user_id(user.id)
    return result
