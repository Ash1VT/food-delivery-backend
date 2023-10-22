from models import Restaurant
from ..factories import RestaurantFactory


async def generate_restaurant_create_data():
    restaurant = RestaurantFactory.build()
    return {
        'id': restaurant.id,
        'is_active': restaurant.is_active
    }


async def generate_restaurant_update_data():
    restaurant = RestaurantFactory.build()
    return {
        'id': restaurant.id,
        'is_active': restaurant.is_active
    }


def validate_restaurant(restaurant: Restaurant, restaurant_data: dict) -> bool:
    return restaurant.id == restaurant_data.get('id')


def compare_restaurants(restaurant_1: Restaurant, restaurant_2: Restaurant) -> bool:
    return restaurant_1.id == restaurant_2.id
