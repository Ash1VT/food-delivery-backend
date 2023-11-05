from async_factory_boy.factory.sqlalchemy import AsyncSQLAlchemyFactory
from factory import Faker, SubFactory

from models import MenuCategory


class MenuCategoryFactory(AsyncSQLAlchemyFactory):
    name = Faker('word')

    menu = SubFactory('tests.factories.MenuFactory')

    class Meta:
        model = MenuCategory

