from typing import List

from fastapi import APIRouter, Depends
from models import RestaurantManager
from schemas import RestaurantManagerCreateIn
from uow import SqlAlchemyUnitOfWork
from dependencies import get_uow, get_uow_with_commit, get_restaurant_manager
from schemas.category import MenuCategoryRetrieveOut
from schemas.menu import MenuRetrieveOut, MenuCreateIn, MenuCreateOut, MenuUpdateIn, MenuUpdateOut
from services import MenuCategoryService, MenuService, RestaurantManagerService
from decorators import handle_app_errors

router = APIRouter(
    prefix='/menus'
)


@router.post('/', response_model=MenuCreateOut)
@handle_app_errors
async def create_menu(menu: MenuCreateIn,
                      restaurant_manager: RestaurantManager = Depends(get_restaurant_manager),
                      uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    menu_service = MenuService(restaurant_manager)
    return await menu_service.create(menu, uow)


@router.put('/{menu_id}', response_model=MenuUpdateOut)
@handle_app_errors
async def update_menu(menu_id: int,
                      menu: MenuUpdateIn,
                      restaurant_manager: RestaurantManager = Depends(get_restaurant_manager),
                      uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    menu_service = MenuService(restaurant_manager)
    return await menu_service.update(menu_id, menu, uow)


@router.delete('/{menu_id}')
@handle_app_errors
async def delete_menu(menu_id: int,
                      restaurant_manager: RestaurantManager = Depends(get_restaurant_manager),
                      uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    menu_service = MenuService(restaurant_manager)
    await menu_service.delete(menu_id, uow)
    return {}
