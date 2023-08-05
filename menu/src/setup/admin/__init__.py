from sqladmin import Admin

from src.db import async_engine
from ..app import app

# Admin panel initialization #

admin = Admin(
    title="Menu Microservice",
    app=app,
    engine=async_engine
)

# Register all models here #
