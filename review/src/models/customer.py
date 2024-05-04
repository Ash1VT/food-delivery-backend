from abc import ABC
from dataclasses import dataclass


@dataclass
class CustomerBaseModel(ABC):
    """
    Base model for a customer.
    """

    full_name: str
    image_url: str


@dataclass
class CustomerModel(CustomerBaseModel):
    """
    Model for a customer.
    """

    id: int


@dataclass
class CustomerCreateModel(CustomerBaseModel):
    """
    Model for creating a customer.
    """

    id: int


@dataclass
class CustomerUpdateModel(CustomerBaseModel):
    """
    Model for updating a customer.
    """

    pass
