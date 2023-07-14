from rest_framework.response import Response

from core import settings


def set_access_cookie(response: Response):
    """Takes access token from response data and places it into response cookie. Then deletes access token from
    response data"""

    try:
        access_token = response.data['access']
    except KeyError:
        return

    response.set_cookie(
        key=settings.Base.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
        value=access_token,
        expires=settings.Base.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
        secure=settings.Base.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        httponly=settings.Base.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        samesite=settings.Base.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
    )

    del response.data['access']


def set_refresh_cookie(response: Response):
    """Takes refresh token from response data and places it into response cookie. Then deletes refresh token from
    response data"""

    try:
        refresh_token = response.data['refresh']
    except KeyError:
        return

    response.set_cookie(
        key=settings.Base.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
        value=refresh_token,
        expires=settings.Base.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
        secure=settings.Base.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        httponly=settings.Base.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        samesite=settings.Base.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
    )

    del response.data['refresh']
