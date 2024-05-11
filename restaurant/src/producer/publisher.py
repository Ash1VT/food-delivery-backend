from abc import ABC, abstractmethod

from kafka import KafkaProducer

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
        print("EMMM")
        for topic in event.get_topics():
            self._producer.send(topic, key=event.get_event_name(), value=event.get_data(topic))
            print(f"Published event {event.get_event_name()} to topic: {topic}")


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
            print(f"Published event {event.get_event_name()} to topic: {topic}")
