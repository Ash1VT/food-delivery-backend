import pytest
from grpc import StatusCode
from contextlib import nullcontext as does_not_raise

from exceptions import RestaurantManagerNotActiveError, RestaurantManagerOwnershipError, MenuNotFoundWithIdError
from uow import SqlAlchemyUnitOfWork
from utils.grpc import grpc_status_to_http
from utils.checks import check_restaurant_manager_is_active, check_restaurant_manager_ownership_on_restaurant, \
    check_restaurant_manager_ownership_on_menu
from .factories import MenuFactory, RestaurantFactory, RestaurantManagerFactory


class TestGrpcUtils:

    @pytest.mark.parametrize(
        "grpc_status_code, http_status_code", [
            (StatusCode.OK, 200),
            (StatusCode.CANCELLED, 499),
            (StatusCode.UNKNOWN, 500),
            (StatusCode.INVALID_ARGUMENT, 400),
            (StatusCode.DEADLINE_EXCEEDED, 504),
            (StatusCode.NOT_FOUND, 404),
            (StatusCode.ALREADY_EXISTS, 409),
            (StatusCode.PERMISSION_DENIED, 403),
            (StatusCode.UNAUTHENTICATED, 401),
            (StatusCode.RESOURCE_EXHAUSTED, 429),
            (StatusCode.FAILED_PRECONDITION, 400),
            (StatusCode.ABORTED, 409),
            (StatusCode.OUT_OF_RANGE, 400),
            (StatusCode.UNIMPLEMENTED, 501),
            (StatusCode.INTERNAL, 500),
            (StatusCode.UNAVAILABLE, 503),
            (StatusCode.DATA_LOSS, 500)
        ]
    )
    def test_grpc_status_to_http(self, grpc_status_code: StatusCode, http_status_code: int):
        assert grpc_status_to_http(grpc_status_code) == http_status_code


class TestChecksUtils:

    @pytest.fixture(scope='function', autouse=True)
    def setup(self, session):
        MenuFactory._meta.sqlalchemy_session = session
        RestaurantFactory._meta.sqlalchemy_session = session
        RestaurantManagerFactory._meta.sqlalchemy_session = session

    @pytest.mark.parametrize(
        "is_manager_active, expectation",
        [
            (False, pytest.raises(RestaurantManagerNotActiveError)),
            (True, does_not_raise())
        ]
    )
    async def test_check_restaurant_manager_is_active(self, is_manager_active: bool, expectation):
        restaurant_manager = await RestaurantManagerFactory.create(is_active=is_manager_active)
        with expectation:
            check_restaurant_manager_is_active(restaurant_manager)

    def test_check_restaurant_manager_is_active_no_manager(self):
        check_restaurant_manager_is_active(None)

    @pytest.mark.parametrize(
        "manager_owns_restaurant, expectation",
        [
            (False, pytest.raises(RestaurantManagerOwnershipError)),
            (True, does_not_raise())
        ]
    )
    async def test_check_restaurant_manager_ownership_on_restaurant(self, manager_owns_restaurant: bool, expectation):
        restaurant = await RestaurantFactory.create()

        if manager_owns_restaurant:
            restaurant_manager = await RestaurantManagerFactory.create(restaurant=restaurant)
        else:
            restaurant_manager = await RestaurantManagerFactory.create()

        with expectation:
            check_restaurant_manager_ownership_on_restaurant(restaurant_manager, restaurant.id)

    def test_check_restaurant_manager_ownership_on_restaurant_no_manager(self):
        check_restaurant_manager_ownership_on_restaurant(None, 2)

    @pytest.mark.parametrize(
        "manager_owns_menu, expectation",
        [
            (False, pytest.raises(RestaurantManagerOwnershipError)),
            (True, does_not_raise())
        ]
    )
    async def test_check_restaurant_manager_ownership_on_menu(self, manager_owns_menu: bool,
                                                              expectation, uow: SqlAlchemyUnitOfWork):
        restaurant = await RestaurantFactory.create()
        restaurant_manager = await RestaurantManagerFactory.create(restaurant=restaurant)

        if manager_owns_menu:
            menu = await MenuFactory.create(restaurant=restaurant)
        else:
            menu = await MenuFactory.create()

        with expectation:
            await check_restaurant_manager_ownership_on_menu(restaurant_manager, menu.id, uow)

    async def test_check_restaurant_manager_ownership_on_menu_nonexistent(self, uow: SqlAlchemyUnitOfWork):
        restaurant_manager = await RestaurantManagerFactory.create()
        with pytest.raises(MenuNotFoundWithIdError):
            await check_restaurant_manager_ownership_on_menu(restaurant_manager, 2, uow)

    async def test_check_restaurant_manager_ownership_on_menu_no_manager(self, uow: SqlAlchemyUnitOfWork):
        menu = await MenuFactory.create()
        await check_restaurant_manager_ownership_on_menu(None, menu.id, uow)
