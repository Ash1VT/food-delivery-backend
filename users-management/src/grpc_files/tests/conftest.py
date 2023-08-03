import pytest

from django_grpc_testtools.context import FakeServicerContext
from rest_framework_simplejwt.tokens import AccessToken
from grpc_files.permissions_servicer import PermissionsServicer
from users.models import User
from users.tests.utils import create_verified_customer, create_verified_courier, create_verified_restaurant_manager, \
    create_verified_moderator, create_unverified_customer


# Context fixtures #

@pytest.fixture
def context():
    return FakeServicerContext()


# Servicer fixtures #

@pytest.fixture
def permissions_servicer():
    return PermissionsServicer()


# User fixtures #

@pytest.fixture
def verified_customer() -> User:
    return create_verified_customer()


@pytest.fixture
def verified_courier() -> User:
    return create_verified_courier()


@pytest.fixture
def verified_restaurant_manager() -> User:
    return create_verified_restaurant_manager()


@pytest.fixture
def verified_moderator() -> User:
    return create_verified_moderator()


@pytest.fixture
def unverified_customer() -> User:
    return create_unverified_customer()


# Valid access token fixtures #

@pytest.fixture
def access_token_for_verified_customer(verified_customer: User) -> str:
    return str(AccessToken.for_user(verified_customer))


@pytest.fixture
def access_token_for_verified_courier(verified_courier: User) -> str:
    return str(AccessToken.for_user(verified_courier))


@pytest.fixture
def access_token_for_verified_restaurant_manager(verified_restaurant_manager: User) -> str:
    return str(AccessToken.for_user(verified_restaurant_manager))


@pytest.fixture
def access_token_for_verified_moderator(verified_moderator: User) -> str:
    return str(AccessToken.for_user(verified_moderator))


@pytest.fixture
def access_token_for_unverified_customer(unverified_customer: User) -> str:
    return str(AccessToken.for_user(unverified_customer))


# Invalid access token fixtures #

@pytest.fixture
def invalid_access_token() -> str:
    return 'invalid_token'


@pytest.fixture
def nonexistent_access_token() -> str:
    return str(AccessToken())
