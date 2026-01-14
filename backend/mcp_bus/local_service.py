import json, re
import base64
import jieba
from rank_bm25 import BM25Okapi
from pathlib import Path
from models.graph_db import graph_query
from mcp_bus import read_doc
from mcp_bus import graph_ops
from mcp_bus import write_doc


WHITE_BOARD = "白板"
APP_CONSTS = "静态数据"
DOCUMENT = "文档数据"

def get_base_url():
    try:
        from apps.agents.main import app
        base_url = app.state.base_path
    except ImportError:
        base_url = ""
    return base_url


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

async def extract_rule_field(app_session):
    from utils.iv3_client import async_chat
    from utils import hf_client
    root_node_data={
        "app_id": app_session.app_id,
        "name": "CASEROOT"
    }

    root_node_list = app_session.graph.get_node("Data", root_node_data)
    if len(root_node_list) > 0:
        root_node = root_node_list[0]
    else:
        root_node = app_session.graph.add_node("Data", root_node_data)

    prompt_template = """
"""
    node_data = {
        "app_id": app_session.app_id,
        "type": "case"
    }
    rels = app_session.graph.get_relationship(
        {
            "src_label": "Data",
            "src_props": {"app_ctx_id": app_session.appctx_id, "name": WHITE_BOARD},
            "rel_types": ["SUBHEADING"],
            "hop_num": 1
        }
    )

    if len(rels) == 0:
        return {"status": "error", "type": "markdown", "data": "file is not found!"}

    embedding_list = []
    for _, _, node in rels:
        title = node.get("title")
        content = node.get("content")
        if isinstance(content, list):
            content = "".join(item.get("content", "") for item in content)
        if not content:
            continue
        prompt = prompt_template
        prompt = prompt.replace("node_name", title)
        prompt = prompt.replace("node_content", content)

        answer_mk = await async_chat(prompt)
        answer_str = re.sub(r'^```(?:json)?\s*|\s*```$', '', answer_mk.strip(), flags=re.MULTILINE)
        answer_json = json.loads(answer_str)

        new_node_data = {
            "name": title,
            "content": [{"type": "markdown", "content": answer_mk}],
            **node_data,
            **answer_json
        }
        new_node = app_session.graph.add_node("Data", new_node_data)
        app_session.graph.add_relationship(
            "Data",
            root_node['node_id'],
            "SUBHEADING",
            "Data",
            new_node['node_id']
        )
        fields = [
            "追偿处理",
            "损失状况描述",
            "可能导致原因",
            "是否淡水或海水损",
            "事故经过",
            "损失原因"
        ]
        embedding_content = []
        for field in fields:
            value = answer_json.get(field, "")
            embedding_content.append(f"{field}: {value}")
        embedding_content = "\n".join(embedding_content)

        if not embedding_content.strip():
            continue

        data_vecs = hf_client.embedding(embedding_content)
        embedding_list.append({
            "node_id": new_node['node_id'],
            "node_content": embedding_content,
            "node_content_vecs": data_vecs
        })

    embedding_path = app_session.app_dir / "embedding"
    embedding_data = []
    if embedding_path.exists():
        try:
            with open(embedding_path, 'r', encoding='utf-8') as f:
                embedding_data = json.load(f)
                embedding_data.extend(embedding_list)
        except Exception as e:
            embedding_data = embedding_list
    else:
        embedding_data = embedding_list

    with open(app_session.app_dir / "embedding", "w") as f:
        f.write(json.dumps(embedding_data, ensure_ascii=False, indent=2))

    return {"status": "successfully", "data": f"{root_node['name']}", "type": "tree"}


async def query_memgraph(app_session, query, query_user):
    query_node_list = app_session.graph.execute(query, None)
    query_node_id_list = [node["node_id"] for node in query_node_list]
    case_num = len(query_node_id_list)
    query_node_data = {
        "app_id": app_session.app_id,
        "agent_id": app_session.agent_id,
        "io_data_id": app_session.io_data_id,
        "app_ctx_id": app_session.appctx_id,
        "name": "QueryResult"
    }
    query_node_list = app_session.graph.get_node("Data", query_node_data)
    if len(query_node_list) > 0:
        query_node = query_node_list[0]
        query_node_content = query_node["content"]
        query_node_content = list(set(query_node_content) & set(query_node_id_list))
        case_num = len(query_node_content)
        query_node |= {"content": query_node_content}
        app_session.graph.update_node(
            "Data",
            {"node_id": query_node["node_id"]},
            query_node
        )

    else:
        query_node_data |= {"query": query_user, "content": query_node_id_list}
        app_session.graph.add_node("Data", query_node_data)

    return {"status": "successfully", "data": f"第一步检索案件数量：{case_num}", "type": "markdown"}

def bm25_tokenize(text: str):
    if not text:
        return []

    # 去掉字段名和符号
    text = re.sub(r"[A-Za-z0-9_:：\n]", " ", text)

    words = jieba.lcut(text)

    stopwords = {
        "的", "了", "和", "及", "存在", "进行", "导致",
        "车辆", "发生", "出现", "情况", "影响"
    }

    return [
        w.strip()
        for w in words
        if len(w.strip()) > 1 and w not in stopwords
    ]

async def query_embedding(app_session, query, query_user,
                          top_k: int = 10,
                          w_vec: float = 0.5,
                          w_bm25: float = 0.5):
    from utils import hf_client
    import numpy as np
    import faiss
    query_vec_list = hf_client.embedding([query])[0]
    query_vec = np.array(query_vec_list).astype("float32")
    query_vec = query_vec.reshape(1, -1)

    query_node_data = {
        "app_id": app_session.app_id,
        "agent_id": app_session.agent_id,
        "io_data_id": app_session.io_data_id,
        "app_ctx_id": app_session.appctx_id,
        "name": "QueryResult"
    }
    query_node_list = app_session.graph.get_node("Data", query_node_data)
    query_node = {}
    query_node_content = []
    if len(query_node_list) > 0:
        query_node = query_node_list[0]
        query_node_content = query_node["content"]

    with open(app_session.app_dir / "embedding", 'r', encoding='utf-8') as f:
        embeddings_data = json.load(f)

    node_ids = [item['node_id'] for item in embeddings_data if item['node_id'] in query_node_content]
    node_contents = [item['node_content'] for item in embeddings_data if item['node_id'] in query_node_content]
    vectors = [item['node_content_vecs'][0] for item in embeddings_data if item['node_id'] in query_node_content]
    vectors = np.vstack(vectors).astype("float32")
    dimension = vectors.shape[1]

    index = faiss.IndexFlatL2(dimension)
    index.add(vectors)

    D, I = index.search(query_vec, len(node_ids))

    max_d = float(np.max(D[0])) + 1e-6
    vec_scores = {
        idx: 1.0 - (dist / max_d)
        for dist, idx in zip(D[0], I[0])
    }

    # ---------- BM25 ----------
    tokenized_corpus = [bm25_tokenize(node_content) for node_content in node_contents]
    bm25 = BM25Okapi(tokenized_corpus)

    query_tokens = bm25_tokenize(query)
    bm25_raw = bm25.get_scores(query_tokens)

    max_bm25 = max(bm25_raw) + 1e-6
    bm25_scores = {
        idx: score / max_bm25
        for idx, score in enumerate(bm25_raw)
    }

    results = []
    for idx in range(len(node_ids)):
        final_score = (
                w_vec * vec_scores.get(idx, 0.0)
                + w_bm25 * bm25_scores.get(idx, 0.0)
        )
        results.append({
            "node_id":node_ids[idx],
            "node_content": node_contents[idx],
            "vec_score":vec_scores.get(idx, 0.0),
            "bm25_score": bm25_scores.get(idx, 0.0),
            "final_score": final_score
        })
    results.sort(key=lambda x: x["final_score"], reverse=True)
    min_score = 0
    query_node_ids = []
    for result in results:
        final_score = result["final_score"]
        vec_score = result["vec_score"]
        bm25_score = result["bm25_score"]
        print(f"final_score = {final_score},vec_score = {vec_score},bm25_score = {bm25_score}")
        print(result["node_content"])
        print("------------------------------------------------")
        if min_score == 0:
            min_score = final_score * 0.5
        if final_score > min_score:
            query_node_ids.append(node_ids[idx])

    case_num = len(query_node_ids)

    if len(query_node_list) > 0:
        query_node_content = list(set(query_node_content) & set(query_node_ids))
        case_num = len(query_node_content)
        query_node |= {"content": query_node_content}
        app_session.graph.update_node(
            "Data",
            {"node_id": query_node["node_id"]},
            query_node
        )
    else:
        query_node_data |= {"query": query_user, "content": query_node_ids}
        app_session.graph.add_node("Data", query_node_data)

    return {"status": "successfully", "data": f"第二步检索案件数量：{case_num}", "type": "markdown"}

async def query_vllm(app_session):
    from utils.iv3_client import async_chat

    query_node_data = {
        "app_id": app_session.app_id
    }
    query_node_list = app_session.graph.get_node("Data",
         query_node_data | {
             "agent_id": app_session.agent_id,
             "io_data_id": app_session.io_data_id,
             "app_ctx_id": app_session.appctx_id,
             "name": "QueryResult"
         })
    if len(query_node_list) == 0:
        return {"status": "error", "data": f"检索异常", "type": "markdown"}
    query_node = query_node_list[0]
    query_str = query_node["query"]
    node_id_list = query_node["content"]
    node_ids = "','".join(node_id_list)
    node_list = app_session.graph.get_node("Data",
           query_node_data | {"type": "case"},
           f"n.node_id IN ['{node_ids}']"
           )
    case_data_list = []
    for node in node_list:
        content = node.get("content")
        if isinstance(content, list):
            for item in content:
                app_session.write_log(item.get("content", ""))
            content = "".join(item.get("content", "") for item in content)
        case_data_list.append(content)

    if len(case_data_list) == 0:
        return {"status": "error", "data": f"未检索到案件数据", "type": "markdown"}

    case_data_str = "\n".join(case_data_list)
    prompt = f"""根据以下事故案例数据，结合你的专业知识，针对用户的问题进行详细解答。
用户的问题是：{query_str}
事故案例数据如下：
{case_data_str}
"""

    answer = await async_chat(prompt)

    return {"status": "successfully", "data": f"{answer}", "type": "markdown"}


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

    ids = {
        "app_id": '680icft5uw3o',
        "agent_id": 'qy5ebmpg3cuq',
        "app_ctx_id": '7d2u79g1l3a3',
        "io_data_id": '9wwrvrtkrt9y'
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
    # clear_data_node(app_session)
    app_session.app_dir = Path("/is_kb") / "application" / app_session.app_id #/ app_session.appctx_id

    import asyncio

    # ret = asyncio.run(read_docs_from_dir(app_session, "upload", ".docx"))
    # ret = asyncio.run(graph_merge(app_session, "分子公司月报", 1, "月报汇总"))
    # ret = asyncio.run(write_graph_to_docx(app_session, "工程信息月报.docx", "2025年8月工程信息月报（工程管理部）.docx"))
    # ret = asyncio.run(query_embedding(app_session, "火灾原因", "请列举2021—2025年因火灾原因导致的事故案例，并计算平均理算金额。"))
    ret = asyncio.run(query_vllm(app_session))

    print(ret)