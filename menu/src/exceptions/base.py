from abc import abstractmethod, ABC
from typing import Type, Any

from models import CustomBase


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


# class RestaurantManagerOwnershipError(AppError):
#     """
#     Exception class for permission errors related to restaurant manager ownership.
#     """
#
#     def __init__(self, restaurant_manager_id: int, restaurant_id: int, model_class: Type[CustomBase]):
#         """
#         Initialize the RestaurantManagerOwnershipError exception.
#
#         Args:
#             restaurant_manager_id (int): The ID of the restaurant manager.
#             restaurant_id (int): The ID of the restaurant.
#         """
#
#         self._restaurant_manager_id = restaurant_manager_id
#         self._restaurant_id = restaurant_id
#         self._model_class = model_class
#         super().__init__()
#
#     @property
#     def status_code(self) -> int:
#         return 403
#
#     @property
#     def message(self) -> str:
#         return f"Manager with id={self._restaurant_manager_id}" \
#                f" does not own requested {self._model_class.__name__} from Restaurant with id={self._restaurant_id}" \
#                f" to perform operations on them"

# class RestaurantManagerMissingError(AppError):
#
#     def __init__(self, model_class: Type[CustomBase]):
#         """
#         Initialize the RestaurantManagerMissingError exception.
#
#         Args:
#             model_class (Type[CustomBase]): The class of the model.
#         """
#
#         self._model_class = model_class
#         super().__init__()
#
#     @property
#     def status_code(self) -> int:
#         return 401
#
#     @property
#     def message(self) -> str:
#         return f"Restaurant manager is required to perform such operations with {self._model_class}"
