import os

from pydantic_settings import BaseSettings, SettingsConfigDict
from .cache import config_cache
from .directories import ENV_DIRECTORY, BASE_DIRECTORY, SRC_DIRECTORY


class Settings(BaseSettings):
    web_app_host: str
    web_app_port: int
    reload: bool
    roles_grpc_server_host: str
    roles_grpc_server_port: str


class DevelopSettings(Settings):
    reload: bool = True
    pg_host: str
    pg_port: str
    pg_database: str
    pg_user: str
    pg_password: str

    model_config = SettingsConfigDict(env_file=[ENV_DIRECTORY / '.env.dev',
                                                ENV_DIRECTORY / '.env',
                                                SRC_DIRECTORY / '.env',
                                                BASE_DIRECTORY / '.env'])


class TestSettings(Settings):
    reload: bool = False
    sqlite_db_file: str

    model_config = SettingsConfigDict(env_file=[ENV_DIRECTORY / '.env.test',
                                                ENV_DIRECTORY / '.env',
                                                SRC_DIRECTORY / '.env',
                                                BASE_DIRECTORY / '.env'])


@config_cache
def get_settings():
    config = os.environ.get("CONFIGURATION", "Develop")

    if config == "Develop":
        return DevelopSettings()

    if config == "Test":
        return TestSettings()

    return DevelopSettings()
