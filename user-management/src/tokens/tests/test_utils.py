from typing import Callable

import pytest
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from tokens.utils import set_access_cookie, set_refresh_cookie, generate_jwt_token_pair, \
    pop_access_token_from_response_data, pop_refresh_token_from_response_data, move_tokens_from_data, \
    set_jwt_cookies, get_user
from users.models import User


class TestUtils:
    def test_set_access_cookie(self, response_with_tokens_data_for_superuser, access_token_cookie_name: str,
                               access_token_for_superuser):
        set_access_cookie(response=response_with_tokens_data_for_superuser, access_token=access_token_for_superuser)
        assert response_with_tokens_data_for_superuser.cookies.get(access_token_cookie_name).value == access_token_for_superuser

    def test_set_refresh_cookie(self, response_with_tokens_data_for_superuser, refresh_token_cookie_name: str,
                                refresh_token_for_superuser):
        set_refresh_cookie(response=response_with_tokens_data_for_superuser, refresh_token=refresh_token_for_superuser)
        assert response_with_tokens_data_for_superuser.cookies.get(refresh_token_cookie_name).value == refresh_token_for_superuser

    def test_generate_jwt_token_pair(self, superuser: User):
        access_token, refresh_token = generate_jwt_token_pair(superuser)
        assert access_token.get('user_id') == superuser.id
        assert refresh_token.get('user_id') == superuser.id

    @pytest.mark.parametrize(
        "response_name, pop_token_function, token_name",
        [
            ("response_with_tokens_data_for_superuser", pop_access_token_from_response_data, "access"),
            ("response_without_tokens_data", pop_access_token_from_response_data, "access"),
            ("response_with_tokens_data_for_superuser", pop_refresh_token_from_response_data, "refresh"),
            ("response_without_tokens_data", pop_refresh_token_from_response_data, "refresh")
        ]

    )
    def test_pop_token_from_response_data(self, response_name: str, pop_token_function: Callable,
                                          token_name: str, request):
        # Get fixtures values by its name
        response: Response = request.getfixturevalue(response_name)

        token_data = response.data.get(token_name)

        token = pop_token_function(response)

        assert token_data == token

    @pytest.mark.parametrize(
        "response_name",
        [
            "response_with_tokens_data_for_superuser",
            "response_without_tokens_data"
        ]
    )
    def test_move_tokens_from_data(self, response_name: str,
                                   access_token_cookie_name: str, refresh_token_cookie_name: str, request):
        # Get fixtures values by its name
        response: Response = request.getfixturevalue(response_name)

        access_token_data = response.data.get('access', None)
        refresh_token_data = response.data.get('refresh', None)

        move_tokens_from_data(response)

        access_token_cookie = response.cookies.get(access_token_cookie_name, None)
        refresh_token_cookie = response.cookies.get(refresh_token_cookie_name, None)

        assert access_token_data == (access_token_cookie.value if access_token_cookie else None)
        assert refresh_token_data == (refresh_token_cookie.value if refresh_token_cookie else None)

    def test_set_jwt_cookies(self, response_with_tokens_data_for_superuser, superuser: User,
                             access_token_cookie_name: str, refresh_token_cookie_name: str):
        set_jwt_cookies(response_with_tokens_data_for_superuser, superuser)

        access_token = AccessToken(response_with_tokens_data_for_superuser.cookies.get(access_token_cookie_name).value)
        refresh_token = RefreshToken(response_with_tokens_data_for_superuser.cookies.get(refresh_token_cookie_name).value)

        assert access_token.get('user_id') == superuser.id
        assert refresh_token.get('user_id') == superuser.id

    @pytest.mark.django_db
    @pytest.mark.parametrize(
        "token_name, expected_user_name",
        [
            ("access_token_for_superuser", "superuser"),
            ("invalid_access_token", None),
            ("nonexistent_access_token", None),
            (None, None)
        ]
    )
    def test_get_user(self, token_name: str, expected_user_name: str, request):
        # Get fixtures values by its name
        token: str = request.getfixturevalue(token_name) if token_name else None
        expected_user: User = request.getfixturevalue(expected_user_name) if expected_user_name else None

        user = get_user(token)

        assert user == expected_user
