import logging

from django.conf import settings
from rest_framework import HTTP_HEADER_ENCODING
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed

logger = logging.getLogger(__name__)


class CookieJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):
        cookie = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'])
        if cookie is None:
            return
        raw_token = cookie.encode(HTTP_HEADER_ENCODING)

        try:
            validated_token = self.get_validated_token(raw_token)
            user = self.get_user(validated_token)

            logger.info(f"Authenticated user: {user}")
            logger.info(f"User role: {self._get_user_role(user)}")
            logger.info(f"Requested permissions: {self._get_requested_permissions(request)}")

            return user, validated_token
        except AuthenticationFailed as e:
            logger.error(f"AuthenticationFailed: {str(e)}")
            raise

    @staticmethod
    def _get_user_role(user) -> str:
        return user.get_role_display()

    @staticmethod
    def _get_requested_view(request):
        return request.resolver_match.func.view_class

    def _get_requested_permissions(self, request):
        view = self._get_requested_view(request)
        if view is not None:
            return ','.join([permission.__name__ for permission in view.permission_classes])

        return 'No permissions'
