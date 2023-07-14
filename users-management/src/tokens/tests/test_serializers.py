import pytest
from contextlib import nullcontext as does_not_raise

from django.core.handlers.wsgi import WSGIRequest
from rest_framework_simplejwt.exceptions import InvalidToken

from tokens.serializers import CookieTokenRefreshSerializer


class TestCookieTokenRefreshSerializer:

    @pytest.mark.parametrize(
        "request_name, expectation",
        [
            ('request_with_all_tokens', does_not_raise()),
            ('request_with_access_token', pytest.raises(InvalidToken))
        ]
    )
    def test_validate(self, request_name: str, expectation, request):
        # Get fixture value by its name
        test_request: WSGIRequest = request.getfixturevalue(request_name)

        with expectation:
            serializer = CookieTokenRefreshSerializer(data={}, context={'request': test_request})
            assert serializer.is_valid()
