from kafka_files.consumer.creator import KafkaConsumerSASLCreator
from setup.settings.server import get_server_settings

settings = get_server_settings()

# Init consumer SASL creator
consumer_sasl_creator = KafkaConsumerSASLCreator(
    bootstrap_server_host=settings.kafka_bootstrap_server_host,
    bootstrap_server_port=settings.kafka_bootstrap_server_port,
    sasl_mechanism=settings.kafka_sasl_mechanism,
    sasl_plain_username=settings.kafka_broker_user,
    sasl_plain_password=settings.kafka_broker_password
)
