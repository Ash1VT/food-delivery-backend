from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated

from .models import User, UserRole
from .serializers import CustomerPostSerializer, CourierPostSerializer, UserUpdateSerializer, \
    UserOutSerializer, UserUpdateModeratorSerializer, UserOutModeratorSerializer
from .permissions import IsModerator


class CreateCustomerView(CreateAPIView):
    """View for registering customer's account (no permissions)"""

    serializer_class = CustomerPostSerializer


class CreateCourierView(CreateAPIView):
    """View for registering courier's account (no permissions)"""

    serializer_class = CourierPostSerializer


class RetrieveUpdateCurrentUserView(RetrieveUpdateAPIView):
    """View for retrieving (IsAuthenticated permission)
    or updating authenticated user account's common information (IsAuthenticated permission)"""

    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return UserUpdateSerializer
        return UserOutSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs, partial=False)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs, partial=True)


class ListUsersView(ListAPIView):
    """View for getting list of users (IsModerator permission).
    Supports query param 'role' for getting only:
        customers (role=cu)
        couriers (role=co)
        restaurant managers (role=rm)
    """

    serializer_class = UserOutModeratorSerializer
    permission_classes = [IsModerator]

    def get_queryset(self):
        role = self.request.query_params.get('role', None)
        queryset = User.objects.exclude(role=UserRole.MODERATOR)

        if role:
            if role == 'cu':
                queryset = queryset.filter(role=UserRole.CUSTOMER)
            elif role == 'co':
                queryset = queryset.filter(role=UserRole.COURIER)
            elif role == 'rm':
                queryset = queryset.filter(role=UserRole.RESTAURANT_MANAGER)

        return queryset


class RetrieveUpdateUserView(RetrieveUpdateAPIView):
    """View for retrieving user (IsModerator permission)
    or updating any user account's information (IsModerator permission)"""

    permission_classes = [IsModerator]
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return UserUpdateModeratorSerializer
        return UserOutModeratorSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs, partial=False)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs, partial=True)
