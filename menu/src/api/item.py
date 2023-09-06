from typing import List

from fastapi import APIRouter, Depends
from models import RestaurantManager
from schemas import RestaurantManagerCreateIn, RestaurantCreateIn
from uow import SqlAlchemyUnitOfWork
from dependencies import get_uow, get_uow_with_commit, get_restaurant_manager
from schemas.item import MenuItemRetrieveOut, MenuItemCreateIn, MenuItemCreateOut, MenuItemUpdateIn, MenuItemUpdateOut
from services import MenuItemService
from decorators import handle_app_errors

router = APIRouter(
    prefix='/items'
)


@router.post('/', response_model=MenuItemCreateOut)
@handle_app_errors
async def create_item(menu_item: MenuItemCreateIn,
                      restaurant_manager: RestaurantManager = Depends(get_restaurant_manager),
                      uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    menu_item_service = MenuItemService(restaurant_manager)
    return await menu_item_service.create(menu_item, uow)


@router.put('/{item_id}', response_model=MenuItemUpdateOut)
@handle_app_errors
async def update_item(item_id: int,
                      menu_item: MenuItemUpdateIn,
                      restaurant_manager: RestaurantManager = Depends(get_restaurant_manager),
                      uow: SqlAlchemyUnitOfWork = Depends(get_uow_with_commit)):
    menu_item_service = MenuItemService(restaurant_manager)
    return await menu_item_service.update(item_id, menu_item, uow)
