from models.graph_db import graph_query
from pathlib import Path

class MCPSession:
    def __init__(self, roots, ctx):
        self.ctx = ctx
        self.app_id, self.agent_id, self.appctx_id, self.io_data_id = [
            root.replace("file://", "").replace("/", "")
            for root in roots
        ]
        self.graph = graph_query()
        self.app_dir = Path("/is_kb") / "application" / self.app_id
        self.app_dir.mkdir(parents=True, exist_ok=True)

    @staticmethod
    async def create(roots, ctx):
        roots = [str(root.uri) async for root in ctx.list_roots()]
        return MCPSession(roots, ctx)

    def write_log(self, message):
        with open(r"app.log", "a") as f:
            f.write(f"[{self.app_id}-{self.agent_id}-{self.appctx_id}-{self.io_data_id}]{message}\n")

    def add_node(self, data):
        data |= {
            "app_id": self.app_id,
            "agent_id": self.agent_id,
            "app_ctx_id": self.appctx_id,
            "io_data_id": self.io_data_id
        }
        node = self.graph.add_node("Data", data)
        return node

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass
