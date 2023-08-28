from async_factory_boy.factory.sqlalchemy import AsyncSQLAlchemyFactory
from factory import Sequence, Faker, SubFactory
from src.models import RestaurantManager


class RestaurantManagerFactory(AsyncSQLAlchemyFactory):
    id = Sequence(lambda n: n + 1)
    is_active = Faker('pybool')

    restaurant = SubFactory('tests.factories.RestaurantFactory')

    class Meta:
        model = RestaurantManager
