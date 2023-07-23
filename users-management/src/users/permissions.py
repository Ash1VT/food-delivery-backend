from rest_framework.permissions import IsAuthenticated
from users.models import UserRole


class IsCustomer(IsAuthenticated):
    """Checks if user has customer permissions"""

    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.role == UserRole.CUSTOMER


class IsCourier(IsAuthenticated):
    """Checks if user has courier permissions"""

    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.role == UserRole.COURIER


class IsRestaurantManager(IsAuthenticated):
    """Checks if user has restaurant manager permissions"""

    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.role == UserRole.RESTAURANT_MANAGER


class IsModerator(IsAuthenticated):
    """Checks if user has moderator permissions"""

    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.role == UserRole.MODERATOR
