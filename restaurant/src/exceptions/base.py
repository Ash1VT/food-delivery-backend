from abc import abstractmethod, ABC
from typing import Any, Type

from models import CustomBase

__all__ = [
    'AppError',
    'DatabaseInstanceNotFoundError',
    'DatabaseInstanceAlreadyExistsError',
    'PermissionDeniedError',
]


class AppError(Exception, ABC):
    """
    Base class for custom application-specific exceptions.
    """

    def __init__(self):
        super().__init__(self.message)

    @property
    @abstractmethod
    def status_code(self) -> int:
        """
        Property representing the HTTP status code associated with the error.
        """

        raise NotImplementedError()

    @property
    @abstractmethod
    def message(self) -> str:
        """
        Property representing the error message associated with the exception.
        """

        raise NotImplementedError()


class DatabaseInstanceNotFoundError(AppError):
    """
    Exception class for instances that were not found in the database.
    """

    def __init__(self, field_name: str,
                 field_value: Any,
                 model_class: Type[CustomBase]):
        """
        Initialize the DatabaseInstanceNotFoundError exception.

        Args:
            field_name (str): The field name of the instance
            field_value (Any): The field value of the instance.
            model_class (Type[CustomBase]): The class of the model.
        """

        self._field_name = field_name
        self._field_value = field_value
        self._model_class = model_class
        super().__init__()

    @property
    def status_code(self) -> int:
        return 404

    @property
    def message(self) -> str:
        return f"{self._model_class.__name__} with {self._field_name}={self._field_value} not found"


class DatabaseInstanceAlreadyExistsError(AppError):

    def __init__(self, field_name: str,
                 field_value: Any,
                 model_class: Type[CustomBase]):
        """
        Initialize the DatabaseInstanceNotFoundError exception.

        Args:
            field_name (str): The field name of the instance
            field_value (Any): The field value of the instance.
            model_class (Type[CustomBase]): The class of the model.
        """

        self._field_name = field_name
        self._field_value = field_value
        self._model_class = model_class
        super().__init__()

    @property
    def status_code(self) -> int:
        return 400

    @property
    def message(self) -> str:
        return f"{self._model_class.__name__} with {self._field_name}={self._field_value} already exists"


class PermissionDeniedError(AppError):
    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return f"User does not have permission to perform this action"

