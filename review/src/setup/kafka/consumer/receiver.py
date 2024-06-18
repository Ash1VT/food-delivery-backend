from typing import List

from config.settings.app import AppSettings
from kafka_files.consumer.creator import KafkaConsumerBaseCreator
from kafka_files.consumer.receiver import KafkaReceiver
from setup.settings.app import get_app_settings


def init_kafka_receivers(consumer_creator: KafkaConsumerBaseCreator) -> List[KafkaReceiver]:
    kafka_receivers = list()
    settings = get_app_settings()

    for topic, consumer_events in settings.kafka_consumer_topic_events.items():
        group_id = f"{topic}_group"

        # Create group of consumers
        consumers = [consumer_creator.create(topic, str(group_id)) for _ in range(settings.kafka_group_consumers_count)]

        # Add group of consumers to kafka receivers
        kafka_receivers.extend((KafkaReceiver(consumer, consumer_events, settings.get_app_uow)
                                for consumer in consumers))

    return kafka_receivers
