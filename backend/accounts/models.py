from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager)


class UserAccountManager(BaseUserManager):
    def create_user(self, name, email, password=None):
        if not name:
            raise ValueError("Users must have a name")
        
        if not email:
            raise ValueError("Users must have a email address")

        email = self.normalize_email(email)
        user = self.model(name=name, email=email)

        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, name, email, password):
        user = self.create_user(name, email, password)

        user.is_superuser = True
        user.is_stuff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """
    Custom User Model for Backend
    """

    username = None
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name",]

    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email





