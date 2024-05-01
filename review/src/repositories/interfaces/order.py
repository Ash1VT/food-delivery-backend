from abc import ABC, abstractmethod
from typing import Optional

from models.order import OrderModel, OrderCreateModel


class IOrderRepository(ABC):
    """
    Interface for order repository.
    """

    @abstractmethod
    async def retrieve(self, id: int) -> Optional[OrderModel]:
        """
        Retrieve an order by its ID.

        Args:
            id (int): The ID of the order to retrieve.

        Returns:
            Optional[OrderModel]: The retrieved order or None if not found.
        """

        raise NotImplementedError

    @abstractmethod
    async def create(self, order: OrderCreateModel) -> OrderModel:
        """
        Create a new order and return it.

        Args:
            order (OrderCreateModel): The order to create.

        Returns:
            OrderModel: The created order.
        """

        raise NotImplementedError

    @abstractmethod
    async def delete(self, id: int) -> None:
        """
        Delete an order by its ID.

        Args:
            id (int): The ID of the order to delete.
        """

        raise NotImplementedError
