from sqladmin import ModelView
from models import Menu


class MenuAdmin(ModelView, model=Menu):
    column_list = [Menu.id,
                   Menu.name,
                   Menu.description,
                   Menu.restaurant_id,
                   Menu.categories]

    icon = "fa-solid fa-file-lines"
