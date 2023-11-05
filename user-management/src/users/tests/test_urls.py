import pytest
from django.urls import reverse, resolve
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from tokens.generators import email_verification_token_generator
from users.views import CreateCustomerView, CreateCourierView, ListUsersView, RetrieveUpdateUserView, \
    RetrieveUpdateCurrentUserView, SendVerificationEmailView, VerifyEmailView


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
    def test_retrieve_update_user_url_resolves(self, verified_customer):
        url = reverse('retrieve_update_user', args=[verified_customer.id])
        assert resolve(url).func.view_class == RetrieveUpdateUserView

    def test_retrieve_update_current_user_url_resolves(self):
        url = reverse('retrieve_update_current_user')
        assert resolve(url).func.view_class == RetrieveUpdateCurrentUserView

    def test_send_verification_email_url_resolves(self):
        url = reverse('send_verification_email')
        assert resolve(url).func.view_class == SendVerificationEmailView

    @pytest.mark.django_db
    def test_verify_email_url_resolves(self, verified_customer):
        uid = urlsafe_base64_encode(force_bytes(verified_customer.pk))
        verification_token = email_verification_token_generator.make_token(verified_customer)
        url = reverse('verify_user_email', args=[uid, verification_token])
        assert resolve(url).func.view_class == VerifyEmailView
