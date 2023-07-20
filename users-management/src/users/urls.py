from django.urls import path
from .views import RegisterCustomerView, RegisterCourierView

urlpatterns = [
    path('customers/', RegisterCustomerView.as_view(), name='register_customer'),
    path('couriers/', RegisterCourierView.as_view(), name='register_courier'),
]
