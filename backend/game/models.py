# game/models.py

from django.db import models
from django.contrib.auth.models import User

# game/models.py

class GameSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=50)
    phrase = models.TextField()
    guessed_letters = models.JSONField(default=list)
    score = models.IntegerField(default=0)
    attempts_left = models.IntegerField(default=6)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)