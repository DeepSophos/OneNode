import asyncio
import json
import os
import sys
import weakref
from config import IS_KB_PATH
from fastmcp import Client
from fastmcp.client.transports import StdioTransport
from fastmcp.client.elicitation import ElicitResult
from models.graph_db import graph_query
from super_agent import SuperAgent
from data_pipe import DataPipe
from io_data import IOData
import logging
import time
from datetime import datetime
from collections import defaultdict
from pathlib import Path
import shutil

log = logging.getLogger(__name__)
log.setLevel('INFO')


class AppRunContext:
    def __init__(self, owner):
        self.owner = weakref.ref(owner)
        self.node = None
        self.node_id = None
        self.incomes = None
        self.run_states = None
        self.error_messages = None


    def new_run(self, incomes):
        self.node = self.owner().graph().add_node("AppRunCtx", {"timestamp": time.time(), "app_id": self.owner().node_id})
        self.node_id = self.node['node_id']
        self.incomes = incomes.copy()
        self.run_states = {
            "succeed": defaultdict(int),
            "failed": defaultdict(int)
        }
        self.error_messages = {}
        return self

    def get_run(self, node_id, incomes):
        nodes = self.owner().graph().get_node("AppRunCtx", {"node_id": node_id})
        if not nodes:
            return None
        self.node = nodes[0]
        self.node_id = self.node['node_id']
        self.incomes = incomes.copy()
        self.run_states = {
            "succeed": defaultdict(int),
            "failed": defaultdict(int)
        }
        self.error_messages = {}
        return self

    def list_run(self):
        return self.owner().graph().get_node("AppRunCtx", {"app_id": self.owner().node_id})

    def del_run(self, node_id=None):
        if node_id is None:
            self.owner().graph().delete_node("AppRunCtx", {"app_id": self.owner().node_id})
            self.owner().graph().delete_node("IOData", {"app_id": self.owner().node_id})
            self.owner().graph().delete_node("Data", {"app_id": self.owner().node_id})
        else:
            self.owner().graph().delete_node("AppRunCtx", {"app_id": self.owner().node_id, "node_id": node_id})
            self.owner().graph().delete_node("IOData", {"app_id": self.owner().node_id, "app_ctx_id": node_id})
            self.owner().graph().delete_node("Data", {"app_id": self.owner().node_id, "app_ctx_id": node_id})


    def get_time_str(self):
        return datetime.fromtimestamp(self.node['timestamp']).strftime("%Y-%m-%d %H:%M:%S")

    def set_run_state(self, agent_id: str, state: str, error=None):
        self.run_states[state][agent_id] += 1
        if state == "failed":
            self.error_messages[agent_id] = error

class ApplicationManager:
    def __init__(self):
        self.graph = graph_query()
        self.app_local = {}

    def add_application(self, name, options=None):
        if options is None:
            options = {}
        exists = self.graph.get_node("Application", {"name": name} | options)
        if exists:
            return {"status": "failed", "reason": "Same name application exists!"}
        ret = self.graph.add_node("Application", {"name": name} | options)
        return {"status": "successfully", "node_id": ret['node_id']}

    def del_application(self, app_id):
        self.graph.delete_node("Application", {"node_id": app_id})
        if app_id in self.app_local:
            del self.app_local[app_id]

        self.graph.delete_node("IOData", {"app_id": app_id})
        self.graph.delete_node("Data",  {"app_id": app_id})
        self.graph.delete_node("Agent", {"app_id": app_id})
        self.graph.delete_node("AppRunCtx", {"app_id": app_id})
        self.graph.delete_node("Tool", {"app_id": app_id})
        app_dir = Path("/is_kb") / "application" / app_id
        if app_dir.exists():
            shutil.rmtree(str(app_dir))

        return {"status": "successfully"}

    def load_application(self, name, app_id=None):
        if app_id:
            apps = self.graph.get_node("Application", {"node_id": app_id})
        else:
            apps = self.graph.get_node("Application", {"name": name})
        if apps:
            return apps[0]
        return None

    def list_application(self):
        return self.graph.get_node("Application")

    def get_application(self, app_id):
        if app := self.app_local.get(app_id):
            return app
        app_node = self.load_application(None, app_id=app_id)
        if app_node is not None:
            app = Application(self, app_node)
            self.app_local[app_node['node_id']] = app
            return app
        return None


class Application:
    def __init__(self, owner, app_node):
        self.owner = weakref.ref(owner)
        self.graph = weakref.ref(owner.graph)
        self.data_pipe = DataPipe(self)
        self.io_data = IOData(self)
        self.runner = AppRunContext(self)
        self.node_id = app_node['node_id']
        self.app_node = app_node
        self.python_path = Path(os.path.dirname(__file__)).parent.parent
        self.mcp_path = Path(os.path.dirname(__file__)).parent.parent / "mcp_bus" / "mcp_server.py"
        self.data_path = Path(IS_KB_PATH) / "Application"

        self.transport = StdioTransport(
            command=sys.executable,
            args=[str(self.mcp_path)],
            env={"PYTHONPATH": str(self.python_path)}
        )
        self.heads = []
        self.nodes = {}
        self.incomes = defaultdict(set)
        self.edges = []
        self.ctx = None
        self.tools = None
        self.ctx = self.select_appctx(None)

    def update_node(self, update):
        if "node_id" in update:
            del update['node_id']
        self.app_node |= update
        self.graph().update_node("Application",
                                 {"node_id": self.node_id},
                                 self.app_node
                                 )

    def update_heads(self):
        for n in self.graph().get_node("Agent", {"app_id": self.node_id}):
            if n['node_id'] not in self.nodes:
                self.nodes[n['node_id']] = SuperAgent(self, n)
        self.heads = self.nodes.values()
        def get_head_agents(node_id):
            relations = self.graph().get_relationship(
                {
                    "src_label": "Agent",
                    "src_props": {"node_id": node_id},
                    "rel_types": ["NEXT"],
                    "hop_num": 1
                }
            )
            for current, _, next in relations:
                self.heads = [n for n in self.heads if n.node_id != next['node_id']]

        for node_id in self.nodes.keys():
            get_head_agents(node_id)

        edges = []
        for agent in self.heads:
            edges += self.graph().get_relationship(
                {
                    "src_label": "Agent",
                    "src_props": {"node_id": agent.node_id},
                    "rel_types": ["NEXT"]
                }
            )
        self.edges = []
        for k, _, v in edges:
            self.incomes[v['node_id']].add(k['node_id'])
            self.edges.append((k['node_id'], v['node_id']))

    async def run_agent(self, ctx, prev, current):
        ret = await current.invoke(ctx)
        if isinstance(ret, dict):
            if tool_name := ret.get("tool_name"):
                agents = [agent for agent in self.nodes.values() if agent.name == tool_name]
                if agents:
                    return await self.run_agent(ctx, current, agents[0])
        edges = self.graph().get_relationship({
            "src_label": "Agent",
            "src_props": {"node_id": current.node_id},
            "rel_types": ["NEXT"],
            "hop_num": 1})
        return await self.run_agents(ctx, current, [self.nodes[nxt['node_id']] for _, _, nxt in edges])

    async def run_agents(self, ctx, src, agents):
        return await asyncio.gather(*[self.run_agent(ctx, src, target) for target in agents])

    async def run_agents_with_terminate(self, ctx, nodes):
        await self.run_agents(ctx, None, nodes)
        await self.terminate()

    async def run(self, options=None):
        self.update_heads()
        self.ctx = self.runner.new_run(self.incomes)
        asyncio.create_task(self.run_agents_with_terminate(self.ctx, self.heads))
        return self.data_pipe.frontend_event_generator()

    def get_data_pipe(self):
        return self.data_pipe

    def get_agent_graph(self):
        def get_agent_data(agent):
            agent_node = agent.config | {
                "tools": agent.get_tools(),
                "inputs": agent.get_input()
            }
            return agent_node
        self.update_heads()
        return {
            "nodes": [get_agent_data(agent) for agent in self.nodes.values()],
            "edges": self.edges
        }

    def del_agent(self, agent_id) -> None:
        self.graph().delete_node("Agent", {"node_id": agent_id})
        self.io_data.delete_data({"agent_id": agent_id})
        if agent_id in self.nodes:
            del self.nodes[agent_id]

    def add_agent(self, config):
        config |= {"app_id": self.node_id}
        node = self.graph().add_node("Agent", config)
        self.update_heads()
        return node

    def add_edge(self, src, target):
        r = self.graph().add_relationship(
            "Agent",
            src,
            "NEXT",
            "Agent",
            target
        )
        target_agent = self.nodes[target]
        src_agent = self.nodes[src]
        target_agent.add_input(src_agent.node_id)
        return r

    def del_edge(self, src, target):
        self.graph().delete_relationship(
            {
                "src_label": "Agent",
                "src_props": {"node_id": src},
                "target_props": {"node_id": target},
                "rel_types": ["NEXT"],
                "hop_num": 1
            }
        )
        self.graph().delete_relationship(
            {
                "src_label": "Agent",
                "src_props": {"node_id": target},
                "target_props": {"node_id": src},
                "rel_types": ["INPUT"],
                "hop_num": 1
            }
        )


    async def get_agent(self, agent_id):
        self.update_heads()
        if agent_id in self.nodes:
            return self.nodes[agent_id]
        return None

    async def update_agent(self, agent_id, config):
        self.update_heads()
        if agent_id in self.nodes:
            agent = self.nodes[agent_id]
            agent.config |= config
            agent.name = agent.config.get("name", agent.name)
            agent.save_config()
            return agent
        return None

    async def feedback(self, message):
        feedback = json.loads(message)
        await self.data_pipe.write_to_frontend(self.node_id, '', feedback.get("data", {}).get("description", "操作完成"), 'user')
        await self.data_pipe.put_to_input_queue(
            json.dumps(feedback | {"app_id": self.node_id}))
        return {"status": "successfully"}


    async def terminate(self):
        await self.data_pipe.write_to_frontend(self.node_id, '', '\e')
        await self.data_pipe.stop_streaming()


    async def get_agent_runnable(self, agent_id):
        self.update_heads()
        agent = self.nodes.get(agent_id)
        if agent is None:
            return {"status": "error", "reason": f"agent: {agent_id} is not found!"}
        if self.ctx is None:
            self.ctx = self.runner.new_run(self.incomes)
        if agent.is_callable(self.ctx):
            return {"status": "successfully"}
        return {"status": "error", "reason": "some previous agents are not invoked beforehand."}

    async def agent_run(self, agent_id):
        async def run_agent(ag, ctx):
            await ag.invoke(ctx)
            await self.terminate()

        self.update_heads()
        agent = self.nodes.get(agent_id)
        if agent is None:
            self.data_pipe.write_to_frontend(self.node_id, agent_id, f"\e{agent_id} is not found!")
            return self.data_pipe.frontend_event_generator()
        if self.ctx is None:
            self.ctx = self.runner.new_run(self.incomes)
        asyncio.create_task(run_agent(agent, self.ctx))
        return self.data_pipe.frontend_event_generator()

    async def get_available_inputs(self, agent_id):
        return {
            "status": "successfully",
            "data": [n.node_id for n in self.nodes.values()]
        }

    async def agent_add_input(self, agent_id: str, input_agent_id: str):
        agent = self.nodes.get(agent_id)
        if agent is None:
            return {"status": "error", "data": f"agent: {agent_id} is not found!"}
        agent.add_input(input_agent_id)
        return {"status": "successfully"}

    async def agent_del_input(self, agent_id: str, input_agent_id: str):
        agent = self.nodes.get(agent_id)
        if agent is None:
            return {"status": "error", "data": f"agent: {agent_id} is not found!"}
        agent.del_input(input_agent_id)
        return {"status": "successfully"}

    async def agent_get_input(self, agent_id: str):
        agent = self.nodes.get(agent_id)
        if agent is None:
            return {"status": "error", "data": f"agent: {agent_id} is not found!"}
        return {"status": "successfully", "data": agent.get_input()}

    async def agent_get_io_detail(self, agent_id: str):
        if self.ctx is None:
            return {"status": "error", "reason": "running context is not initialized!"}
        nodes = self.io_data.find_node({
            "app_id": self.owner().node_id,
            "agent_id": agent_id,
            "app_ctx_id": self.ctx.node_id
        })
        if not nodes:
            return {"status": "error", "reason": "this IO data has not been produced."}
        return nodes[0]

    async def update_tools(self):
        self.tools = {tool['name']: tool
            for tool in self.graph().get_node("Tool", {"app_id": self.node_id})}

        mcp_client = Client(self.transport,
                            roots=[f"file://{self.node_id}"]
        )
        async with mcp_client:
            tools = await mcp_client.list_tools()
            for tool in tools:
                if tool.name not in self.tools:
                    tool_node = self.graph().add_node("Tool", {
                        "app_id": self.node_id,
                        "name": tool.name,
                        "title": tool.title,
                        "description": tool.description,
                        "inputSchema": tool.inputSchema,
                        "icons": tool.icons,
                        "annotations": tool.annotations,
                        "meta": tool.meta
                    })
                    self.tools[tool.name] = tool_node


    async def list_tools(self):
        await self.update_tools()
        return list(self.tools.values())

    async def agent_add_tool(self, agent_id, tool_id):
        agent = self.nodes.get(agent_id)
        if agent is None:
            return {"status": "error", "data": f"agent: {agent_id} is not found!"}
        agent.add_tool(tool_id)
        return {"status": "successfully"}

    async def agent_del_tool(self, agent_id, tool_id):
        agent = self.nodes.get(agent_id)
        if agent is None:
            return {"status": "error", "data": f"agent: {agent_id} is not found!"}
        agent.del_tool(tool_id)
        return {"status": "successfully"}

    async def agent_get_tools(self, agent_id):
        agent = self.nodes.get(agent_id)
        if agent is None:
            return []
        return agent.get_tools()

    def list_appctx(self):
        return self.runner.list_run()

    def select_appctx(self, app_ctx_id: str|None=None):
        self.update_heads()
        if app_ctx_id is None:
            runs = self.runner.list_run()
            if not runs:
                return None
            app_ctx_id = runs[-1]["node_id"]

        self.ctx = self.runner.get_run(app_ctx_id, self.incomes)
        return self.ctx

    def delete_appctx(self, app_ctx_id: str):
        self.runner.del_run(app_ctx_id)
        if app_ctx_id == self.ctx.node_id:
            self.ctx = self.select_appctx()


    async def agent_get_data(self, agent_id, type, content):
        agent = self.nodes.get(agent_id)
        if agent is None:
            return {"status": "error", "data": f"agent: {agent_id} is not found!"}
        if self.ctx is None:
            return {"status": "error", "data": f"agent output has not been generated!"}
        data = agent.get_data(self.ctx, type, content)
        if data is None:
            return {"status": "error", "data": f"agent output is None!"}
        return {"status": "successfully", "data": data}


if __name__ == "__main__":
    pass

    # ApplicationManager().add_application("TestApp1")
    # config = {
    #     "output_type": "json",
    #     "task": "上传月报样例文件",
    #     "tools": {
    #         "file_upload_tool": {
    #             "description": "提示用户上传指定的文件",
    #             "inputSchema": {
    #                 'properties': {
    #                     'file_format':
    #                         {
    #                             'type': 'str'
    #                         },
    #                     'title':
    #                         {
    #                             'type': 'str'
    #                         }
    #                 },
    #                 'required': ['file_format', 'title'],
    #                 'type': 'object'
    #             }
    #         }
    #     }
    # }
    #
    # application.add_agent(config)
    # app_list = ApplicationManager().list_application()
    # print(app_list)

    # app = ApplicationManager().load_application("TestApp1")
    # print(app)


    # import threading
    #
    # thread = threading.Thread(target=feedback_application)
    # thread.start()
    #
    # def feedback_application():
    #     while
    #     app = ApplicationManager().get_application('a17pqlxzbsfa')
    #     app.feedback(json.dumps({
    #         "agent_id": agent_id,
    #         "status": "accept",
    #         "data": json.dumps("abc_file.docx")
    #     })
    #
    #
    # async def main():
    #     app = ApplicationManager().get_application('a17pqlxzbsfa')
    #     stream = await app.run()
    #     async for line in stream:
    #         print(line)
    #
    # asyncio.run(main())