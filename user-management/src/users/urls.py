from django.urls import path, re_path
from .views import CreateCustomerView, CreateCourierView, ListUsersView, RetrieveUpdateUserView, \
    RetrieveUpdateCurrentUserView, VerifyEmailView, SendVerificationEmailView

urlpatterns = [
    path('', ListUsersView.as_view(), name='list_users'),
    path('<int:pk>/', RetrieveUpdateUserView.as_view(), name='retrieve_update_user'),
    path('customers/', CreateCustomerView.as_view(), name='register_customer'),
    path('couriers/', CreateCourierView.as_view(), name='register_courier'),
    path('current/', RetrieveUpdateCurrentUserView.as_view(), name='retrieve_update_current_user'),
    path('current/send-activation', SendVerificationEmailView.as_view(), name='send_verification_email'),
    re_path(r'^(?P<uidb64>[0-9A-Za-z_\-]+)/verify/(?P<verification_token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]+)/$',
            VerifyEmailView.as_view(),
            name='verify_user_email')
]
