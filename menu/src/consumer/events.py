from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Type

from pydantic import BaseModel

from services import RestaurantService, RestaurantManagerService
from uow import SqlAlchemyUnitOfWork
from utils.uow import uow_transaction, uow_transaction_with_commit

from .schemas import RestaurantApplicationConfirmedSchema, RestaurantActivatedSchema, RestaurantDeactivatedSchema, \
    RestaurantManagerCreatedSchema

__all__ = [
    "ConsumerEvent",
    "RestaurantApplicationConfirmedEvent",
    "RestaurantActivatedEvent",
    "RestaurantDeactivatedEvent",
    "RestaurantManagerCreatedEvent",
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


class RestaurantApplicationConfirmedEvent(ConsumerEvent[RestaurantApplicationConfirmedSchema]):
    """
    Event when RestaurantApplication is confirmed.
    """

    schema_class = RestaurantApplicationConfirmedSchema

    async def action(self, uow: SqlAlchemyUnitOfWork):
        """
        Creates a new restaurant.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        restaurant_service = RestaurantService()

        async with uow_transaction_with_commit(uow) as uow:
            await restaurant_service.create(self._data, uow)


class RestaurantActivatedEvent(ConsumerEvent[RestaurantActivatedSchema]):
    """
    Event when Restaurant is activated.
    """

    schema_class = RestaurantActivatedSchema

    async def action(self, uow: SqlAlchemyUnitOfWork):
        """
        Activates a restaurant.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        restaurant_service = RestaurantService()

        async with uow_transaction_with_commit(uow) as uow:
            await restaurant_service.activate(self._data.id, uow)


class RestaurantDeactivatedEvent(ConsumerEvent[RestaurantDeactivatedSchema]):
    """
    Event when Restaurant is deactivated.
    """

    schema_class = RestaurantDeactivatedSchema

    async def action(self, uow: SqlAlchemyUnitOfWork):
        """
        Deactivates a restaurant.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        restaurant_service = RestaurantService()

        async with uow_transaction_with_commit(uow) as uow:
            await restaurant_service.deactivate(self._data.id, uow)


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
            await restaurant_manager_service.create(self._data, uow)
