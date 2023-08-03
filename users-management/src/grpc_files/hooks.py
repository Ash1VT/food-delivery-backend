from .generated import permissions_pb2_grpc as pb2_grpc
from .permissions_servicer import PermissionsServicer


def grpc_hook(server):
    pb2_grpc.add_PermissionsServicer_to_server(PermissionsServicer(), server)
