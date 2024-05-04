from abc import ABC

from models.order import OrderModel, OrderCreateModel
from repositories.interfaces.mixins import IDeleteMixin, ICreateMixin, IRetrieveMixin


class IOrderRepository(IRetrieveMixin[OrderModel],
                       ICreateMixin[OrderModel, OrderCreateModel],
                       IDeleteMixin,
                       ABC):
    """
    Interface for order repository.
    """

    pass
