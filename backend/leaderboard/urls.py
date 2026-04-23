from django.urls import path
from .views import get_leaderboard, submit_score

urlpatterns = [
    path('', get_leaderboard),
    path('submit/', submit_score),
]
