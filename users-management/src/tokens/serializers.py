from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from core import settings


class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get(settings.Base.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        if attrs['refresh']:
            return super().validate(attrs)
        raise InvalidToken(f"No valid token found in cookie '{settings.Base.SIMPLE_JWT['AUTH_COOKIE_REFRESH']}'")
