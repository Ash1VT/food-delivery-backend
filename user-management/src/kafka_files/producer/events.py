from abc import ABC
from typing import List, Set, Any

from .serializers import RestaurantManagerCreatedSerializer, ModeratorCreatedSerializer

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
        _topics (Set[str]): Set of topics to which the event's data will be published.
        serializer_class: Serializer class for the event data.
    """

    _topics: Set[str]
    serializer_class = None

    def __init__(self, data: Any):
        """
        Constructor for the inherited classes from ProducerEvent class.

        Args:
            data (Any): The data to be published.
        """

        self._data: dict = self.serializer_class(data).data

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


class RestaurantManagerCreatedEvent(ProducerEvent):
    """
    Event when RestaurantManager is created.
    """

    _topics = set()
    serializer_class = RestaurantManagerCreatedSerializer


class ModeratorCreatedEvent(ProducerEvent):
    """
    Event when Moderator is created.
    """

    _topics = set()
    serializer_class = ModeratorCreatedSerializer
