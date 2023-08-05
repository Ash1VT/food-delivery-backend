import os
import pytest
import asyncio

from typing import AsyncGenerator

from sqlalchemy import NullPool
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from fastapi.testclient import TestClient

from src.db.session import get_async_session
from src.main import app
from src.models import Base
from src.config import get_settings

# Change settings to Test #

os.environ.setdefault("CONFIGURATION", "Test")
settings = get_settings()

# Test database url #

DATABASE_URL_TEST = f"sqlite+aiosqlite:///{settings.sqlite_db_file}"

# Test engine and session #

engine_test = create_async_engine(DATABASE_URL_TEST, poolclass=NullPool)
# connect_args={"check_same_thread": False})
async_session_maker = async_sessionmaker(bind=engine_test, expire_on_commit=False)


async def get_test_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


# Override session with test session #

app.dependency_overrides[get_async_session] = get_test_async_session


# Fixture for creating and removing test database #

@pytest.fixture(autouse=True, scope='session')
async def prepare_database():
    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    os.remove(settings.sqlite_db_file)


# Sync tests staff #

@pytest.fixture(scope="session")
def client():
    return TestClient(app)


# Async tests staff #

@pytest.fixture(scope='session')
def event_loop(request):
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="session")
async def async_client() -> AsyncGenerator[AsyncClient, None]:
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac
