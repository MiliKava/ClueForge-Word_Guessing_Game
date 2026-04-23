# leaderboard/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Leaderboard

@api_view(['GET'])
def get_leaderboard(request):
    data = Leaderboard.objects.all().order_by('-total_score')[:10]
    result = [
        {"username": l.username, "score": l.total_score}
        for l in data
    ]
    return Response(result)

@api_view(['POST'])
def submit_score(request):
    username = request.data.get('username')
    score = request.data.get('score')
    
    if not username or score is None:
        return Response({"error": "Username and score are required"}, status=400)
    
    # Update or create entry for this guest
    # For a real professional app, we might check if user exists or just add new entry
    # For now, let's keep it simple: if name exists, update if score is higher
    entry, created = Leaderboard.objects.get_or_create(username=username)
    if created or score > entry.total_score:
        entry.total_score = score
        entry.save()
        
    return Response({"success": True})