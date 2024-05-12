from sqladmin import ModelView

from db.sqlalchemy.models import Restaurant


class RestaurantAdmin(ModelView, model=Restaurant):
    column_list = [Restaurant.id,
                   Restaurant.is_active]

    icon = "fa-solid fa-utensils"
