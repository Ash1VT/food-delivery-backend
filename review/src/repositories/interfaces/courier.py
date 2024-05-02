from abc import ABC

from models.courier import CourierModel, CourierCreateModel
from repositories.interfaces.mixins import IRetrieveMixin, ICreateMixin, IDeleteMixin


class ICourierRepository(IRetrieveMixin[CourierModel],
                         ICreateMixin[CourierModel, CourierCreateModel],
                         IDeleteMixin,
                         ABC):
    """
    Interface for courier repository.
    """

    pass
