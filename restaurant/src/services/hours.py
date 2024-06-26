from typing import Optional

from loguru import logger

from exceptions import WorkingHoursNotFoundWithIdError, WorkingHoursAlreadyExistsWithDayError, \
    WorkingHoursTimeConflictError, \
    PermissionDeniedError, RestaurantNotFoundWithIdError
from models import WorkingHours, RestaurantManager
from producer import publisher
from producer.events import WorkingHoursCreatedEvent, WorkingHoursUpdatedEvent, WorkingHoursDeletedEvent
from user_roles import RestaurantManagerRole
from schemas import WorkingHoursUpdateIn, WorkingHoursCreateIn, WorkingHoursCreateOut, WorkingHoursUpdateOut
from uow import SqlAlchemyUnitOfWork
from utils.checks import check_restaurant_manager_ownership_on_restaurant
from .mixins import CreateMixin, UpdateMixin, DeleteMixin


class WorkingHoursService(CreateMixin[WorkingHours, WorkingHoursCreateIn, WorkingHoursCreateOut],
                          UpdateMixin[WorkingHours, WorkingHoursUpdateIn, WorkingHoursUpdateOut],
                          DeleteMixin[WorkingHours]
                          ):
    """
    Service class for managing working hours.

    This class provides methods for creating, updating and deleting working hours instances.

    Attributes:
        schema_create_out (RestaurantManagerCreateOut): The schema for output representation of created instances.
        schema_update_out (RestaurantManagerUpdateOut): The schema for output representation of updated instances.
    """

    schema_create_out = WorkingHoursCreateOut
    schema_update_out = WorkingHoursUpdateOut

    def __init__(self, restaurant_manager: Optional[RestaurantManager] = None):
        """
        Initializes a new instance of the WorkingHoursService class.

        Args:
            restaurant_manager (Optional[RestaurantManager]): An optional instance of the RestaurantManager class.
        """

        self._restaurant_manager = restaurant_manager

    async def create_instance(self, item: WorkingHoursCreateIn,
                              uow: SqlAlchemyUnitOfWork, **kwargs) -> WorkingHours:
        """
        Create a new working hours instance in the repository.

        Args:
            item (WorkingHoursCreateIn): The data to create the working hours.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            WorkingHours: The created working hours instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            RestaurantNotFoundWithIdError: If the restaurant with the given ID is not found.
            WorkingHoursAlreadyExistsWithDayError: If a working hours instance with the given day of week
                already exists for the given restaurant.
            WorkingHoursTimeConflictError: If the closing time is before the opening time.
        """

        # Permission checks
        if not self._restaurant_manager:
            logger.warning("User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check restaurant for existence
        if not await uow.restaurants.exists(item.restaurant_id):
            logger.warning(f"Restaurant with id={item.restaurant_id} not found")
            raise RestaurantNotFoundWithIdError(item.restaurant_id)

        # Check if restaurant manager owns a restaurant
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, item.restaurant_id)

        # Check if working hours with such day not already exists for restaurant
        if await uow.working_hours.exists_with_restaurant(item.restaurant_id, item.day_of_week):
            logger.warning(f"Working hours with day={str(item.day_of_week.value)} already exists for restaurant")
            raise WorkingHoursAlreadyExistsWithDayError(item.day_of_week)

        # Check that opening time is before closing time
        if item.opening_time >= item.closing_time:
            logger.warning(f"Opening time {item.opening_time.strftime('%H:%M')} is "
                           f"after closing time {item.closing_time.strftime('%H:%M')}")
            raise WorkingHoursTimeConflictError(item.opening_time, item.closing_time)

        # Create
        data = item.model_dump()
        working_hours_instance = await uow.working_hours.create(data, **kwargs)

        logger.info(f"Created working hours with id={working_hours_instance.id}")

        publisher.publish(WorkingHoursCreatedEvent(
            id=working_hours_instance.id,
            day_of_week=working_hours_instance.day_of_week,
            opening_time=working_hours_instance.opening_time,
            closing_time=working_hours_instance.closing_time,
            restaurant_id=working_hours_instance.restaurant_id,
        ))

        return working_hours_instance

    async def update_instance(self, id: int,
                              item: WorkingHoursUpdateIn,
                              uow: SqlAlchemyUnitOfWork, **kwargs) -> WorkingHours:
        """
        Update a working hours instance in the repository.

        Args:
            id (int): The ID of the working hours to update.
            item (WorkingHoursUpdateIn): The data to update the working hours.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Returns:
            WorkingHours: The updated working hours instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            WorkingHoursNotFoundWithIdError: If the working hours with the given ID is not found.
            WorkingHoursTimeConflictError: If the closing time is before the opening time.
        """

        # Permission checks
        if not self._restaurant_manager:
            logger.warning("User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check working hours for existence
        retrieved_working_hours = await uow.working_hours.retrieve(id, **kwargs)

        if not retrieved_working_hours:
            logger.warning(f"Working hours with id={id} not found")
            raise WorkingHoursNotFoundWithIdError(id)

        # Check if restaurant manager owns a restaurant
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager,
                                                         retrieved_working_hours.restaurant_id)

        # Check that opening time is before closing time
        if item.opening_time >= item.closing_time:
            logger.warning(f"Opening time {item.opening_time.strftime('%H:%M')} is "
                           f"after closing time {item.closing_time.strftime('%H:%M')}")
            raise WorkingHoursTimeConflictError(item.opening_time, item.closing_time)

        # Update
        data = item.model_dump()
        working_hours_instance = await uow.working_hours.update(id, data, **kwargs)

        logger.info(f"Updated working hours with id={working_hours_instance.id}")

        publisher.publish(WorkingHoursUpdatedEvent(
            id=working_hours_instance.id,
            opening_time=working_hours_instance.opening_time,
            closing_time=working_hours_instance.closing_time,
        ))

        return working_hours_instance

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Delete a working hours instance by its ID from the repository.

        Args:
            id (int): The ID of the working hours to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            PermissionDeniedError: If the user is not a restaurant manager.
            WorkingHoursNotFoundWithIdError: If the working hours with the given ID is not found.
        """

        # Permission checks
        if not self._restaurant_manager:
            logger.warning("User is not a restaurant manager")
            raise PermissionDeniedError(RestaurantManagerRole)

        # Check working hours for existence
        retrieved_working_hours = await uow.working_hours.retrieve(id, **kwargs)

        if not retrieved_working_hours:
            logger.warning(f"Working hours with id={id} not found")
            raise WorkingHoursNotFoundWithIdError(id)

        # Check if restaurant manager owns a restaurant
        check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager,
                                                         retrieved_working_hours.restaurant_id)

        # Delete
        await uow.working_hours.delete(id, **kwargs)
        logger.info(f"Deleted working hours with id={id}")

        publisher.publish(WorkingHoursDeletedEvent(
            id=id
        ))
