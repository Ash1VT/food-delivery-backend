from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Type

from pydantic import BaseModel

from schemas import RestaurantUpdateIn, RestaurantCreateIn, RestaurantManagerCreateIn
from services import RestaurantService, RestaurantManagerService
from uow import SqlAlchemyUnitOfWork
from utils.uow import uow_transaction, uow_transaction_with_commit

from .schemas import RestaurantManagerCreatedSchema, RestaurantCreatedSchema, RestaurantUpdatedSchema, \
    MenuItemRatingUpdatedSchema

__all__ = [
    "ConsumerEvent",
    "RestaurantCreatedEvent",
    "RestaurantUpdatedEvent",
    "RestaurantManagerCreatedEvent",
    "MenuItemRatingUpdatedEvent"
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


class RestaurantCreatedEvent(ConsumerEvent[RestaurantCreatedSchema]):
    """
    Event when Restaurant is created.
    """

    schema_class = RestaurantCreatedSchema

    async def action(self, uow: SqlAlchemyUnitOfWork):
        """
        Creates a new restaurant.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        restaurant_service = RestaurantService()

        async with uow_transaction_with_commit(uow) as uow:
            restaurant_data = RestaurantCreateIn(**self._data.model_dump())
            await restaurant_service.create(restaurant_data, uow)


class RestaurantUpdatedEvent(ConsumerEvent[RestaurantUpdatedSchema]):
    """
    Event when Restaurant is updated.
    """

    schema_class = RestaurantUpdatedSchema

    async def action(self, uow: SqlAlchemyUnitOfWork):
        """
        Activates a restaurant.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        restaurant_service = RestaurantService()

        async with uow_transaction_with_commit(uow) as uow:
            restaurant_id = self._data.id
            restaurant_data = RestaurantUpdateIn(**self._data.model_dump())
            await restaurant_service.update(restaurant_id, restaurant_data, uow)


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


class MenuItemRatingUpdatedEvent(ConsumerEvent[MenuItemRatingUpdatedSchema]):
    """
    Event when rating of a menu item is updated.
    """

    schema_class = MenuItemRatingUpdatedSchema

    async def action(self, uow: SqlAlchemyUnitOfWork):
        """
        Updates a menu item rating.

        Args:
            uow (SqlAlchemyUnitOfWork): The unit of work instance.
        """

        async with uow_transaction_with_commit(uow) as uow:
            await uow.items.update(self._data.id, {
                "rating": self._data.rating,
                "reviews_count": self._data.reviews_count
            })

