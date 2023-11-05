from abc import ABC, abstractmethod
from typing import Callable

from repositories import WorkingHoursRepository, RestaurantRepository, RestaurantManagerRepository, ModeratorRepository

from sqlalchemy.ext.asyncio import AsyncSession

__all__ = [
    "GenericUnitOfWork",
    "SqlAlchemyUnitOfWork",
]

from repositories.application import RestaurantApplicationRepository


class GenericUnitOfWork(ABC):
    """
    Abstract base class for a generic unit of work (UOW) context manager.

    This class defines the basic structure of a unit of work context manager. Subclasses should implement the
    `commit` and `rollback` methods to provide transaction control logic specific to the data store.
    """

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


class SqlAlchemyUnitOfWork(GenericUnitOfWork):
    """
    Unit of work context manager for SQLAlchemy.

    This class provides a context manager for managing transactions with SQLAlchemy. It initializes the
    necessary repositories and session for database operations. It should be used in conjunction with the
    `uow_transaction` or `uow_transaction_with_commit` context managers.

    Attributes:
        restaurants (RestaurantRepository): Repository for restaurants.
        managers (RestaurantManagerRepository): Repository for restaurant managers.
        working_hours (WorkingHoursRepository): Repository for working hours.
        moderators (ModeratorRepository): Repository for moderators.
    """

    restaurants: RestaurantRepository
    restaurant_applications: RestaurantApplicationRepository
    managers: RestaurantManagerRepository
    working_hours: WorkingHoursRepository
    moderators: ModeratorRepository

    def __init__(self, session_factory: Callable[[], AsyncSession]):
        self._session_factory = session_factory
        super().__init__()

    def _init_repositories(self, session: AsyncSession):
        self.restaurants = RestaurantRepository(session)
        self.restaurant_applications = RestaurantApplicationRepository(session)
        self.managers = RestaurantManagerRepository(session)
        self.working_hours = WorkingHoursRepository(session)
        self.moderators = ModeratorRepository(session)

    async def __aenter__(self):
        self._session = self._session_factory()
        self._init_repositories(self._session)
        return await super().__aenter__()

    async def __aexit__(self, *args):
        await super().__aexit__(*args)
        await self._session.close()

    async def commit(self):
        """
        Commit the transaction.
        """

        await self._session.commit()

    async def rollback(self):
        """
        Rollback the transaction.
        """

        await self._session.rollback()
