from . import pathresolver
from .generated.roles import roles_pb2_grpc as pb2_grpc
from .roles_servicer import RolesServicer


def grpc_hook(server):
    pb2_grpc.add_RolesServiceServicer_to_server(RolesServicer(), server)
