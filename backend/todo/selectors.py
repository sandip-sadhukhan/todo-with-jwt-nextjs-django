from typing import Iterable
from accounts.models import UserAccount
from todo.models import Todo

def getAllTodosOfUser(*, user: UserAccount) -> Iterable[Todo]:
    return Todo.objects.filter(created_by=user)
