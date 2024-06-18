from sqlalchemy import BigInteger, Column, ForeignKey

from db.sqlalchemy.models import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(BigInteger, primary_key=True, autoincrement=False)
    customer_id = Column(BigInteger, ForeignKey('customers.id', name='fk_customer_id'), nullable=False)
    courier_id = Column(BigInteger, ForeignKey('couriers.id', name='fk_courier_id'), nullable=False)
