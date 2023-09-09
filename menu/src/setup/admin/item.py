from sqladmin import ModelView
from models import MenuItem


class MenuItemAdmin(ModelView, model=MenuItem):
    column_list = [MenuItem.id,
                   MenuItem.name,
                   MenuItem.description,
                   MenuItem.price]

    icon = "fa-solid fa-bacon"
