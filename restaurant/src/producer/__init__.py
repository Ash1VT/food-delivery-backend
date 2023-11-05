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

# Init producer
producer = producer_sasl_creator.create()

# Init producer events
for producer_str_event, producer_topics_str_serializers in settings.kafka_producer_events_topics.items():

    producer_event = import_string(producer_str_event)
    producer_topics_serializers = {topic: import_string(serializer_str)
                                   for topic, serializer_str in producer_topics_str_serializers.items()}

    producer_event.extend_topics_serializers(producer_topics_serializers)


# Init publisher
publisher = KafkaPublisher(producer)
