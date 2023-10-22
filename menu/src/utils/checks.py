from typing import Optional
from models import RestaurantManager, Restaurant
from exceptions import RestaurantManagerNotActiveError, RestaurantManagerOwnershipError, MenuNotFoundWithIdError, \
    RestaurantNotActiveError, RestaurantManagerEmailNotVerifiedError
from uow import SqlAlchemyUnitOfWork

__all__ = [
    'check_restaurant_manager_is_active',
    'check_restaurant_manager_is_email_verified',
    'check_restaurant_manager_ownership_on_restaurant',
    'check_restaurant_manager_ownership_on_menu',
]


def check_restaurant_manager_is_active(restaurant_manager: RestaurantManager):
    """
    Check if a restaurant manager is active.

    This function checks whether the given restaurant manager is active. If the manager
    is not active, a RestaurantManagerNotActive exception is raised.

    Args:
        restaurant_manager (RestaurantManager): The restaurant manager instance.

    Raises:
        RestaurantManagerNotActive: If the restaurant manager is not active.
    """

    if not restaurant_manager.is_active:
        raise RestaurantManagerNotActiveError(restaurant_manager)


def check_restaurant_manager_is_email_verified(restaurant_manager: RestaurantManager):
    if not restaurant_manager.is_email_verified:
        raise RestaurantManagerEmailNotVerifiedError(restaurant_manager)


def check_restaurant_manager_ownership_on_restaurant(restaurant_manager: RestaurantManager,
                                                     restaurant_id: int):
    """
    Check restaurant manager ownership on restaurant.

    This function checks whether the given restaurant manager has ownership of the specified restaurant.
    If the manager is not the owner or if the manager is None, a RestaurantManagerOwnershipError exception
    is raised.

    Args:
        restaurant_manager (RestaurantManager): The restaurant manager instance.
        restaurant_id (int): The ID of the restaurant.

    Raises:
        RestaurantManagerOwnershipError: If the restaurant manager does not have ownership.
    """

    if restaurant_id != restaurant_manager.restaurant_id:
        raise RestaurantManagerOwnershipError(restaurant_manager, restaurant_id)


async def check_restaurant_manager_ownership_on_menu(restaurant_manager: RestaurantManager,
                                                     menu_id: int,
                                                     uow: SqlAlchemyUnitOfWork):
    menu = await uow.menus.retrieve(menu_id)

    if not menu:
        raise MenuNotFoundWithIdError(menu_id)

    check_restaurant_manager_ownership_on_restaurant(restaurant_manager, menu.restaurant_id)


def check_restaurant_is_active(restaurant: Restaurant):
    if not restaurant.is_active:
        raise RestaurantNotActiveError(restaurant.id)
