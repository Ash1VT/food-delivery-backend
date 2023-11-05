import asyncio
from threading import Thread
from typing import List, Type

from kafka import KafkaConsumer

from exceptions import AppError
from utils.uow import get_sqlalchemy_uow
from .events import ConsumerEvent
from .utils import get_consumer_event_by_name


__all__ = [
    "KafkaReceiver",
]


class KafkaReceiver:
    """
    Class for receiving messages from Kafka.

    It uses KafkaConsumer to receive messages from Kafka, identifies the event type
    and calls the action method of the event class.
    """

    def __init__(self, consumer: KafkaConsumer, consumer_events: List[Type[ConsumerEvent]]):
        """
        Constructor for the KafkaReceiver class.

        Args:
            consumer (KafkaConsumer): The KafkaConsumer instance.
            consumer_events (List[Type[ConsumerEvent]]): The list of consumer events.
        """

        self._consumer = consumer
        self._consumer_events = consumer_events
        self._receiver_thread = Thread(target=self.__between_callback)
        self._receiver_thread.daemon = True

    async def _consume_messages(self):
        """
        Method for consuming messages from Kafka.
        """

        for message in self._consumer:
            print('Received event:', message.key)

            event_class = get_consumer_event_by_name(message.key, self._consumer_events)
            if not event_class:
                print('Could not find event class for key:', message.key)
                continue

            event = event_class(message.value)
            uow = get_sqlalchemy_uow()

            try:
                await event.action(uow)
            except AppError as e:
                print(e)
                print('Critical Error! This should never happen')

    def __between_callback(self):
        """
        Synchronous wrapper for method that consumes messages.
        """

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        loop.run_until_complete(self._consume_messages())
        loop.close()

    def start_receiving(self):
        """
        Starts the receiver thread.
        """

        self._receiver_thread.start()
        