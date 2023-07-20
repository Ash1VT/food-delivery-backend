import pytest
from django.core.handlers.wsgi import WSGIRequest
from django.test import Client, RequestFactory
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from core import settings
from users.models import User, UserRole


# Client fixtures #

@pytest.fixture
def client_without_tokens():
    return Client()


@pytest.fixture
def client_with_all_tokens(client: Client, access_token_cookie_name, access_token, refresh_token_cookie_name,
                           refresh_token):
    client.cookies[access_token_cookie_name] = access_token
    client.cookies[refresh_token_cookie_name] = refresh_token
    return client


# Name of tokens in cookies #

@pytest.fixture
def access_token_cookie_name():
    return settings.Base.SIMPLE_JWT['AUTH_COOKIE_ACCESS']


@pytest.fixture
def refresh_token_cookie_name():
    return settings.Base.SIMPLE_JWT['AUTH_COOKIE_REFRESH']


# Test superuser #

@pytest.fixture
def superuser(django_user_model, superuser_valid_auth_data):
    return django_user_model.objects.create_superuser(
        **superuser_valid_auth_data,
        role=UserRole.MODERATOR
    )


# Auth data for test superuser #

@pytest.fixture
def superuser_valid_auth_data() -> dict:
    return {
        'email': "n@gmail.com",
        'password': "12345"
    }


@pytest.fixture
def superuser_invalid_auth_data() -> dict:
    return {
        'email': "",
        'password': ""
    }


# Valid tokens #

@pytest.fixture
def access_token(superuser: User) -> str:
    return str(AccessToken.for_user(user=superuser))


@pytest.fixture
def refresh_token(superuser: User) -> str:
    return str(RefreshToken.for_user(user=superuser))


# Test requests #

@pytest.fixture
def request_with_access_token(superuser: User, access_token_cookie_name, access_token) -> WSGIRequest:
    request = RequestFactory().request()
    request.COOKIES[access_token_cookie_name] = access_token
    return request


@pytest.fixture
def request_with_all_tokens(superuser: User, access_token_cookie_name, access_token, refresh_token_cookie_name,
                            refresh_token) -> WSGIRequest:
    request = RequestFactory().request()
    request.COOKIES[access_token_cookie_name] = access_token
    request.COOKIES[refresh_token_cookie_name] = refresh_token
    return request


# Test responses #
@pytest.fixture
def response_without_tokens_data():
    response = Response()
    response.data = {}
    return response


@pytest.fixture
def response_with_tokens_data(access_token, refresh_token):
    response = Response()
    response.data = {'access': access_token, 'refresh': refresh_token}
    return response
