import os
import json
from collections import defaultdict
from typing import Any
import logging
import mgclient
import string
import random
import traceback


logger = logging.getLogger(__name__)
# logger.setLevel('DEBUG')

# console_handler = logging.StreamHandler()
# console_handler.setLevel(logging.INFO)
# logger.addHandler(console_handler)

graph_service_ = None
graph_query_ = None

def graph_service():
    global graph_service_
    if graph_service_ is None:
        graph_service_ = GraphService()
    return graph_service_

def graph_query():
    global graph_query_
    if graph_query_ is None:
        graph_query_ = GraphQuery()
    return graph_query_


def get_unique_id():
    # Define the character set: lowercase letters and digits
    characters = string.ascii_lowercase + string.digits
    # Generate a 12-character ID by randomly selecting from the character set
    unique_id = ''.join(random.choice(characters) for _ in range(12))
    return unique_id

class GraphService:
    """Handles all communication and query execution with the Memgraph database."""

    def __init__(self, batch_size: int = 1000):
        host, port = os.environ.get("MEM_GRAPH_URL", "127.0.0.1:7687").split(":")
        self._host = host
        self._port = int(port)
        self.batch_size = batch_size
        self.conn: mgclient.Connection | None = None
        self.node_buffer: list[tuple[str, dict[str, Any]]] = []
        self.relationship_buffer: list[tuple[tuple, str, tuple, dict | None]] = []

    def __enter__(self):
        logger.info(f"Connecting to Memgraph at {self._host}:{self._port}...")
        self.conn = mgclient.connect(host=self._host, port=self._port)
        self.conn.autocommit = True
        logger.info("Successfully connected to Memgraph.")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            logger.error(
                f"An exception occurred: {exc_val}. Flushing remaining items...",
                exc_info=True,
            )
        self.flush_all()
        if self.conn:
            self.conn.close()
            logger.info("\nDisconnected from Memgraph.")

    def execute_query(
        self, query: str, params: dict[str, Any] | None = None
    ) -> list:
        if not self.conn:
            raise ConnectionError("Not connected to Memgraph.")
        params = params or {}
        cursor = None
        try:
            cursor = self.conn.cursor()
            cursor.execute(query, params)
            if not cursor.description:
                return []
            column_names = [desc.name for desc in cursor.description]
            return [dict(zip(column_names, row)) for row in cursor.fetchall()]
        except Exception as e:
            if (
                "already exists" not in str(e).lower()
                and "constraint" not in str(e).lower()
            ):
                logger.error(f"!!! Cypher Error: {e}")
                logger.error(f"    Query: {query}")
                logger.error(f"    Params: {params}")
            raise
        finally:
            if cursor:
                cursor.close()

    def _execute_batch(self, query: str, params_list: list[dict[str, Any]]) -> None:
        if not self.conn or not params_list:
            return
        cursor = None
        try:
            cursor = self.conn.cursor()
            batch_query = f"UNWIND $batch AS row\n{query}"
            cursor.execute(batch_query, {"batch": params_list})
        except Exception as e:
            if "already exists" not in str(e).lower():
                logger.error(f"!!! Batch Cypher Error: {e}")
        finally:
            if cursor:
                cursor.close()

    def clean_database(self) -> None:
        logger.info("--- Cleaning database... ---")
        self.execute_query("MATCH (n) DETACH DELETE n;")
        logger.info("--- Database cleaned. ---")

    def ensure_constraints(self, constraints) -> None:
        logger.info("Ensuring constraints...")
        for label, prop in constraints.items():
            try:
                self.execute_query(
                    f"CREATE CONSTRAINT ON (n:{label}) ASSERT n.{prop} IS UNIQUE;"
                )
            except Exception:
                pass
        logger.info("Constraints checked/created.")

    def ensure_node_batch(self, label: str, properties: dict[str, Any] = {}) -> None:
        self.node_buffer.append((label, properties))
        if len(self.node_buffer) >= self.batch_size:
            self.flush_nodes()

    def ensure_relationship_batch(
        self,
        from_node: tuple,
        rel_type: str,
        to_node: tuple,
        properties: dict[str, Any] | None = None,
    ) -> None:
        self.relationship_buffer.append((from_node, rel_type, to_node, properties))
        if len(self.relationship_buffer) >= self.batch_size:
            self.flush_relationships()

#  {{node_id: row.{'node_id'}}}
    def flush_nodes(self) -> None:
        if not self.node_buffer:
            return

        nodes_by_label = defaultdict(list)
        for label, props in self.node_buffer:
            props['node_id'] = get_unique_id()
            nodes_by_label[label].append(props)
        for label, props_list in nodes_by_label.items():
            if not props_list:
                continue
            # prop_keys = list([k for k in props_list[0].keys() if k != 'node_id'])
            prop_keys = list(props_list[0].keys())
            set_clause = ", ".join([f"n.{key} = row.{key}" for key in prop_keys])
            query = (
                f"MERGE (n:{label} {{node_id: row.node_id}}) "
                f"ON CREATE SET {set_clause} ON MATCH SET {set_clause}"
            )
            # print(query)
            self._execute_batch(query, props_list)
        logger.info(f"Flushed {len(self.node_buffer)} nodes.")
        self.node_buffer.clear()

    def flush_relationships(self) -> None:
        if not self.relationship_buffer:
            return

        rels_by_pattern = defaultdict(list)
        for from_node, rel_type, to_node, props in self.relationship_buffer:
            pattern = (from_node[0], from_node[1], rel_type, to_node[0], to_node[1])
            rels_by_pattern[pattern].append(
                {"from_val": from_node[2], "to_val": to_node[2], "props": props or {}}
            )
        for pattern, params_list in rels_by_pattern.items():
            from_label, from_key, rel_type, to_label, to_key = pattern
            query = (
                f"MATCH (a:{from_label} {{{from_key}: row.from_val}}), "
                f"(b:{to_label} {{{to_key}: row.to_val}})\n"
                f"MERGE (a)-[r:{rel_type}]->(b)"
            )
            if any(p["props"] for p in params_list):
                query += "\nSET r += row.props"
            self._execute_batch(query, params_list)
        logger.info(f"Flushed {len(self.relationship_buffer)} relationships.")
        self.relationship_buffer.clear()

    def flush_all(self) -> None:
        logger.info("--- Flushing all pending writes to database... ---")
        self.flush_nodes()
        self.flush_relationships()
        logger.info("--- Flushing complete. ---")


def get_relationship_strings(query_info):
    if start := query_info.get('src_label', None):
        start_str = f"start:{start}"
    else:
        start_str = "start"

    if src_props := query_info.get('src_props', None):
        src_props_str = '{' + ",".join([f"{k}: '{v}'" if isinstance(v, str) else f"{k}: {v}"
                                        for k, v in src_props.items()]) + '}'
    else:
        src_props_str = ""

    if target_props := query_info.get("target_props", None):
        target_props_str = '{' + ",".join([f"{k}: '{v}'" if isinstance(v, str) else f"{k}: {v}"
                                           for k, v in target_props.items()]) + '}'
    else:
        target_props_str = ""

    if rel_types := query_info.get('rel_types', None):
        if isinstance(rel_types, str):
            rel_type_str = f":{rel_types}"
        else:
            rel_type_str = ':' + '|'.join(rel_types)
    else:
        rel_type_str = ''

    hop_num = query_info.get("hop_num", '')

    return {
        "start_str": start_str,
        "target_props_str": target_props_str,
        "src_props_str": src_props_str,
        "rel_type_str": rel_type_str,
        "hop_num": hop_num
    }


class GraphQuery:
    def __init__(self):
        pass

    def list_all_node(self):
        with GraphService() as gs:
            node_list = gs.execute_query('MATCH (n) RETURN n')
        return [n['n'].properties|{'label': list(n['n'].labels)} for n in node_list]

    def decode_node(self, node):
        ret = {}
        for k, v in node.items():
            if k.endswith("_json_data"):
                try:
                    ret |= {
                        k.replace("_json_data", ""): json.loads(v)
                    }
                except Exception as e:
                    print(v)
                    print(e)
                    traceback.print_exc()
                    raise
            else:
                ret |= {k: v}
        return ret

    def get_node(self, label, query_info=None):
        """
        query_info:  None, if we get all node with specified label
                     dict, if we need to match all node with same properties defined by the dict.
        """
        with GraphService() as gs:
            param = {'label': label}
            if not query_info:
                cypher = 'MATCH (n:$label) RETURN n'
            # elif query_info.get('node_id', None):
            #     cypher = 'MATCH (n:$label {node_id:$param}) RETURN n'
            #     param |= {'param': query_info['node_id']}
            # else:
            else:
                kvs = []
                for k, v in query_info.items():
                    if isinstance(v, str):
                        kvs.append(f"{k}:'{v}'")
                    else:
                        kvs.append(f"{k}:{v}")
                params = "{"
                params += ",".join(kvs)
                params += "}"
                cypher = f'MATCH (n:$label {params}) RETURN n'
            if param is None:
                n = gs.execute_query(cypher)
            else:
                n = gs.execute_query(cypher, param)

        return [self.decode_node(i['n'].properties|{'label': list(i['n'].labels)}) for i in n]

    def get_params(self, prefix, props, sep=":"):
        fmt_params = {
            f"{prefix}_prop_str": "{" + ",".join([f"{key}{sep} ${prefix}_{key}" if isinstance(
                value, (float,int)) else f"{key}{sep} ${prefix}_{key}" if isinstance(
                value, str) else f"{key}_json_data{sep} ${prefix}_{key}"
                                               for key, value in props.items()]) + "}",
        }
        params = {
            f"{prefix}_{key}": value if isinstance(value, (int, float, str)) else json.dumps(value)
            for key, value in props.items()
        }
        return fmt_params, params


    def add_node(self, label, props):
        """
            label: The node matched label
            src_props: the properties needs to be matched when find the nodes
            target_props: the properties needs to be updated
        """
        cypher_tmpl = """CREATE(n:$label {target_prop_str})
        RETURN n"""
        props |= {'node_id': get_unique_id()}
        fmt_params, params = self.get_params("target", props)
        cypher = cypher_tmpl.format(**fmt_params)
        with GraphService() as gs:
            node = gs.execute_query(cypher, params|{'label': label})

        return node[0]['n'].properties

    def update_node(self, label, src_props, target_props):
        """
            label: The node matched label
            src_props: the properties needs to be matched when find the nodes
            target_props: the properties needs to be updated
        """
        cypher_tmpl = """MERGE (n:$label {src_prop_str})
            SET n={target_prop_str}
            RETURN n
        """
        fmt_params, params = self.get_params("src", src_props)
        fmt_params2, params2 = self.get_params("target", target_props)
        cypher = cypher_tmpl.format(**(fmt_params|fmt_params2))
        with GraphService() as gs:
            node = gs.execute_query(cypher, params|params2|{'label': label})

        return node

    def get_relationship(self, query_info):
        """
        src_label: None or str
        src_props: dict of source node props, default None
        target_props: dict of target node props, default None
        src_prop_keys: list of node_fields, default None
        target_prop_keys: list of node_fields, default None
        rel_types: list of relationship types, default None
        hop_num: n or n1..n2, default *
        """
        cypher = """
            MATCH path = ({start_str} {src_props_str})-[{rel_type_str}*{hop_num}]->(end {target_props_str})
            UNWIND relationships(path) AS row
            WITH DISTINCT row
            RETURN 
              startNode(row) AS start_props,
              labels(startNode(row)) as start_label,
              endNode(row) AS end_props,
              labels(endNode(row)) as end_label,
              type(row) AS rel_type
        """

        with GraphService() as gs:
            rel_list = gs.execute_query(cypher.format(**get_relationship_strings(query_info)))

        rel_list = [(self.decode_node(row['start_props'].properties|{"label": row['start_label']}),
                     row['rel_type'],
                     self.decode_node(row['end_props'].properties|{"label": row['end_label']})) for row in rel_list]

        src_prop_keys = query_info.get('src_prop_keys', None)
        target_prop_keys = query_info.get('target_prop_keys', None)

        if src_prop_keys and target_prop_keys is None:
            return [
                ({k: src[k] for k in src_prop_keys},
                 rel_types,
                 target) for src, rel_types, target in rel_list
            ]
        elif src_prop_keys is None and target_prop_keys:
            return [
                (src,
                 rel_types,
                 {k: target[k] for k in target_prop_keys}) for src, rel_types, target in rel_list
            ]
        elif src_prop_keys and target_prop_keys:
            return [
                ({k: src[k] for k in src_prop_keys},
                 rel_types,
                 {k: target[k] for k in target_prop_keys}) for src, rel_types, target in rel_list
            ]

        return rel_list

    def delete_node(self, label, props=None):
        """
        delete node with props
        """
        cypher_tmpl = """MATCH (n:{label} {prop_str})
                         DETACH DELETE n;"""
        if props:
            prop_str = "{"+ ",".join([f"{key}:{value}" if isinstance(value, (float, int)) else f"{key}:'{value}'" if isinstance(value, str) else f"{key}_json_data:'{json.dumps(value)}'"
                                             for key, value in props.items()]) + "}"
        else:
            prop_str = ""
        with GraphService() as gs:
            gs.execute_query(cypher_tmpl.format(label=label, prop_str=prop_str))

    def delete_relationship(self, query_info):
        """
        src_label: None or str
        src_props: dict of source node props, default None
        target_props: dict of target node props, default None
        prop_keys: list of node_fields, default None
        rel_types: list of relationship types, default None
        hop_num: n or n1..n2, default *
        """
        cypher = """
            MATCH ({start_str} {src_props_str})-[rel{rel_type_str}]->(end {target_props_str})
            DELETE rel
        """

        with GraphService() as gs:
            rel_list = gs.execute_query(cypher.format(**get_relationship_strings(query_info)))
        return len(rel_list)

    def add_relationship(self, src_label, src_id, rel_types, dest_label, dest_id):
        src_nodes = self.get_node(src_label, {"node_id": src_id})
        dest_nodes = self.get_node(dest_label, {"node_id": dest_id})
        if not src_nodes:
            return {"status": "Failed", "reason": f"node_id: {src_id} does not exist."}
        if not dest_nodes:
            return {"status": "Failed", "reason": f"node_id: {dest_id} does not exist."}
        with GraphService() as gs:
            gs.ensure_relationship_batch(
                (src_label, "node_id", src_id),
                rel_types,
                (dest_label, "node_id", dest_id)
            )
        return {"status": "successfully"}

