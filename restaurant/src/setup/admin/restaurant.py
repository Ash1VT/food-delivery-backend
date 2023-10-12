from sqladmin import ModelView
from models import Restaurant


class RestaurantAdmin(ModelView, model=Restaurant):
    name_plural = "Restaurants"

    column_list = [Restaurant.id,
                   Restaurant.name,
                   Restaurant.description,
                   Restaurant.email,
                   Restaurant.phone,
                   Restaurant.is_active]

    icon = "fa-solid fa-utensils"
