from sqladmin import ModelView

from db.sqlalchemy.models import Review


class ReviewAdmin(ModelView, model=Review):
    column_list = [Review.id,
                   Review.comment,
                   Review.rating,
                   Review.customer_id,
                   Review.restaurant_id,
                   Review.order_id,
                   Review.menu_item_id,
                   Review.created_at]

    icon = "fa-solid fa-star"
