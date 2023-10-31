from config import get_settings

from .creator import *
from .events import *
from .receiver import *

settings = get_settings()

# Init consumer SASL creator
consumer_creator = KafkaConsumerSASLCreator(
    bootstrap_server_host=settings.kafka_bootstrap_server_host,
    bootstrap_server_port=settings.kafka_bootstrap_server_port,
    sasl_mechanism=settings.kafka_sasl_mechanism,
    sasl_plain_username=settings.kafka_broker_user,
    sasl_plain_password=settings.kafka_broker_password
)

# Init consumer events
consumer_events = [
    RestaurantApplicationConfirmedEvent,
    RestaurantActivatedEvent,
    RestaurantDeactivatedEvent,
    RestaurantManagerCreatedEvent,
]

# Init kafka receivers
kafka_receivers = list()

for topic, consumer_str_events in settings.kafka_consumer_topic_events.items():
    group_id = f"{topic}_group"

    # Create group of consumers
    consumers = [consumer_creator.create(topic, str(group_id)) for _ in range(settings.kafka_group_consumers_count)]

    # Transform string events to consumer events objects
    topic_consumer_events = [event for event in consumer_events if event.get_event_name() in consumer_str_events]

    # Add group of consumers to kafka receivers
    kafka_receivers.extend((KafkaReceiver(consumer, topic_consumer_events) for consumer in consumers))