import pytest
from contextlib import nullcontext as does_not_raise
from django.test import Client
from django.urls import reverse
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken


class TestViews:

    @pytest.mark.parametrize(
        "client_name, superuser_auth_data_name, expected_status_code, expectation",
        [
            ("client_with_all_tokens", "correct_superuser_auth_data", 200, does_not_raise()),
            ("client_without_tokens", "incorrect_superuser_auth_data", 400, pytest.raises(KeyError))
        ]
    )
    def test_cookie_token_obtain_pair_view(self, client_name: str, expected_status_code: int,
                                           superuser_auth_data_name: str, expectation, superuser,
                                           access_token_cookie_name: str, refresh_token_cookie_name: str,
                                           request):
        # Get fixtures values by its name
        client: Client = request.getfixturevalue(client_name)
        superuser_auth_data: dict = request.getfixturevalue(superuser_auth_data_name)

        response = client.post(reverse('token_obtain_pair'), data=superuser_auth_data)
        assert response.status_code == expected_status_code

        # Verify tokens
        with expectation:
            AccessToken(token=response.cookies[access_token_cookie_name].value).verify()
            RefreshToken(token=response.cookies[refresh_token_cookie_name].value).verify()

    @pytest.mark.parametrize(
        "client_name, expected_status_code, expectation",
        [
            ("client_with_all_tokens", 200, does_not_raise()),
            ("client_without_tokens", 401, pytest.raises(KeyError))
        ]
    )
    def test_cookie_token_refresh_view(self, client_name: str, expected_status_code: int, expectation,
                                       access_token_cookie_name: str, refresh_token_cookie_name: str,
                                       request):
        # Get fixture value by its name
        client: Client = request.getfixturevalue(client_name)

        response = client.post(reverse('token_refresh'))
        assert response.status_code == expected_status_code

        # Verify tokens
        with expectation:
            AccessToken(token=response.cookies[access_token_cookie_name].value).verify()
            RefreshToken(token=response.cookies[refresh_token_cookie_name].value).verify()

    @pytest.mark.parametrize(
        "client_name",
        [
            "client_with_all_tokens",
            "client_without_tokens"
        ]
    )
    def test_cookie_token_clear_view(self, client_name,
                                     access_token_cookie_name: str, refresh_token_cookie_name: str,
                                     request):
        # Get fixture value by its name
        client: Client = request.getfixturevalue(client_name)

        response = client.post(reverse('token_clear'))
        assert response.status_code == 200

        # Check that tokens are empty
        assert not response.cookies[access_token_cookie_name].value
        assert not response.cookies[refresh_token_cookie_name].value
