from django.db import models
from accounts.models import UserAccount

class Todo(models.Model):
    text = models.CharField(max_length=200)
    created_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE)

    def __str__(self):
        return self.text

