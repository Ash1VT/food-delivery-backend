from config import get_settings

settings = get_settings()

# Database URL #

DATABASE_URL = f"postgresql+asyncpg://{settings.pg_user}:{settings.pg_password}@" \
               f"{settings.pg_host}:{settings.pg_port}/{settings.pg_database}"
