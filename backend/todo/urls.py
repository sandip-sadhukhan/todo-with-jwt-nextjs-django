from django.urls import path
from todo import api

urlpatterns = [
    # User Public Profile pages API
    path("", api.TodoList.as_view()),
]