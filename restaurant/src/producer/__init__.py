from config import get_settings
from utils import import_string
from .events import *
from .creator import *
from .publisher import *

settings = get_settings()

# Init producer creator
producer_sasl_creator = KafkaProducerSASLCreator(bootstrap_server_host=settings.kafka_bootstrap_server_host,
                                                 bootstrap_server_port=settings.kafka_bootstrap_server_port,
                                                 sasl_mechanism=settings.kafka_sasl_mechanism,
                                                 sasl_plain_username=settings.kafka_broker_user,
                                                 sasl_plain_password=settings.kafka_broker_password)

# Init producer events
producer_events = [
    RestaurantActivatedEvent,
    RestaurantDeactivatedEvent,
    RestaurantApplicationConfirmedEvent
]

# Init producer
producer = producer_sasl_creator.create()

# Init topics for producer events
for producer_event in producer_events:
    producer_topics_str_schemas = settings.kafka_producer_events_topics[producer_event.get_event_name()]
    producer_topics_schemas = {topic: import_string(schema_str)
                               for topic, schema_str in producer_topics_str_schemas.items()}

    producer_event.extend_topics_schemas(producer_topics_schemas)

# Init publisher
publisher = KafkaPublisher(producer)
