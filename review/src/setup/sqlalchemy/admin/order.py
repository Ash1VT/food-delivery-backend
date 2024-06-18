from sqladmin import ModelView

from db.sqlalchemy.models import Order


class OrderAdmin(ModelView, model=Order):
    column_list = [Order.id,
                   Order.courier_id,
                   Order.customer_id,]

    icon = "fa-solid fa-file"
