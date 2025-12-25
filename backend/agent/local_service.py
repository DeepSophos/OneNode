import json
import base64
from fuzzywuzzy import fuzz
from pathlib import Path
from models.graph_db import graph_query
from mcp_bus import read_doc
from mcp_bus import graph_ops
from mcp_bus import write_doc


WHITE_BOARD = "白板"
APP_CONSTS = "静态数据"

def encode_filename_to_urlsafe(filename):
    # Convert the filename string to bytes
    filename_bytes = filename.encode('utf-8')

    # Encode to base64
    base64_bytes = base64.urlsafe_b64encode(filename_bytes)

    # Convert back to string for URL usage
    urlsafe_string = base64_bytes.decode('ascii')

    return urlsafe_string


def decode_urlsafe_filename(encoded_string):
    # Convert string to bytes
    base64_bytes = encoded_string.encode('ascii')

    # Decode from base64
    filename_bytes = base64.urlsafe_b64decode(base64_bytes)

    # Convert back to string
    filename = filename_bytes.decode('utf-8')

    return filename

async def read_docs_from_dir(app_session, subdirectory, file_format):
    node_name = WHITE_BOARD
    app_session.write_log(f"read_docs_from_dir, subdirectory={subdirectory}, file_format={file_format}")
    doc_dir = app_session.app_dir / subdirectory
    doc_reader = read_doc.DocReader(app_session, node_name)
    file_num = 0
    for docx_file in doc_dir.glob(f"*{file_format}"):
        doc_reader.read_doc(docx_file)
        file_num += 1
    if file_num > 0:
        return {"status": "successfully", "data": f"{node_name}", "type": "tree"}
    return {"status": "failed", "data": "no file is found!", "type": "markdown"}


async def graph_merge(app_session, node_name, level, dest_node_name):
    app_session.write_log(f"graph_merge, node_name={node_name}, level={level}, dest_node_name={dest_node_name}")
    src_nodes = app_session.graph.get_node("Data", {
        "app_ctx_id": app_session.appctx_id,
        "name": node_name
    })
    if not src_nodes:
        return {"status": "failed", "data": f"The node with specified name: {node_name} is not found!", "type": "markdown"}
    graph_ops.merge_tree(app_session, src_nodes[0], level, dest_node_name)
    return {"status": "successfully", "data": dest_node_name, "type": "graph"}


async def write_graph_to_docx(app_session, template_file_name, filename):
    app_session.write_log(f"write_graph_to_docx, template_file_name={template_file_name}, filename={filename}")
    status, data = write_doc.write_tmpl(app_session, template_file_name, filename)
    return {
        "status": "successfully" if status else "error",
        "type": "docx" if status else "markdown",
        "data": f"application/download/{encode_filename_to_urlsafe(data)}" if status else data,
    }



async def graph_copy_to(app_session, filename, title, target_node_name):
    target_nodes = app_session.graph.get_node("Data", {
        "name": target_node_name,
        "app_ctx_id": app_session.appctx_id
    })
    if target_nodes:
        target_node = target_nodes[0]
    else:
        target_node = app_session.graph.add_node("Data", {
            "app_id": app_session.app_id,
            "agent_id": app_session.agent_id,
            "io_data_id": app_session.io_data_id,
            "app_ctx_id": app_session.appctx_id,
            "name": target_node_name,
            "action": "copy"
        })
    rels = app_session.graph.get_relationship(
        {
            "src_label": "Data",
            "src_props": {"app_ctx_id": app_session.appctx_id, "name": WHITE_BOARD},
            "rel_types": ["SUBHEADING"],
            "hop_num": 1
        }
    )
    nodes = [
        node for _, _, node in rels if filename in node.get('title') and node.get('type') == 'filename'
    ]
    if not nodes:
        return {"status": "error", "type": "markdown", "data": "filename is not found!"}

    path = [t.strip() for t in title.split("::") if t.strip()]

    for node in nodes:
        current_parent_id = node['node_id']
        company = node['company']
        for level_title in path:
            rels = app_session.graph.get_relationship(
                {
                    "src_label": "Data",
                    "src_props": {"node_id": current_parent_id},
                    "rel_types": ["SUBHEADING"],
                    "hop_num": "1"
                }
            )
            for _, _, n in rels:
                if n.get('type') == 'title' and level_title in n.get('title'):
                    current_parent_id = n['node_id']
                    if level_title == path[-1]:
                        n |= {"action": "copy", "company": company}
                        graph_ops.copy_to(app_session, n, target_node)
                        app_session.write_log(f"copy_to: {n['node_id']} to {target_node['node_id']}")

    return {"status": "successfully", "type": "tree", "data": f"{target_node_name}"}

async def merge_table(app_session, filename, title, table_index,  group, target_node_name):
    target_nodes = app_session.graph.get_node("Data", {
        "name": target_node_name,
        "app_ctx_id": app_session.appctx_id
    })
    if target_nodes:
        target_node = target_nodes[0]
    else:
        target_node = app_session.graph.add_node("Data", {
            "app_id": app_session.app_id,
            "agent_id": app_session.agent_id,
            "io_data_id": app_session.io_data_id,
            "app_ctx_id": app_session.appctx_id,
            "name": target_node_name,
            "action": "merge",
            "table_index": table_index,
            "group": group
        })
    rels = app_session.graph.get_relationship(
        {
            "src_label": "Data",
            "src_props": {"app_ctx_id": app_session.appctx_id, "name": WHITE_BOARD},
            "rel_types": ["SUBHEADING"],
            "hop_num": 1
        }
    )
    nodes = [
        node for _, _, node in rels if filename in node.get('title') and node.get('type') == 'filename'
    ]
    if not nodes:
        return {"status": "error", "type": "markdown", "data": "filename is not found!"}

    path = [t.strip() for t in title.split("::") if t.strip()]

    for node in nodes:
        current_parent_id = node['node_id']
        company = node['company']
        for level_title in path:
            rels = app_session.graph.get_relationship(
                {
                    "src_label": "Data",
                    "src_props": {"node_id": current_parent_id},
                    "rel_types": ["SUBHEADING"],
                    "hop_num": "1"
                }
            )

            for _, _, n in rels:
                if n.get('type') == 'title' and level_title in n.get('title'):
                    current_parent_id = n['node_id']
                    if level_title == path[-1]:
                        n |= {"action": "merge", "table_index": table_index, "group": group, "company": company}
                        graph_ops.copy_to(app_session, n, target_node, 0)
                        app_session.write_log(f"copy_to: {n['node_id']} to {target_node['node_id']}")
                    break

    return {"status": "successfully", "type": "tree", "data": f"{target_node_name}"}

async def read_docx_tmpl(app_session, tmpl_filename):
    const_path = Path("/is_kb") / "application" / app_session.app_id / "const"
    files_in_const_path = list(const_path.glob("*.docx"))
    files_in_const_path += list(const_path.glob("*.DOCX"))
    app_session.write_log(f"tmpl_filename={tmpl_filename}")
    tmpl_filenames = [fn for fn in files_in_const_path if tmpl_filename in str(fn)]
    if not tmpl_filenames:
        return {"status": "error", "type": "markdown", "data": f"模板文件:{tmpl_filename}不存在"}
    doc_reader = read_doc.DocReader(app_session, APP_CONSTS)
    doc_reader.read_tmpl(tmpl_filenames[0])
    return {"status": "successfully", "type": "graph", "data": f"{APP_CONSTS}"}


async def retrieve_scope(app_session, scope_name, title):
    app_session.write_log(f"retrieve_scope, scope_name={scope_name}, title={title}")
    return {"status": "successfully", "type": "tree", "data": []}


def tool_dev():
    id_pairs = [
        ("l9es6m0cuhxx", "dd185gxquov4"),
        ("l9es6m0cuhxy", "dd185gxquov5"),
    ]

    agent_id, io_data_id = id_pairs[1]
    roots = [
        "file://col0550i8m55",
        f"file://{agent_id}",
        "file://nbg91c03y719",
        f"file://{io_data_id}"
    ]

    def clear_data_node(app_session):
        io_data = {
            "app_id": "col0550i8m55",
            "agent_id": agent_id,
            "app_ctx_id": "nbg91c03y719"
        }
        io_data_list = app_session.graph.get_node("IOData", io_data)
        for io_node in io_data_list:
            app_session.graph.delete_node("Data", {
                "io_data_id": io_node['node_id']
            })

    app_session = MCPSession(roots, None)
    clear_data_node(app_session)
    app_session.app_dir = Path("/is_kb") / "application" / app_session.app_id

    import asyncio

    asyncio.run(read_docs_from_dir(app_session, "upload", ".docx"))
    # asyncio.run(graph_merge(app_session, "分子公司月报", 1, "月报汇总"))


if __name__ == "__main__":
    from mcp_bus.mcp_session import MCPSession

    #read
    # ids = {
    #     "app_id": 'hvt62t1fzope',
    #     "agent_id": '9osaor9espl5',
    #     "app_ctx_id": 'b1xwa8t4uwgd',
    #     "io_data_id": 'zrir9kd0rvl5'
    # }


    # agent merge
    # ids = {
    #     "app_id": 'col0550i8m55',
    #     "agent_id": 'l9es6m0cuhxy',
    #     "app_ctx_id": 'nbg91c03y719',
    #     "io_data_id": 'dd185gxquov5'
    # }


    # # agent write doc
    # ids = {
    #     "app_id": 'hvt62t1fzope',
    #     "agent_id": '9osaor9espls',
    #     "app_ctx_id": 'b1xwa8t4uwgd',
    #     "io_data_id": 'zrir9kd0rvlu'
    # }

    # pany测试  read_docs_from_dir
    # ids = {
    #     "app_id": 'qdy75adu56xw',
    #     "agent_id": 'cyen1ky0gbum',
    #     "app_ctx_id": 'mfrd2jqinfv3',
    #     "io_data_id": 'umdk49lz7tkg'
    # }

    ids = {
        "app_id": 'qdy75adu56xw',
        "agent_id": 'it1lfm8qvqsd',
        "app_ctx_id": 'mfrd2jqinfv3',
        "io_data_id": '5c9yisdztjoz'
    }

    roots = [
        f"file://{ids['app_id']}",
        f"file://{ids['agent_id']}",
        f"file://{ids['app_ctx_id']}",
        f"file://{ids['io_data_id']}"
    ]

    def clear_data_node(app_session):
        io_data = {
            "app_id": ids['app_id'],
            "agent_id": ids['agent_id'],
            "app_ctx_id": ids['app_ctx_id']
        }
        io_data_list = app_session.graph.get_node("IOData", io_data)
        for io_node in io_data_list:
            app_session.graph.delete_node("Data", {
                "io_data_id": io_node['node_id']
            })

    app_session = MCPSession(roots, None)
    clear_data_node(app_session)
    app_session.app_dir = Path("/is_kb") / "application" / app_session.app_id #/ app_session.appctx_id

    import asyncio

    # ret = asyncio.run(read_docs_from_dir(app_session, "upload", ".docx"))
    # ret = asyncio.run(graph_merge(app_session, "分子公司月报", 1, "月报汇总"))
    # ret = asyncio.run(write_graph_to_docx(app_session, "工程信息月报.docx", "2025年8月工程信息月报（工程管理部）.docx"))
    ret = asyncio.run(graph_copy_to(app_session, "耀荣", "较大项目::工程简介", "较大项目_耀荣"))

    print(ret)