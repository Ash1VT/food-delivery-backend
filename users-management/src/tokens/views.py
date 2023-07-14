from django.middleware import csrf
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core import settings
from .serializers import CookieTokenRefreshSerializer
from .services import set_access_cookie, set_refresh_cookie


class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        set_access_cookie(response)
        set_refresh_cookie(response)
        csrf.get_token(request)
        return response


class CookieTokenRefreshView(TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        set_access_cookie(response)
        set_refresh_cookie(response)
        csrf.get_token(request)
        return response


class CookieTokenClearView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie(settings.Base.SIMPLE_JWT['AUTH_COOKIE_ACCESS'])
        response.delete_cookie(settings.Base.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        return response
