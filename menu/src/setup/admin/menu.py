from sqladmin import ModelView
from src.models import Menu, MenuItem


class MenuAdmin(ModelView, model=Menu):
    column_list = [Menu.id,
                   Menu.name,
                   Menu.description,
                   Menu.restaurant_id,
                   Menu.categories]

    icon = "fa-solid fa-file-lines"


class MenuItemAdmin(ModelView, model=MenuItem):
    column_list = [MenuItem.id,
                   MenuItem.name,
                   MenuItem.description,
                   MenuItem.price,
                   MenuItem.categories]

    icon = "fa-solid fa-bacon"
