from setup.settings.app import get_app_settings


def init_producer_events():
    settings = get_app_settings()

    # Init producer events
    for producer_event, producer_topics_str_schemas in settings.kafka_producer_events_topics.items():
        producer_topics_schemas = {topic: serializer
                                   for topic, serializer in producer_topics_str_schemas.items()}

        producer_event.extend_topics_schemas(producer_topics_schemas)
