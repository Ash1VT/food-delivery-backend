from typing import Optional

from exceptions import WorkingHoursNotFoundWithIdError, PermissionDeniedError
from models import WorkingHours, RestaurantManager
from schemas import WorkingHoursUpdateIn, WorkingHoursCreateIn, WorkingHoursCreateOut, WorkingHoursUpdateOut
from uow import SqlAlchemyUnitOfWork
from utils import check_restaurant_manager_is_active, check_restaurant_manager_ownership_on_restaurant
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
            WorkingHoursNotFoundWithIdError: If the working hours with the given ID is not found.
            PermissionDeniedError: If the user is not a restaurant manager.
        """

        # Permission checks
        if self._restaurant_manager:
            check_restaurant_manager_is_active(self._restaurant_manager)
            check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager, item.restaurant_id)
        else:
            raise PermissionDeniedError()

        data = item.model_dump()

        return await uow.working_hours.create(data, **kwargs)

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
            WorkingHoursNotFoundWithIdError: If the working hours with the given ID is not found.
            PermissionDeniedError: If the user is not a restaurant manager.
        """

        retrieved_working_hours = await uow.working_hours.retrieve(id, **kwargs)

        if not retrieved_working_hours:
            raise WorkingHoursNotFoundWithIdError(id)

        # Permission checks
        if self._restaurant_manager:
            check_restaurant_manager_is_active(self._restaurant_manager)
            check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager,
                                                             retrieved_working_hours.restaurant_id)
        else:
            raise PermissionDeniedError()

        data = item.model_dump()

        return await uow.working_hours.update(id, data, **kwargs)

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        """
        Delete a working hours instance by its ID from the repository.

        Args:
            id (int): The ID of the working hours to delete.
            uow (SqlAlchemyUnitOfWork): The unit of work instance.

        Raises:
            WorkingHoursNotFoundWithIdError: If the working hours with the given ID is not found.
            PermissionDeniedError: If the user is not a restaurant manager.
        """

        retrieved_working_hours = await uow.working_hours.retrieve(id, **kwargs)

        if not retrieved_working_hours:
            raise WorkingHoursNotFoundWithIdError(id)

        # Permission checks
        if self._restaurant_manager:
            check_restaurant_manager_is_active(self._restaurant_manager)
            check_restaurant_manager_ownership_on_restaurant(self._restaurant_manager,
                                                             retrieved_working_hours.restaurant_id)
        else:
            raise PermissionDeniedError()

        await uow.working_hours.delete(id, **kwargs)
