from typing import Iterable, Optional, Type

from kafka_files.consumer.events import ConsumerEvent

__all__ = [
    'get_consumer_event_by_name'
]


def get_consumer_event_by_name(event_name: str,
                               consumer_events: Iterable[Type[ConsumerEvent]]) -> Optional[Type[ConsumerEvent]]:
    """
    Returns the consumer event class by name.

    Args:
        event_name (str): The name of the event.
        consumer_events (Iterable[Type[ConsumerEvent]]): The list of consumer events.

    Returns:
        Optional[Type[ConsumerEvent]]: The consumer event class or None if not found.
    """

    for event in consumer_events:
        if event.get_event_name() == event_name:
            return event
