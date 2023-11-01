from abc import ABC
from typing import List, Set, Any, TypeVar, Generic, Type

from pydantic import BaseModel
from models import CustomBase

from .schemas import RestaurantActivatedSchema, RestaurantDeactivatedSchema, RestaurantApplicationConfirmedSchema

__all__ = [
    "ProducerEvent",
    "RestaurantActivatedEvent",
    "RestaurantDeactivatedEvent",
    "RestaurantApplicationConfirmedEvent",
]

BaseEventSchema = TypeVar("BaseEventSchema", bound=BaseModel)


class ProducerEvent(ABC):
    """
    Base class for all producer events.

    Events are used for simplifying data publishing to Kafka.

    Attributes:
        _topics (Set[str]): Set of topics to which the event's data will be published.
        schema_class: Schema class for the event data.
    """

    _topics: Set[str]
    schema_class: Type[BaseEventSchema] = None

    def __init__(self, schema: BaseEventSchema):
        """
        Constructor for the inherited classes from ProducerEvent class.

        Args:
            schema (dict): The schema of the data to be published.
        """

        self._data: dict = schema.model_dump()

    @property
    def data(self) -> dict:
        """
        Data to be published.

        Returns:
            dict: Data to be published.
        """

        return self._data

    @classmethod
    def extend_topics(cls, topics: List[str]):
        """
        Extends the set of topics to which the event's data will be published.

        Args:
            topics (List[str]): List of topics to which the event's data will be published.
        """

        cls._topics.update(topics)

    @classmethod
    def get_topics(cls) -> Set[str]:
        """
        Returns the set of topics to which the event's data will be published.

        Returns:
            Set[str]: Set of topics to which the event's data will be published.
        """

        return cls._topics

    @classmethod
    def get_event_name(cls) -> str:
        """
        Returns the name of the event.

        Returns:
            str: Name of the event.
        """

        return cls.__name__


class RestaurantActivatedEvent(ProducerEvent):
    _topics = set()
    schema_class = RestaurantActivatedSchema

    def __init__(self, restaurant_id: int):
        schema = self.schema_class(restaurant_id=restaurant_id)
        super().__init__(schema)


class RestaurantDeactivatedEvent(ProducerEvent):
    _topics = set()
    schema_class = RestaurantDeactivatedSchema

    def __init__(self, restaurant_id: int):
        schema = self.schema_class(restaurant_id=restaurant_id)
        super().__init__(schema)


class RestaurantApplicationConfirmedEvent(ProducerEvent):
    _topics = set()
    schema_class = RestaurantApplicationConfirmedSchema

    def __init__(self, restaurant_id: int, restaurant_manager_id: int):
        schema = self.schema_class(restaurant_id=restaurant_id,
                                   restaurant_manager_id=restaurant_manager_id)
        super().__init__(schema)
