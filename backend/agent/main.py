import asyncio
import os
import json
import yaml
import time
import shutil
from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    status,
    Request,
    Response,
    Query,
    Form,
    File,
    UploadFile
)
import traceback
from fastapi.middleware.cors import CORSMiddleware
from utils.utils import get_current_user, get_admin_user, path_to_index_name
from config import (
    SRC_LOG_LEVELS,
    IS_KB_PATH
)

from pydantic import BaseModel
from typing import List, Optional, Dict
from constants import ERROR_MESSAGES
from fastapi.responses import StreamingResponse, JSONResponse, FileResponse
import logging
import mcp_bus.local_service as lsv
import aiohttp
from agent.application_manager import ApplicationManager
from mimetypes import guess_type


log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["AGENT"])

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.state.app_man = ApplicationManager()


####        Agent System     ####


class UpdateAppForm(BaseModel):
    app_id: str
    config: dict


class NewAppForm(BaseModel):
    name: str
    options: Optional[dict] = None


class AppFeedBackForm(BaseModel):
    """
    app_id: app_id
    payload: json.dumps({
        "agent_id": agent_id,
        "status": "accept" | "cancel" | "refuse"
        "data": dict for control specific data
    })
    """
    app_id: str
    payload: str


class AgentInfoForm(BaseModel):
    app_id: str
    agent_id: str


class AppCtxInfoForm(BaseModel):
    app_id: str
    app_ctx_id: str


class AddAgentForm(BaseModel):
    """
    app_id:
    agent: dict
    """
    app_id: str
    config: dict


class DeleteAgentForm(BaseModel):
    app_id: str
    agent_id: str


class AddEdgeForm(BaseModel):
    app_id: str
    src_id: str
    dest_id: str


class DeleteEdgeForm(BaseModel):
    app_id: str
    src_id: str
    dest_id: str


class AgentInputForm(BaseModel):
    app_id: str
    agent_id: str
    input_agent_id: str


class UpdateAgentForm(BaseModel):
    app_id: str
    agent_id: str
    config: dict


class AgentToolInfoForm(BaseModel):
    app_id: str
    agent_id: str
    tool_id: str

class AgentGetDataForm(BaseModel):
    app_id: str
    agent_id: str
    type: str
    content: str


@app.get("/application/run/{app_id}")
async def application_run(app_id: str, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(app_id)
        response = await agent_app.run()
        return StreamingResponse(
            response,
            media_type = "text/event-stream",
            status_code = 200,
            headers = {
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            }
        )
    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.post("/application/new_app")
async def application_new(new_app: NewAppForm, request: Request, user=Depends(get_current_user)):
    try:
        return app.state.app_man.add_application(new_app.name, new_app.options)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.get("/application/get_app/{app_id}")
async def application_get_app(app_id: str, request: Request, user=Depends(get_current_user)):
    try:
        app_node = app.state.app_man.load_application(name=None, app_id=app_id)
        if app_node is None:
            return {"status": "error", "data": f"{app_id} is not found!"}
        return {"status": "successfully", "data": app_node}

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.post("/application/update_app")
async def application_update_app(update_form: UpdateAppForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(update_form.app_id)
        if agent_app is None:
            return {"status": "error", "data": f"{update_form.app_id} is not found!"}
        agent_app.update_node(update_form.config)
        return {"status": "successfully"}

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.get("/application/list_app")
async def application_list_app(request: Request, user=Depends(get_current_user)):
    """
    return node instead of node_id
    """
    try:
        return app.state.app_man.list_application()

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.delete("/application/delete_app/{app_id}")
async def application_delete_app(app_id: str, request: Request, user=Depends(get_current_user)):
    try:
        return app.state.app_man.del_application(app_id)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )



@app.post("/application/export/{app_id}")
async def application_export_graph(app_id, request: Request, user=Depends(get_current_user)):
    from mcp_bus.local_service import encode_filename_to_urlsafe

    try:
        app_node = app.state.app_man.load_application(name=None, app_id=app_id)
        agent_app = app.state.app_man.get_application(app_id)
        nodes = agent_app.get_agent_graph()
        app_graph =  {
            "app": app_node,
            "workflow": nodes
        }
        yaml_str = yaml.safe_dump(
            app_graph,
            allow_unicode=True,
            indent=2,
        )

        file_name = app_node.get("name", "default") + '.yml'
        file_path = os.path.join(f"{IS_KB_PATH}/application/{app_id}", file_name)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(yaml_str)

        return {
            "file_path": f"application/download/{encode_filename_to_urlsafe(file_path)}",
        }

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.post("/application/import/{app_id}")
async def application_import_graph(request: Request, app_id, file: UploadFile = File(...), user=Depends(get_current_user)):
    try:
        contents = await file.read()
        if not contents:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="empty file upload!",
            )
        yaml_text = contents.decode("utf-8")
        graph_data = yaml.safe_load(yaml_text)
        if graph_data is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The YAML file content is empty or invalid"
            )
        agent_app = app.state.app_man.get_application(app_id)
        # 清空原数据
        agent_app.graph().delete_node("Agent", {"app_id": app_id})
        agent_app.graph().delete_node("Tool", {"app_id": app_id})
        agent_app.graph().delete_node("AppRunCtx", {"app_id": app_id})
        agent_app.graph().delete_node("IOData", {"app_id": app_id})
        agent_app.graph().delete_node("Data", {"app_id": app_id})

        app_dir = os.path.join(IS_KB_PATH, "application", app_id)
        if os.path.exists(app_dir):
            shutil.rmtree(str(app_dir))

        # 更新缓存
        del app.state.app_man.app_local[app_id]
        agent_app = app.state.app_man.get_application(app_id)
        await agent_app.update_tools()

        #解析 graph_data
        workflow = graph_data.get("workflow", {})
        nodes = workflow.get("nodes", [])
        edges = workflow.get("edges", [])

        node_id_map = {}

        for node in nodes:
            node_config = node.copy()

            node_config["app_id"] = app_id
            created_node = agent_app.add_agent(node_config)
            for tool in node_config.get("tools", []):
                tool_name = tool.get("name")
                if tool_name in agent_app.tools:
                    new_tool_id = agent_app.tools[tool_name].get("node_id")
                    created_agent = agent_app.nodes.get(created_node["node_id"])
                    created_agent.add_tool(new_tool_id)
            node_id_map[node.get("node_id")] = created_node["node_id"]

        for edge in edges:
            if len(edge) >= 2:
                src_id = edge[0]
                target_id = edge[1]

                if src_id in node_id_map and target_id in node_id_map:
                    agent_app.graph().add_relationship(
                        "Agent",
                        node_id_map[target_id],
                        "INPUT",
                        "Agent",
                        node_id_map[src_id]
                    )

                    agent_app.graph().add_relationship(
                        "Agent", 
                        node_id_map[src_id], 
                        "NEXT", 
                        "Agent", 
                        node_id_map[target_id]
                    )


        return {"status": "successfully"}

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.post("/application/feedback")
async def application_feedback(app_feedback: AppFeedBackForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(app_feedback.app_id)
        return await agent_app.feedback(app_feedback.payload)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.post("/application/add_agent")
async def application_add_agent(add_agent: AddAgentForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(add_agent.app_id)
        return agent_app.add_agent(add_agent.config)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.post("/application/del_agent")
async def application_del_agent(del_agent_form: DeleteAgentForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(del_agent_form.app_id)
        agent_app.del_agent(del_agent_form.agent_id)
        return {"status": "successfully"}

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.post("/application/agent/get_agent")
async def application_agent_get_agent(agent_info_form: AgentInfoForm, request: Request, user=Depends(get_current_user)):
    """
    有多少已经绑定的输入数据
    """
    try:
        agent_app = app.state.app_man.get_application(agent_info_form.app_id)
        agent = await agent_app.get_agent(agent_info_form.agent_id)
        if agent is not None:
            return {"status": "successfully", "data": agent.config}
        return {"status": "error", "reason": f"agent: {agent_info_form.agent_id} is not found!"}

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.post("/application/agent/update_agent")
async def application_agent_update_agent(update_agent_form: UpdateAgentForm, request: Request, user=Depends(get_current_user)):
    """
    有多少已经绑定的输入数据
    """
    try:
        agent_app = app.state.app_man.get_application(update_agent_form.app_id)
        agent = await agent_app.update_agent(update_agent_form.agent_id, update_agent_form.config)
        if agent is not None:
            return {"status": "successfully", "data": agent.config}
        return {"status": "error", "reason": f"agent: {update_agent_form.agent_id} is not found!"}

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.post("/application/add_edge")
async def application_add_edge(add_edge_form: AddEdgeForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(add_edge_form.app_id)
        return agent_app.add_edge(add_edge_form.src_id, add_edge_form.dest_id)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.post("/application/del_edge")
async def application_del_edge(del_edge_form: DeleteEdgeForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(del_edge_form.app_id)
        agent_app.del_edge(del_edge_form.src_id, del_edge_form.dest_id)
        return {"status": "successfully"}

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.get("/application/agent_graph/{app_id}")
async def application_get_agent_graph(app_id, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(app_id)
        return agent_app.get_agent_graph()

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

class AgentRunnableForm(BaseModel):
    app_id: str
    agent_id: str

@app.post("/application/agent/runnable")
async def application_agent_runnable(agent_runnable_form: AgentRunnableForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(agent_runnable_form.app_id)
        return await agent_app.get_agent_runnable(agent_runnable_form.agent_id)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.post("/application/agent/run")
async def application_agent_run(run_agent_form: AgentInfoForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(run_agent_form.app_id)
        response = await agent_app.agent_run(run_agent_form.agent_id)

        return StreamingResponse(
            response,
            media_type="text/event-stream",
            status_code=200,
            headers={
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            }
        )


    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.post("/application/agent/add_input")
async def application_agent_add_input(add_input_form: AgentInputForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(add_input_form.app_id)
        return await agent_app.agent_add_input(add_input_form.agent_id, add_input_form.input_agent_id)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.post("/application/agent/del_input")
async def application_agent_del_input(del_input_form: AgentInputForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(del_input_form.app_id)
        return await agent_app.agent_del_input(del_input_form.agent_id, del_input_form.input_agent_id)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.post("/application/agent/available_inputs")
async def application_agent_available_inputs(agent_info: AgentInfoForm, request: Request, user=Depends(get_current_user)):
    """
    有多少候选的输入数据
    """
    try:
        agent_app = app.state.app_man.get_application(agent_info.app_id)
        return await agent_app.get_available_inputs(agent_info.agent_id)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.post("/application/agent/get_input")
async def application_agent_get_input(get_input_form: AgentInfoForm, request: Request, user=Depends(get_current_user)):
    """
    有多少已经绑定的输入数据
    """
    try:
        agent_app = app.state.app_man.get_application(get_input_form.app_id)
        return await agent_app.agent_get_input(get_input_form.agent_id)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.get("/application/list_tools/{app_id}")
async def application_list_tools(app_id: str, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(app_id)
        return await agent_app.list_tools()

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.post("/application/agent/get_tools")
async def application_agent_get_tools(agent_info: AgentInfoForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(agent_info.app_id)
        return await agent_app.agent_get_tools(agent_info.agent_id)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.post("/application/agent/add_tool")
async def application_agent_add_tool(agent_tool_info: AgentToolInfoForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(agent_tool_info.app_id)
        return await agent_app.agent_add_tool(agent_tool_info.agent_id, agent_tool_info.tool_id)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.post("/application/agent/del_tool")
async def application_agent_del_tool(agent_tool_info: AgentToolInfoForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(agent_tool_info.app_id)
        return await agent_app.agent_del_tool(agent_tool_info.agent_id, agent_tool_info.tool_id)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.post("/application/agent/get_data")
async def application_agent_get_data(agent_get_data_form: AgentGetDataForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(agent_get_data_form.app_id)
        return await agent_app.agent_get_data(agent_get_data_form.agent_id, agent_get_data_form.type, agent_get_data_form.content)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.get("/application/list_appctx/{app_id}")
async def application_list_appctx(app_id: str, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(app_id)
        return {
            "app_ctx_list": agent_app.list_appctx(),
            "app_ctx_id": agent_app.ctx.node_id if not agent_app.ctx is None else ''
        }

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.post("/application/select_appctx")
async def application_select_appctx(select_appctx_info: AppCtxInfoForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(select_appctx_info.app_id)
        ctx = agent_app.select_appctx(select_appctx_info.app_ctx_id)
        if ctx is None:
            return {"status": "error", "reason": "not ever run!"}
        return {"status": "successfully"}

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.delete("/application/delete_appctx")
async def application_delete_appctx(appctx_info: AppCtxInfoForm, request: Request, user=Depends(get_current_user)):
    try:
        agent_app = app.state.app_man.get_application(appctx_info.app_id)
        agent_app.delete_appctx(appctx_info.app_ctx_id)
        return {"status": "successfully"}

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.get("/application/template/{app_id}")
async def application_template(
        app_id: str,
        request: Request,
        user=Depends(get_current_user)):
    try:
        upload_dir = f"{IS_KB_PATH}/application/{app_id}/const/"
        if not os.path.isdir(upload_dir):
            return JSONResponse({"file_name": ""})

        file_list = os.listdir(upload_dir)
        file_name = (f"application/download/{lsv.encode_filename_to_urlsafe(app_id + '/const/' + file_list[0])}"
                     if file_list else "")

        return JSONResponse({"file_name": file_name})

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.get("/application/get_files/{app_id}")
async def application_get_files(
        app_id: str,
        request: Request,
        sub_dir: Optional[str] = "const",
        user=Depends(get_current_user)):
    try:
        upload_dir = f"{IS_KB_PATH}/application/{app_id}/{sub_dir}/"
        if not os.path.isdir(upload_dir):
            return JSONResponse([])

        file_list = os.listdir(upload_dir)
        file_info_list = []
        for file in file_list:
            file_path = os.path.join(upload_dir, file)
            file_info = {
                "name": file,
                "size": os.path.getsize(file_path),
                "modified_time": os.path.getmtime(file_path)*1000
            }
            file_info_list.append(file_info)

        file_info_list.sort(key=lambda x: x["modified_time"], reverse=True)
        result_list = []
        for index, info in enumerate(file_info_list, start=1):
            url = os.path.join(f"{IS_KB_PATH}/application/{app_id}/{sub_dir}", info["name"])
            result_list.append({
                "id": index,
                "name": info["name"],
                "size": info["size"],
                "modified_time": info["modified_time"],
                "url": url
            })

        return JSONResponse(result_list)

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


class FileForm(BaseModel):
    app_id: str = Form(...)
    file_name: str = Form(...)
    sub_dir: str = Form(default="const")


@app.delete("/application/delete_file")
async def application_delete_file(delete_file_info: FileForm, request: Request, user=Depends(get_current_user)):
    try:
        upload_dir = f"{IS_KB_PATH}/application/{delete_file_info.app_id}/{delete_file_info.sub_dir}/"
        file_path = os.path.join(upload_dir, delete_file_info.file_name)
        if os.path.exists(file_path):
            os.remove(file_path)
            return JSONResponse({"status": "successfully"})
        else:
            return JSONResponse({"status": "successfully", "reason": "file not found"})
    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=400,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )


@app.post("/application/get_file")  # 接口名更贴合“获取文件流”
async def get_file(file_info: FileForm, request: Request,user=Depends(get_current_user)):
    try:
        upload_dir = f"{IS_KB_PATH}/application/{file_info.app_id}/{file_info.sub_dir}/"
        file_path = os.path.join(upload_dir, file_info.file_name)

        if not os.path.exists(file_path):
            log.warning(f"文件不存在：{file_path}")
            return JSONResponse(
                {"status": "error", "reason": "file not found"},
                status_code=404
            )
        if not os.path.isfile(file_path):
            log.warning(f"路径不是有效文件：{file_path}")
            raise HTTPException(
                status_code=400,
                detail=ERROR_MESSAGES.DEFAULT("路径不是有效文件")
            )

        def file_stream():
            chunk_size = 8 * 1024 * 1024  # 8MB/块，平衡性能和内存占用
            with open(file_path, "rb") as f:
                while chunk := f.read(chunk_size):
                    yield chunk

        mime_type, _ = guess_type(file_path)
        if not mime_type:
            if file_info.file_name.lower().endswith(".docx"):
                mime_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            elif file_info.file_name.lower().endswith((".png", ".jpg", ".jpeg")):
                mime_type = f"image/{file_info.file_name.split('.')[-1].lower()}"
            elif file_info.file_name.lower().endswith(".pdf"):
                mime_type = "application/pdf"
            else:
                mime_type = "application/octet-stream"

        headers = {
            "Access-Control-Expose-Headers": "Content-Length",
            "Content-Length": str(os.path.getsize(file_path)),
            "Cache-Control": "no-cache"
        }

        return StreamingResponse(
            content=file_stream(),
            media_type=mime_type,
            headers=headers,
            status_code=200
        )

    except HTTPException:
        raise
    except Exception as e:
        log.error(f"获取文件流失败：{str(e)}，路径：{file_path if 'file_path' in locals() else '未知'}")
        traceback.print_exc()
        raise HTTPException(
            status_code=400,
            detail=ERROR_MESSAGES.DEFAULT(e)
        )

@app.post("/application/upload")
async def application_upload_file(
        request: Request,
        app_id: str = Form(...),
        agent_id: str = Form(...),
        file: UploadFile = File(...),
        user=Depends(get_current_user)):
    try:
        form_data = await request.form()
        extra_options = {k: v for k, v in form_data.items() if k not in ["app_id", "agent_id", "file"]}

        upload_dir = f"{IS_KB_PATH}/application/{app_id}/"
        if extra_options.get('app_ctx_id'):
            upload_dir += f"{extra_options['app_ctx_id']}/"
        if extra_options.get('upload_dir'):
            upload_dir += f"{extra_options['upload_dir']}/"

        os.makedirs(upload_dir, exist_ok=True)
        if extra_options.get('clear'):
            for item in os.listdir(upload_dir):
                item_path = os.path.join(upload_dir, item)
                if os.path.isfile(item_path) or os.path.islink(item_path):
                    os.unlink(item_path)
                elif os.path.isdir(item_path):
                    shutil.rmtree(item_path)

        file_path = os.path.join(upload_dir, file.filename)

        if os.path.exists(file_path):
            base, ext = os.path.splitext(file.filename)
            file_path = os.path.join(upload_dir, f"{base}_{os.urandom(4).hex()}{ext}")

        # 保存文件
        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"文件保存失败: {str(e)}")

        return JSONResponse({
            "status": "successfully",
            "filename": os.path.basename(file_path),
        })

    except Exception as e:
        log.info(e)
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )

@app.get("/application/assets/{app_id}/{app_ctx_id}/{key}")
async def image_view(app_id: str, app_ctx_id: str, key: str, request: Request):
    try:
        safe_filename = lsv.decode_urlsafe_filename(key)
        file_path = os.path.join("/is_kb", "application", app_id, app_ctx_id, "upload", "assets",  safe_filename)

        if not os.path.exists(file_path):
            raise FileNotFoundError(ERROR_MESSAGES["FILE_NOT_FOUND"])

        if not os.path.isfile(file_path):
            raise IsADirectoryError("请求的路径是目录，无法作为图片显示")

        def iterfile():
            with open(file_path, mode="rb") as f:
                yield from f

        return StreamingResponse(
            iterfile()
        )

    except Exception as e:
        log.error(f"图片预览发生未知错误: {key}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ERROR_MESSAGES["DEFAULT"](e),
        )

@app.get("/application/download/{key}")
async def application_download(key: str, request: Request):
    try:
        # 这里假设key直接对应文件路径，实际应用中可能需要更复杂的路径映射逻辑
        file_path = os.path.join("/is_kb", "application", lsv.decode_urlsafe_filename(key))

        # 检查文件是否存在
        if not os.path.exists(file_path):
            raise FileNotFoundError(ERROR_MESSAGES["FILE_NOT_FOUND"])

        # 检查是否为文件（避免目录被下载）
        if not os.path.isfile(file_path):
            raise IsADirectoryError("路径指向的是目录，无法下载")

        # 获取文件名（用于设置下载时的默认文件名）
        file_name = os.path.basename(file_path)

        # 使用FileResponse返回文件，触发下载
        return FileResponse(
            path=file_path,
            filename=file_name,  # 浏览器下载时显示的文件名
            media_type="application/octet-stream"  # 通用二进制流类型，适用于大多数文件
        )

    except FileNotFoundError as e:
        log.warning(f"文件下载失败 - 文件不存在: {key}, 错误: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except IsADirectoryError as e:
        log.warning(f"文件下载失败 - 路径为目录: {key}, 错误: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except PermissionError:
        log.error(f"文件下载失败 - 权限不足: {key}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=ERROR_MESSAGES["FILE_ACCESS_ERROR"]
        )

