from sqladmin import ModelView

from db.sqlalchemy.models import MenuItem


class MenuItemAdmin(ModelView, model=MenuItem):
    column_list = [MenuItem.id]

    icon = "fa-solid fa-bacon"
