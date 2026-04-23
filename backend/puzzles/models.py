from django.db import models

class PuzzleSeed(models.Model):
    category = models.CharField(max_length=100)
    phrase = models.CharField(max_length=255)
    hint1 = models.CharField(max_length=255)
    hint2 = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.category}: {self.phrase}"
