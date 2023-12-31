from models import RestaurantManager
from ..factories import RestaurantManagerFactory, RestaurantFactory


async def generate_restaurant_manager_create_data():
    restaurant = await RestaurantFactory.create()
    restaurant_manager = RestaurantManagerFactory.build()
    return {
        'id': restaurant_manager.id,
        'restaurant_id': restaurant.id
    }


async def generate_restaurant_manager_update_data():
    restaurant_manager = RestaurantManagerFactory.build()
    return {
        'id': restaurant_manager.id
    }


def validate_restaurant_manager(restaurant_manager: RestaurantManager, restaurant_manager_data: dict) -> bool:
    return restaurant_manager.id == restaurant_manager_data.get('id')


def compare_restaurant_managers(restaurant_manager_1: RestaurantManager,
                                restaurant_manager_2: RestaurantManager) -> bool:
    return restaurant_manager_1.id == restaurant_manager_2.id and \
        restaurant_manager_1.restaurant_id == restaurant_manager_2.restaurant_id
