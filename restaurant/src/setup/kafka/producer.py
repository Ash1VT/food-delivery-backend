from config.settings import Settings
from utils import import_string


def init_producer_events(settings: Settings):
    # Init producer events
    for producer_str_event, producer_topics_str_schemas in settings.kafka_producer_events_topics.items():
        producer_event = import_string(producer_str_event)
        producer_topics_schemas = {topic: import_string(serializer_str)
                                   for topic, serializer_str in producer_topics_str_schemas.items()}
        producer_event.extend_topics_schemas(producer_topics_schemas)
