from typing import Optional

import pytest
import json

from django.db.models import QuerySet
from django.test import Client
from django.urls import reverse
from users.models import User, UserRole
from .utils import validate_user_profile, generate_valid_register_user_data, generate_update_user_data, \
    generate_partial_update_user_data, generate_update_moderator_user_data, generate_partial_update_moderator_user_data,\
    user_to_dict


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


@pytest.mark.django_db
class TestCreateCustomerView(BaseTestCreateUserView):
    view_name = "register_customer"


@pytest.mark.django_db
class TestCreateCourierView(BaseTestCreateUserView):
    view_name = "register_courier"


@pytest.mark.django_db
class TestRetrieveUpdateCurrentUserView:
    def test_retrieve_view(self, client_customer_with_all_tokens: Client, customer: User):
        # Getting customer data
        customer_data = user_to_dict(customer)

        response = client_customer_with_all_tokens.get(reverse('retrieve_update_current_user'))
        assert response.status_code == 200

        # Compare user data with response data
        assert customer_data.get('email') == response.data.get('email')
        assert customer_data.get('user_profile') == response.data.get('user_profile')

    def test_put_view(self, client_customer_with_all_tokens: Client):
        # Generate user update data
        user_update_data = generate_update_user_data()

        response = client_customer_with_all_tokens.put(reverse('retrieve_update_current_user'),
                                                       data=json.dumps(user_update_data),
                                                       content_type="application/json")
        assert response.status_code == 200

        # Compare user data with response data
        assert user_update_data.get('email') == response.data.get('email')
        assert user_update_data.get('user_profile') == response.data.get('user_profile')

    def test_patch_view(self, client_customer_with_all_tokens: Client):
        # Generate user partial update data
        user_partial_update_data = generate_partial_update_user_data()

        response = client_customer_with_all_tokens.patch(reverse('retrieve_update_current_user'),
                                                         data=json.dumps(user_partial_update_data),
                                                         content_type="application/json")
        assert response.status_code == 200

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

    def test_view_non_moderator(self,
                                client_customer_with_all_tokens: Client):
        response = client_customer_with_all_tokens.get(reverse('list_users'))
        assert response.status_code == 403


@pytest.mark.django_db
class TestRetrieveUpdateUserView:

    @pytest.mark.parametrize(
        "client_name, expected_response_code",
        [
            ("client_moderator_with_all_tokens", 200),
            ("client_customer_with_all_tokens", 403)
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
            ("client_customer_with_all_tokens", 403)
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
            ("client_customer_with_all_tokens", 403)
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
