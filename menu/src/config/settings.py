import os
from typing import List, Dict

from pydantic_settings import BaseSettings, SettingsConfigDict
from .directories import ENV_DIRECTORY, BASE_DIRECTORY, SRC_DIRECTORY
from .cache import config_cache


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
        'menu_restaurant': [
            'consumer.events.RestaurantApplicationConfirmedEvent',
            'consumer.events.RestaurantActivatedEvent',
            'consumer.events.RestaurantDeactivatedEvent',
        ],
        'user_menu': [
            'consumer.events.RestaurantManagerCreatedEvent',
        ]
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
