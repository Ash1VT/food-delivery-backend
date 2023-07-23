import pytest
from django.test import Client

from users.managers import UserManager
from users.models import User
from users.services import UserService
from .utils import create_client_with_all_tokens, generate_valid_register_user_data


# Client fixtures #

@pytest.fixture
def client_without_tokens():
    return Client()


@pytest.fixture
def client_customer_with_all_tokens(customer: User):
    return create_client_with_all_tokens(customer)


@pytest.fixture
def client_moderator_with_all_tokens(moderator: User):
    return create_client_with_all_tokens(moderator)


# User manager fixtures #

@pytest.fixture
def user_manager():
    user_manager = UserManager()
    user_manager.model = User
    return user_manager


# User models #

@pytest.fixture
def customer() -> User:
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_customer(user_data=user_data, user_profile_data=user_profile_data)
    user.is_active = True
    user.save()
    return user


@pytest.fixture
def moderator() -> User:
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_moderator(user_data=user_data, user_profile_data=user_profile_data)
    user.is_active = True
    user.save()
    return user
