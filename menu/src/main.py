import os

import uvicorn
from fastapi import Depends

from models import RestaurantManager
from schemas import RestaurantManagerCreateIn
from setup import app
from dependencies import get_uow, get_uow_with_commit, get_restaurant_manager
from services import RestaurantManagerService
from uow import SqlAlchemyUnitOfWork
from utils.uow import uow_transaction_with_commit


@app.get("/")
async def index(restaurant_manager: RestaurantManager = Depends(get_restaurant_manager),
                uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    # return await RestaurantManagerService().retrieve_instance(restaurant_manager.id, uow)
    return restaurant_manager


# @app.post("/menus/{menu_id}/categories/")
# async def create_category(menu_id: int,
#                           menu_category: MenuCategoryCreateIn,
#                           manager_id: int = Depends(get_restaurant_manager_id),
#                           session_maker=Depends(get_async_session_maker)):
#     # start = time.time()
#     uow = SqlAlchemyUnitOfWork(session_maker)
#     menu_category_service = MenuCategoryService()
#     menu_service = MenuService()
#
#     async with uow_transaction_with_commit(uow):
#         created_instance = await menu_category_service.create_instance(menu_category, uow)
#         await menu_service.add_menu_category(menu_id, created_instance, uow)
#
#         return menu_category_service.get_create_schema(created_instance)

if __name__ == "__main__":
    os.environ.setdefault('CONFIGURATION', 'Develop')
    uvicorn.run(app="main:app", port=8001, reload=True)
