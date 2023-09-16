from sqladmin import Admin

from db import async_engine
from ..app import app

# Admin panel initialization #

admin = Admin(
    title="Restaurant Microservice",
    app=app,
    engine=async_engine,
)

# Register all models here #

