import grpc
import grpc_files.generated.permissions_pb2_grpc as pb2_grpc
import grpc_files.generated.permissions_pb2 as pb2


class PermissionsClient(object):
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
        self.stub = pb2_grpc.PermissionsStub(self.channel)

    def check_restaurant_manager_permission(self, access_token):
        request = pb2.CheckPermissionRequest(access_token=access_token)
        return self.stub.CheckRestaurantManagerPermission(request)
