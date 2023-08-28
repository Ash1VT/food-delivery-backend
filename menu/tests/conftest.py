import os
import pytest
import asyncio

from typing import AsyncGenerator

from sqlalchemy import NullPool, text
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from fastapi.testclient import TestClient

from src.db.session import get_async_session
from src.main import app
from src.models import Base
from src.config import get_settings
from src.uow import SqlAlchemyUnitOfWork
from src.utils import uow_transaction

# Change settings to Test #

os.environ.setdefault("CONFIGURATION", "Test")
settings = get_settings()

# Test database url #

DATABASE_URL_TEST = f"sqlite+aiosqlite:///{settings.sqlite_db_file}"

# Test engine and session maker #

engine_test = create_async_engine(DATABASE_URL_TEST, poolclass=NullPool)
async_session_maker = async_sessionmaker(bind=engine_test, expire_on_commit=False, autoflush=False)


# Database fixtures

@pytest.fixture(scope='session', autouse=True)
async def engine():
    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield engine_test

    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

    os.remove(settings.sqlite_db_file)


@pytest.fixture(scope='function')
async def session():
    async with async_session_maker() as session:
        await session.begin()

        yield session

        await session.rollback()


@pytest.fixture(scope='function')
async def uow() -> SqlAlchemyUnitOfWork:
    uow = SqlAlchemyUnitOfWork(async_session_maker)
    async with uow_transaction(uow) as uow:
        yield uow
        await uow.rollback()


@pytest.fixture(scope='function', autouse=True)
async def clear_database():
    async with async_session_maker() as session:
        for table in reversed(Base.metadata.sorted_tables):
            await session.execute(text(f'DELETE FROM {table.name};'))
            await session.commit()


# Override session with test session #

async def get_test_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


app.dependency_overrides[get_async_session] = get_test_async_session


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
async def async_client() -> AsyncClient:
    return AsyncClient(app=app, base_url="http://test")
