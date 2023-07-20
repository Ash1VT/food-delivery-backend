import pytest
from django.test import Client

from users.managers import UserManager
from users.models import User


# Client fixtures #
@pytest.fixture
def client():
    return Client()


# User manager fixtures #
@pytest.fixture
def user_manager():
    user_manager = UserManager()
    user_manager.model = User
    return user_manager


# User data for registration #


@pytest.fixture
def user_data() -> dict:
    return {
        'email': 'n@gmail.com',
        'password': '12345'
    }


@pytest.fixture
def user_profile_data() -> dict:
    return {
        'first_name': 'Test',
        'last_name': 'Test',
        'age': '20',
        'phone': '+375298830141',
        'birth_date': '2002-02-25'
    }


@pytest.fixture
def user_register_valid_data(user_data: dict, user_profile_data: dict) -> dict:
    return {
        **user_data,
        'user_profile': user_profile_data
    }


@pytest.fixture
def user_register_invalid_data(user_data: dict) -> dict:
    return {
        **user_data,
        'user_profile': None
    }
