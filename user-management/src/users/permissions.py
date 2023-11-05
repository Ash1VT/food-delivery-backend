from rest_framework.permissions import IsAuthenticated
from users.models import UserRole


class IsEmailVerified(IsAuthenticated):
    """Checks if user has verified email."""

    message = "Email is not verified yet"

    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.is_email_verified


class IsCustomer(IsEmailVerified):
    """Checks if user has customer permissions."""

    message = "Needed customer permissions to perform this action"

    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.role == UserRole.CUSTOMER


class IsCourier(IsEmailVerified):
    """Checks if user has courier permissions."""

    message = "Needed courier permissions to perform this action"

    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.role == UserRole.COURIER


class IsRestaurantManager(IsEmailVerified):
    """Checks if user has restaurant manager permissions."""

    message = "Needed restaurant manager permissions to perform this action"

    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.role == UserRole.RESTAURANT_MANAGER


class IsModerator(IsEmailVerified):
    """Checks if user has moderator permissions."""

    message = "Needed moderator permissions to perform this action"

    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.role == UserRole.MODERATOR
