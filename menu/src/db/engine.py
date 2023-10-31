from sqlalchemy import NullPool
from sqlalchemy.ext.asyncio import create_async_engine

from .url import DATABASE_URL

# Async Engine #

async_engine = create_async_engine(DATABASE_URL, poolclass=NullPool)
