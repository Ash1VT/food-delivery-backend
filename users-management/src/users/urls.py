from django.urls import path
from .views import CreateCustomerView, CreateCourierView, ListUsersView, RetrieveUpdateUserView, \
    RetrieveUpdateCurrentUserView

urlpatterns = [
    path('', ListUsersView.as_view(), name='list_users'),
    path('<int:pk>/', RetrieveUpdateUserView.as_view(), name='retrieve_update_user'),
    path('customers/', CreateCustomerView.as_view(), name='register_customer'),
    path('couriers/', CreateCourierView.as_view(), name='register_courier'),
    path('current/', RetrieveUpdateCurrentUserView.as_view(), name='retrieve_update_current_user')
]
