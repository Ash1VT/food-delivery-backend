from async_factory_boy.factory.sqlalchemy import AsyncSQLAlchemyFactory
from factory import Faker, SubFactory

from models import MenuCategory


class MenuCategoryFactory(AsyncSQLAlchemyFactory):
    name = Faker('word')

    restaurant = SubFactory('tests.factories.RestaurantFactory')

    class Meta:
        model = MenuCategory

