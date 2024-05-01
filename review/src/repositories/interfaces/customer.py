from abc import ABC, abstractmethod
from typing import Optional

from models.customer import CustomerModel, CustomerCreateModel, CustomerUpdateModel


class ICustomerRepository(ABC):
    """
    Interface for customer repository.
    """

    @abstractmethod
    async def retrieve(self, id: int) -> Optional[CustomerModel]:
        """
        Retrieve a customer by its ID.

        Args:
            id (int): The ID of the customer to retrieve.

        Returns:
            Optional[CustomerModel]: The retrieved customer or None if not found.
        """

        raise NotImplementedError

    @abstractmethod
    async def create(self, customer: CustomerCreateModel) -> CustomerModel:
        """
        Create a new customer and return it.

        Args:
            customer (CustomerCreateModel): The customer to create.

        Returns:
            CustomerModel: The created customer.
        """

        raise NotImplementedError

    @abstractmethod
    async def update(self, id: int, customer: CustomerUpdateModel) -> Optional[CustomerModel]:
        """
        Update a customer by its ID.

        Args:
            id (int): The ID of the customer to update.
            customer (CustomerUpdateModel): The updated customer data.

        Returns:
            Optional[CustomerModel]: The updated customer or None if not found.
        """

        raise NotImplementedError

    @abstractmethod
    async def delete(self, id: int) -> None:
        """
        Delete a customer by its ID.

        Args:
            id (int): The ID of the customer to delete.
        """

        raise NotImplementedError
