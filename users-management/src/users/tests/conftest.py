import pytest
from django.test import Client

from users.managers import UserManager
from users.models import User
from .utils import create_client_with_all_tokens, create_verified_customer, \
    create_verified_moderator, create_unverified_customer, create_unverified_moderator


# Client fixtures #

@pytest.fixture
def client_without_tokens():
    return Client()


@pytest.fixture
def client_verified_customer_with_all_tokens(verified_customer):
    return create_client_with_all_tokens(verified_customer)


@pytest.fixture
def client_unverified_customer_with_all_tokens(unverified_customer):
    return create_client_with_all_tokens(unverified_customer)


@pytest.fixture
def client_verified_moderator_with_all_tokens(verified_moderator):
    return create_client_with_all_tokens(verified_moderator)


@pytest.fixture
def client_unverified_moderator_with_all_tokens(unverified_moderator):
    return create_client_with_all_tokens(unverified_moderator)


# User manager fixtures #

@pytest.fixture
def user_manager():
    user_manager = UserManager()
    user_manager.model = User
    return user_manager


# User fixtures #

@pytest.fixture
def unverified_customer() -> User:
    return create_unverified_customer()


@pytest.fixture
def unverified_moderator() -> User:
    return create_unverified_moderator()


@pytest.fixture
def verified_customer() -> User:
    return create_verified_customer()


@pytest.fixture
def verified_moderator() -> User:
    return create_verified_moderator()
