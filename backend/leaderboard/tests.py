# puzzles/models.py

from django.db import models

class Puzzle(models.Model):
    phrase = models.TextField()
    category = models.CharField(max_length=50)
    hint = models.TextField()
    difficulty = models.CharField(max_length=20)