import grpc
from loguru import logger

import grpc_files.generated.roles.roles_pb2_grpc as pb2_grpc
import grpc_files.generated.roles.roles_pb2 as pb2

__all__ = ["RolesClient"]


class RolesClient(object):
    """
    Client for gRPC functionality
    """

    def __init__(self, host: str, port: int):
        self.host = host
        self.server_port = port

        # instantiate a channel
        self.channel = grpc.insecure_channel(
            '{}:{}'.format(self.host, self.server_port))

        # bind the client
        self.stub = pb2_grpc.RolesServiceStub(self.channel)

    def get_user_role(self, access_token: str) -> pb2.GetUserRoleResponse:
        request = pb2.GetUserRoleRequest(access_token=access_token)
        response = self.stub.GetUserRole(request)

        logger.info(f"Got gRPC response for user with id={response.user_id} and role={response.role}")

        return response
