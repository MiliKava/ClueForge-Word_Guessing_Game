from django.urls import path
from .views import start_game, guess_letter, guess_full_phrase

urlpatterns = [
    path('start/', start_game),
    path('guess/<int:game_id>/', guess_letter),
    path('guess-full/<int:game_id>/', guess_full_phrase),
]