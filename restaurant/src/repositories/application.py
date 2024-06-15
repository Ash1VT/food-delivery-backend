from typing import List

from loguru import logger
from sqlalchemy import select, Select, exists

from models import RestaurantApplication, ApplicationType
from models.pagination import PaginatedModel
from utils.paginate import paginate
from .generic import SQLAlchemyRepository

__all__ = [
    "RestaurantApplicationRepository",
]


class RestaurantApplicationRepository(SQLAlchemyRepository[RestaurantApplication]):
    """
    Repository for RestaurantApplication model operations.
    """

    model = RestaurantApplication

    def _get_list_create_applications_stmt(self, **kwargs) -> Select:
        """
        Create a SELECT statement to retrieve all create applications.

        Args:
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve all create applications.
        """

        return select(RestaurantApplication).where(RestaurantApplication.type == ApplicationType.create)

    def _get_list_update_applications_stmt(self, **kwargs):
        """
        Create a SELECT statement to retrieve all update applications.

        Args:
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve all update applications.
        """

        return select(RestaurantApplication).where(RestaurantApplication.type == ApplicationType.update)

    def _get_list_restaurant_manager_applications_stmt(self, restaurant_manager_id: int, **kwargs):
        """
        Create a SELECT statement to retrieve all applications for a restaurant manager.

        Args:
            restaurant_manager_id (int): The ID of the restaurant manager.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to retrieve all retained applications.
        """

        return select(RestaurantApplication).where(RestaurantApplication.restaurant_manager_id == restaurant_manager_id)

    def _get_exists_for_manager_stmt(self, manager_id: int, application_type: ApplicationType, **kwargs) -> Select:
        """
        Create a SELECT statement to check if a restaurant manager has an application of the given type.

        Args:
            manager_id (int): The ID of the restaurant manager.
            application_type (ApplicationType): The type of application.
            **kwargs: Additional keyword arguments.

        Returns:
            Select: The SELECT statement to check if the restaurant manager has an application of the given type.
        """

        stmt = select(RestaurantApplication).where((RestaurantApplication.restaurant_manager_id == manager_id) &
                                                   (RestaurantApplication.type == application_type))
        return select(exists(stmt))

    async def list_create_applications(self, **kwargs) -> List[RestaurantApplication]:
        """
        Retrieve all create applications.

        Args:
            **kwargs: Additional keyword arguments.

        Returns:
            List[RestaurantApplication]: The list of create applications.
        """

        stmt = self._get_list_create_applications_stmt(**kwargs)
        result = await self._session.execute(stmt)
        result = [r[0] for r in result.fetchall()]

        logger.debug(f"Retrieved list of create restaurant applications")

        return result

    async def list_update_applications(self, **kwargs) -> List[RestaurantApplication]:
        """
        Retrieve all update applications.

        Args:
            **kwargs: Additional keyword arguments.

        Returns:
            List[RestaurantApplication]: The list of update applications.
        """

        stmt = self._get_list_update_applications_stmt(**kwargs)
        result = await self._session.execute(stmt)
        result = [r[0] for r in result.fetchall()]

        logger.debug(f"Retrieved list of update restaurant applications")

        return result

    async def list_restaurant_manager_applications(self, restaurant_manager_id: int, **kwargs) -> List[RestaurantApplication]:
        """
        Retrieve all applications for a restaurant manager.

        Args:
            restaurant_manager_id (int): The ID of the restaurant.
            **kwargs: Additional keyword arguments.

        Returns:
            List[RestaurantApplication]: The list of applications for the restaurant.
        """

        stmt = self._get_list_restaurant_manager_applications_stmt(restaurant_manager_id, **kwargs)
        result = await self._session.execute(stmt)
        result = [r[0] for r in result.fetchall()]

        logger.debug(f"Retrieved list of restaurant applications for restaurant manager with id={restaurant_manager_id}")

        return result

    async def exists_for_manager(self, manager_id: int, application_type: ApplicationType, **kwargs) -> bool:
        """
        Check if a restaurant manager has an application of the given type.

        Args:
            manager_id (int): The ID of the restaurant manager.
            application_type (ApplicationType): The type of application.
            **kwargs: Additional keyword arguments.

        Returns:
            bool: True if the restaurant manager has an application of the given type, False otherwise.
        """

        stmt = self._get_exists_for_manager_stmt(manager_id, application_type, **kwargs)
        result = await self._session.execute(stmt)
        result = result.scalar()

        logger.debug(f"Checked if RestaurantManager with id={manager_id} has "
                     f"an Application of type {str(application_type.value)}")

        return result
