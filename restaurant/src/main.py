import os

import uvicorn
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from schemas import RestaurantManagerCreateIn, ModeratorCreateIn
from schemas.hours import WorkingHoursCreateIn
from setup import app
from services import RestaurantService, RestaurantApplicationService, RestaurantManagerService, ModeratorService
from repositories.restaurant import RestaurantRepository
from repositories.hours import WorkingHoursRepository
from schemas.restaurant import RestaurantCreateIn
from db import get_async_session, async_session_maker
from utils.uow import uow_transaction, uow_transaction_with_commit
from uow import SqlAlchemyUnitOfWork


@app.post("/")
async def index():
    uow = SqlAlchemyUnitOfWork(async_session_maker)
    manager_service = RestaurantManagerService()
    moderator_service = ModeratorService()
    async with uow_transaction_with_commit(uow) as uow:
        moderator = await moderator_service.retrieve_instance(0, uow)
        # manager = await manager_service.retrieve_instance(0, uow)
        restaurant_application_service = RestaurantApplicationService(moderator=moderator)

        # restaurant_service = RestaurantService(restaurant_manager=manager)
        #
        # await restaurant_service.create(restaurant, uow)
        restaurant_application = await restaurant_application_service.confirm_application(9, uow)

        # await manager_service.create(manager, uow)


if __name__ == "__main__":
    os.environ.setdefault('CONFIGURATION', 'Develop')
    uvicorn.run(app="setup.app:app", port=8002, reload=True)
