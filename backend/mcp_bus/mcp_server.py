import json
import traceback
from urllib.parse import urlparse
from fastmcp import FastMCP, Context
from dataclasses import dataclass
from mcp_bus import local_service
from models.graph_db import graph_query
from mcp_bus.mcp_session import MCPSession
from pathlib import Path

mcp = FastMCP(name="BuiltinServer")

async def end_client_elicit(ctx):
    end_control = {
        "command": "end"
    }
    await ctx.elicit(
        message=json.dumps(end_control), ## user message box
        response_type=FrontEndMessage
    )

@dataclass
class FrontEndMessage:
    result: str
    response: str


@mcp.tool
async def upload_files(title: str, file_format: str, upload_dir: str, ctx: Context) -> str:
    """
    **上传文件**这个工具用于请求用户上传指定格式的文件到指定的目录。其中，标题为对话框的标题，upload_dir用于指定保存上传文件的目录。
    """
    roots = await ctx.list_roots()
    app_session = MCPSession([str(root.uri) for root in roots], ctx)

    """提示用户上传指定的文件"""
    file_upload_control = {
        "command": "show_ui_control",
        "data": {
            "type": "file_upload_box",
            "title": title,
            "file_format": file_format,
            "upload_dir": upload_dir,
            "app_ctx_id": app_session.appctx_id
        }
    }
    user_feedback = await ctx.elicit(
        message=json.dumps(file_upload_control), ## user message box
        response_type=FrontEndMessage
    )
    feedback_data = json.loads(user_feedback.data.response)
    # logging.info(f"from mcp server: {feedback_data}")
    # await end_client_elicit(ctx)
    ctx.info(feedback_data)

    return json.dumps(feedback_data.get("data", {}))


@mcp.tool
async def input_query(title: str, ctx: Context) -> str:
    """
    **输入查询**这个工具用于请求用户输入指定的查询。其中，标题为对话框的标题。
    """
    roots = await ctx.list_roots()
    app_session = MCPSession([str(root.uri) for root in roots], ctx)
    """提示用户输入"""
    user_query_control = {
        "command": "show_ui_control",
        "data": {
            "type": "user_query_box",
            "title": title,
            "app_ctx_id": app_session.appctx_id
        }
    }
    user_feedback = await ctx.elicit(
        message=json.dumps(user_query_control),
        response_type=FrontEndMessage
    )
    feedback_data = json.loads(user_feedback.data.response)
    ctx.info(feedback_data)

    return json.dumps(feedback_data.get("data", {}))

@mcp.tool
async def read_docx_from_dir(subdirectory: str, file_format: str, ctx: Context) -> str:
    """
    **读取文档**这个工具用于读取指定目录下的指定格式的文件到图数据库中。
    示例：读取upload目录下的.docx文件
    """
    roots = await ctx.list_roots()
    app_session = MCPSession([str(root.uri) for root in roots], ctx)
    try:
        ret = await local_service.read_docs_from_dir(app_session, Path(app_session.appctx_id) / subdirectory, file_format)
        return json.dumps(ret)
    except Exception as e:
        app_session.write_log(e)
        app_session.write_log(traceback.format_exc())
        return json.dumps({"status": "error", "data": str(e)})


@mcp.tool
async def read_docx_tmpl(filename: str, ctx: Context) -> str:
    """
    **读取文档模板** 这个工具用于读取指定文件名的文档模板。
    示例：读取“月报模板.docx"
    """
    roots = await ctx.list_roots()
    app_session = MCPSession([str(root.uri) for root in roots], ctx)
    try:
        ret = await local_service.read_docx_tmpl(app_session, filename)
        return json.dumps(ret)
    except Exception as e:
        app_session.write_log(e)
        app_session.write_log(traceback.format_exc())
        return json.dumps({"status": "error", "data": str(e)})

# @mcp.tool
# async def graph_merge(node_name: str, level: int, dest_node_name: str, ctx: Context) -> str:
#     """
#     **合并知识图谱**这个工具用于合并指定的知识图谱中指定层级的节点内容。用户需要指定知识图谱的源节点，合并操作的
#     起始层级和合并后的知识图谱的起始节点名。参数说明：
#     node_name: 起始的节点名
#     level: 合并操作从哪个层级开始
#     dest_node_name: 合并后的知识图谱的起始节点名
#     用户指定合并操作的任务示例： 合并"分子公司月报"的第2层节点到“月报汇总"。
#     """
#     roots = await ctx.list_roots()
#     app_session = MCPSession([str(root.uri) for root in roots], ctx)
#     ret = await local_service.graph_merge(app_session, node_name, level, dest_node_name)
#     return json.dumps(ret)


@mcp.tool
async def write_docx(template_file_name,filename: str, ctx: Context) -> str:
    """
    **生成文档**这个工具将自动从知识图谱数据中获取数据写出到文档。参数说明：
    template_file_name: 使用的模板文件名
    filename: 指定生成的文件名
    用户指定文档生成操作的任务示例： 使用模板文件"工程信息月报.docx"生成文件，要求文件名为:“2025年8月工程信息月报（工程管理部）.docx”。
    对应的参数是:
    template_file_name: 工程信息月报.docx
    filename: 2025年8月工程信息月报（工程管理部）.docx
    """
    roots = await ctx.list_roots()
    app_session = MCPSession([str(root.uri) for root in roots], ctx)
    try:
        ret = await local_service.write_graph_to_docx(app_session, template_file_name, filename)
        return json.dumps(ret)
    except Exception as e:
        app_session.write_log(e)
        app_session.write_log(traceback.format_exc())
        return json.dumps({"status": "error", "data": str(e)})

@mcp.tool
async def graph_copy_to(filename, title, target_node_name, ctx: Context) -> str:
    """
    **复制文档中的章节**这个工具用于复制指定文档中的章节内容到指定的内容节点。参数说明：
    filename: 指定从哪个文件进行复制，文件名指定可以只是文件名的一部分，用*表示省略的部分。
    title: 指定复制哪个章节以下的内容. 章节标题指定可以只是完整章节标题的一部分，用*表示省略的部分
    target_node_name: 指定一个图的节点名字，内容将被复制到这个节点之下。

    工具任务示例：　将"红河"文件中重大项目中的内容复制到"重大项目_煤电项目".
    """
    roots = await ctx.list_roots()
    app_session = MCPSession([str(root.uri) for root in roots], ctx)
    try:
        ret = await local_service.graph_copy_to(app_session, filename, title, target_node_name)
        return json.dumps(ret)
    except Exception as e:
        app_session.write_log(e)
        app_session.write_log(traceback.format_exc())
        return json.dumps({"status": "error", "data": str(e)})

@mcp.tool
async def merge_table(filename, title, table_index, group, target_node_name, ctx: Context) -> str:
    """
    **合并文档中的表格**这个工具用于合并指定文档中的表格到指定的内容节点。参数说明：
    filename: 指定从哪个文件进行合并，文件名指定可以只是文件名的一部分，用*表示省略的部分。
    title: 指定合并哪个章节下的表格内容. 章节标题指定可以只是完整章节标题的一部分，用*表示省略的部分，用::表示多级标题。
    table_index: 要合并的表格索引，从1开始计数。 -1表示合并章节下的所有表格。
    group: 指定分组合并内容. 取值 NONE（不分组）、ORG（单位名称）、ITEM-TYPE（项目类型），
    target_node_name: 指定一个图的节点名字，内容将被合并到这个节点之下。

    工具任务示例：　将"红河"文件中"较大项目::人力资源情况"中第1个表格内容按"单位名称"分组合并到"较大项目_人力资源情况".
    """
    roots = await ctx.list_roots()
    app_session = MCPSession([str(root.uri) for root in roots], ctx)
    try:
        ret = await local_service.merge_table(app_session, filename, title, table_index, group, target_node_name)
        return json.dumps(ret)
    except Exception as e:
        app_session.write_log(e)
        app_session.write_log(traceback.format_exc())
        return json.dumps({"status": "error", "data": str(e)})

@mcp.tool
async def retrieve_scope(scope_name: str, query: str, ctx: Context) -> str:
    """
    **检索知识集**这个工具用于从知识集中检索相关内容。
    示例：从"知识集"中检索与"项目管理"相关的内容
    """
    roots = await ctx.list_roots()
    app_session = MCPSession([str(root.uri) for root in roots], ctx)
    try:
        ret = await local_service.retrieve_scope(app_session, scope_name, query)
        return json.dumps(ret)
    except Exception as e:
        app_session.write_log(e)
        app_session.write_log(traceback.format_exc())
        return json.dumps({"status": "error", "data": str(e)})

if __name__ == "__main__":
    mcp.run()
