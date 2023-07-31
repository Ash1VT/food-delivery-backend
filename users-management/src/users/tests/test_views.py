from typing import Optional, Callable

import pytest
import json

from django.core import mail
from django.conf import settings
from django.db.models import QuerySet
from django.test import Client
from django.urls import reverse
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from users.models import User, UserRole
from users.utils import generate_email_verification_url

from .utils import validate_user_profile, generate_valid_register_user_data, generate_update_user_data, \
    generate_partial_update_user_data, generate_update_moderator_user_data, \
    generate_partial_update_moderator_user_data, user_to_dict, validate_verification_email, \
    get_invalid_uidb64_verification_url, get_invalid_token_verification_url, \
    get_nonexistent_uidb64_verification_url


class BaseTestCreateUserView:
    view_name = None

    def test_post_view(self, client_without_tokens: Client):
        # Generate valid registration data
        user_register_valid_data = generate_valid_register_user_data()

        response = client_without_tokens.post(reverse(self.view_name),
                                              data=json.dumps(user_register_valid_data),
                                              content_type="application/json")
        assert response.status_code == 201

        user = User.objects.get(email=user_register_valid_data.get('email'))

        # Compare passed data with User model attributes
        assert user.email == user_register_valid_data.get('email')

        # Compare passed profile data with UserProfile model attributes
        user_profile = user.user_profile
        user_profile_data: dict = user_register_valid_data.get('user_profile')

        validate_user_profile(user_profile=user_profile, user_profile_data=user_profile_data)

        # Ensure there are tokens in response cookies
        AccessToken(token=response.cookies[settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS']].value).verify()
        RefreshToken(token=response.cookies[settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']].value).verify()

        # Validate email
        assert len(mail.outbox) == 1

        email = mail.outbox.pop(0)

        validate_verification_email(user, email)


@pytest.mark.django_db
class TestCreateCustomerView(BaseTestCreateUserView):
    view_name = "register_customer"


@pytest.mark.django_db
class TestCreateCourierView(BaseTestCreateUserView):
    view_name = "register_courier"


@pytest.mark.django_db
class TestRetrieveUpdateCurrentUserView:

    @pytest.mark.parametrize(
        "client_name, customer_name, expected_status_code",
        [
            ("client_customer_with_all_tokens", "customer", 200),
            ("client_customer_with_unverified_email", "customer_with_unverified_email", 403)
        ]
    )
    def test_retrieve_view(self, client_name: str, customer_name: str, expected_status_code: int, request):
        # Get fixtures values by its name
        client: Client = request.getfixturevalue(client_name)
        customer: User = request.getfixturevalue(customer_name)

        # Getting customer data
        customer_data = user_to_dict(customer)

        response = client.get(reverse('retrieve_update_current_user'))
        assert response.status_code == expected_status_code

        if response.status_code == 200:
            # Compare user data with response data
            assert customer_data.get('email') == response.data.get('email')
            assert customer_data.get('user_profile') == response.data.get('user_profile')

    @pytest.mark.parametrize(
        "client_name, expected_status_code",
        [
            ("client_customer_with_all_tokens", 200),
            ("client_customer_with_unverified_email", 403)
        ]
    )
    def test_put_view(self, client_name: str, expected_status_code: int, request):
        # Get fixtures values by its name
        client: Client = request.getfixturevalue(client_name)

        # Generate user update data
        user_update_data = generate_update_user_data()

        response = client.put(reverse('retrieve_update_current_user'),
                              data=json.dumps(user_update_data),
                              content_type="application/json")
        assert response.status_code == expected_status_code

        if response.status_code == 200:
            # Compare user data with response data
            assert user_update_data.get('email') == response.data.get('email')
            assert user_update_data.get('user_profile') == response.data.get('user_profile')

    @pytest.mark.parametrize(
        "client_name, expected_status_code",
        [
            ("client_customer_with_all_tokens", 200),
            ("client_customer_with_unverified_email", 403)
        ]
    )
    def test_patch_view(self, client_name: str, expected_status_code: int, request):
        # Get fixtures values by its name
        client: Client = request.getfixturevalue(client_name)

        # Generate user partial update data
        user_partial_update_data = generate_partial_update_user_data()

        response = client.patch(reverse('retrieve_update_current_user'),
                                data=json.dumps(user_partial_update_data),
                                content_type="application/json")
        assert response.status_code == expected_status_code

        if response.status_code == 200:
            # Compare user data with response data
            assert user_partial_update_data.get('email') == response.data.get('email')


@pytest.mark.django_db
class TestListUsersView:
    @pytest.mark.parametrize(
        "role, expected_query",
        [
            (None, User.objects.exclude(role=UserRole.MODERATOR)),
            ('cu', User.objects.filter(role=UserRole.CUSTOMER)),
            ('co', User.objects.filter(role=UserRole.COURIER)),
            ('rm', User.objects.filter(role=UserRole.RESTAURANT_MANAGER))
        ]
    )
    def test_list_view(self, role: Optional[str], expected_query: QuerySet,
                       client_moderator_with_all_tokens: Client):
        query_params = {'role': role} if role else {}
        response = client_moderator_with_all_tokens.get(reverse('list_users'), query_params)
        assert response.status_code == 200

        assert response.data == list(expected_query)

    def test_list_view_non_moderator(self, client_customer_with_all_tokens: Client):
        response = client_customer_with_all_tokens.get(reverse('list_users'))
        assert response.status_code == 403

    def test_list_view_with_unverified_email(self, client_moderator_with_unverified_email: Client):
        response = client_moderator_with_unverified_email.get(reverse('list_users'))
        assert response.status_code == 403


@pytest.mark.django_db
class TestRetrieveUpdateUserView:

    @pytest.mark.parametrize(
        "client_name, expected_response_code",
        [
            ("client_moderator_with_all_tokens", 200),
            ("client_customer_with_all_tokens", 403),
            ("client_moderator_with_unverified_email", 403)
        ]
    )
    def test_retrieve_view(self, client_name: str, expected_response_code: int,
                           customer: User, request):
        # Get fixture value by its name
        client: Client = request.getfixturevalue(client_name)

        # Getting customer data
        customer_data = user_to_dict(customer)

        response = client.get(reverse('retrieve_update_user', args=[customer.id]))
        assert response.status_code == expected_response_code

        if 200 <= response.status_code < 300:
            # Compare user data with response data
            assert customer_data.get('email') == response.data.get('email')
            assert customer_data.get('user_profile') == response.data.get('user_profile')

    @pytest.mark.parametrize(
        "client_name, expected_response_code",
        [
            ("client_moderator_with_all_tokens", 200),
            ("client_customer_with_all_tokens", 403),
            ("client_moderator_with_unverified_email", 403)
        ]
    )
    def test_put_view(self, client_name: str, expected_response_code: int, customer: User, request):
        # Get fixture value by its name
        client: Client = request.getfixturevalue(client_name)

        # Generate user update data
        user_update_data = generate_update_moderator_user_data()

        response = client.put(reverse('retrieve_update_user', args=[customer.id]),
                              data=json.dumps(user_update_data),
                              content_type="application/json")

        assert response.status_code == expected_response_code

        if 200 <= response.status_code < 300:
            # Compare user data with response data
            assert user_update_data.get('email') == response.data.get('email')
            assert user_update_data.get('user_profile') == response.data.get('user_profile')

    @pytest.mark.parametrize(
        "client_name, expected_response_code",
        [
            ("client_moderator_with_all_tokens", 200),
            ("client_customer_with_all_tokens", 403),
            ("client_moderator_with_unverified_email", 403)
        ]
    )
    def test_patch_view(self, client_name: str, expected_response_code: int, customer: User, request):
        # Get fixture value by its name
        client: Client = request.getfixturevalue(client_name)

        # Generate user partial update data
        user_partial_update_data = generate_partial_update_moderator_user_data()

        response = client.patch(reverse('retrieve_update_user', args=[customer.id]),
                                data=json.dumps(user_partial_update_data),
                                content_type="application/json")
        assert response.status_code == expected_response_code

        if 200 <= response.status_code < 300:
            # Compare user data with response data
            assert user_partial_update_data.get('email') == response.data.get('email')


@pytest.mark.django_db
class TestSendVerificationEmailView:

    def test_get_view(self, client_customer_with_unverified_email: Client,
                      customer_with_unverified_email: User):
        response = client_customer_with_unverified_email.get(reverse('send_verification_email'))
        assert response.status_code == 200

        assert len(mail.outbox) == 1

        email = mail.outbox.pop(0)

        validate_verification_email(customer_with_unverified_email, email)

    def test_get_view_already_verified_email(self, client_customer_with_all_tokens: Client,
                                             customer: User):
        response = client_customer_with_all_tokens.get(reverse('send_verification_email'))
        assert response.status_code == 400

        assert len(mail.outbox) == 0


@pytest.mark.django_db
class TestVerifyEmailView:

    def test_get_view(self, client_customer_with_unverified_email: Client,
                      customer_with_unverified_email: User):
        verification_url = generate_email_verification_url(customer_with_unverified_email)

        response = client_customer_with_unverified_email.get(verification_url)

        assert response.status_code == 200

        # Get updated user instance
        user = User.objects.get(id=customer_with_unverified_email.id)

        assert user.is_email_verified

    @pytest.mark.parametrize(
        "get_invalid_verification_url, expected_response_code",
        [
            (get_invalid_token_verification_url, 400),
            (get_invalid_uidb64_verification_url, 400),
            (get_nonexistent_uidb64_verification_url, 404)
        ])
    def test_get_view_invalid_url(self, client_customer_with_unverified_email: Client,
                                  customer_with_unverified_email: User,
                                  get_invalid_verification_url: Callable,
                                  expected_response_code: str):
        valid_verification_url = generate_email_verification_url(customer_with_unverified_email)
        invalid_verification_url = get_invalid_verification_url(valid_verification_url)

        response = client_customer_with_unverified_email.get(invalid_verification_url)

        assert response.status_code == expected_response_code

        # Get updated user instance
        user = User.objects.get(id=customer_with_unverified_email.id)

        assert not user.is_email_verified

    def test_get_view_multiple_use(self, client_customer_with_unverified_email: Client,
                                   customer_with_unverified_email: User):
        verification_url = generate_email_verification_url(customer_with_unverified_email)

        response_1 = client_customer_with_unverified_email.get(verification_url)

        assert response_1.status_code == 200

        # Get updated user instance
        user = User.objects.get(id=customer_with_unverified_email.id)

        assert user.is_email_verified

        response_2 = client_customer_with_unverified_email.get(verification_url)

        assert response_2.status_code == 400
