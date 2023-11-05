from sqladmin import ModelView
from models import RestaurantManager


class RestaurantManagerAdmin(ModelView, model=RestaurantManager):
    column_list = [RestaurantManager.id,
                   RestaurantManager.restaurant_id]

    icon = "fa-solid fa-user"
