from sqladmin import ModelView
from models import RestaurantManager


class RestaurantManagerAdmin(ModelView, model=RestaurantManager):
    name_plural = "Restaurant Managers"

    column_list = [RestaurantManager.id,
                   RestaurantManager.is_active,
                   RestaurantManager.restaurant_id]

    icon = "fa-solid fa-user"
