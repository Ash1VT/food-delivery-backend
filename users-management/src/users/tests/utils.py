import random
import string
from datetime import datetime, timedelta

from django.test import Client
from django.forms.models import model_to_dict
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from core import settings
from users.models import UserProfile, User, UserRole


def validate_user_profile(user_profile: UserProfile, user_profile_data: dict):
    if user_profile_data:
        assert user_profile.first_name == user_profile_data.get('first_name', None)
        assert user_profile.last_name == user_profile_data.get('last_name', None)
        assert user_profile.age == int(user_profile_data.get('age', None))
        assert user_profile.phone == user_profile_data.get('phone', None)
        assert str(user_profile.birth_date) == user_profile_data.get('birth_date', None)


def create_client_with_all_tokens(user: User) -> Client:
    client = Client()
    access_token = str(AccessToken.for_user(user=user))
    refresh_token = str(RefreshToken.for_user(user=user))
    client.cookies[settings.Base.SIMPLE_JWT['AUTH_COOKIE_ACCESS']] = access_token
    client.cookies[settings.Base.SIMPLE_JWT['AUTH_COOKIE_REFRESH']] = refresh_token
    return client


def generate_random_email():
    username = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
    domain = 'gmail.com'
    email = f"{username}@{domain}"
    return email


def generate_random_phone():
    country_code = '375'
    operator = '29'
    phone_number = ''.join(random.choices('123456789', k=7))
    return f'+{country_code}{operator}{phone_number}'


def generate_random_birth_date():
    start_date = datetime.now() - timedelta(days=365 * 100)
    end_date = datetime.now() - timedelta(days=365 * 18)

    days_range = (end_date - start_date).days

    random_days = random.randint(0, days_range)

    random_birth_date = start_date + timedelta(days=random_days)

    return str(random_birth_date.date())


def generate_valid_user_profile_data():
    return {
        'first_name': ''.join(random.choices(string.ascii_lowercase, k=8)),
        'last_name': ''.join(random.choices(string.ascii_lowercase, k=8)),
        'age': random.randint(18, 25),
        'phone': generate_random_phone(),
        'birth_date': generate_random_birth_date()
    }


def generate_valid_register_user_data():
    return {
        'email': generate_random_email(),
        'password': ''.join(random.choices(string.ascii_letters, k=8)),
        'user_profile': generate_valid_user_profile_data()
    }


def generate_invalid_register_user_data():
    return {
        'email': generate_random_email()
    }


def generate_update_user_data():
    return {
        'email': generate_random_email(),
        'user_profile': generate_valid_user_profile_data()
    }


def generate_partial_update_user_data():
    return {
        'email': generate_random_email()
    }


def generate_update_moderator_user_data():
    return {
        'email': generate_random_email(),
        'role': UserRole.COURIER,
        'is_active': True,
        'user_profile': generate_valid_user_profile_data()
    }


def generate_partial_update_moderator_user_data():
    return {
        'email': generate_random_email()
    }


def user_to_dict(user: User):
    user_data = model_to_dict(user)
    user_profile = user.user_profile

    user_profile_data = model_to_dict(user_profile)
    user_profile_data['phone'] = str(user_profile_data['phone'])
    del user_profile_data['user']

    user_data['user_profile'] = user_profile_data
    return user_data
