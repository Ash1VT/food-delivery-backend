from abc import ABC, abstractmethod
from grpc_files.generated.roles_pb2 import UserRole as GrpcUserRole


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
        return GrpcUserRole.RESTAURANT_MANAGER

    def __str__(self):
        return "Restaurant Manager"


class ModeratorRole(UserRole):
    """
    Role for a moderator.
    """

    @property
    def grpc_role(self):
        return GrpcUserRole.MODERATOR

    def __str__(self):
        return "Moderator"
