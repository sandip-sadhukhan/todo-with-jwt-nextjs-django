from accounts.models import UserAccount
from todo.models import Todo


def createTodo(*, user:UserAccount, text: str) -> Todo:
    return Todo.objects.create(text=text, created_by=user)