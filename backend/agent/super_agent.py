import time
from fastmcp.client.elicitation import ElicitResult
import asyncio
import json
import weakref
from fastmcp import Client
from utils.iv3_client import image_conversation_stream, text_conversation, image_conversation, async_chat
import logging
import traceback
from fastmcp.client.transports import StdioTransport
import os, re
import sys
from pathlib import Path


log = logging.getLogger(__name__)
log.setLevel('INFO')

def convert_to_json(input_str, only_clean=False):
    cleaned = input_str.strip()
    if cleaned.startswith('```json') and cleaned.endswith('```'):
        cleaned = cleaned[len('```json'):-len('```')].strip()
    if only_clean:
        return cleaned
    try:
        json_data = json.loads(cleaned)
    except json.JSONDecodeError as e:
        print(f"Failed to parse json: {cleaned}")
        return None
    return json_data


class SuperAgent:
    def __init__(self, owner, config):
        self.owner = weakref.ref(owner)
        self.node_id = config['node_id']
        self.name = config.get("name", f"智能代理_{self.node_id}")
        self.config = config
        self.transport = StdioTransport(
            command=sys.executable,
            args=[str(self.owner().mcp_path)],
            env={"PYTHONPATH": str(self.owner().python_path),"MEM_GRAPH_URL": os.environ.get("MEM_GRAPH_URL", "127.0.0.1:7687")},
            cwd=str(self.owner().python_path)
        )

    @staticmethod
    def get_default_config():
        return {
            "output_type": "json",
            "task": "",
            "tools": {},
            "input_nodes": [],
        }

    async def invoke(self, app_ctx):
        def build_input_block():
            # convert agent id to io_data node id
            inp_nodes = [n[0] for n in self.get_input(app_ctx)]
            content = ""
            for i, node in enumerate(inp_nodes):
                content += f"## 参考内容{i}\n"
                content += node['content']
                content += "\n"
            log.info(f"input: {content}")
            return content


        async def call_tool(call_info, ret_list):
            tool_name = call_info.get("tool_name")
            if tool_name in tools:
                t = time.time()
                tool_r = await mcp_client.call_tool(tool_name, call_info.get("tool_arguments"))
                print(f"{tool_name} elapse time: {time.time() - t}")
                if tool_r is not None:
                    try:
                        out_d = json.loads(tool_r.content[0].text or '{}')
                        await self.print("tool", out_d.get('data',""), out_d.get("type","markdown"))
                        ret_list.append(out_d)
                    except Exception as e:
                        log.info(f"Failed to call tool: {tool_name}, with: {e}")
                    return True
            return False

        def build_task():
            node_names = re.findall(r'{{(.*?)}}', self.config["task"])
            result = [self.config["task"].strip()]
            for node_name in node_names:
                try:
                    node_result = self.get_result_by_name(app_ctx, node_name)
                except Exception:
                    node_result = f"无"

                result.append(f"{{{node_name}}} 执行的结果是：")
                result.append(str(node_result))
                result.append("")

            return "\n".join(result)

        try:
            if not self.is_callable(app_ctx):
                app_ctx.set_run_state(self.node_id, "failed", "input node has not prepared!")
                return None

            output_type = self.config.get("output_type", "plain_text")
            task = build_task()
            input_content = build_input_block()
            tools_description = ""
            tools = {t['name']: t for t in self.get_tools()}
            for v in tools.values():
                tools_description += f"""
name: {v['name']}
descript: {v["description"]}
inputSchema: {v['inputSchema']}   
"""
            tool_prompt = """
请输出json格式的工具调用, 按照调用顺序, 输出每个调用。根据用户语义，请优先使用引号内的字符串作为参数。举例如下:
可选的工具：
    name: add
    descript: 将两个数加在一起
    inputSchema: {{'properties': {{'a': {{'type': 'integer'}}, 'b': {{'type': 'integer'}}}}, 'required': ['a', 'b'], 'type': 'object'}}        

任务:
   请问3加5是多少？

输出的json:
```json
[
   {{
      "tool_name": "add",
      "tool_arguments": {{"a": 3, "b": 5}}
   }}
]
```       
"""

            prompt = f"""
# 参考内容
{input_content}

#可选的工具
{tools_description}

# 任务
{task}
{tool_prompt if tools else ''}
"""
            """
            we check if task is a call json. If it is true, we directly call function.
            """
            try:
                json_data = json.loads(self.config['task'])
                await self.print('agent', self.config['task'])
                answer = None
            except json.JSONDecodeError as e:
                # not json data, just ask llm
                log.info(prompt)
                await self.print('agent', self.config['task'])
                answer = await async_chat(prompt)
                await self.print('llm', answer or '调用错误')

                # answer = image_conversation(prompt, [])
                log.info(answer)
                json_data = None

            tool_ret = None
            tool_called = False
            self.clear_output(app_ctx)
            new_io_data = self.save_result(app_ctx, {"content": ""})
            app_id = self.owner().node_id
            agent_id = self.node_id
            app_ctx_id = app_ctx.node_id
            io_data_id = new_io_data['node_id']
            if tools:
                if json_data is None:
                    json_data = convert_to_json(answer)
                if json_data is None:
                    return

                log.info("*** MCP Tool Call ***")
                log.info(f"app_id: {app_id}")
                log.info(f"agent_id: {agent_id}")
                log.info(f"app_ctx_id: {app_ctx_id}")
                log.info(f"io_data_id: {io_data_id}")
                log.info("*** MCP Tool Call ***")

                mcp_client = Client(self.transport,
                                    roots=[f"file://{app_id}",
                                           f"file://{agent_id}",
                                           f"file://{app_ctx_id}",
                                           f"file://{io_data_id}"],
                                    elicitation_handler=self.elic_handle)
                async with mcp_client:
                    ret_list = []
                    if isinstance(json_data, list):
                        for call in json_data:
                            tool_called = await call_tool(call, ret_list)
                    elif isinstance(json_data, dict):
                        tool_called = await call_tool(call, ret_list)

            control_flow = None
            if tool_called:
                out_data = json.dumps(ret_list)
            elif output_type == 'json':
                out_data = convert_to_json(answer)
                control_flow = out_data
            else: #plain text
                out_data = answer

            if out_data is None:
                out_data = ''
            self.save_result(app_ctx, {"node_id":io_data_id, "content": out_data})

            log.info(f"SuperAgent executed. app_id: {self.owner().node_id}, agent_id: {self.node_id}, timestamp: {app_ctx.get_time_str()}")
            app_ctx.set_run_state(self.node_id, "succeed")
            return control_flow
        except Exception as e:
            log.info(e)
            traceback.print_exc()
            app_ctx.set_run_state(self.node_id, "failed", error=str(e))
            return None

    async def print(self, role, message, type="markdown"):
        await self.owner().get_data_pipe().write_to_frontend(self.owner().node_id, self.node_id, message, role, type)

    def save_config(self):
        self.owner().graph().update_node("Agent",
                                         {"node_id": self.node_id},
                                         self.config)

    def save_result(self, app_ctx, io_data):
        io_data = {
            "app_id": self.owner().node_id,
            "agent_id": self.node_id,
            "app_ctx_id": app_ctx.node_id,
            "name": self.name,
            "data_type": self.config.get("output_type", "markdown"),
        } | io_data
        return self.owner().io_data.save_data(io_data)

    def clear_output(self, app_ctx):
        self.owner().io_data.delete_data({
            "app_id": self.owner().node_id,
            "agent_id": self.node_id,
            "app_ctx_id": app_ctx.node_id
        })
        self.owner().graph().delete_node("Data", {
            "app_id": self.owner().node_id,
            "agent_id": self.node_id,
            "app_ctx_id": app_ctx.node_id
        })

    def add_input(self, agent):
        self.owner().graph().add_relationship(
            "Agent",
            self.node_id,
            "INPUT",
            "Agent",
            agent
        )

    def del_input(self, agent):
        self.owner().graph().delete_relationship({
            "src_label": "Agent",
            "src_props": {"node_id": self.node_id},
            "target_props": {"node_id": agent},
            "rel_types": ["INPUT"],
            "hop_num": 1
        })

    def is_callable(self, app_ctx):
        inp_nodes = self.get_input(app_ctx)
        if all(inp_nodes):
            return True
        return False

    def get_result_by_name(self, app_ctx, node_name):
        io_data_nodes = self.owner().graph().get_node("IOData",{
            "app_id": self.owner().node_id,
            "name": node_name,
            "app_ctx_id": app_ctx.node_id
        })
        if io_data_nodes and io_data_nodes[0].get("content"):
            return io_data_nodes[0]["content"]

        data_nodes = self.owner().graph().get_node("Data", {
            "app_id": self.owner().node_id,
            "app_ctx_id": app_ctx.node_id
        })
        if not data_nodes:
            return None
        for node in data_nodes:
            if node.get("name", "") == node_name or node.get("title", "") == node_name:
                content = node.get("content")
                if isinstance(content, str):
                    return content
                if isinstance(content, list):
                    return "".join(item.get("content", "") for item in content)


    def get_input(self, app_ctx=None):
        relations = self.owner().graph().get_relationship({
            "src_label": "Agent",
            "src_props": {"node_id": self.node_id},
            "rel_types": ["INPUT"],
            "hop_num": 1
        })
        if app_ctx is None:
            return [n['node_id'] for _, _, n in relations]

        inp_nodes = [self.owner().io_data.find_node({
            "app_id": self.owner().node_id,
            "agent_id": n['node_id'],
            "app_ctx_id": app_ctx.node_id
        }) for _, _, n in relations]
        return inp_nodes

    def get_tools(self):
        relations = self.owner().graph().get_relationship({
            "src_label": "Agent",
            "src_props": {"node_id": self.node_id},
            "rel_types": ["USE_TOOL"],
            "hop_num": 1
        })
        return [n for _, _, n in relations]

    def add_tool(self, tool_id: str):
        self.owner().graph().add_relationship(
            "Agent",
            self.node_id,
            "USE_TOOL",
            "Tool",
            tool_id
        )

    def del_tool(self, tool_id: str):
        self.owner().graph().delete_relationship({
            "src_label": "Agent",
            "src_props": {"node_id": self.node_id},
            "target_props": {"node_id": tool_id},
            "rel_types": ["USE_TOOL"],
            "hop_num": 1
        })

    def get_data(self, app_ctx, type: str, content: str):
        MAX_LEN = 40
        def get_name(n):
            name = n.get("name", n.get("title", ""))
            if len(name) > MAX_LEN:
                name = name[:40] + "..."
            return name

        def get_desc(n):
            content = n.get("content", "")
            if isinstance(content, list):
                texts = [item.get("content", "") for item in content if isinstance(item, dict)]
                return "\n\n".join(texts)
            return content

        if type in ("graph", "tree"):
            rels = self.owner().graph().get_relationship({
                "src_label": "Data",
                "src_props": {"app_ctx_id": app_ctx.node_id, "name": content},
                "rel_types": ["SUBHEADING"],
                "hop_num": '0..10'
            })

            nodes = {n['node_id']: n for n, _, _ in rels}
            nodes |= {m['node_id']: m for _, _, m in rels}
            nodes = [
                {"id": n['node_id'], "name": get_name(n), "desc": get_desc(n)} for n in nodes.values()
            ]
            edges = [(m['node_id'], n['node_id']) for m, _, n in rels]
            edges = [{"source": t[0], "target": t[1]} for t in edges]
            return {
                "nodes": nodes,
                "edges": edges
            }
        elif type == "markdown":
            nodes = self.owner().io_data.find({
                "app_id": self.owner().node_id,
                "agent_id": self.node_id,
                "app_ctx_id": app_ctx.node_id
            })
            if nodes:
                return nodes[0]['content']
        return None

    async def elic_handle(self, message: str, response_type: type, params, context):
        data_pipe = self.owner().get_data_pipe()
        query = json.loads(message)
        if query['command'] == 'end':
            await self.owner().terminate()
            return ElicitResult(action="cancel")
        query |= {
            "app_id": self.owner().node_id,
            "agent_id": self.node_id
        }
        query_data = json.dumps(query)
        await self.print('', f"\\u{query_data}")

        """
        find the feedback for this query
        """
        while True:
            response = await data_pipe.read_from_frontend()
            if response is None:
                return ElicitResult(action="cancel")
            feedback = json.loads(response)
            #check if match the query
            if feedback['app_id'] != query['app_id'] or feedback['agent_id'] != query['agent_id']:
                # put it back
                await data_pipe.put_to_input_queue(response)
                await asyncio.sleep(0.1)
            else:
                break

        log.info(f"elic_handle: {response}")

        if feedback['status'] == "cancel":
            return ElicitResult(action="cancel")
        elif feedback['status'] == "refuse":
            return ElicitResult(action="refuse")
        #default is accept
        return response_type(result="accept", response=response)

if __name__ == '__main__':
    from application_manager import Application

    task = """请上传样例月报. 文件格式是word的docx. 对话框标题是：请上传月报样例.
"""
    config = {
        "app_id": "1234",
        "node_id": "3455",
        "output_type": "json",
        "task": task,
        "tools": {
            "file_upload_tool": {
                "description": "提示用户上传指定的文件",
                "inputSchema": {
                    'properties': {
                        'file_format':
                            {
                                'type': 'str'
                            },
                        'title':
                            {
                                'type': 'str'
                            }
                    },
                    'required': ['file_format', 'title'],
                    'type': 'object'
                }
            }
        }
    }

    class AgentRunner:
        def __init__(self):
            pass

        def run_agent(self, config):
            app = Application(node_id="123")
            agent = SuperAgent(app, config)
            ret = asyncio.run(agent.invoke())

    AgentRunner().run_agent(config)


"""
[{'tool_name': 'file_upload_tool', 'tool_arguments': {'file_format': 'docx', 'title': '请上传月报样例'}}]
"""
