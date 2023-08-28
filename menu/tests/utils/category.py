from tests.factories import RestaurantFactory, MenuCategoryFactory
from src.models import MenuCategory, Restaurant


async def generate_menu_category_create_data(restaurant: Restaurant = None):
    if not restaurant:
        restaurant = await RestaurantFactory.create()
    menu_category = MenuCategoryFactory.build()
    return {
        'name': menu_category.name,
        'restaurant_id': restaurant.id
    }


def generate_menu_category_create_data_nonexistent_restaurant():
    menu_category = MenuCategoryFactory.build()
    return {
        'name': menu_category.name,
        'restaurant_id': 999
    }


def generate_menu_category_update_data():
    menu_category = MenuCategoryFactory.build()
    return {
        'name': menu_category.name
    }


def validate_menu_category(menu_category: MenuCategory, menu_category_data: dict) -> bool:
    return menu_category.name == menu_category_data.get('name')


def compare_menu_categories(menu_category_1: MenuCategory, menu_category_2: MenuCategory) -> bool:
    return menu_category_1.name == menu_category_2.name and \
        menu_category_1.restaurant_id == menu_category_2.restaurant_id
