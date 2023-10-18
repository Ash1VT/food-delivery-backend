from typing import Optional

from grpc import StatusCode

import grpc_files.generated.roles_pb2_grpc as pb2_grpc
import grpc_files.generated.roles_pb2 as pb2

from users.models import User, UserRole
from tokens.utils import get_user


class RolesServicer(pb2_grpc.RolesServicer):

    def _get_user(self, access_token: str, context) -> Optional[User]:
        if not access_token:
            context.abort(StatusCode.INVALID_ARGUMENT, "Missing access token")
            return

        user = get_user(access_token=access_token)

        if not user:
            context.abort(StatusCode.INVALID_ARGUMENT, "Invalid access token")
            return

        if not user.is_active:
            context.abort(StatusCode.UNAUTHENTICATED, "User isn't active")
            return

        if not user.is_email_verified:
            context.abort(StatusCode.UNAUTHENTICATED, "User has got unverified email")
            return

        return user

    def GetUserRole(self, request, context):
        access_token = request.access_token
        user = self._get_user(access_token=access_token,
                              context=context)

        match user.role:
            case UserRole.CUSTOMER:
                role = pb2.UserRole.CUSTOMER
            case UserRole.COURIER:
                role = pb2.UserRole.COURIER
            case UserRole.RESTAURANT_MANAGER:
                role = pb2.UserRole.RESTAURANT_MANAGER
            case UserRole.MODERATOR:
                role = pb2.UserRole.MODERATOR
            case _:
                context.abort(StatusCode.UNAUTHENTICATED, "User hasn't got CUSTOMER, COURIER, "
                                                          "RESTAURANT_MANAGER or MODERATOR role")
                return

        return pb2.GetUserRoleResponse(user_id=user.id, role=role)
<<<<<<< HEAD
=======

    # def CheckEmailVerifiedPermission(self, request, context):
    #     access_token = request.access_token
    #     user = self._get_user(access_token=access_token,
    #                           context=context)
    #
    #     has_permission = user.is_email_verified if user else False
    #
    #     return pb2.CheckPermissionResponse(has_permission=has_permission,
    #                                        user_id=user.id)
    #
    # def CheckCustomerPermission(self, request, context):
    #     access_token = request.access_token
    #
    #     user = self._get_user(access_token=access_token,
    #                           context=context)
    #
    #     has_permission = (user.is_email_verified and user.role == UserRole.CUSTOMER) if user else False
    #
    #     return pb2.CheckPermissionResponse(has_permission=has_permission,
    #                                        user_id=user.id)
    #
    # def CheckCourierPermission(self, request, context):
    #     access_token = request.access_token
    #
    #     user = self._get_user(access_token=access_token,
    #                           context=context)
    #
    #     has_permission = (user.is_email_verified and user.role == UserRole.COURIER) if user else False
    #
    #     return pb2.CheckPermissionResponse(has_permission=has_permission,
    #                                        user_id=user.id)
    #
    # def CheckRestaurantManagerPermission(self, request, context):
    #     access_token = request.access_token
    #
    #     user = self._get_user(access_token=access_token,
    #                           context=context)
    #
    #     has_permission = (user.is_email_verified and user.role == UserRole.RESTAURANT_MANAGER) if user else False
    #
    #     return pb2.CheckPermissionResponse(has_permission=has_permission,
    #                                        user_id=user.id)
    #
    # def CheckModeratorPermission(self, request, context):
    #     access_token = request.access_token
    #
    #     user = self._get_user(access_token=access_token,
    #                           context=context)
    #
    #     has_permission = (user.is_email_verified and user.role == UserRole.MODERATOR) if user else False
    #
    #     return pb2.CheckPermissionResponse(has_permission=has_permission,
    #                                        user_id=user.id)
>>>>>>> 537e36c (replaced with one grpc request)
