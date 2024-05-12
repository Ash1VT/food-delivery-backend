import logging

from django.conf import settings
from django.utils.module_loading import import_string

logger = logging.getLogger(__name__)


def init_producer_events():
    # Init producer events
    for producer_str_event, producer_topics_str_serializers in settings.KAFKA_PRODUCER_EVENTS_TOPICS.items():
        producer_event = import_string(producer_str_event)
        producer_topics_serializers = {topic: import_string(serializer_str)
                                       for topic, serializer_str in producer_topics_str_serializers.items()}

        producer_event.extend_topics_serializers(producer_topics_serializers)

    logger.info(f"Initialized producer events")
