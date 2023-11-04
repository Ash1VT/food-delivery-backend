from django.conf import settings
from django.utils.module_loading import import_string

from .events import *
from .creator import *
from .publisher import *

# Init producer creator
producer_sasl_creator = KafkaProducerSASLCreator(bootstrap_server_host=settings.KAFKA_BOOTSTRAP_SERVER_HOST,
                                                 bootstrap_server_port=settings.KAFKA_BOOTSTRAP_SERVER_PORT,
                                                 sasl_mechanism=settings.KAFKA_SASL_MECHANISM,
                                                 sasl_plain_username=settings.KAFKA_BROKER_USER,
                                                 sasl_plain_password=settings.KAFKA_BROKER_PASSWORD)

# Init producer
producer = producer_sasl_creator.create()

# Init producer events
for producer_str_event, producer_topics_str_serializers in settings.KAFKA_PRODUCER_EVENTS_TOPICS.items():

    producer_event = import_string(producer_str_event)
    producer_topics_serializers = {topic: import_string(serializer_str)
                                   for topic, serializer_str in producer_topics_str_serializers.items()}

    producer_event.extend_topics_serializers(producer_topics_serializers)

# Init publisher
publisher = KafkaPublisher(producer)
