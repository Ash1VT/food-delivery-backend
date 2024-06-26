import logging

from django.conf import settings

from .events import *
from .creator import *
from .publisher import *
from .publisher import DummyPublisher

logger = logging.getLogger(__name__)

try:
    # Init producer creator
    producer_creator = KafkaProducerSASLPlaintextCreator(bootstrap_server_host=settings.KAFKA_BOOTSTRAP_SERVER_HOST,
                                                         bootstrap_server_port=settings.KAFKA_BOOTSTRAP_SERVER_PORT,
                                                         sasl_plain_username=settings.KAFKA_BROKER_USER,
                                                         sasl_plain_password=settings.KAFKA_BROKER_PASSWORD)

    # producer_creator = KafkaProducerSCRAM256Creator(bootstrap_server_host=settings.KAFKA_BOOTSTRAP_SERVER_HOST,
    #                                                 bootstrap_server_port=settings.KAFKA_BOOTSTRAP_SERVER_PORT,
    #                                                 sasl_plain_username=settings.KAFKA_BROKER_USER,
    #                                                 sasl_plain_password=settings.KAFKA_BROKER_PASSWORD,
    #                                                 ssl_cafile=settings.KAFKA_SSL_CAFILE,
    #                                                 ssl_certfile=settings.KAFKA_SSL_CERTFILE,
    #                                                 ssl_keyfile=settings.KAFKA_SSL_KEYFILE)
    # Init producer
    producer = producer_creator.create()

    # Init publisher
    publisher = KafkaPublisher(producer)
except Exception as e:
    logger.error(f"Failed to init publisher: {e}")
    publisher = DummyPublisher()
