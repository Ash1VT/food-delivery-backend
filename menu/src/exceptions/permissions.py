from typing import Type

from exceptions import AppError
from user_roles import UserRole

__all__ = [
    'PermissionDeniedError',
]


class PermissionDeniedError(AppError):
    """
    Exception class for permissions that are not allowed for the current user
    """

    def __init__(self, *required_roles: Type[UserRole]):
        """
        Initialize the PermissionDeniedError exception.

        Args:
            required_roles (Type[UserRole]): The roles which are allowed.
        """

        self._roles = {role() for role in required_roles}
        self._roles_str = f', '.join(map(str, self._roles))
        super().__init__()

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return f"User must have one of the following role(s) to perform this action: {self._roles_str}"
