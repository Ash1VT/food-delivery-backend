from abc import ABC, abstractmethod


class UserRole(ABC):
    """
    Abstract base class for a user role.
    """

    # @property
    # @abstractmethod
    # def grpc_role(self):
    #     """
    #     Returns the gRPC representation of the role.
    #     """
    #
    #     raise NotImplementedError()

    @abstractmethod
    def __str__(self):
        raise NotImplementedError()


class CustomerRole(UserRole):
    """
    Role for a customer.
    """

    # @property
    # def grpc_role(self):
    #     return GrpcUserRole.RESTAURANT_MANAGER

    def __str__(self):
        return "Customer"


class CourierRole(UserRole):
    """
    Role for a courier.
    """

    # @property
    # def grpc_role(self):
    #     return GrpcUserRole.MODERATOR

    def __str__(self):
        return "Courier"
