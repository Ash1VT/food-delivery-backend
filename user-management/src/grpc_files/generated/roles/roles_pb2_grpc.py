# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from grpc_files.generated.roles import roles_pb2 as roles_dot_roles__pb2


class RolesServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.GetUserRole = channel.unary_unary(
                '/roles.RolesService/GetUserRole',
                request_serializer=roles_dot_roles__pb2.GetUserRoleRequest.SerializeToString,
                response_deserializer=roles_dot_roles__pb2.GetUserRoleResponse.FromString,
                )


class RolesServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def GetUserRole(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_RolesServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'GetUserRole': grpc.unary_unary_rpc_method_handler(
                    servicer.GetUserRole,
                    request_deserializer=roles_dot_roles__pb2.GetUserRoleRequest.FromString,
                    response_serializer=roles_dot_roles__pb2.GetUserRoleResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'roles.RolesService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class RolesService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def GetUserRole(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/roles.RolesService/GetUserRole',
            roles_dot_roles__pb2.GetUserRoleRequest.SerializeToString,
            roles_dot_roles__pb2.GetUserRoleResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
