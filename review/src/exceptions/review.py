from exceptions.base import DatabaseInstanceNotFoundError, AppError


class ReviewNotFoundError(DatabaseInstanceNotFoundError):

    def __init__(self, review_id: int):
        super().__init__("id", review_id, "Review")


class ReviewAlreadyExistsError(AppError):
    @property
    def status_code(self) -> int:
        return 400

    @property
    def message(self) -> str:
        return "Review already exists"
