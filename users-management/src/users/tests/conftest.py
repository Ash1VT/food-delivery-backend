import pytest
from django.test import Client
from django.core import mail

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
def client_customer_with_unverified_email(customer_with_unverified_email: User):
    return create_client_with_all_tokens(customer_with_unverified_email)


@pytest.fixture
def client_moderator_with_all_tokens(moderator: User):
    return create_client_with_all_tokens(moderator)


@pytest.fixture
def client_moderator_with_unverified_email(moderator_with_unverified_email: User):
    return create_client_with_all_tokens(moderator_with_unverified_email)


# User manager fixtures #

@pytest.fixture
def user_manager():
    user_manager = UserManager()
    user_manager.model = User
    return user_manager


# User models #

@pytest.fixture
def customer_with_unverified_email() -> User:
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_customer(user_data=user_data, user_profile_data=user_profile_data)
    mail.outbox.clear()
    return user


@pytest.fixture
def moderator_with_unverified_email() -> User:
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_moderator(user_data=user_data, user_profile_data=user_profile_data)
    mail.outbox.clear()
    return user


@pytest.fixture
def customer() -> User:
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_customer(user_data=user_data, user_profile_data=user_profile_data)
    mail.outbox.clear()
    user.is_email_verified = True
    user.save()
    return user


@pytest.fixture
def moderator() -> User:
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_moderator(user_data=user_data, user_profile_data=user_profile_data)
    mail.outbox.clear()
    user.is_email_verified = True
    user.save()
    return user
