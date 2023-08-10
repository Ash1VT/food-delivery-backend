from sqladmin import Admin

from src.db import async_engine
from ..app import app

from .menu import MenuAdmin, MenuItemAdmin
from .category import CategoryAdmin
from .restaurant import RestaurantAdmin

# Admin panel initialization #

admin = Admin(
    title="Menu Microservice",
    app=app,
    engine=async_engine,
)

# Register all models here #

admin.add_model_view(MenuAdmin)
admin.add_model_view(MenuItemAdmin)
admin.add_model_view(CategoryAdmin)
admin.add_model_view(RestaurantAdmin)
