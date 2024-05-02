from typing import Any, List

from loguru import logger

from grpc_files.generated.roles.roles_pb2 import UserRole as GrpcUserRole
from roles import UserRole
from uow.generic import GenericUnitOfWork


def get_repository(role: GrpcUserRole,
                   uow: GenericUnitOfWork,
                   app_roles: List[UserRole]) -> Any:
    """
    Returns the appropriate repository based on the given role.

    Args:
        role (UserRole): The role of the user.
        uow (GenericUnitOfWork): The unit of work object for interacting with the database.
        app_roles (List[UserRole]): The list of supported roles in the application.

    Returns:
        Any: The appropriate repository for the given role or None if the role is not supported.
    """

    for role_type in app_roles:
        if role_type.get_grpc_role() == role:
            return role_type.get_repository(uow)

    logger.warning(f"Unknown role type: {str(role)}")
