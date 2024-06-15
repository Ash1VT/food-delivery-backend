from abc import ABC
from typing import List, Set, TypeVar, Type, Iterable, Dict

from pydantic import BaseModel

__all__ = [
    "ProducerEvent",
    "MenuItemRatingUpdatedEvent",
    "RestaurantRatingUpdatedEvent",
]

BaseEventSchema = TypeVar("BaseEventSchema", bound=BaseModel)


class ProducerEvent(ABC):
    """
    Base class for all producer events.

    Events are used for simplifying data publishing to Kafka.

    Attributes:
        _topics_schemas (Dict[str, Type[BaseEventSchema]]): Dictionary of topics to which the event's data
        will be published and associated schemas with them.
    """

    _topics_schemas: Dict[str, Type[BaseEventSchema]]

    def __init__(self, **data):
        """
        Constructor for the inherited classes from ProducerEvent class.

        Args:
            data: The data to be published.
        """

        self._data = data

    def get_data(self, topic: str) -> dict:
        """
        Data to be published.

        Data is serialized according to the topic's schema.

        Args:
            topic (str): The topic to which the data will be published.

        Returns:
            dict: Data to be published.
        """

        return self._topics_schemas.get(topic)(**self._data).model_dump()

    @classmethod
    def extend_topics_schemas(cls, topics_schemas: Dict[str, Type[BaseEventSchema]]):
        """
        Extends the set of topics to which the event's data will be published.

        Args:
            topics_schemas (Dict[str, Type[BaseEventSchema]]): Dictionary of topics to which the event's data
            will be published and associated schemas with them.
        """

        cls._topics_schemas.update(topics_schemas)

    @classmethod
    def get_topics(cls) -> Iterable[str]:
        """
        Returns the sequence of topics to which the event's data will be published.

        Returns:
            Iterable[str]: Sequence of topics to which the event's data will be published.
        """

        return cls._topics_schemas.keys()

    @classmethod
    def get_event_name(cls) -> str:
        """
        Returns the name of the event.

        Returns:
            str: Name of the event
        """

        return cls.__name__


class RestaurantRatingUpdatedEvent(ProducerEvent):
    """
    Event that is published when restaurant rating is updated.
    """

    _topics_schemas = dict()


class MenuItemRatingUpdatedEvent(ProducerEvent):
    """
    Event that is published when menu item rating is updated.
    """

    _topics_schemas = dict()
