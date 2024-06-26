from async_factory_boy.factory.sqlalchemy import AsyncSQLAlchemyFactory
from factory import Faker, SubFactory

from models import MenuItem


class MenuItemFactory(AsyncSQLAlchemyFactory):
    name = Faker('word')
    description = Faker('sentence')
    image_url = Faker('url')
    price = Faker('pyint', min_value=1)

    restaurant = SubFactory('tests.factories.RestaurantFactory')

    class Meta:
        model = MenuItem
