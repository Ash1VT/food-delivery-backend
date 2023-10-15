# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import grpc_files.generated.permissions_pb2 as permissions__pb2


class PermissionsStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.CheckEmailVerifiedPermission = channel.unary_unary(
                '/permissions.Permissions/CheckEmailVerifiedPermission',
                request_serializer=permissions__pb2.CheckPermissionRequest.SerializeToString,
                response_deserializer=permissions__pb2.CheckPermissionResponse.FromString,
                )
        self.CheckCustomerPermission = channel.unary_unary(
                '/permissions.Permissions/CheckCustomerPermission',
                request_serializer=permissions__pb2.CheckPermissionRequest.SerializeToString,
                response_deserializer=permissions__pb2.CheckPermissionResponse.FromString,
                )
        self.CheckCourierPermission = channel.unary_unary(
                '/permissions.Permissions/CheckCourierPermission',
                request_serializer=permissions__pb2.CheckPermissionRequest.SerializeToString,
                response_deserializer=permissions__pb2.CheckPermissionResponse.FromString,
                )
        self.CheckRestaurantManagerPermission = channel.unary_unary(
                '/permissions.Permissions/CheckRestaurantManagerPermission',
                request_serializer=permissions__pb2.CheckPermissionRequest.SerializeToString,
                response_deserializer=permissions__pb2.CheckPermissionResponse.FromString,
                )
        self.CheckModeratorPermission = channel.unary_unary(
                '/permissions.Permissions/CheckModeratorPermission',
                request_serializer=permissions__pb2.CheckPermissionRequest.SerializeToString,
                response_deserializer=permissions__pb2.CheckPermissionResponse.FromString,
                )


class PermissionsServicer(object):
    """Missing associated documentation comment in .proto file."""

    def CheckEmailVerifiedPermission(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def CheckCustomerPermission(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def CheckCourierPermission(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def CheckRestaurantManagerPermission(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def CheckModeratorPermission(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_PermissionsServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'CheckEmailVerifiedPermission': grpc.unary_unary_rpc_method_handler(
                    servicer.CheckEmailVerifiedPermission,
                    request_deserializer=permissions__pb2.CheckPermissionRequest.FromString,
                    response_serializer=permissions__pb2.CheckPermissionResponse.SerializeToString,
            ),
            'CheckCustomerPermission': grpc.unary_unary_rpc_method_handler(
                    servicer.CheckCustomerPermission,
                    request_deserializer=permissions__pb2.CheckPermissionRequest.FromString,
                    response_serializer=permissions__pb2.CheckPermissionResponse.SerializeToString,
            ),
            'CheckCourierPermission': grpc.unary_unary_rpc_method_handler(
                    servicer.CheckCourierPermission,
                    request_deserializer=permissions__pb2.CheckPermissionRequest.FromString,
                    response_serializer=permissions__pb2.CheckPermissionResponse.SerializeToString,
            ),
            'CheckRestaurantManagerPermission': grpc.unary_unary_rpc_method_handler(
                    servicer.CheckRestaurantManagerPermission,
                    request_deserializer=permissions__pb2.CheckPermissionRequest.FromString,
                    response_serializer=permissions__pb2.CheckPermissionResponse.SerializeToString,
            ),
            'CheckModeratorPermission': grpc.unary_unary_rpc_method_handler(
                    servicer.CheckModeratorPermission,
                    request_deserializer=permissions__pb2.CheckPermissionRequest.FromString,
                    response_serializer=permissions__pb2.CheckPermissionResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'permissions.Permissions', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class Permissions(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def CheckEmailVerifiedPermission(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/permissions.Permissions/CheckEmailVerifiedPermission',
            permissions__pb2.CheckPermissionRequest.SerializeToString,
            permissions__pb2.CheckPermissionResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def CheckCustomerPermission(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/permissions.Permissions/CheckCustomerPermission',
            permissions__pb2.CheckPermissionRequest.SerializeToString,
            permissions__pb2.CheckPermissionResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def CheckCourierPermission(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/permissions.Permissions/CheckCourierPermission',
            permissions__pb2.CheckPermissionRequest.SerializeToString,
            permissions__pb2.CheckPermissionResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def CheckRestaurantManagerPermission(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/permissions.Permissions/CheckRestaurantManagerPermission',
            permissions__pb2.CheckPermissionRequest.SerializeToString,
            permissions__pb2.CheckPermissionResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def CheckModeratorPermission(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/permissions.Permissions/CheckModeratorPermission',
            permissions__pb2.CheckPermissionRequest.SerializeToString,
            permissions__pb2.CheckPermissionResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
