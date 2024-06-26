import datetime

from sqlalchemy import Column, BigInteger, SmallInteger, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base

__all__ = [
    "Review"
]


class Review(Base):
    __tablename__ = "reviews"

    id = Column(BigInteger, primary_key=True)
    rating = Column(SmallInteger, nullable=False)
    comment = Column(String, nullable=True)

    customer_id = Column(BigInteger, ForeignKey('customers.id', name='fk_customer_id'), nullable=False)
    order_id = Column(BigInteger, ForeignKey('orders.id', name='fk_order_id'), nullable=True, unique=True)
    restaurant_id = Column(BigInteger, ForeignKey('restaurants.id', name='fk_restaurant_id'), nullable=True)
    menu_item_id = Column(BigInteger, ForeignKey('menu_items.id', name='fk_menu_item_id'), nullable=True)

    created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

    customer = relationship("Customer", uselist=False)
    order = relationship("Order", uselist=False)
    restaurant = relationship("Restaurant", uselist=False)
    menu_item = relationship("MenuItem", uselist=False)
