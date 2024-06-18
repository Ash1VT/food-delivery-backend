from django.conf import settings
from rest_framework import serializers

from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer, TokenObtainPairSerializer


class CookieTokenObtainPairSerializer(TokenObtainPairSerializer):
    expires_session = serializers.BooleanField(default=False)

    def validate(self, attrs):
        data = super().validate(attrs)
        data['expires_session'] = attrs["expires_session"]
        return data


class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        if attrs['refresh']:
            return super().validate(attrs)
        raise InvalidToken(f"No valid token found in cookie '{settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']}'")
