from sqladmin import ModelView
from src.models import Category


class CategoryAdmin(ModelView, model=Category):
    name_plural = "Categories"

    column_list = [Category.id,
                   Category.name,
                   Category.items]

    icon = "fa-solid fa-fish"
