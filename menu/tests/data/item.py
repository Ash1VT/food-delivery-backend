from typing import Optional

from models import MenuItem, Restaurant
from ..factories import MenuItemFactory, RestaurantFactory


async def generate_menu_item_create_data(restaurant: Optional[Restaurant] = None):
    if not restaurant:
        restaurant = await RestaurantFactory.create()
    menu_item = MenuItemFactory.build()
    return {
        'name': menu_item.name,
        'description': menu_item.description,
        'price': menu_item.price,
        'restaurant_id': restaurant.id
    }


async def generate_menu_item_create_data_nonexistent_restaurant():
    menu_item = MenuItemFactory.build()
    return {
        'name': menu_item.name,
        'description': menu_item.description,
        'price': menu_item.price,
        'restaurant_id': 999
    }


async def generate_menu_item_update_data():
    menu_item = MenuItemFactory.build()
    return {
        'name': menu_item.name,
        'description': menu_item.description,
        'price': menu_item.price,
    }


def validate_menu_item(menu_item: MenuItem, menu_item_data: dict) -> bool:
    return menu_item.name == menu_item_data.get('name') and \
        menu_item.description == menu_item_data.get('description') and \
        menu_item.price == menu_item_data.get('price')


def compare_menu_items(menu_item_1: MenuItem, menu_item_2: MenuItem) -> bool:
    return menu_item_1.name == menu_item_2.name and \
        menu_item_1.description == menu_item_2.description and \
        menu_item_1.price == menu_item_2.price and \
        menu_item_1.restaurant_id == menu_item_2.restaurant_id
