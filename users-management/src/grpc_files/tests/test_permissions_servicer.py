import grpc
import pytest

from grpc_files.generated.permissions_pb2 import CheckPermissionRequest, CheckPermissionResponse
from users.models import User


@pytest.mark.django_db
class TestPermissionsServicer:

    @pytest.mark.parametrize(
        "access_token_name, user_name, has_permission",
        [
            ("access_token_for_verified_customer", "verified_customer", True),
            ("access_token_for_verified_courier", "verified_courier", True),
            ("access_token_for_verified_restaurant_manager", "verified_restaurant_manager", True),
            ("access_token_for_verified_moderator", "verified_moderator", True),
            ("access_token_for_unverified_customer", "unverified_customer", False),
        ]
    )
    def test_check_email_verified_permission(self, access_token_name: str, user_name: str, has_permission: bool,
                                             permissions_servicer, context, request):
        # Get fixtures values by its name
        access_token: str = request.getfixturevalue(access_token_name)
        user: User = request.getfixturevalue(user_name)

        permission_request = CheckPermissionRequest(access_token=access_token)
        response = permissions_servicer.CheckEmailVerifiedPermission(request=permission_request, context=context)
        assert response == CheckPermissionResponse(has_permission=has_permission,
                                                   user_id=user.id)

    @pytest.mark.parametrize(
        "access_token_name, expected_abort_status, expected_abort_message",
        [
            ("invalid_access_token", grpc.StatusCode.UNAUTHENTICATED, "Invalid access token"),
            (None, grpc.StatusCode.UNAUTHENTICATED, "Missing access token"),
            ("nonexistent_access_token", grpc.StatusCode.UNAUTHENTICATED, "Invalid access token")
        ]
    )
    def test_check_email_verified_permission_invalid_token(self, access_token_name: str,
                                                           expected_abort_status: grpc.StatusCode,
                                                           expected_abort_message: str,
                                                           permissions_servicer,
                                                           context, request):
        # Get fixtures values by its name
        access_token: str = request.getfixturevalue(access_token_name) if access_token_name else None

        permission_request = CheckPermissionRequest(access_token=access_token)

        try:
            permissions_servicer.CheckEmailVerifiedPermission(request=permission_request, context=context)
        except Exception:
            pass

        assert context.abort_status == expected_abort_status
        assert context.abort_message == expected_abort_message

    @pytest.mark.parametrize(
        "access_token_name, user_name, has_permission",
        [
            ("access_token_for_verified_customer", "verified_customer", True),
            ("access_token_for_verified_courier", "verified_courier", False),
            ("access_token_for_verified_restaurant_manager", "verified_restaurant_manager", False),
            ("access_token_for_verified_moderator", "verified_moderator", False),
            ("access_token_for_unverified_customer", "unverified_customer", False),
        ]
    )
    def test_check_customer_permission(self, access_token_name: str, user_name: str, has_permission: bool,
                                       permissions_servicer, context, request):
        # Get fixtures values by its name
        access_token: str = request.getfixturevalue(access_token_name)
        user: User = request.getfixturevalue(user_name)

        permission_request = CheckPermissionRequest(access_token=access_token)
        response = permissions_servicer.CheckCustomerPermission(request=permission_request, context=context)
        assert response == CheckPermissionResponse(has_permission=has_permission,
                                                   user_id=user.id)

    @pytest.mark.parametrize(
        "access_token_name, expected_abort_status, expected_abort_message",
        [
            ("invalid_access_token", grpc.StatusCode.UNAUTHENTICATED, "Invalid access token"),
            (None, grpc.StatusCode.UNAUTHENTICATED, "Missing access token"),
            ("nonexistent_access_token", grpc.StatusCode.UNAUTHENTICATED, "Invalid access token")
        ]
    )
    def test_check_customer_permission_invalid_token(self, access_token_name: str,
                                                     expected_abort_status: grpc.StatusCode,
                                                     expected_abort_message: str,
                                                     permissions_servicer,
                                                     context, request):
        # Get fixtures values by its name
        access_token: str = request.getfixturevalue(access_token_name) if access_token_name else None

        permission_request = CheckPermissionRequest(access_token=access_token)

        try:
            permissions_servicer.CheckCustomerPermission(request=permission_request, context=context)
        except Exception:
            pass

        assert context.abort_status == expected_abort_status
        assert context.abort_message == expected_abort_message

    @pytest.mark.parametrize(
        "access_token_name, user_name, has_permission",
        [
            ("access_token_for_verified_customer", "verified_customer", False),
            ("access_token_for_verified_courier", "verified_courier", True),
            ("access_token_for_verified_restaurant_manager", "verified_restaurant_manager", False),
            ("access_token_for_verified_moderator", "verified_moderator", False),
            ("access_token_for_unverified_customer", "unverified_customer", False),
        ]
    )
    def test_check_courier_permission(self, access_token_name: str, user_name: str, has_permission: bool,
                                      permissions_servicer, context, request):
        # Get fixtures values by its name
        access_token: str = request.getfixturevalue(access_token_name)
        user: User = request.getfixturevalue(user_name)

        permission_request = CheckPermissionRequest(access_token=access_token)
        response = permissions_servicer.CheckCourierPermission(request=permission_request, context=context)
        assert response == CheckPermissionResponse(has_permission=has_permission,
                                                   user_id=user.id)

    @pytest.mark.parametrize(
        "access_token_name, expected_abort_status, expected_abort_message",
        [
            ("invalid_access_token", grpc.StatusCode.UNAUTHENTICATED, "Invalid access token"),
            (None, grpc.StatusCode.UNAUTHENTICATED, "Missing access token"),
            ("nonexistent_access_token", grpc.StatusCode.UNAUTHENTICATED, "Invalid access token")
        ]
    )
    def test_check_courier_permission_invalid_token(self, access_token_name: str,
                                                    expected_abort_status: grpc.StatusCode,
                                                    expected_abort_message: str,
                                                    permissions_servicer,
                                                    context, request):
        # Get fixtures values by its name
        access_token: str = request.getfixturevalue(access_token_name) if access_token_name else None

        permission_request = CheckPermissionRequest(access_token=access_token)

        try:
            permissions_servicer.CheckCourierPermission(request=permission_request, context=context)
        except Exception:
            pass

        assert context.abort_status == expected_abort_status
        assert context.abort_message == expected_abort_message

    @pytest.mark.parametrize(
        "access_token_name, user_name, has_permission",
        [
            ("access_token_for_verified_customer", "verified_customer", False),
            ("access_token_for_verified_courier", "verified_courier", False),
            ("access_token_for_verified_restaurant_manager", "verified_restaurant_manager", True),
            ("access_token_for_verified_moderator", "verified_moderator", False),
            ("access_token_for_unverified_customer", "unverified_customer", False),
        ]
    )
    def test_check_restaurant_manager_permission(self, access_token_name: str, user_name: str, has_permission: bool,
                                                 permissions_servicer, context, request):
        # Get fixtures values by its name
        access_token: str = request.getfixturevalue(access_token_name)
        user: User = request.getfixturevalue(user_name)

        permission_request = CheckPermissionRequest(access_token=access_token)
        response = permissions_servicer.CheckRestaurantManagerPermission(request=permission_request, context=context)
        assert response == CheckPermissionResponse(has_permission=has_permission,
                                                   user_id=user.id)

    @pytest.mark.parametrize(
        "access_token_name, expected_abort_status, expected_abort_message",
        [
            ("invalid_access_token", grpc.StatusCode.UNAUTHENTICATED, "Invalid access token"),
            (None, grpc.StatusCode.UNAUTHENTICATED, "Missing access token"),
            ("nonexistent_access_token", grpc.StatusCode.UNAUTHENTICATED, "Invalid access token")
        ]
    )
    def test_check_restaurant_manager_permission_invalid_token(self, access_token_name: str,
                                                               expected_abort_status: grpc.StatusCode,
                                                               expected_abort_message: str,
                                                               permissions_servicer,
                                                               context, request):
        # Get fixtures values by its name
        access_token: str = request.getfixturevalue(access_token_name) if access_token_name else None

        permission_request = CheckPermissionRequest(access_token=access_token)

        try:
            permissions_servicer.CheckRestaurantManagerPermission(request=permission_request, context=context)
        except Exception:
            pass

        assert context.abort_status == expected_abort_status
        assert context.abort_message == expected_abort_message

    @pytest.mark.parametrize(
        "access_token_name, user_name, has_permission",
        [
            ("access_token_for_verified_customer", "verified_customer", False),
            ("access_token_for_verified_courier", "verified_courier", False),
            ("access_token_for_verified_restaurant_manager", "verified_restaurant_manager", False),
            ("access_token_for_verified_moderator", "verified_moderator", True),
            ("access_token_for_unverified_customer", "unverified_customer", False),
        ]
    )
    def test_check_moderator_permission(self, access_token_name: str, user_name: str, has_permission: bool,
                                        permissions_servicer, context, request):
        # Get fixtures values by its name
        access_token: str = request.getfixturevalue(access_token_name)
        user: User = request.getfixturevalue(user_name)

        permission_request = CheckPermissionRequest(access_token=access_token)
        response = permissions_servicer.CheckModeratorPermission(request=permission_request, context=context)
        assert response == CheckPermissionResponse(has_permission=has_permission,
                                                   user_id=user.id)

    @pytest.mark.parametrize(
        "access_token_name, expected_abort_status, expected_abort_message",
        [
            ("invalid_access_token", grpc.StatusCode.UNAUTHENTICATED, "Invalid access token"),
            (None, grpc.StatusCode.UNAUTHENTICATED, "Missing access token"),
            ("nonexistent_access_token", grpc.StatusCode.UNAUTHENTICATED, "Invalid access token")
        ]
    )
    def test_check_moderator_permission_invalid_token(self, access_token_name: str,
                                                      expected_abort_status: grpc.StatusCode,
                                                      expected_abort_message: str,
                                                      permissions_servicer,
                                                      context, request):
        # Get fixtures values by its name
        access_token: str = request.getfixturevalue(access_token_name) if access_token_name else None

        permission_request = CheckPermissionRequest(access_token=access_token)

        try:
            permissions_servicer.CheckModeratorPermission(request=permission_request, context=context)
        except Exception:
            pass

        assert context.abort_status == expected_abort_status
        assert context.abort_message == expected_abort_message
