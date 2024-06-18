from sqladmin import ModelView

from db.sqlalchemy.models import Courier


class CourierAdmin(ModelView, model=Courier):
    name_plural = "Couriers"

    column_list = [Courier.id]

    icon = "fa-solid fa-user"
