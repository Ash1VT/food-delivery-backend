import logging
from typing import Optional

from django.conf import settings
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from users.models import User

logger = logging.getLogger(__name__)


def generate_jwt_token_pair(user: User) -> tuple[AccessToken, RefreshToken]:
    """
    Generates the JWT token pair (access token and refresh token) for the given user.

    Args:
        user (User): The user object for whom to generate the tokens.

    Returns:
        tuple[AccessToken, RefreshToken]: A tuple containing the access and refresh tokens.
    """

    try:

        refresh_token = RefreshToken.for_user(user)
        access_token = refresh_token.access_token

        logger.debug(f"JWT token pair generated for user: {user}")

        return access_token, refresh_token

    except Exception as e:
        logger.error(f"Error generating JWT token pair for user: {user}. Error: {str(e)}")
        raise


def set_access_cookie(response: Response, access_token: str, expires_session: bool):
    """
    Places the access token into the response cookie.

    Args:
        response (Response): The response object.
        access_token (str): The access token to be placed in the cookie.
        expires_session (bool): Whether to set the cookie to expire at the end of the session.
    """

    token_max_age = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] if not expires_session else None
    expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] if not expires_session else None

    try:
        if access_token:
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
                value=access_token,
                max_age=token_max_age,
                expires=expires,
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

        logger.debug("Access token set in the response cookie")

    except Exception as e:
        logger.error(f"Error setting access token in the response cookie. Error: {str(e)}")
        raise


def set_refresh_cookie(response: Response, refresh_token: str, expires_session: bool):
    """
    Places the refresh token into the response cookie.

    Args:
        response (Response): The response object.
        refresh_token (str): The refresh token to be placed in the cookie.
        expires_session (bool): Whether the refresh token should expire after the current session.
    """

    token_max_age = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] if not expires_session else None
    expires = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] if not expires_session else None

    try:
        if refresh_token:
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=refresh_token,
                max_age=token_max_age,
                expires=expires,
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

        logger.debug("Refresh token set in the response cookie")

    except Exception as e:
        logger.error(f"Error setting refresh token in the response cookie. Error: {str(e)}")
        raise


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


def move_tokens_from_data(response: Response, expires_session: bool = False):
    """
    Extracts access and refresh tokens from the response data and sets them as cookies in the response.

    Args:
        response (Response): The response object.
        expires_session (bool): Whether to set the cookies to expire at the end of the session.
    """

    access_token = pop_access_token_from_response_data(response)
    refresh_token = pop_refresh_token_from_response_data(response)

    if access_token:
        set_access_cookie(response, access_token, expires_session)

    if refresh_token:
        set_refresh_cookie(response, refresh_token, expires_session)

    logger.info("Tokens moved from data to response cookies")


def set_jwt_cookies(response: Response, user: User, expires_session: bool = False):
    """
    Generates the JWT token pair for the given user and sets them as cookies in the response.

    Args:
        response (Response): The response object.
        user (User): The user object for whom to generate the tokens.
        expires_session (bool): Whether to set the cookies to expire at the end of the session.
    """

    try:
        access_token, refresh_token = generate_jwt_token_pair(user)
        set_access_cookie(response, str(access_token), expires_session)
        set_refresh_cookie(response, str(refresh_token), expires_session)

        logger.info("JWT cookies set in the response")

    except Exception as e:
        logger.error(f"Error setting JWT cookies in the response. Error: {str(e)}")
        raise


def get_user(access_token: str) -> Optional[User]:
    """
    Retrieve a User object based on the provided access token.

    Parameters:
        access_token (str): The access token representing the authenticated user.

    Returns:
        Optional[User]: The User object associated with the access token, or None
                        if the access token is invalid or the user does not exist.
    """

    try:
        user_id = AccessToken(access_token).get('user_id')
        return User.objects.get(id=user_id)
    except (TokenError, User.DoesNotExist):
        pass
