from typing import Optional
from src.models import RestaurantManager
from src.exceptions import RestaurantManagerNotActiveError, RestaurantManagerOwnershipError


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

    if restaurant_manager and not restaurant_manager.is_active:
        raise RestaurantManagerNotActiveError(restaurant_manager)


def check_restaurant_manager_ownership(restaurant_manager: Optional[RestaurantManager],
                                       restaurant_id: int):
    """
    Check restaurant manager ownership.

    This function checks whether the given restaurant manager has ownership of the specified restaurant.
    If the manager is not the owner or if the manager is None, a RestaurantManagerOwnershipError exception
    is raised.

    Args:
        restaurant_manager (Optional[RestaurantManager]): The restaurant manager instance.
        restaurant_id (int): The ID of the restaurant.

    Raises:
        RestaurantManagerOwnershipError: If the restaurant manager does not have ownership.
    """

    if restaurant_manager and restaurant_id != restaurant_manager.restaurant_id:
        raise RestaurantManagerOwnershipError(restaurant_manager, restaurant_id)
