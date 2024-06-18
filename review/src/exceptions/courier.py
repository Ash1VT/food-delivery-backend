from exceptions.base import AppError, DatabaseInstanceNotFoundError


class CourierOwnershipError(AppError):

    @property
    def status_code(self) -> int:
        return 403

    @property
    def message(self) -> str:
        return "This authenticated user is not right courier to perform this action"


class CourierNotFoundError(DatabaseInstanceNotFoundError):

    def __init__(self, courier_id: int):
        super().__init__("id", courier_id, "Courier")
