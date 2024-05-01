from exceptions.base import AppError


class CourierOwnershipError(AppError):

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return "This authenticated user is not right courier to perform this action"
