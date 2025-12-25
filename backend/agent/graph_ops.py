class Ctx:
    def __init__(self, graph, dest_node):
        self.graph = graph
        self.root = dest_node

    def update_node(self, app_session, parent, node):
        if parent is None:
            # print(f"[update] parent_id: None, node_id: {node['node_id']}, title: {node.get('title', node.get('name', 'notitle'))}")
            return self.root
        else:
            # print(f"[update] parent_id: {parent['node_id']}, title: {parent.get('title', parent.get('name', 'notitle'))}， node_id: {node['node_id']}, title: {node.get('title', node.get('name', 'notitle'))}")
            pass

        rels = app_session.graph.get_relationship(
            {
                "src_label": "Data",
                "src_props": {"node_id": parent['node_id']},
                "rel_types": ['SUBHEADING'],
                "target_props": {"order": node.get('order', 0)},
                "hop_num": 1
            }
        )
        if not rels:
            copy_node = node.copy()
            del copy_node['node_id']
            new_node = app_session.graph.add_node("Data", copy_node)
            app_session.graph.add_relationship(
                "Data",
                parent['node_id'],
                "SUBHEADING",
                "Data",
                new_node['node_id']
            )
            return new_node
        else:
            return rels[0][2]

    def append_node(self, app_session, parent, node):
        if parent is None:
            # print(f"[append] parent_id: None, node_id: {node['node_id']}, title: {node.get('title', node.get('name', 'notitle'))}")
            parent = self.root
        else:
            # print(f"[append] parent_id: {parent['node_id']}, title: {parent.get('title', parent.get('name', 'notitle'))}, node_id: {node['node_id']}, title: {node.get('title', node.get('name', 'notitle'))}")
            pass

        copy_node = node.copy()
        del copy_node['node_id']
        copy_node |= {
            "app_id": app_session.app_id,
            "app_ctx_id": app_session.appctx_id,
            "io_data_id": app_session.io_data_id,
            "agent_id": app_session.agent_id
        }
        new_node = app_session.graph.add_node("Data", copy_node)
        app_session.graph.add_relationship(
            "Data",
            parent['node_id'],
            "SUBHEADING",
            "Data",
            new_node['node_id']
        )
        return new_node


def traverse_tree(app_session, ctx, parent, node, level):
    copy_node = None
    if node.get("level", 0) == level:
        copy_node = ctx.update_node(app_session, parent, node)
    elif node.get("level", 0) > level:
        copy_node = ctx.append_node(app_session, parent, node)

    rels = app_session.graph.get_relationship(
        {
            "src_label": "Data",
            "src_props": {"node_id": node['node_id']},
            "rel_types": ['SUBHEADING'],
            "hop_num": 1
        }
    )

    rels = sorted(rels, key=lambda odr: odr[2].get("order", 0))

    for _, _, n in rels:
        traverse_tree(app_session, ctx, copy_node, n, level)

def merge_tree(app_session, root_node, level, dest_node_name):
    # Delete old node
    app_session.graph.delete_node("Data", {
        "io_data_id": app_session.io_data_id
    })
    dest_node = app_session.graph.add_node("Data", {
        "app_id": app_session.app_id,
        "agent_id": app_session.agent_id,
        "app_ctx_id": app_session.appctx_id,
        "io_data_id": app_session.io_data_id,
        "name": dest_node_name
    })
    ctx = Ctx(app_session.graph, dest_node)
    traverse_tree(app_session, ctx, None, root_node, level)


def copy_to(app_session, src_node, target_node, level = 1):
    ctx = Ctx(app_session.graph, target_node)
    traverse_tree(app_session, ctx, None, src_node, level)

