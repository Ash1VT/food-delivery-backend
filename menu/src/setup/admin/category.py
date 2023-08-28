from sqladmin import ModelView
from models import MenuCategory


class MenuCategoryAdmin(ModelView, model=MenuCategory):
    name_plural = "Menu Categories"

    column_list = [MenuCategory.id,
                   MenuCategory.name,
                   MenuCategory.items]

    icon = "fa-solid fa-fish"
