from models import WorkingHours

from .generic import SQLAlchemyRepository

__all__ = ["WorkingHoursRepository"]


class WorkingHoursRepository(SQLAlchemyRepository[WorkingHours]):
    """Repository for WorkingHours model operations."""

    model = WorkingHours
