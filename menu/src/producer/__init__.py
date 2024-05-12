from loguru import logger

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

# Init publisher
try:
    producer = producer_sasl_creator.create()
    publisher = KafkaPublisher(producer)
    logger.info("Kafka publisher initialized")
except Exception as e:
    logger.error(f"Failed to create Kafka publisher: {e}")
    publisher = DummyPublisher()
    logger.info("Using dummy publisher")

