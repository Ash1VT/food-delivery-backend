from typing import List

from config import get_settings
from utils import import_string

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