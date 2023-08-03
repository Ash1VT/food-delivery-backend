from django.urls import reverse, resolve
from tokens.views import CookieTokenObtainPairView, CookieTokenRefreshView, CookieTokenClearView


class TestUrls:

    def test_token_obtain_pair_url_resolves(self):
        url = reverse('token_obtain_pair')
        assert resolve(url).func.view_class == CookieTokenObtainPairView

    def test_token_refresh_url_resolves(self):
        url = reverse('token_refresh')
        assert resolve(url).func.view_class == CookieTokenRefreshView

    def test_token_clear_url_resolves(self):
        url = reverse('token_clear')
        assert resolve(url).func.view_class == CookieTokenClearView
