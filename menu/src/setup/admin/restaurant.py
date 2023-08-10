from sqladmin import ModelView
from src.models import Restaurant


class RestaurantAdmin(ModelView, model=Restaurant):
    column_list = [Restaurant.id,
                   Restaurant.menus,
                   Restaurant.current_menu_id]

    icon = "fa-solid fa-utensils"
