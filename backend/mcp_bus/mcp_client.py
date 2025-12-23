from fastmcp import Client
from fastmcp.client.transports import StdioTransport
import sys
import os
import asyncio
from pathlib import Path

# Standard MCP configuration with multiple servers
config = {
    "mcpServers": {
        "weather_get_forecast": {"command": "python", "args": ["./mcp_server.py"]},
        "assistant_answer_question": {"command": "python", "args": ["./mcp_server.py"]}
    }
}

# Create a client that connects to all servers
# client = Client(config)
mcp_path = Path(os.path.dirname(__file__)).parent/"mcp_bus"/"mcp_server.py"
python_path = Path(os.path.dirname(__file__)).parent
transport = StdioTransport(
    command=sys.executable,
    args=[str(mcp_path)],
    env={"PYTHONPATH": str(python_path)}
)

async def main():
    ids = {
        "app_id": 'u5es2cxxzw1x',
        "agent_id": 'xpesqfebvy5i',
        "app_ctx_id": 'hzro6t3dlyjw',
        "io_data_id": 'vkvgk30no3yq'
    }

    roots = [
        f"file://{ids['app_id']}",
        f"file://{ids['agent_id']}",
        f"file://{ids['app_ctx_id']}",
        f"file://{ids['io_data_id']}"
    ]

    async with Client(transport, roots=roots) as client:
        tools = await client.list_tools()
        print(tools)
        # ret = await client.call_tool("add", {"a": 1, "b": 1})
        # info = {'tool_name': 'test_mcp', 'tool_arguments': {'inp': 'upload'}}
        info = {'tool_name': 'read_docx_from_dir', 'tool_arguments': {'subdirectory': 'upload', "file_format": ".docx", "node_name": "分子公司月报"}}
        ret = await client.call_tool(info['tool_name'], info['tool_arguments'])
        print(ret.content[0].text)

        for tool in tools:
            print(f"name: {tool.name}")
            print(f"descript: {tool.description}")
            print(f"inputSchema: {tool.inputSchema}")


if __name__ == "__main__":
    asyncio.run(main())