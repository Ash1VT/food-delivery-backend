from typing import List

from fastapi import APIRouter, Depends

from decorators import handle_app_errors
from dependencies import get_uow, get_menu_service, get_menu_item_service
from schemas import MenuItemRetrieveOut
from schemas.menu import MenuRetrieveOut
from services import MenuService, MenuItemService
from uow import SqlAlchemyUnitOfWork

router = APIRouter(
    prefix='/restaurants'
)


@router.get('/{restaurant_id}/menu', response_model=MenuRetrieveOut)
@handle_app_errors
async def get_restaurant_current_menu(restaurant_id: int,
                                      menu_service: MenuService = Depends(get_menu_service),
                                      uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    return await menu_service.retrieve_current_restaurant_menu(restaurant_id, uow)


@router.get('/{restaurant_id}/menus', response_model=List[MenuRetrieveOut])
@handle_app_errors
async def get_restaurant_menus(restaurant_id: int,
                               menu_service: MenuService = Depends(get_menu_service),
                               uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    return await menu_service.list_restaurant_menus(restaurant_id, uow)


@router.get('/{restaurant_id}/items', response_model=List[MenuItemRetrieveOut])
@handle_app_errors
async def get_restaurant_items(restaurant_id: int,
                               menu_item_service: MenuItemService = Depends(get_menu_item_service),
                               uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    return await menu_item_service.list_restaurant_items(restaurant_id, uow)
