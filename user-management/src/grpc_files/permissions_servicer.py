from typing import Optional

from grpc import StatusCode

import grpc_files.generated.permissions_pb2_grpc as pb2_grpc
import grpc_files.generated.permissions_pb2 as pb2

from users.models import User, UserRole
from tokens.utils import get_user


class PermissionsServicer(pb2_grpc.PermissionsServicer):

    def _get_user(self, access_token: str, context) -> Optional[User]:
        if not access_token:
            context.abort(StatusCode.UNAUTHENTICATED, "Missing access token")
            return

        user = get_user(access_token=access_token)

        if not user:
            context.abort(StatusCode.UNAUTHENTICATED, "Invalid access token")
            return

        return user

    def CheckEmailVerifiedPermission(self, request, context):
        access_token = request.access_token
        user = self._get_user(access_token=access_token,
                              context=context)

        has_permission = user.is_email_verified if user else False

        return pb2.CheckPermissionResponse(has_permission=has_permission,
                                           user_id=user.id)

    def CheckCustomerPermission(self, request, context):
        access_token = request.access_token

        user = self._get_user(access_token=access_token,
                              context=context)

        has_permission = (user.is_email_verified and user.role == UserRole.CUSTOMER) if user else False

        return pb2.CheckPermissionResponse(has_permission=has_permission,
                                           user_id=user.id)

    def CheckCourierPermission(self, request, context):
        access_token = request.access_token

        user = self._get_user(access_token=access_token,
                              context=context)

        has_permission = (user.is_email_verified and user.role == UserRole.COURIER) if user else False

        return pb2.CheckPermissionResponse(has_permission=has_permission,
                                           user_id=user.id)

    def CheckRestaurantManagerPermission(self, request, context):
        access_token = request.access_token

        user = self._get_user(access_token=access_token,
                              context=context)

        has_permission = (user.is_email_verified and user.role == UserRole.RESTAURANT_MANAGER) if user else False

        return pb2.CheckPermissionResponse(has_permission=has_permission,
                                           user_id=user.id)

    def CheckModeratorPermission(self, request, context):
        access_token = request.access_token

        user = self._get_user(access_token=access_token,
                              context=context)

        has_permission = (user.is_email_verified and user.role == UserRole.MODERATOR) if user else False

        return pb2.CheckPermissionResponse(has_permission=has_permission,
                                           user_id=user.id)
