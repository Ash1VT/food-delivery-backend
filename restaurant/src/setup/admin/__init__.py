from sqladmin import Admin

from db import async_engine
from ..app import app
from .application import RestaurantApplicationAdmin
from .restaurant import RestaurantAdmin
from .manager import RestaurantManagerAdmin
from .moderator import ModeratorAdmin
from .hours import WorkingHoursAdmin

# Admin panel initialization #

admin = Admin(
    title="Restaurant Microservice",
    app=app,
    engine=async_engine,
)

# Register all models here #

admin.add_model_view(RestaurantApplicationAdmin)
admin.add_model_view(RestaurantAdmin)
admin.add_model_view(RestaurantManagerAdmin)
admin.add_model_view(ModeratorAdmin)
admin.add_model_view(WorkingHoursAdmin)
