import pytest
from django.urls import reverse, resolve

from users.models import User
from users.views import CreateCustomerView, CreateCourierView, ListUsersView, RetrieveUpdateUserView, \
    RetrieveUpdateCurrentUserView


class TestUrls:

    def test_register_customer_url_resolves(self):
        url = reverse('register_customer')
        assert resolve(url).func.view_class == CreateCustomerView

    def test_register_courier_url_resolves(self):
        url = reverse('register_courier')
        assert resolve(url).func.view_class == CreateCourierView

    def test_list_users_url_resolves(self):
        url = reverse('list_users')
        assert resolve(url).func.view_class == ListUsersView

    @pytest.mark.django_db
    def test_retrieve_update_user_url_resolves(self, customer: User):
        url = reverse('retrieve_update_user', args=[customer.id])
        assert resolve(url).func.view_class == RetrieveUpdateUserView

    def test_retrieve_update_current_user_url_resolves(self):
        url = reverse('retrieve_update_current_user')
        assert resolve(url).func.view_class == RetrieveUpdateCurrentUserView
