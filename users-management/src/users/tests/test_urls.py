from django.urls import reverse, resolve

from users.views import RegisterCustomerView, RegisterCourierView


class TestUrls:

    def test_register_customer_url_resolves(self):
        url = reverse('register_customer')
        assert resolve(url).func.view_class == RegisterCustomerView

    def test_register_courier_url_resolves(self):
        url = reverse('register_courier')
        assert resolve(url).func.view_class == RegisterCourierView
