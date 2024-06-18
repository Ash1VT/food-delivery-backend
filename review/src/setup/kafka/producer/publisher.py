from loguru import logger

from kafka_files.producer.creator import KafkaProducerSCRAM256Creator, KafkaProducerSASLPlaintextCreator
from kafka_files.producer.publisher import KafkaPublisher, DummyPublisher
from setup.settings.server import get_server_settings

settings = get_server_settings()

# Init producer creator
producer_creator = KafkaProducerSASLPlaintextCreator(bootstrap_server_host=settings.kafka_bootstrap_server_host,
                                                     bootstrap_server_port=settings.kafka_bootstrap_server_port,
                                                     sasl_plain_username=settings.kafka_broker_user,
                                                     sasl_plain_password=settings.kafka_broker_password)

# producer_creator = KafkaProducerSCRAM256Creator(bootstrap_server_host=settings.kafka_bootstrap_server_host,
#                                                 bootstrap_server_port=settings.kafka_bootstrap_server_port,
#                                                 sasl_plain_username=settings.kafka_broker_user,
#                                                 sasl_plain_password=settings.kafka_broker_password,
#                                                 ssl_cafile=settings.kafka_ssl_cafile,
#                                                 ssl_certfile=settings.kafka_ssl_certfile,
#                                                 ssl_keyfile=settings.kafka_ssl_keyfile)
# Init publisher
try:
    producer = producer_creator.create()
    publisher = KafkaPublisher(producer)
    logger.info("Kafka publisher initialized")
except Exception as e:
    logger.error(f"Failed to create Kafka publisher: {e}")
    publisher = DummyPublisher()
    logger.info("Using dummy publisher")
