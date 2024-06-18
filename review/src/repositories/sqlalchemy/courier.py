from dataclasses import asdict
from typing import Optional

from loguru import logger
from sqlalchemy import Select, select, Insert, insert, Delete, delete, Update, func

from db.sqlalchemy.models import Courier, Order, Review
from models.courier import CourierCreateModel, CourierModel
from models.rating import RatingModel
from repositories.interfaces.courier import ICourierRepository
from repositories.sqlalchemy.base import SqlAlchemyRepository
from repositories.sqlalchemy.mappers import to_courier_model


class CourierRepository(ICourierRepository, SqlAlchemyRepository):
    """
    SQLAlchemy implementation of the courier repository.
    """

    def _get_retrieve_stmt(self, id: int) -> Select:
        """
        Create a SELECT statement to retrieve a courier by its ID.

        Args:
            id (int): The ID of the courier to retrieve.

        Returns:
            Select: The SELECT statement to retrieve the courier.
        """

        return select(Courier).where(Courier.id == id)

    def _get_retrieve_courier_rating_stmt(self, courier_id: int) -> Select:
        """
        Create a SELECT statement to retrieve a courier rating by its ID.

        Args:
            courier_id (int): The ID of the courier to retrieve.

        Returns:
            Select: The SELECT statement to retrieve the courier rating.
        """

        return select(
            func.count(Review.id).label('reviews_count'),
            func.avg(Review.rating).label('average_rating')
        ).join(Order).where(Order.courier_id == courier_id)

    def _get_create_stmt(self, courier: CourierCreateModel) -> Insert:
        """
        Create an INSERT statement to add a new courier.

        Args:
            courier (CourierCreateModel): The dataclass containing the data to add.

        Returns:
            Insert: The INSERT statement to add the new courier.
        """

        return insert(Courier).values(asdict(courier)).returning(Courier)

    def _get_delete_stmt(self, id: int) -> Delete:
        """
        Create a DELETE statement to remove a courier by its ID.

        Args:
            id (int): The ID of the courier to delete.

        Returns:
            Delete: The DELETE statement to remove the courier.
        """

        return delete(Courier).where(Courier.id == id)

    async def retrieve(self, id: int) -> Optional[CourierModel]:
        stmt = self._get_retrieve_stmt(id)
        result = await self._session.execute(stmt)
        courier = result.scalar_one_or_none()

        if courier:
            logger.debug(f"Retrieved courier with id={courier.id}")
            return to_courier_model(courier)

    async def retrieve_courier_rating(self, courier_id: int) -> Optional[RatingModel]:
        stmt = self._get_retrieve_courier_rating_stmt(courier_id)
        result = await self._session.execute(stmt)

        result = result.one()

        logger.debug(f"Retrieved courier rating for courier with id={courier_id}")

        return RatingModel(
            id=courier_id,
            rating=result[1] if result[1] else 0,
            reviews_count=result[0],
        )

    async def create(self, courier: CourierCreateModel) -> CourierModel:
        stmt = self._get_create_stmt(courier)
        result = await self._session.execute(stmt)
        courier = result.scalar_one()

        logger.debug(f"Created courier with id={courier.id}")

        return to_courier_model(courier)

    async def delete(self, id: int) -> None:
        stmt = self._get_delete_stmt(id)
        await self._session.execute(stmt)

        logger.debug(f"Deleted courier with id={id}")
