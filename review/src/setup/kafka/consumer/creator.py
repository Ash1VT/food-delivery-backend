from kafka_files.consumer.creator import KafkaConsumerSASLPlaintextCreator, KafkaConsumerSCRAM256Creator
from setup.settings.server import get_server_settings

settings = get_server_settings()

# Init consumer SASL creator
consumer_creator = KafkaConsumerSASLPlaintextCreator(
    bootstrap_server_host=settings.kafka_bootstrap_server_host,
    bootstrap_server_port=settings.kafka_bootstrap_server_port,
    sasl_plain_username=settings.kafka_broker_user,
    sasl_plain_password=settings.kafka_broker_password
)

# Init consumer SCRAM256 creator
# consumer_creator = KafkaConsumerSCRAM256Creator(
#     bootstrap_server_host=settings.kafka_bootstrap_server_host,
#     bootstrap_server_port=settings.kafka_bootstrap_server_port,
#     sasl_plain_username=settings.kafka_broker_user,
#     sasl_plain_password=settings.kafka_broker_password,
#     ssl_cafile=settings.kafka_ssl_cafile,
#     ssl_certfile=settings.kafka_ssl_certfile,
#     ssl_keyfile=settings.kafka_ssl_keyfile
# )
