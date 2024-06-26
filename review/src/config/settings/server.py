from abc import ABC
from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict

from config.directories import ENV_DIRECTORY, BASE_DIRECTORY
from config.settings.db import PostgresSqlSettings, SqliteSettings


class ServerSettings(BaseSettings, ABC):
    web_app_host: str
    web_app_port: int
    reload: bool
    graylog_host: str
    graylog_udp_port: int
    roles_grpc_server_host: str
    roles_grpc_server_port: int
    kafka_bootstrap_server_host: str
    kafka_bootstrap_server_port: int
    kafka_ssl_cafile: Optional[str] = f'{BASE_DIRECTORY}/cacert.pem'
    kafka_ssl_certfile: Optional[str] = f'{BASE_DIRECTORY}/cert.pem'
    kafka_ssl_keyfile: Optional[str] = f'{BASE_DIRECTORY}/key.pem'
    kafka_broker_user: str
    kafka_broker_password: str


class DevelopServerSettings(ServerSettings, PostgresSqlSettings):
    reload: bool = True

    model_config = SettingsConfigDict(env_file=ENV_DIRECTORY / '.env.dev')


class TestServerSettings(ServerSettings, SqliteSettings):
    reload: bool = False

    model_config = SettingsConfigDict(env_file=ENV_DIRECTORY / '.env.test')


class ProductionServerSettings(ServerSettings, PostgresSqlSettings):
    reload: bool = False

    model_config = SettingsConfigDict(env_file=ENV_DIRECTORY / '.env.prod')
