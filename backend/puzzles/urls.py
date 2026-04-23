# puzzles/urls.py

from django.urls import path
from .views import get_ai_puzzle

urlpatterns = [
    path('get-ai-puzzle/', get_ai_puzzle),
]