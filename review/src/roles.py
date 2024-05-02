from abc import ABC, abstractmethod


class UserRole(ABC):
    """
    Abstract base class for a user role.
    """

    @abstractmethod
    def __str__(self):
        raise NotImplementedError()


class CustomerRole(UserRole):
    """
    Role for a customer.
    """

    def __str__(self):
        return "Customer"


class CourierRole(UserRole):
    """
    Role for a courier.
    """

    def __str__(self):
        return "Courier"
