from rest_framework.generics import CreateAPIView

from .serializers import CustomerSerializer, CourierSerializer


class RegisterCustomerView(CreateAPIView):
    """View for registering customer's account"""

    serializer_class = CustomerSerializer


class RegisterCourierView(CreateAPIView):
    """View for registering courier's account"""

    serializer_class = CourierSerializer
