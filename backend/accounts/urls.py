from django.urls import path
from . import apis

urlpatterns = [
    path("login/", apis.Login.as_view()),
    path("signup/", apis.Signup.as_view()),
    path("get-user/", apis.UserInformation.as_view()),
]
