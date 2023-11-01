import os
from typing import Dict, List

from pydantic_settings import BaseSettings, SettingsConfigDict
from .cache import config_cache
from .directories import ENV_DIRECTORY, BASE_DIRECTORY, SRC_DIRECTORY


class Settings(BaseSettings):
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
            'RestaurantManagerCreatedEvent',
            'ModeratorCreatedEvent',
        ]
    }

    kafka_producer_events_topics: Dict[str, List[str]] = {
        'RestaurantActivatedEvent': ['menu_restaurant'],
        'RestaurantDeactivatedEvent': ['menu_restaurant'],
        'RestaurantApplicationConfirmedEvent': ['menu_restaurant'],
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


@config_cache
def get_settings():
    config = os.environ.get("CONFIGURATION", "Develop")

    if config == "Develop":
        return DevelopSettings()

    if config == "Test":
        return TestSettings()

    return DevelopSettings()
