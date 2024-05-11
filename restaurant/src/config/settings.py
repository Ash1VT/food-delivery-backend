import os
from typing import Dict, List

from pydantic_settings import BaseSettings, SettingsConfigDict
from .cache import config_cache
from .directories import ENV_DIRECTORY, BASE_DIRECTORY, SRC_DIRECTORY


class Settings(BaseSettings):
    firebase_storage_bucket: str
    default_restaurant_logo: str = ('https://storage.googleapis.com/fooddelivery-21854.appspot.com/restaurants/logos'
                                    '/default_restaurant_logo.jpeg')

    web_app_host: str
    web_app_port: int
    reload: bool
    roles_grpc_server_host: str
    roles_grpc_server_port: str
    kafka_bootstrap_server_host: str
    kafka_bootstrap_server_port: int
    kafka_sasl_mechanism: str = 'PLAIN'
    kafka_broker_user: str
    kafka_broker_password: str

    kafka_group_consumers_count: int = 1
    kafka_consumer_topic_events: Dict[str, List[str]] = {
        'user_restaurant': [
            'consumer.events.RestaurantManagerCreatedEvent',
            'consumer.events.ModeratorCreatedEvent',
        ]
    }

    kafka_producer_events_topics: Dict[str, Dict[str, str]] = {
        'producer.events.RestaurantCreatedEvent': {
            'menu_restaurant': 'producer.schemas.RestaurantCreatedSchema',
            'restaurant_order': 'producer.schemas.RestaurantCreatedSchema',
            'restaurant_review': 'producer.schemas.RestaurantCreatedToReviewSchema'
        },
        'producer.events.RestaurantUpdatedEvent': {
            'menu_restaurant': 'producer.schemas.RestaurantUpdatedSchema',
            'restaurant_order': 'producer.schemas.RestaurantUpdatedSchema',
            'restaurant_review': 'producer.schemas.RestaurantUpdatedToReviewSchema'
        },
        'producer.events.WorkingHoursCreatedEvent': {
            'restaurant_order': 'producer.schemas.WorkingHoursCreatedSchema'
        },
        'producer.events.WorkingHoursUpdatedEvent': {
            'restaurant_order': 'producer.schemas.WorkingHoursUpdatedSchema'
        },
        'producer.events.WorkingHoursDeletedEvent': {
            'restaurant_order': 'producer.schemas.WorkingHoursDeletedSchema'
        }
    }


class DevelopSettings(Settings):
    reload: bool = True
    pg_host: str
    pg_port: str
    pg_database: str
    pg_user: str
    pg_password: str

    model_config = SettingsConfigDict(env_file=ENV_DIRECTORY / '.env.dev')


class TestSettings(Settings):
    reload: bool = False
    sqlite_db_file: str

    model_config = SettingsConfigDict(env_file=ENV_DIRECTORY / '.env.test')


class ProductionSettings(Settings):
    reload: bool = False
    pg_host: str
    pg_port: str
    pg_database: str
    pg_user: str
    pg_password: str

    model_config = SettingsConfigDict(env_file=ENV_DIRECTORY / '.env.prod')


@config_cache
def get_settings():
    config = os.environ.get("CONFIGURATION", "Develop")

    if config == "Develop":
        return DevelopSettings()

    if config == "Test":
        return TestSettings()

    if config == "Production":
        return ProductionSettings()

    return DevelopSettings()
