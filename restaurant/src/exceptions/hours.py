from exceptions import DatabaseInstanceAlreadyExistsError, DatabaseInstanceNotFoundError
from models import WorkingHours

__all__ = [
    "WorkingHoursNotFoundWithIdError",
    "WorkingHoursAlreadyExistsWithIdError",
]


class WorkingHoursNotFoundWithIdError(DatabaseInstanceNotFoundError):

    def __init__(self, id: int):
        super().__init__('id', id, WorkingHours)


class WorkingHoursAlreadyExistsWithIdError(DatabaseInstanceAlreadyExistsError):

    def __init__(self, id: int):
        super().__init__('id', id, WorkingHours)
