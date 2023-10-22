from typing import Optional

from fastapi import Depends, Cookie

from models import RestaurantManager
from services import MenuItemService, MenuCategoryService, MenuService
from authentication import authenticate
from uow import SqlAlchemyUnitOfWork
from .uow import get_uow

__all__ = [
    'get_menu_item_service',
    'get_menu_category_service',
    'get_menu_service',
]


async def get_menu_item_service(access_token: Optional[str] = Cookie(default=None),
                                uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    user = await authenticate(access_token, uow)
    if isinstance(user, RestaurantManager):
        return MenuItemService(restaurant_manager=user)
    return MenuItemService()


async def get_menu_category_service(access_token: Optional[str] = Cookie(default=None),
                                    uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    user = await authenticate(access_token, uow)
    if isinstance(user, RestaurantManager):
        return MenuCategoryService(restaurant_manager=user)
    return MenuCategoryService()


async def get_menu_service(access_token: Optional[str] = Cookie(default=None),
                           uow: SqlAlchemyUnitOfWork = Depends(get_uow)):
    user = await authenticate(access_token, uow)
    if isinstance(user, RestaurantManager):
        return MenuService(restaurant_manager=user)
    return MenuService()
