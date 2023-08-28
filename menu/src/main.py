import os
import time
from typing import Annotated

import uvicorn
from fastapi import Depends

from repositories import MenuCategoryRepository, RestaurantRepository
from schemas import MenuCategoryCreateIn, MenuCategoryUpdateIn
from services.category import MenuCategoryService
from services.menu import MenuService
from setup import app
from uow import GenericUnitOfWork, SqlAlchemyUnitOfWork

# @app.get("/")
# async def index(session: AsyncSession = Depends(get_async_session)):
#     # logger.info("Test log")
#     # await session.execute(text('SELECT 1'))
#     menu_id = 1
#     smtp = select(Menu).where(Menu.id == menu_id)
#
#     result = await session.execute(smtp)
#     menu = result.unique().scalar_one_or_none()
#
#     if menu:
#         menu_out = MenuOut.model_validate(menu)
#         return menu_out
#     raise HTTPException(detail="Not found", status_code=404)


# @app.post("/restaurants/")
# async def create_restaurant(restaurant: RestaurantCreate,
#                             session: AsyncSession = Depends(get_async_session)):
#     start = time.time()
#     restaurant_repository = RestaurantRepository(session=session)
#     menu_repository = MenuRepository(session=session)
#     menu_category_repository = MenuCategoryRepository(session=session)
#     menu_item_repository = MenuItemRepository(session=session)
#
#     menu_item_service = MenuItemService(repository=menu_item_repository)
#     menu_category_service = MenuCategoryService(repository=menu_category_repository,
#                                                 menu_item_service=menu_item_service)
#     menu_service = MenuService(repository=menu_repository,
#                                menu_category_service=menu_category_service)
#
#     restaurant_service = RestaurantService(repository=restaurant_repository,
#                                            menu_service=menu_service)
#
#     try:
#         restaurant_created = await restaurant_service.create(item=restaurant)
#     except DatabaseAlreadyExistsError as e:
#         end = time.time()
#         return end - start
#
#     await session.commit()
#     end = time.time()
#     return end - start

from db import async_session_maker


def get_async_session_maker():
    yield async_session_maker


# UOWDep = Annotated[MenuCategoryUnitOfWork, Depends(MenuCategoryUnitOfWork)]


# @app.post("/categories")
# async def create_category(restaurant: MenuCategoryCreateIn,
#                           session_maker=Depends(get_async_session_maker)):
#     start = time.time()
#     uow = SqlAlchemyUnitOfWork(session_maker)
#     menu_category_service = MenuCategoryService()
#     menu_category_created = await menu_category_service.create(restaurant, uow)
#     end = time.time()
#     return end - start

from utils import uow_transaction, uow_transaction_with_commit


@app.post("/menus/{menu_id}/categories/")
async def create_category(menu_id: int,
                          menu_category: MenuCategoryCreateIn,
                          session_maker=Depends(get_async_session_maker)):
    # start = time.time()
    uow = SqlAlchemyUnitOfWork(session_maker)
    menu_category_service = MenuCategoryService()
    menu_service = MenuService()

    async with uow_transaction_with_commit(uow):
        created_instance = await menu_category_service.create_instance(menu_category, uow)
        await menu_service.add_menu_category(menu_id, created_instance, uow)

        return menu_category_service.get_create_schema(created_instance)


# @app.get("/restaurants/{restaurant_id}", response_model=Union[RestaurantForUserOut, RestaurantForManagerOut])
# async def get_restaurant(restaurant_id: int,
#                          for_manager: bool = Query(default=False),
#                          session: AsyncSession = Depends(get_async_session)):
#     restaurant_repository = RestaurantRepository(session=session)
#
#     if for_manager:
#         restaurant = await restaurant_repository.retrieve(id=restaurant_id, fetch_menus=True)
#     else:
#         restaurant = await restaurant_repository.retrieve(id=restaurant_id, fetch_current_menu=True)
#
#     if restaurant:
#         if for_manager:
#             return RestaurantForManagerOut.model_validate(restaurant)
#         else:
#             return RestaurantForUserOut.model_validate(restaurant)
#
#     raise HTTPException(detail="Not found", status_code=404)
#
#
# @app.post("/items/")
# async def create_menu_item(menu_item: MenuItemCreate,
#                            session: AsyncSession = Depends(get_async_session)) -> MenuItemOut:
#     menu_item_repository = MenuItemRepository(session=session)
#     menu_item_service = MenuItemService(repository=menu_item_repository)
#     menu_item_created = await menu_item_service.create(item=menu_item)
#     return menu_item_created


if __name__ == "__main__":
    os.environ.setdefault('CONFIGURATION', 'Develop')
    uvicorn.run(app="main:app", port=8001, reload=True)
