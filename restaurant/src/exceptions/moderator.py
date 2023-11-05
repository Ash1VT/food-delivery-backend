from exceptions.base import AppError, DatabaseInstanceNotFoundError, DatabaseInstanceAlreadyExistsError
from models import Moderator

__all__ = [
    'ModeratorNotFoundWithIdError',
    'ModeratorNotActiveError',
    'ModeratorAlreadyExistsWithIdError',
]


class ModeratorNotFoundWithIdError(DatabaseInstanceNotFoundError):
    """
    Exception class for errors when moderator is not found with id.
    """
    def __init__(self, id: int):
        """
        Initialize the ModeratorNotFoundWithIdError exception.

        Args:
            id (int): The ID of the moderator.
        """

        super().__init__('id', id, Moderator)


class ModeratorAlreadyExistsWithIdError(DatabaseInstanceAlreadyExistsError):
    """
    Exception class for errors when moderator already exists with id.
    """

    def __init__(self, id: int):
        """
        Initialize the ModeratorAlreadyExistsWithIdError exception.

        Args:
            id (int): The ID of the moderator.
        """

        super().__init__('id', id, Moderator)


class ModeratorNotActiveError(AppError):
    """
    Exception class for errors when moderator is not active.
    """

    def __init__(self, moderator: Moderator):
        """
        Initialize the ModeratorNotActiveError exception.

        Args:
            moderator (Moderator): The moderator object associated with the error.
        """

        self._moderator = moderator
        super().__init__()

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return f"Moderator with id={self._moderator.id} is not active to perform this actions"
