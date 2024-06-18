from abc import ABC, abstractmethod

from kafka import KafkaProducer
from loguru import logger

from .events import ProducerEvent

__all__ = [
    'AbstractPublisher',
    'KafkaPublisher',
    'DummyPublisher',
]


class AbstractPublisher(ABC):
    """
    Abstract class for publishing events to Kafka.
    """

    @abstractmethod
    def publish(self, event: ProducerEvent):
        """
        Publishes event to Kafka.

        Args:
            event (ProducerEvent): The event to publish.
        """

        raise NotImplementedError


class KafkaPublisher(AbstractPublisher):
    """
    Class for publishing events to Kafka.
    """

    def __init__(self, producer: KafkaProducer):
        """
        Initializes a new instance of the KafkaPublisher class.

        Args:
            producer (KafkaProducer): The Kafka producer.
        """

        self._producer = producer

    def publish(self, event: ProducerEvent):
        """
        Publishes event to Kafka.

        Args:
            event (ProducerEvent): The event to publish.
        """

        for topic in event.get_topics():
            key = event.get_event_name()
            data = event.get_data(topic)
            self._producer.send(topic, key=key, value=data)

            data_string = ", ".join(f"{key}={value}" for key, value in data.items())
            logger.info(f"Published event {key} to topic: {topic} with data: {data_string}")


class DummyPublisher(AbstractPublisher):
    """
    Class for publishing events to no-op.
    """

    def publish(self, event: ProducerEvent):
        """
        Publishes event to no-op.

        Args:
            event (ProducerEvent): The event to publish.
        """

        for topic in event.get_topics():
            key = event.get_event_name()
            data = event.get_data(topic)
            data_string = ", ".join(f"{key}={value}" for key, value in data.items())
            logger.info(f"Published dummy event {key} to topic: {topic} with data: {data_string}")
