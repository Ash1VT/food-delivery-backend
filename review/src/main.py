from dataclasses import asdict

from sqlalchemy import insert

from db.sqlalchemy.models import Customer
from db.sqlalchemy.session import get_async_session, async_session_maker
from models.customer import CustomerCreateModel, CustomerUpdateModel
from repositories.sqlalchemy.customer import CustomerRepository
from setup import app, start_app
from config import get_settings
from setup.logger import logger


@app.get("/")
async def root():
    session = async_session_maker()
    repository = CustomerRepository(session)

    customer = await repository.retrieve(1)
    await session.close()
    return {"customer": customer}


if __name__ == "__main__":
    settings = get_settings()
    start_app(settings)
