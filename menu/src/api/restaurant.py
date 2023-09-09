from typing import List

from fastapi import APIRouter, Depends
from models import RestaurantManager
from schemas import MenuItemRetrieveOut
from uow import SqlAlchemyUnitOfWork
from dependencies import get_uow, get_restaurant_manager
from schemas.menu import MenuRetrieveOut
from services import RestaurantService, MenuService, MenuItemService
from decorators import handle_app_errors


router = APIRouter(
    prefix='/restaurants'
)


@router.get('/{restaurant_id}/menu', response_model=MenuRetrieveOut)
@handle_app_errors
async def get_restaurant_current_menu(restaurant_id: int,
                                      uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    menu_service = MenuService()
    return await menu_service.retrieve_current_restaurant_menu(restaurant_id, uow)


@router.get('/{restaurant_id}/menus', response_model=List[MenuRetrieveOut])
@handle_app_errors
async def get_restaurant_menus(restaurant_id: int,
                               restaurant_manager: RestaurantManager = Depends(get_restaurant_manager),
                               uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    menu_service = MenuService(restaurant_manager)
    return await menu_service.list_restaurant_menus(restaurant_id, uow)


@router.get('/{restaurant_id}/items', response_model=List[MenuItemRetrieveOut])
@handle_app_errors
async def get_restaurant_items(restaurant_id: int,
                               restaurant_manager: RestaurantManager = Depends(get_restaurant_manager),
                               uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    menu_item_service = MenuItemService(restaurant_manager)
    return await menu_item_service.list_restaurant_items(restaurant_id, uow)
