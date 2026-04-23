# core/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('puzzles.urls')),
    path('api/game/', include('game.urls')),
    path('api/leaderboard/', include('leaderboard.urls')),
]