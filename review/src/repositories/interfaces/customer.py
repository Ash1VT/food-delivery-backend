from abc import ABC

from models.customer import CustomerModel, CustomerCreateModel, CustomerUpdateModel
from repositories.interfaces.mixins import IUpdateMixin, ICreateMixin, IRetrieveMixin, IDeleteMixin


class ICustomerRepository(IRetrieveMixin[CustomerModel],
                          ICreateMixin[CustomerModel, CustomerCreateModel],
                          IUpdateMixin[CustomerModel, CustomerUpdateModel],
                          IDeleteMixin,
                          ABC):
    """
    Interface for customer repository.
    """

    pass
