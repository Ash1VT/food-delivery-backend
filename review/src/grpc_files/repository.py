from typing import Union

from loguru import logger

from grpc_files.generated.roles.roles_pb2 import UserRole as GrpcUserRole
from repositories.interfaces.courier import ICourierRepository
from repositories.interfaces.customer import ICustomerRepository
from uow.generic import GenericUnitOfWork


def get_repository(role: GrpcUserRole, uow: GenericUnitOfWork) -> Union[ICustomerRepository, ICourierRepository, None]:
    """
    Returns the appropriate repository based on the given role.

    Args:
        role (UserRole): The role of the user.
        uow (GenericUnitOfWork): The unit of work object for interacting with the database.

    Returns:
        Union[ICustomerRepository, ICourierRepository, None]: The appropriate repository for the given role
        or None if the role is not supported.
    """

    if role == GrpcUserRole.USER_ROLE_CUSTOMER:
        return uow.customers
    elif role == GrpcUserRole.USER_ROLE_COURIER:
        return uow.couriers

    logger.warning(f"Unknown role type: {str(role)}")
