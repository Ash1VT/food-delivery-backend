import pytest
from rest_framework.response import Response

from tokens.services import set_access_cookie, set_refresh_cookie


class TestSetAccessCookie:

    @pytest.mark.parametrize(
        "response_name, cookies_presence",
        [
            ("response_with_tokens_data", True),
            ("response_without_tokens_data", False)
        ]
    )
    def test_set_access_cookie(self, response_name: str, cookies_presence: bool,
                               access_token_cookie_name: str, request):
        # Get fixtures values by its name
        response: Response = request.getfixturevalue(response_name)

        set_access_cookie(response=response)
        assert bool(response.cookies.get(access_token_cookie_name)) is cookies_presence


class TestSetRefreshCookie:

    @pytest.mark.parametrize(
        "response_name, cookies_presence",
        [
            ("response_with_tokens_data", True),
            ("response_without_tokens_data", False)
        ]
    )
    def test_set_access_cookie(self, response_name: str, cookies_presence: bool,
                               refresh_token_cookie_name: str, request):
        # Get fixtures values by its name
        response: Response = request.getfixturevalue(response_name)

        set_refresh_cookie(response=response)
        assert bool(response.cookies.get(refresh_token_cookie_name)) is cookies_presence
