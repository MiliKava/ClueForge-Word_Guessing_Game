# leaderboard/models.py

from django.db import models
from django.contrib.auth.models import User

class Leaderboard(models.Model):
    username = models.CharField(max_length=100, default='Guest')
    total_score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return f"{self.username}: {self.total_score}"