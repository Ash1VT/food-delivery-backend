from typing import Optional

from django.conf import settings
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from users.models import User


def generate_jwt_token_pair(user: User) -> tuple[AccessToken, RefreshToken]:
    """
    Generates the JWT token pair (access token and refresh token) for the given user.

    Args:
        user (User): The user object for whom to generate the tokens.

    Returns:
        tuple[AccessToken, RefreshToken]: A tuple containing the access and refresh tokens.
    """

    refresh_token = RefreshToken.for_user(user)
    access_token = refresh_token.access_token
    return access_token, refresh_token


def set_access_cookie(response: Response, access_token: str):
    """
    Places the access token into the response cookie.

    Args:
        response (Response): The response object.
        access_token (str): The access token to be placed in the cookie.
    """

    response.set_cookie(
        key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
        value=access_token,
        expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
        secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
    )


def set_refresh_cookie(response: Response, refresh_token: str):
    """
    Places the refresh token into the response cookie.

    Args:
        response (Response): The response object.
        refresh_token (str): The refresh token to be placed in the cookie.
    """

    response.set_cookie(
        key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
        value=refresh_token,
        expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
        secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
    )


def pop_access_token_from_response_data(response: Response) -> Optional[str]:
    """
    Pops the access token from the response data and returns it.

    Args:
        response (Response): The response object.

    Returns:
        Optional[str]: The access token if found in the response data, None otherwise.
    """

    if response.data:
        return response.data.pop('access', None)


def pop_refresh_token_from_response_data(response: Response) -> Optional[str]:
    """
    Pops the refresh token from the response data and returns it.

    Args:
        response (Response): The response object.

    Returns:
        Optional[str]: The refresh token if found in the response data, None otherwise.
    """

    if response.data:
        return response.data.pop('refresh', None)


def move_tokens_from_data(response: Response):
    """
    Extracts access and refresh tokens from the response data and sets them as cookies in the response.

    Args:
        response (Response): The response object.
    """

    access_token = pop_access_token_from_response_data(response)
    refresh_token = pop_refresh_token_from_response_data(response)

    if access_token:
        set_access_cookie(response, access_token)

    if refresh_token:
        set_refresh_cookie(response, refresh_token)


def set_jwt_cookies(response: Response, user: User):
    """
    Generates the JWT token pair for the given user and sets them as cookies in the response.

    Args:
        response (Response): The response object.
        user (User): The user object for whom to generate the tokens.
    """

    access_token, refresh_token = generate_jwt_token_pair(user)
    set_access_cookie(response, str(access_token))
    set_refresh_cookie(response, str(refresh_token))
