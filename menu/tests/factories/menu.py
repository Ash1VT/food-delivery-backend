from async_factory_boy.factory.sqlalchemy import AsyncSQLAlchemyFactory
from factory import Faker, SubFactory

from models import Menu


class MenuFactory(AsyncSQLAlchemyFactory):
    name = Faker('word')
    description = Faker('sentence')

    restaurant = SubFactory('tests.factories.RestaurantFactory')

    class Meta:
        model = Menu
