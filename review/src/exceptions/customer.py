from exceptions.base import AppError


class CustomerOwnershipError(AppError):

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return f"This authenticated user is not right customer to perform this action"
