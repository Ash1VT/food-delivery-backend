import random
import re
import string
from datetime import datetime, timedelta

from django.core import mail
from django.core.mail import EmailMessage
from django.test import Client
from django.conf import settings
from django.forms.models import model_to_dict
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from users.models import UserProfile, User, UserRole
from users.services import UserService


def validate_user_profile(user_profile: UserProfile, user_profile_data: dict):
    if user_profile_data:
        assert user_profile.first_name == user_profile_data.get('first_name', None)
        assert user_profile.last_name == user_profile_data.get('last_name', None)
        assert user_profile.age == int(user_profile_data.get('age', None))
        assert user_profile.phone == user_profile_data.get('phone', None)
        assert str(user_profile.birth_date) == user_profile_data.get('birth_date', None)


def validate_verification_email(user: User, email: EmailMessage):
    assert 'Email verification' == email.subject  # Check the email subject
    assert [user.email] == email.to  # Check the recipients
    assert settings.EMAIL_HOST_USER == email.from_email  # Check the sender
    assert user.user_profile.first_name and \
           user.user_profile.last_name in email.body  # Check first and last name in the email body
    assert email.content_subtype == 'html'  # Check that the email is in HTML format
    assert settings.COMPANY_NAME in email.body  # Check company name in the email body


def create_client_with_all_tokens(user: User) -> Client:
    client = Client()
    access_token = str(AccessToken.for_user(user=user))
    refresh_token = str(RefreshToken.for_user(user=user))
    client.cookies[settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS']] = access_token
    client.cookies[settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']] = refresh_token
    return client


def _parse_verification_url(verification_url: str) -> tuple[str, str, str]:
    match = re.search(
        r'^(?P<base_url>.+)/(?P<uidb64>[0-9A-Za-z_\-]+)/verify/(?P<verification_token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]+)/$',
        verification_url)

    base_url = match.group('base_url')
    verification_token = match.group('verification_token')
    uidb64 = match.group('uidb64')

    return base_url, verification_token, uidb64


def get_invalid_token_verification_url(valid_url: str) -> str:
    base_url, verification_token, uidb64 = _parse_verification_url(valid_url)

    # Generate an invalid verification token
    invalid_token = verification_token.upper()

    return f"{base_url}/{uidb64}/verify/{invalid_token}/"


def get_invalid_uidb64_verification_url(valid_url: str) -> str:
    base_url, verification_token, uidb64 = _parse_verification_url(valid_url)

    # Generate an invalid uidb64
    invalid_uidb64 = urlsafe_base64_encode(force_bytes('str'))

    return f"{base_url}/{invalid_uidb64}/verify/{verification_token}/"


def get_nonexistent_uidb64_verification_url(valid_url: str) -> str:
    base_url, verification_token, uidb64 = _parse_verification_url(valid_url)

    # Generate an invalid uidb64
    while True:
        nonexistent_uuid = random.randint(0, 100000)
        if not User.objects.filter(id=nonexistent_uuid).exists():
            break

    nonexistent_uidb64 = urlsafe_base64_encode(force_bytes(nonexistent_uuid))
    return f"{base_url}/{nonexistent_uidb64}/verify/{verification_token}/"


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


def create_verified_customer():
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_customer(user_data=user_data, user_profile_data=user_profile_data)
    mail.outbox.clear()
    UserService.verify_email(user)
    return user


def create_verified_courier():
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_courier(user_data=user_data, user_profile_data=user_profile_data)
    mail.outbox.clear()
    UserService.verify_email(user)
    return user


def create_verified_restaurant_manager():
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_restaurant_manager(user_data=user_data, user_profile_data=user_profile_data)
    mail.outbox.clear()
    UserService.verify_email(user)
    return user


def create_verified_moderator():
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_moderator(user_data=user_data, user_profile_data=user_profile_data)
    mail.outbox.clear()
    UserService.verify_email(user)
    return user


def create_unverified_customer():
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_customer(user_data=user_data, user_profile_data=user_profile_data)
    mail.outbox.clear()
    return user


def create_unverified_courier():
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_courier(user_data=user_data, user_profile_data=user_profile_data)
    mail.outbox.clear()
    return user


def create_unverified_restaurant_manager():
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_restaurant_manager(user_data=user_data, user_profile_data=user_profile_data)
    mail.outbox.clear()
    return user


def create_unverified_moderator():
    user_data = generate_valid_register_user_data()
    user_profile_data = user_data.pop('user_profile')
    user = UserService.create_moderator(user_data=user_data, user_profile_data=user_profile_data)
    mail.outbox.clear()
    return user
