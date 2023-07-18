from django.urls import reverse, resolve

from users.views import RegisterUserView


class TestUrls:

    def test_register_user_url_resolves(self):
        url = reverse('register_user')
        assert resolve(url).func.view_class == RegisterUserView
