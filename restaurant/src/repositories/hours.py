from sqlalchemy import select, Select, exists

from models import WorkingHours, DayOfWeek
from .generic import SQLAlchemyRepository

__all__ = [
    "WorkingHoursRepository",
]


class WorkingHoursRepository(SQLAlchemyRepository[WorkingHours]):
    """
    Repository for WorkingHours model operations.
    """

    model = WorkingHours

    def _get_exists_with_restaurant_stmt(self, restaurant_id: int, day_of_week: DayOfWeek, **kwargs) -> Select:
        """
        Create a SELECT statement to check if a restaurant has working hours of the given day.

        Args:
            restaurant_id (int): The ID of the restaurant.
            day_of_week (DayOfWeek): The day of the week.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to check if the restaurant has working hours of the given day.
        """

        stmt = select(WorkingHours).where((WorkingHours.restaurant_id == restaurant_id) &
                                          (WorkingHours.day_of_week == day_of_week))
        return select(exists(stmt))

    async def exists_with_restaurant(self, restaurant_id: int, day_of_week: DayOfWeek, **kwargs) -> bool:
        """
        Check if a restaurant has working hours of the given day.

        Args:
            restaurant_id (int): The ID of the restaurant.
            day_of_week (DayOfWeek): The day of the week.
            **kwargs: Additional keyword arguments.

        Returns:
            bool: True if the restaurant has working hours of the given day, False otherwise.
        """

        stmt = self._get_exists_with_restaurant_stmt(restaurant_id, day_of_week, **kwargs)
        result = await self._session.execute(stmt)
        return result.scalar()
