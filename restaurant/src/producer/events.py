from abc import ABC
from typing import List, Set, TypeVar, Type, Iterable, Dict

from pydantic import BaseModel

__all__ = [
    "ProducerEvent",
    "RestaurantCreatedEvent",
    "RestaurantUpdatedEvent",
    "WorkingHoursCreatedEvent",
    "WorkingHoursUpdatedEvent",
    "WorkingHoursDeletedEvent",
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


class RestaurantCreatedEvent(ProducerEvent):
    """
    Event that is published when a restaurant is created.
    """

    _topics_schemas = dict()


class RestaurantUpdatedEvent(ProducerEvent):
    """
    Event that is published when a restaurant is updated.
    """

    _topics_schemas = dict()


class WorkingHoursCreatedEvent(ProducerEvent):
    """
    Event that is published when working hours are created.
    """

    _topics_schemas = dict()


class WorkingHoursUpdatedEvent(ProducerEvent):
    """
    Event that is published when working hours are updated.
    """

    _topics_schemas = dict()


class WorkingHoursDeletedEvent(ProducerEvent):
    """
    Event that is published when working hours are deleted.
    """

    _topics_schemas = dict()
