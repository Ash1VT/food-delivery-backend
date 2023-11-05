from typing import Optional

from models import MenuCategory, Menu, Restaurant
from ..factories import RestaurantFactory, MenuCategoryFactory, MenuFactory


async def generate_menu_category_create_data(restaurant: Optional[Restaurant] = None):
    if not restaurant:
        restaurant = await RestaurantFactory.create()
    menu = await MenuFactory.create(restaurant=restaurant)
    menu_category = MenuCategoryFactory.build()

    return {
        'name': menu_category.name,
        'menu_id': menu.id,
    }


async def generate_menu_category_create_data_nonexistent_menu():
    menu_category = MenuCategoryFactory.build()

    return {
        'name': menu_category.name,
        'menu_id': 999,
    }


async def generate_menu_category_update_data():
    menu_category = MenuCategoryFactory.build()
    return {
        'name': menu_category.name
    }


def validate_menu_category(menu_category: MenuCategory, menu_category_data: dict) -> bool:
    return menu_category.name == menu_category_data.get('name')


def compare_menu_categories(menu_category_1: MenuCategory, menu_category_2: MenuCategory) -> bool:
    return menu_category_1.name == menu_category_2.name and \
        menu_category_1.menu_id == menu_category_2.menu_id
