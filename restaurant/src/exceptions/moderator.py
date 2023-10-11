from exceptions.base import AppError, DatabaseInstanceNotFoundError, DatabaseInstanceAlreadyExistsError
from models import Moderator

__all__ = [
    'ModeratorNotFoundWithIdError',
    'ModeratorNotActiveError',
    'ModeratorAlreadyExistsWithIdError',
]


class ModeratorNotFoundWithIdError(DatabaseInstanceNotFoundError):

    def __init__(self, id: int):
        super().__init__('id', id, Moderator)


class ModeratorAlreadyExistsWithIdError(DatabaseInstanceAlreadyExistsError):

    def __init__(self, id: int):
        super().__init__('id', id, Moderator)


class ModeratorNotActiveError(AppError):

    def __init__(self, moderator: Moderator):
        self._moderator = moderator
        super().__init__()

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return f"Moderator with id={self._moderator.id} is not active to perform this actions"
