from fastapi import FastAPI, Depends
from fastapi.routing import APIRoute
from fastapi.middleware.cors import CORSMiddleware
from apps.web.routers import (
    auths,
    users,
    utils,
)
from config import (
    WEBUI_AUTH,
    DEFAULT_USER_ROLE,
    ENABLE_SIGNUP,
    USER_PERMISSIONS
)

app = FastAPI()

origins = ["*"]

app.state.ENABLE_SIGNUP = ENABLE_SIGNUP
app.state.JWT_EXPIRES_IN = "7d"

app.state.DEFAULT_USER_ROLE = DEFAULT_USER_ROLE
app.state.USER_PERMISSIONS = USER_PERMISSIONS


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auths.router, prefix="/auths", tags=["auths"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(utils.router, prefix="/utils", tags=["utils"])


@app.get("/")
async def get_status():
    return {
        "status": True,
        "auth": WEBUI_AUTH
    }
