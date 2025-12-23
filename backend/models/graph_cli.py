import argparse
import graph_db

class GraphManager:
    def __init__(self):
        self.default_list_key_num = 5

    def list_nodes(self, label):
        if label is None:
            nodes = graph_db.graph_query().list_all_node()
        else:
            nodes = graph_db.graph_query().get_node(label)
        for node in nodes:
            key_values = ",".join([f"{k}:{v[:20] if isinstance(v, str) else v}" for i, (k, v) in enumerate(node.items())
                                   if k not in ["label", "node_id"] and i < self.default_list_key_num])
            print(f"label: {node['label']}, node_id: {node.get('node_id')}, {key_values}")

    def list_edges(self, label, rel_types):
        rels = graph_db.graph_query().get_relationship(
            {
                "src_label": label,
                "rel_types": [rel_types],
                "hop_num": 1
            }
        )
        for r in rels:
            print(f"{r[0]['label']}, {r[0]['node_id']} -- {rel_types} --> {r[2]['label']}, {r[2]['node_id']}")

    def delete_all_nodes(self):
        graph_db.graph_service().clean_database()

    def delete_node(self, label, node_id=None):
        graph_db.graph_query().delete_node(label,
            {
                "node_id": node_id
            } if node_id is not None else None
        )

    def delete_edge(self, start_node, edge_type):
        pass


def main():
    graph_manager = GraphManager()

    # 创建解析器
    parser = argparse.ArgumentParser(description="节点和边管理工具")

    # 创建子命令解析器
    subparsers = parser.add_subparsers(dest="command", required=True, help="可用命令")

    # 1. 列出所有节点的命令
    list_nodes_parser = subparsers.add_parser("list-nodes", help="列出所有节点")
    list_nodes_parser.add_argument("-l", "--label", default=None, help="节点标签")
    list_nodes_parser.set_defaults(func=lambda args: graph_manager.list_nodes(args.label))

    # 2. 列出所有边的命令
    list_edges_parser = subparsers.add_parser("list-edges", help="列出所有边")
    list_edges_parser.add_argument("-l", "--label", required=True, help="节点标签")
    list_edges_parser.add_argument("-r", "--rel_types", required=True, help="边的类型")
    list_edges_parser.set_defaults(func=lambda args: graph_manager.list_edges(args.label, args.rel_types))


    # 3. 删除所有节点的命令
    delete_all_nodes_parser = subparsers.add_parser("delete-all-nodes", help="删除所有节点")
    delete_all_nodes_parser.set_defaults(func=lambda args: graph_manager.delete_all_nodes())

    # 4. 删除指定节点的命令
    delete_node_parser = subparsers.add_parser("delete-node", help="删除指定名字的节点")
    delete_node_parser.add_argument("-l", "--label", default=None, help="要删除的节点标签")
    delete_node_parser.add_argument("-i", "--node_id", default=None, help="要删除的节点标签")
    delete_node_parser.set_defaults(func=lambda args: graph_manager.delete_node(args.label, args.node_id))

    # 5. 删除指定边的命令
    delete_edge_parser = subparsers.add_parser("delete-edge", help="删除指定起点和类型的边")
    delete_edge_parser.add_argument("start_node", help="边的起点名称")
    delete_edge_parser.add_argument("edge_type", help="边的类型")
    delete_edge_parser.set_defaults(
        func=lambda args: graph_manager.delete_edge(args.start_node, args.edge_type)
    )

    # 解析命令行参数并执行对应的函数
    args = parser.parse_args()
    args.func(args)  # 调用通过 set_defaults 绑定的处理函数


if __name__ == "__main__":
    main()