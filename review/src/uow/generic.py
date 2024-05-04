from abc import ABC, abstractmethod

from repositories.interfaces.courier import ICourierRepository
from repositories.interfaces.customer import ICustomerRepository
from repositories.interfaces.menu_item import IMenuItemRepository
from repositories.interfaces.order import IOrderRepository
from repositories.interfaces.restaurant import IRestaurantRepository
from repositories.interfaces.review import IReviewRepository


class GenericUnitOfWork(ABC):
    """
    Abstract base class for a generic unit of work (UOW) context manager.

    This class defines the basic structure of a unit of work context manager. Subclasses should implement the
    `commit` and `rollback` methods to provide transaction control logic specific to the data store.
    """

    customers: ICustomerRepository
    couriers: ICourierRepository
    menu_items: IMenuItemRepository
    orders: IOrderRepository
    restaurants: IRestaurantRepository
    reviews: IReviewRepository

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_value, traceback):
        await self.rollback()

    @abstractmethod
    async def commit(self):
        """
        Commit the transaction.

        This method should be implemented to commit the changes made during the transaction.
        """

        raise NotImplementedError()

    @abstractmethod
    async def rollback(self):
        """
        Rollback the transaction.

        This method should be implemented to roll back any changes made during the transaction.
        """

        raise NotImplementedError()
