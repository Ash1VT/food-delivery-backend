from tests.factories import RestaurantFactory, MenuFactory
from src.models import Menu, Restaurant


async def generate_menu_create_data(restaurant: Restaurant = None):
    if not restaurant:
        restaurant = await RestaurantFactory.create()
    menu = MenuFactory.build()
    return {
        'name': menu.name,
        'description': menu.description,
        'restaurant_id': restaurant.id
    }


def generate_menu_create_data_nonexistent_restaurant():
    menu = MenuFactory.build()
    return {
        'name': menu.name,
        'description': menu.description,
        'restaurant_id': 999
    }


def generate_menu_update_data():
    menu = MenuFactory.build()
    return {
        'name': menu.name,
        'description': menu.description
    }


def validate_menu(menu: Menu, menu_data: dict) -> bool:
    return menu.name == menu_data.get('name') and \
        menu.description == menu_data.get('description')


def compare_menus(menu_1: Menu, menu_2: Menu) -> bool:
    return menu_1.name == menu_2.name and \
        menu_1.description == menu_2.description and \
        menu_1.restaurant_id == menu_2.restaurant_id
