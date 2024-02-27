from django.db import IntegrityError
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, serializers, status

from accounts.models import UserAccount
from accounts import services


class Signup(APIView):
    """User Signup Api"""

    permission_classes = (permissions.AllowAny,)

    class InputSerializer(serializers.Serializer):
        name = serializers.CharField(required=True, min_length=3)
        email = serializers.CharField(required=True, min_length=3)
        password = serializers.CharField(required=True, min_length=6)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            services.createUser(**serializer.validated_data)
            return Response(status=status.HTTP_201_CREATED)

        except IntegrityError as e:
            print(e)
            duplicateItem = str(e.args[0])
            return Response(
                {"error": f"{duplicateItem}"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class UserInformation(APIView):
    """Get logged in user information"""

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = UserAccount
            fields = (
                "name",
            )

    def get(self, request: Request) -> Response:
        user = request.user

        serializer = self.OutputSerializer(instance=user)

        return Response(serializer.data)


class Login(APIView):
    """Login of user"""

    permission_classes = (permissions.AllowAny,)

    class InputSerializer(serializers.Serializer):
        email = serializers.EmailField(required=True)
        password = serializers.CharField(required=True)

    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = UserAccount
            fields = (
                "name",
            )

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = services.loginUser(**serializer.validated_data)

        if user is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        outputSerializer = self.OutputSerializer(instance=user)
        data = outputSerializer.data

        # create access token and send
        accessToken = services.createAccessToken(user=user)
        data["access"] = accessToken

        return Response(data)
