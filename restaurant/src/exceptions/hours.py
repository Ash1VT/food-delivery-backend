from datetime import time

from exceptions import DatabaseInstanceAlreadyExistsError, DatabaseInstanceNotFoundError, AppError
from models import WorkingHours, DayOfWeek

__all__ = [
    "WorkingHoursNotFoundWithIdError",
    "WorkingHoursAlreadyExistsWithDayError",
    "WorkingHoursTimeConflictError",
]


class WorkingHoursNotFoundWithIdError(DatabaseInstanceNotFoundError):
    """
    Exception class for errors when working hours is not found with id.
    """

    def __init__(self, id: int):
        """
        Initialize the WorkingHoursNotFoundWithIdError exception.

        Args:
            id (int): The ID of the working hours.
        """

        super().__init__('id', id, WorkingHours)


class WorkingHoursAlreadyExistsWithDayError(DatabaseInstanceAlreadyExistsError):
    """
    Exception class for errors when working hours already exists with day of week.
    """

    def __init__(self, day_of_week: DayOfWeek):
        """
        Initialize the WorkingHoursAlreadyExistsWithDayError exception.

        Args:
            day_of_week (DayOfWeek): The day of the week which already exists.
        """

        super().__init__('day of week', day_of_week.value, WorkingHours)


class WorkingHoursTimeConflictError(AppError):
    """
    Exception class for errors when closing time is before opening time.
    """

    def __init__(self, opening_time: time, closing_time: time):
        """
        Initialize the WorkingHoursTimeConflictError exception.

        Args:
            opening_time (time): The opening time.
            closing_time (time): The closing time.
        """

        self._opening_time = opening_time
        self._closing_time = closing_time
        super().__init__()

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return f"Opening time {self._opening_time.strftime('%H:%M')} must be before " \
               f"closing time {self._closing_time.strftime('%H:%M')}"
