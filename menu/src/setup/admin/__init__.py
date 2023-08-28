from sqladmin import Admin

from db import async_engine
from ..app import app

from .menu import MenuAdmin
from .item import MenuItemAdmin
from .category import MenuCategoryAdmin
from .restaurant import RestaurantAdmin
from .manager import RestaurantManagerAdmin

# Admin panel initialization #

admin = Admin(
    title="Menu Microservice",
    app=app,
    engine=async_engine,
)

# Register all models here #

admin.add_model_view(MenuAdmin)
admin.add_model_view(MenuItemAdmin)
admin.add_model_view(MenuCategoryAdmin)
admin.add_model_view(RestaurantAdmin)
admin.add_model_view(RestaurantManagerAdmin)
