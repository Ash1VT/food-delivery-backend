from typing import List

from config.settings import Settings
from consumer import KafkaReceiver, KafkaConsumerBaseCreator
from utils.import_string import import_string


def init_kafka_receivers(consumer_creator: KafkaConsumerBaseCreator, settings: Settings) -> List[KafkaReceiver]:
    kafka_receivers = list()

    for topic, consumer_str_events in settings.kafka_consumer_topic_events.items():
        group_id = f"{topic}_group"

        # Create group of consumers
        consumers = [consumer_creator.create(topic, str(group_id)) for _ in range(settings.kafka_group_consumers_count)]

        # Transform string events to consumer events objects
        topic_consumer_events = [import_string(str_event) for str_event in consumer_str_events]

        # Add group of consumers to kafka receivers
        kafka_receivers.extend((KafkaReceiver(consumer, topic_consumer_events) for consumer in consumers))

    return kafka_receivers
