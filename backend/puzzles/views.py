from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import generate_puzzle


@api_view(['GET'])
def get_ai_puzzle(request):
    category = request.GET.get('category', 'bollywood song')
    difficulty = request.GET.get('difficulty', 'easy')

    data = generate_puzzle(category, difficulty)

    return Response(data)