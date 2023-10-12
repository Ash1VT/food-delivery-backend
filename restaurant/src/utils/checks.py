from exceptions import RestaurantManagerNotActiveError, RestaurantManagerOwnershipError, ModeratorNotActiveError
from models import RestaurantManager, Moderator

__all__ = [
    "check_restaurant_manager_is_active",
    "check_moderator_is_active",
    "check_restaurant_manager_ownership_on_restaurant",
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


def check_moderator_is_active(moderator: Moderator):
    """
    Check if the given moderator is active.

    This function checks whether the given moderator is active. If the moderator is not active,
    a ModeratorNotActive exception is raised.

    Args:
        moderator (Moderator): The moderator to check.

    Raises:
        ModeratorNotActiveError: If the moderator is not active.
    """

    if not moderator.is_active:
        raise ModeratorNotActiveError(moderator)


def check_restaurant_manager_ownership_on_restaurant(restaurant_manager: RestaurantManager,
                                                     restaurant_id: int):
    """
    Check restaurant manager ownership on restaurant.

    This function checks whether the given restaurant manager has ownership of the specified restaurant.
    If the manager is not the owner, a RestaurantManagerOwnershipError exception is raised.

    Args:
        restaurant_manager (RestaurantManager): The restaurant manager instance.
        restaurant_id (int): The ID of the restaurant.

    Raises:
        RestaurantManagerOwnershipError: If the restaurant manager does not have ownership.
    """

    if restaurant_id != restaurant_manager.restaurant_id:
        raise RestaurantManagerOwnershipError(restaurant_manager, restaurant_id)

