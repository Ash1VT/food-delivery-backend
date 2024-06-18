from sqladmin import Admin

from setup.app import app
from setup.sqlalchemy.engine import async_engine

from .courier import CourierAdmin
from .customer import CustomerAdmin
from .menu_item import MenuItemAdmin
from .order import OrderAdmin
from .restaurant import RestaurantAdmin
from .review import ReviewAdmin

# Admin panel initialization #

admin = Admin(
    title="Review Microservice",
    app=app,
    engine=async_engine,
)

# Register all models here #

admin.add_model_view(CourierAdmin)
admin.add_model_view(CustomerAdmin)
admin.add_model_view(MenuItemAdmin)
admin.add_model_view(OrderAdmin)
admin.add_model_view(RestaurantAdmin)
admin.add_model_view(ReviewAdmin)
