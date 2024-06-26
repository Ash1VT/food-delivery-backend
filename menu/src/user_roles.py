from abc import ABC, abstractmethod
from grpc_files.generated.roles.roles_pb2 import UserRole as GrpcUserRole

__all__ = [
    "UserRole",
    "RestaurantManagerRole",
]


class UserRole(ABC):
    """
    Abstract base class for a user role.
    """

    @property
    @abstractmethod
    def grpc_role(self):
        """
        Returns the gRPC representation of the role.
        """

        raise NotImplementedError()

    @abstractmethod
    def __str__(self):
        raise NotImplementedError()


class RestaurantManagerRole(UserRole):
    """
    Role for a restaurant manager.
    """

    @property
    def grpc_role(self):
        return GrpcUserRole.USER_ROLE_RESTAURANT_MANAGER

    def __str__(self):
        return "Restaurant Manager"
