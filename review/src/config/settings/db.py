from abc import ABC

from pydantic_settings import BaseSettings


class PostgresSqlSettings(BaseSettings, ABC):
    pg_host: str
    pg_port: str
    pg_database: str
    pg_user: str
    pg_password: str


class SqliteSettings(BaseSettings, ABC):
    sqlite_db_file: str
