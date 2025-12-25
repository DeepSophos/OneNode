import weakref
from models.graph_db import graph_query

class IOData:
    def __init__(self, owner):
        self.owner = weakref.ref(owner)

    def load_data(self, data_id):
        return self.owner().graph().get_node("IOData", {"node_id": data_id})[0]

    def save_data(self, data):
        if "node_id" in data:
            node = self.owner().graph().get_node("IOData", {"node_id": data['node_id']})
            if node:
                self.owner().graph().update_node("IOData", {"node_id": data['node_id']}, data)
                return data
        return self.owner().graph().add_node("IOData", data|{"app_id": self.owner().node_id})

    def list_data(self, options=None):
        if options is None:
            options = {}
        return self.owner().graph().get_node("IOData", options|{"app_id": self.owner().node_id})

    def delete_data(self, data):
        self.owner().graph().delete_node("IOData", data)

    def find_node(self, data: dict):
        return self.owner().graph().get_node("IOData", data)