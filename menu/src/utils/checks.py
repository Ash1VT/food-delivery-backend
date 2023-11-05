from exceptions import RestaurantManagerOwnershipError
from models import RestaurantManager

__all__ = [
    'check_restaurant_manager_ownership_on_restaurant',
]


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
