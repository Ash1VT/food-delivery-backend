from sqladmin import ModelView
from models import RestaurantApplication


class RestaurantApplicationAdmin(ModelView, model=RestaurantApplication):
    name_plural = "Restaurant Applications"

    column_list = [RestaurantApplication.id,
                   RestaurantApplication.name,
                   RestaurantApplication.description,
                   RestaurantApplication.email,
                   RestaurantApplication.phone,
                   RestaurantApplication.restaurant_manager_id]

    icon = "fa-solid fa-file"
