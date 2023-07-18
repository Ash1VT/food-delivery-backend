from rest_framework.permissions import BasePermission
from users.models import UserRole


class IsCustomer(BasePermission):
    """Checks if user has customer permissions"""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == UserRole.CUSTOMER


class IsCourier(BasePermission):
    """Checks if user has courier permissions"""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == UserRole.COURIER


class IsRestaurantManager(BasePermission):
    """Checks if user has restaurant manager permissions"""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == UserRole.RESTAURANT_MANAGER


class IsModerator(BasePermission):
    """Checks if user has moderator permissions"""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == UserRole.MODERATOR
