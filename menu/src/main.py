import os

import uvicorn
from fastapi import Depends
from fastapi.exceptions import HTTPException
from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src.db.session import get_async_session
from src.models import Restaurant, Menu, Category
from src.schemas import MenuOut, RestaurantForUserOut, RestaurantForManagerOut, RestaurantCreate
from src.setup import app


@app.get("/")
async def index(session: AsyncSession = Depends(get_async_session)):
    # logger.info("Test log")
    # await session.execute(text('SELECT 1'))
    menu_id = 1

    smtp = select(Menu).where(Menu.id == menu_id)

    result = await session.execute(smtp)
    menu = result.unique().scalar_one_or_none()

    if menu:
        # offset = (1 - 1) * 1

        menu_out = MenuOut.model_validate(menu)
        return menu_out
    raise HTTPException(detail="Not found", status_code=404)


@app.post("/restaurants/")
async def create_restaurant(restaurant: RestaurantCreate,
                            session: AsyncSession = Depends(get_async_session)) -> RestaurantForManagerOut:
    stmt = insert(Restaurant).options(
        selectinload(Restaurant.menus)
    ).values(restaurant.model_dump()).returning(Restaurant)

    result = await session.execute(stmt)
    # await session.commit()
    restaurant = result.scalar_one()

    restaurant_out = RestaurantForManagerOut.model_validate(restaurant)
    return restaurant_out


@app.get("/restaurants/{restaurant_id}")
async def get_restaurant(restaurant_id: int,
                         session: AsyncSession = Depends(get_async_session)) -> RestaurantForUserOut:
    stmt = select(Restaurant).options(
        selectinload(Restaurant.current_menu).selectinload(Menu.categories).selectinload(Category.items)
    ).where(Restaurant.id == restaurant_id)

    result = await session.execute(stmt)

    restaurant = result.scalar_one_or_none()

    if restaurant:
        restaurant_out = RestaurantForUserOut.model_validate(restaurant)
        return restaurant_out
    raise HTTPException(detail="Not found", status_code=404)


if __name__ == "__main__":
    os.environ.setdefault('CONFIGURATION', 'Develop')
    uvicorn.run(app="src.main:app", port=8001, reload=True)
