from rest_framework.generics import CreateAPIView

from .serializers import UserSerializer


class RegisterUserView(CreateAPIView):
    """View for registering user's account"""

    serializer_class = UserSerializer
