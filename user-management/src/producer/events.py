from abc import ABC
from typing import List, Set, Any, Dict, Type, Iterable

from rest_framework.serializers import Serializer

__all__ = [
    'ProducerEvent',
    'RestaurantManagerCreatedEvent',
    'ModeratorCreatedEvent',
]


class ProducerEvent(ABC):
    """
    Base class for all producer events.

    Events are used for simplifying data publishing to Kafka.

    Attributes:
        _topics_serializers (Dict[str, Type[Serializer]]): Dictionary of topics to which the event's data
        will be published and associated serializers with them.
    """

    _topics_serializers: Dict[str, Type[Serializer]]

    def __init__(self, data: dict):
        """
        Constructor for the inherited classes from ProducerEvent class.

        Args:
            data (dict): The data to be published.
        """

        self._data = data

    def get_data(self, topic: str) -> dict:
        """
        Data to be published.

        Data is serialized according to the topic's serializer

        Args:
            topic (str): The topic to which the data will be published.

        Returns:
            dict: Data to be published.
        """

        return self._topics_serializers.get(topic)(self._data).data

    @classmethod
    def extend_topics_serializers(cls, topics_serializers: Dict[str, Type[Serializer]]):
        """
        Extends the set of topics to which the event's data will be published.

        Args:
            topics_serializers (Dict[str, Type[Serializer]]): Dictionary of topics to which the event's data
            will be published and associated serializers with them.
        """

        cls._topics_serializers.update(topics_serializers)

    @classmethod
    def get_topics(cls) -> Iterable[str]:
        """
        Returns the sequence of topics to which the event's data will be published.

        Returns:
            Iterable[str]: Sequence of topics to which the event's data will be published.
        """

        return cls._topics_serializers.keys()

    @classmethod
    def get_event_name(cls) -> str:
        """
        Returns the name of the event.

        Returns:
            str: Name of the event
        """
        return cls.__name__


class CustomerCreatedEvent(ProducerEvent):
    """
    Event when Customer is created.
    """

    _topics_serializers = dict()


class CourierCreatedEvent(ProducerEvent):
    """
    Event when Courier is created.
    """

    _topics_serializers = dict()


class RestaurantManagerCreatedEvent(ProducerEvent):
    """
    Event when RestaurantManager is created.
    """

    _topics_serializers = dict()


class ModeratorCreatedEvent(ProducerEvent):
    """
    Event when Moderator is created.
    """

    _topics_serializers = dict()
