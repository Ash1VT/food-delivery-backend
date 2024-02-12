from typing import Optional

from grpc import StatusCode

import grpc_files.generated.roles.roles_pb2_grpc as pb2_grpc
import grpc_files.generated.roles.roles_pb2 as pb2

from users.models import User, UserRole
from tokens.utils import get_user


class RolesServicer(pb2_grpc.RolesServiceServicer):

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

        if user.is_staff:
            context.abort(StatusCode.UNAUTHENTICATED, "User is staff")
            return

        return user

    def GetUserRole(self, request, context):
        access_token = request.access_token
        user = self._get_user(access_token=access_token,
                              context=context)

        match user.role:
            case UserRole.CUSTOMER:
                role = pb2.UserRole.USER_ROLE_CUSTOMER
            case UserRole.COURIER:
                role = pb2.UserRole.USER_ROLE_COURIER
            case UserRole.RESTAURANT_MANAGER:
                role = pb2.UserRole.USER_ROLE_RESTAURANT_MANAGER
            case UserRole.MODERATOR:
                role = pb2.UserRole.USER_ROLE_MODERATOR
            case _:
                role = pb2.UserRole.USER_ROLE_UNSPECIFIED

        return pb2.GetUserRoleResponse(user_id=str(user.id), role=role)
