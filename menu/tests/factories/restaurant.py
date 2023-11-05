from async_factory_boy.factory.sqlalchemy import AsyncSQLAlchemyFactory
from factory import Sequence, Faker

from models import Restaurant


class RestaurantFactory(AsyncSQLAlchemyFactory):
    id = Sequence(lambda n: n + 1)
    is_active = True

    class Meta:
        model = Restaurant
