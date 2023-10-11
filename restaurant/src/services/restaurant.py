# Получать рестораны
# Создавать рестораны
# Обновлять только часы работы, остально с подтверждения модератора
# Активировать рестораны
# Отклонять рестораны
# Деактивировать рестораны
from typing import List, Optional

from schemas.restaurant import RestaurantRetrieveOut, RestaurantCreateIn, RestaurantCreateOut
from models import Restaurant, Moderator, RestaurantManager
from exceptions import RestaurantNotFoundWithIdError, RestaurantAlreadyExistsWithIdError, RestaurantNotActiveError
from uow import SqlAlchemyUnitOfWork
from utils import check_restaurant_is_active, check_restaurant_manager_is_active, check_moderator_is_active
from .mixins import RetrieveMixin, ListMixin, CreateMixin, UpdateMixin, DeleteMixin


class RestaurantService(RetrieveMixin[Restaurant, RestaurantRetrieveOut],
                        ListMixin[Restaurant, RestaurantRetrieveOut],
                        CreateMixin[Restaurant, RestaurantCreateIn, RestaurantCreateOut],
                        DeleteMixin[Restaurant]):
    schema_retrieve_out = RestaurantRetrieveOut
    schema_create_out = RestaurantCreateOut

    def __init__(self, restaurant_manager: Optional[RestaurantManager] = None,
                 moderator: Optional[Moderator] = None):
        self._restaurant_manager = restaurant_manager
        self._moderator = moderator

    async def retrieve_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs) -> Restaurant:
        retrieved_instance = await uow.restaurants.retrieve(id, fetch_working_hours=True, **kwargs)

        if not retrieved_instance:
            raise RestaurantNotFoundWithIdError(id)

        check_restaurant_is_active(retrieved_instance)

        return retrieved_instance

    async def list_instances(self, uow: SqlAlchemyUnitOfWork, **kwargs) -> List[Restaurant]:
        return await uow.restaurants.list_active_restaurants(fetch_working_hours=True)

    async def create_instance(self, item: RestaurantCreateIn, uow: SqlAlchemyUnitOfWork, **kwargs) -> Restaurant:
        check_restaurant_manager_is_active(self._restaurant_manager)

        # Create

        data = item.model_dump()

        return await uow.restaurants.create(data, **kwargs)

    async def delete_instance(self, id: int, uow: SqlAlchemyUnitOfWork, **kwargs):
        check_restaurant_manager_is_active(self._restaurant_manager)
        check_moderator_is_active(self._moderator)


