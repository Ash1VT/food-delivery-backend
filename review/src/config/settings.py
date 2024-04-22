import os
from abc import ABC
from typing import Dict, List

from pydantic_settings import BaseSettings, SettingsConfigDict
from .cache import config_cache
from .directories import ENV_DIRECTORY, BASE_DIRECTORY, SRC_DIRECTORY


class Settings(BaseSettings, ABC):
    web_app_host: str
    web_app_port: int
    reload: bool
    # roles_grpc_server_host: str
    # roles_grpc_server_port: str
    # kafka_bootstrap_server_host: str
    # kafka_bootstrap_server_port: int
    # kafka_sasl_mechanism: str = 'PLAIN'
    # kafka_broker_user: str
    # kafka_broker_password: str
    #
    # kafka_group_consumers_count: int = 1
    # kafka_consumer_topic_events: Dict[str, List[str]] = {
    #     'user_restaurant': [
    #         'consumer.events.RestaurantManagerCreatedEvent',
    #         'consumer.events.ModeratorCreatedEvent',
    #     ]
    # }
    #
    # kafka_producer_events_topics: Dict[str, Dict[str, str]] = {
    #     'producer.events.RestaurantActivatedEvent': {
    #         'menu_restaurant': 'producer.schemas.RestaurantActivatedSchema',
    #     },
    #     'producer.events.RestaurantDeactivatedEvent': {
    #         'menu_restaurant': 'producer.schemas.RestaurantDeactivatedSchema'
    #     },
    #     'producer.events.RestaurantApplicationConfirmedEvent': {
    #         'menu_restaurant': 'producer.schemas.RestaurantApplicationConfirmedSchema'
    #     },
    # }


class PostgreSqlSettings(BaseSettings, ABC):
    pg_host: str
    pg_port: str
    pg_database: str
    pg_user: str
    pg_password: str


class SqliteSettings(BaseSettings, ABC):
    sqlite_db_file: str


class DevelopSettings(Settings, PostgreSqlSettings):
    reload: bool = True

    model_config = SettingsConfigDict(env_file=ENV_DIRECTORY / '.env.dev')


class TestSettings(Settings, SqliteSettings):
    reload: bool = False

    model_config = SettingsConfigDict(env_file=ENV_DIRECTORY / '.env.test')


class ProductionSettings(Settings, PostgreSqlSettings):
    reload: bool = False

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
