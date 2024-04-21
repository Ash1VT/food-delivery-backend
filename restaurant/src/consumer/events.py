from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Type

from pydantic import BaseModel

from schemas import RestaurantManagerCreateIn, ModeratorCreateIn
from services import RestaurantManagerService, ModeratorService
from uow import SqlAlchemyUnitOfWork
from utils import uow_transaction_with_commit
from .schemas import RestaurantManagerCreatedSchema, ModeratorCreatedSchema

__all__ = [
    "ConsumerEvent",
    "RestaurantManagerCreatedEvent",
    "ModeratorCreatedEvent",
]

BaseEventSchema = TypeVar("BaseEventSchema", bound=BaseModel)


class ConsumerEvent(Generic[BaseEventSchema], ABC):
    """
    Base class for all consumer events.

    Consumer events are used for simplifying receiving messages from Kafka and processing them.

    Attributes:
        schema_class (Type[BaseEventSchema]): The schema class for the event's data.
    """

    schema_class: Type[BaseEventSchema] = None

    def __init__(self, data: dict):
        """
        Constructor for the inherited classes from ConsumerEvent class.

        Args:
            data (dict): The received data.
        """

        self._data: BaseEventSchema = self.schema_class(**data)

    @abstractmethod
    async def action(self, uow: SqlAlchemyUnitOfWork):
        """
        Action to be executed on the event.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        raise NotImplementedError

    @classmethod
    def get_event_name(cls) -> str:
        """
        Returns the name of the event.

        Returns:
            str: Name of the event.
        """

        return cls.__name__


class RestaurantManagerCreatedEvent(ConsumerEvent[RestaurantManagerCreatedSchema]):
    """
    Event when RestaurantManager is created.
    """

    schema_class = RestaurantManagerCreatedSchema

    async def action(self, uow: SqlAlchemyUnitOfWork):
        """
        Creates a new restaurant manager.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        restaurant_manager_service = RestaurantManagerService()

        async with uow_transaction_with_commit(uow) as uow:
            restaurant_manager_data = RestaurantManagerCreateIn(**self._data.model_dump())
            await restaurant_manager_service.create(restaurant_manager_data, uow)


class ModeratorCreatedEvent(ConsumerEvent[ModeratorCreatedSchema]):
    """
    Event when Moderator is created.
    """

    schema_class = ModeratorCreatedSchema

    async def action(self, uow: SqlAlchemyUnitOfWork):
        """
        Creates a new moderator.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        moderator_service = ModeratorService()

        async with uow_transaction_with_commit(uow) as uow:
            moderator_data = ModeratorCreateIn(**self._data.model_dump())
            await moderator_service.create(moderator_data, uow)
