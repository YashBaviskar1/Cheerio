from django.db import models
from django.contrib.auth.models import User

class Conversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to User
    message = models.TextField()  # Stores both user & bot messages
    timestamp = models.DateTimeField(auto_now_add=True)  # Timestamp for sorting

    def __str__(self):
        return f"Conversation with {self.user.email} at {self.timestamp}"
