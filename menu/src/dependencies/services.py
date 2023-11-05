from typing import Optional

from fastapi import Depends, Cookie

from models import RestaurantManager
from services import MenuItemService, MenuCategoryService, MenuService, RestaurantService
from authentication import authenticate
from uow import SqlAlchemyUnitOfWork
from .uow import get_uow

__all__ = [
    'get_menu_item_service',
    'get_menu_category_service',
    'get_menu_service',
    'get_restaurant_service'
]


async def get_menu_item_service(access_token: Optional[str] = Cookie(default=None),
                                uow: SqlAlchemyUnitOfWork = Depends(get_uow)) -> MenuItemService:
    """
    Dependency for retrieving the menu item service.

    Args:
        access_token (Optional[str]): The access token for authentication. Defaults to None.
        uow (SqlAlchemyUnitOfWork): The unit of work for accessing the database.

    Returns:
        MenuItemService: An instance of the MenuItemService class.
    """

    user = await authenticate(access_token, uow)
    if isinstance(user, RestaurantManager):
        return MenuItemService(restaurant_manager=user)
    return MenuItemService()


async def get_menu_category_service(access_token: Optional[str] = Cookie(default=None),
                                    uow: SqlAlchemyUnitOfWork = Depends(get_uow)) -> MenuCategoryService:
    """
    Dependency for retrieving the menu category service.

    Args:
        access_token (Optional[str]): The access token for authentication. Defaults to None.
        uow (SqlAlchemyUnitOfWork): The unit of work for accessing the database.

    Returns:
        MenuCategoryService: An instance of the MenuCategoryService class.
    """

    user = await authenticate(access_token, uow)
    if isinstance(user, RestaurantManager):
        return MenuCategoryService(restaurant_manager=user)
    return MenuCategoryService()


async def get_menu_service(access_token: Optional[str] = Cookie(default=None),
                           uow: SqlAlchemyUnitOfWork = Depends(get_uow)) -> MenuService:
    """
    Dependency for retrieving the menu service.

    Args:
        access_token (Optional[str]): The access token for authentication. Defaults to None.
        uow (SqlAlchemyUnitOfWork): The unit of work for accessing the database.

    Returns:
        MenuService: An instance of the MenuService class.
    """

    user = await authenticate(access_token, uow)
    if isinstance(user, RestaurantManager):
        return MenuService(restaurant_manager=user)
    return MenuService()


async def get_restaurant_service(access_token: Optional[str] = Cookie(default=None),
                                 uow: SqlAlchemyUnitOfWork = Depends(get_uow)) -> RestaurantService:
    """
    Dependency for retrieving the restaurant service.

    Args:
        access_token (Optional[str]): The access token for authentication. Defaults to None.
        uow (SqlAlchemyUnitOfWork): The unit of work for accessing the database.

    Returns:
        RestaurantService: An instance of the RestaurantService class.
    """

    user = await authenticate(access_token, uow)
    if isinstance(user, RestaurantManager):
        return RestaurantService(restaurant_manager=user)
    return RestaurantService()
