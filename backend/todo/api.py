from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers, status
from todo.models import Todo
from todo import selectors
from todo import services


class TodoList(APIView):
    class InputSerializer(serializers.Serializer):
        text = serializers.CharField(max_length=200)
    
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Todo
            fields = [
                "id",
                "text",
            ]

    def get(self, request: Request) -> Response:
        todos = selectors.getAllTodosOfUser(user=request.user)
        serializer = self.OutputSerializer(
            instance=todos,
            many=True,
        )
        return Response(serializer.data)

    def post(self, request: Request) -> Response:
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.createTodo(user=request.user, **serializer.validated_data)

        return Response(
            {"message": "Todo created successfully"},
            status=status.HTTP_201_CREATED,
        )

        