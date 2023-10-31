import logging

from kafka import KafkaProducer

from .events import ProducerEvent

__all__ = [
    'KafkaPublisher'
]


logger = logging.getLogger(__name__)


class KafkaPublisher:
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
            self._producer.send(topic, key=event.get_event_name(), value=event.data)
            logger.info(f"Published event {event.get_event_name()} to topic: {topic}")
