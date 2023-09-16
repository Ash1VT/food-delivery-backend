import os

from pydantic_settings import BaseSettings, SettingsConfigDict
from utils.config import config_cache
from .directories import ENV_DIRECTORY


class Settings(BaseSettings):
    secret_key: str
    permissions_grpc_server_host: str
    permissions_grpc_server_port: str


class DevelopSettings(Settings):
    pg_host: str
    pg_port: str
    pg_database: str
    pg_user: str
    pg_password: str

    model_config = SettingsConfigDict(env_file=ENV_DIRECTORY / '.env.dev')


class TestSettings(Settings):
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
