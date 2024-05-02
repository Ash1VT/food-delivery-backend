from abc import ABC, abstractmethod
from typing import Any

from grpc_files.generated.roles.roles_pb2 import UserRole as GrpcUserRole
from repositories.interfaces.courier import ICourierRepository
from repositories.interfaces.customer import ICustomerRepository
from uow.generic import GenericUnitOfWork


class UserRole(ABC):
    """
    Abstract base class for a user role.
    """

    @staticmethod
    @abstractmethod
    def get_repository(uow: GenericUnitOfWork) -> Any:
        raise NotImplementedError()

    @staticmethod
    @abstractmethod
    def get_grpc_role() -> GrpcUserRole:
        raise NotImplementedError()

    @abstractmethod
    def __str__(self):
        raise NotImplementedError()


class CustomerRole(UserRole):
    """
    Role for a customer.
    """

    @staticmethod
    def get_repository(uow: GenericUnitOfWork) -> ICustomerRepository:
        return uow.customers

    @staticmethod
    def get_grpc_role() -> GrpcUserRole:
        return GrpcUserRole.USER_ROLE_CUSTOMER

    def __str__(self):
        return "Customer"


class CourierRole(UserRole):
    """
    Role for a courier.
    """

    @staticmethod
    def get_repository(uow: GenericUnitOfWork) -> ICourierRepository:
        return uow.couriers

    @staticmethod
    def get_grpc_role() -> GrpcUserRole:
        return GrpcUserRole.USER_ROLE_COURIER

    def __str__(self):
        return "Courier"
