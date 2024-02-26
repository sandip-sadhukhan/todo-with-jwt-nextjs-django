from typing import Optional
from accounts.models import UserAccount
from django.contrib.auth import authenticate
from django.contrib.auth.models import AbstractBaseUser
from rest_framework_simplejwt.tokens import AccessToken


def createUser(*, name: str, email: str, password: str) -> None:
    UserAccount.objects.create_user(
        name=name,
        email=email,
        password=password,
    )


def loginUser(*, email: str, password: str) -> Optional[AbstractBaseUser]:
    user = authenticate(
        email=email,
        password=password,
    )

    return user


def createAccessToken(*, user: AbstractBaseUser) -> str:
    accessToken = str(AccessToken.for_user(user))

    return accessToken
