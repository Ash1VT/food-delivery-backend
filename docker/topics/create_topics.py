import os

from kafka.admin import KafkaAdminClient, NewTopic
from kafka.errors import TopicAlreadyExistsError


topics = os.environ.get("KAFKA_TOPICS").split(",")

num_partitions = int(os.environ.get("KAFKA_TOPIC_PARTITIONS"))
replication_factor = int(os.environ.get("KAFKA_TOPIC_REPLICATION_FACTOR"))

kafka_host = os.environ.get("KAFKA_BROKER_HOST")
kafka_port = os.environ.get("KAFKA_BROKER_PORT")

kafka_admin = KafkaAdminClient(
    bootstrap_servers=f"{kafka_host}:{kafka_port}",
    security_protocol="SASL_PLAINTEXT",
    sasl_mechanism="PLAIN",
    sasl_plain_username=os.environ.get("KAFKA_INTER_BROKER_USER"),
    sasl_plain_password=os.environ.get("KAFKA_INTER_BROKER_PASSWORD"),
)

new_topics = [NewTopic(topic, num_partitions=num_partitions, replication_factor=replication_factor) for topic in topics]


for topic in new_topics:
    try:
        fs = kafka_admin.create_topics([topic])

        topic_errors = fs.get_item('topic_errors')

        for topic_name, error_code, error_message in topic_errors:
            if error_code != 0:
                print("Failed to create topic {}: {}".format(topic_name, error_message))
            else:
                print("Topic {} created".format(topic_name))
    except TopicAlreadyExistsError as e:
        print(f"Topic {topic.name} already exists. Skipping creation.")