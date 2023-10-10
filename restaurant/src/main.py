import os

import uvicorn
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from schemas.hours import WorkingHoursCreateIn
from setup import app
from repositories.restaurant import RestaurantRepository
from repositories.hours import WorkingHoursRepository
from schemas.restaurant import RestaurantCreateIn
from db import get_async_session


@app.post("/")
async def index(restaurant: RestaurantCreateIn,
                hours: WorkingHoursCreateIn,
                session: AsyncSession = Depends(get_async_session)):
    # print(restaurant.model_dump())
    rep = RestaurantRepository(session)
    rep1 = WorkingHoursRepository(session)

    hours_data = hours.model_dump()
    restaurant_data = restaurant.model_dump()

    await rep.create(restaurant_data)
    await rep1.create(hours_data)
    await session.commit()
    return await rep.list(fetch_working_hours=True)


if __name__ == "__main__":
    os.environ.setdefault('CONFIGURATION', 'Develop')
    uvicorn.run(app="setup.app:app", port=8002, reload=True)
