from async_factory_boy.factory.sqlalchemy import AsyncSQLAlchemyFactory
from factory import Sequence

from models import Restaurant


class RestaurantFactory(AsyncSQLAlchemyFactory):
    id = Sequence(lambda n: n + 1)

    class Meta:
        model = Restaurant
