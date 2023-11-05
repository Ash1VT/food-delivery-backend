import pytest
from django.core.handlers.wsgi import WSGIRequest
from django.test import Client, RequestFactory
from django.conf import settings
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from users.models import User, UserRole


# Client fixtures #

@pytest.fixture
def client_without_tokens():
    return Client()


@pytest.fixture
def client_superuser_with_all_tokens(client: Client, access_token_cookie_name: str, access_token_for_superuser,
                                     refresh_token_cookie_name: str, refresh_token_for_superuser):
    client.cookies[access_token_cookie_name] = access_token_for_superuser
    client.cookies[refresh_token_cookie_name] = refresh_token_for_superuser
    return client


# Name of tokens in cookies fixtures #

@pytest.fixture
def access_token_cookie_name():
    return settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS']


@pytest.fixture
def refresh_token_cookie_name():
    return settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']


# Superuser fixture #

@pytest.fixture
def superuser(django_user_model, superuser_valid_auth_data):
    return django_user_model.objects.create_superuser(
        **superuser_valid_auth_data
    )


# Auth data for superuser fixtures #

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
    }


# Valid token fixtures #

@pytest.fixture
def access_token_for_superuser(superuser: User) -> str:
    return str(AccessToken.for_user(user=superuser))


@pytest.fixture
def refresh_token_for_superuser(superuser: User) -> str:
    return str(RefreshToken.for_user(user=superuser))


# Invalid token fixtures #

@pytest.fixture
def invalid_access_token() -> str:
    return "invalid_token"


@pytest.fixture
def nonexistent_access_token() -> str:
    return str(RefreshToken().access_token)


# Test request fixtures #

@pytest.fixture
def request_with_access_token_for_superuser(superuser: User, access_token_cookie_name,
                                            access_token_for_superuser) -> WSGIRequest:
    request = RequestFactory().request()
    request.COOKIES[access_token_cookie_name] = access_token_for_superuser
    return request


@pytest.fixture
def request_with_all_tokens_for_superuser(superuser: User, access_token_cookie_name, access_token_for_superuser,
                                          refresh_token_cookie_name, refresh_token_for_superuser) -> WSGIRequest:
    request = RequestFactory().request()
    request.COOKIES[access_token_cookie_name] = access_token_for_superuser
    request.COOKIES[refresh_token_cookie_name] = refresh_token_for_superuser
    return request


# Test response fixtures #
@pytest.fixture
def response_without_tokens_data():
    response = Response()
    response.data = {}
    return response


@pytest.fixture
def response_with_tokens_data_for_superuser(access_token_for_superuser, refresh_token_for_superuser):
    response = Response()
    response.data = {'access': access_token_for_superuser, 'refresh': refresh_token_for_superuser}
    return response
