import abc
import logging

from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from tokens.generators import email_verification_token_generator
from tokens.utils import set_jwt_cookies
from .models import User, UserRole
from .serializers import CustomerPostSerializer, CourierPostSerializer, UserUpdateSerializer, \
    UserOutSerializer, UserUpdateModeratorSerializer, UserOutModeratorSerializer
from .permissions import IsModerator, IsEmailVerified
from .services import UserService
from .utils import send_verification_email

logger = logging.getLogger(__name__)


# Generic API Views #
class BaseCreateUserView(CreateAPIView, abc.ABC):
    """Base view for registering user's account"""

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        headers = self.get_success_headers(serializer.data)

        response = Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        set_jwt_cookies(response, user)

        return response


class CreateCustomerView(BaseCreateUserView):
    """View for registering customer's account (no permissions)"""

    serializer_class = CustomerPostSerializer


class CreateCourierView(BaseCreateUserView):
    """View for registering courier's account (no permissions)"""

    serializer_class = CourierPostSerializer


class RetrieveUpdateCurrentUserView(RetrieveUpdateAPIView):
    """View for retrieving (IsAuthenticated permission)
    or updating authenticated user account's common information (IsAuthenticated permission)"""

    permission_classes = [IsEmailVerified]

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


# API Views #

class SendVerificationEmailView(APIView):
    """View for sending the email for it's verification"""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = self.request.user

        if user.is_email_verified:
            logger.warning(f"Attempted to send verification email for already verified user: {user}")

            return Response({'detail': 'Email has already been verified'}, status=status.HTTP_400_BAD_REQUEST)

        # Send the verification email
        send_verification_email(user)

        return Response({'detail': 'Verification email sent successfully'}, status=status.HTTP_200_OK)


class VerifyEmailView(APIView):
    """View for email verification of user's account"""

    def get(self, request, uidb64: str, verification_token: str):

        try:
            uid = urlsafe_base64_decode(uidb64)
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError):
            logger.warning(f"Invalid uidb64: {uidb64}")
            return Response({'detail': 'Given uidb64 is invalid'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            logger.warning(f"User with uidb64 not found: {uidb64}")
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if user is not None and email_verification_token_generator.check_token(user, verification_token):
            UserService.verify_email(user=user)
            return Response({'detail': 'Email has been successfully verified'}, status=status.HTTP_200_OK)
        else:
            logger.warning(f"Email verification failed for user: {user}. "
                           f"Invalid or already used token: {verification_token}")
            return Response({'detail': 'Email has already been verified or token is invalid'},
                            status=status.HTTP_400_BAD_REQUEST)
