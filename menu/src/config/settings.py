import os
from typing import List, Dict, Optional

from pydantic_settings import BaseSettings, SettingsConfigDict
from .directories import ENV_DIRECTORY, BASE_DIRECTORY, SRC_DIRECTORY
from .cache import config_cache


class Settings(BaseSettings):
    firebase_storage_bucket: str
    default_menu_item_image_url: str = ('https://storage.googleapis.com/fooddelivery-21854.appspot.com/items/images'
                                        '/default_menu_item_image.svg')
    default_menu_category_image_url: str = ("https://storage.googleapis.com/fooddelivery-21854.appspot.com/categories"
                                            "/images/default_menu_category_image.svg")

    web_app_host: str
    web_app_port: int
    reload: bool
    graylog_host: str
    graylog_udp_port: int
    roles_grpc_server_host: str
    roles_grpc_server_port: str
    kafka_bootstrap_server_host: str
    kafka_bootstrap_server_port: int
    kafka_ssl_cafile: Optional[str] = f'{BASE_DIRECTORY}/cacert.pem'
    kafka_ssl_certfile: Optional[str] = f'{BASE_DIRECTORY}/cert.pem'
    kafka_ssl_keyfile: Optional[str] = f'{BASE_DIRECTORY}/key.pem'

    kafka_broker_user: str
    kafka_broker_password: str

    kafka_group_consumers_count: int = 1
    kafka_consumer_topic_events: Dict[str, List[str]] = {
        'restaurant_menu': [
            'consumer.events.RestaurantCreatedEvent',
            'consumer.events.RestaurantUpdatedEvent',
        ],
        'user_menu': [
            'consumer.events.RestaurantManagerCreatedEvent',
        ],
        'review_menu': [
            'consumer.events.MenuItemRatingUpdatedEvent',
        ]
    }

    kafka_producer_events_topics: Dict[str, Dict[str, str]] = {
        'producer.events.MenuItemCreatedEvent': {
            'menu_order': 'producer.schemas.MenuItemCreatedSchema',
            'menu_review': 'producer.schemas.MenuItemCreatedToReviewSchema'
        },
        'producer.events.MenuItemUpdatedEvent': {
            'menu_order': 'producer.schemas.MenuItemUpdatedSchema'
        },
        'producer.events.MenuItemDeletedEvent': {
            'menu_order': 'producer.schemas.MenuItemDeletedSchema',
            'menu_review': 'producer.schemas.MenuItemDeletedSchema'
        },
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
