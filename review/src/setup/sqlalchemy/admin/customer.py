from sqladmin import ModelView

from db.sqlalchemy.models import Customer


class CustomerAdmin(ModelView, model=Customer):
    column_list = [Customer.id]

    icon = "fa-solid fa-user"
