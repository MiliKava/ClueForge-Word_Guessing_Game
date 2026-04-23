from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import GameSession
from puzzles.services import generate_puzzle
from .services import mask_phrase


# 🎮 START GAME
@api_view(['POST'])
def start_game(request):
    category = request.data.get("category", "bollywood song")

    data = generate_puzzle(category)

    phrase = data.get("phrase", "").upper()
    hints = data.get("hints", ["General hint", "Specific hint"])

    # ✅ temporary user (until auth added)
    user = User.objects.first()

    if not phrase:
        return Response({"error": "Failed to generate puzzle"})

    game = GameSession.objects.create(
        user=user,
        category=category,
        phrase=phrase,
        guessed_letters=[]
    )

    return Response({
        "game_id": game.id,
        "masked": mask_phrase(game.phrase, []),
        "hints": hints,
        "attempts_left": game.attempts_left,
        "score": game.score,
        "completed": game.completed
    })


# 🔤 GUESS LETTER
@api_view(['POST'])
def guess_letter(request, game_id):
    letter = request.data.get("letter", "").upper()

    # 🛑 Validate input
    if not letter or len(letter) != 1 or not letter.isalnum():
        return Response({"error": "Enter a valid single letter or number"})

    try:
        game = GameSession.objects.get(id=game_id)
    except GameSession.DoesNotExist:
        return Response({"error": "Game not found"})

    if game.completed:
        return Response({"message": "Game already finished"})

    if letter in game.guessed_letters:
        return Response({
            "message": "Already guessed",
            "masked": mask_phrase(game.phrase, game.guessed_letters)
        })

    # ✅ Add letter
    game.guessed_letters.append(letter)

    # 🎯 Scoring logic
    if letter in game.phrase:
        game.score += 10
        correct = True
    else:
        game.attempts_left -= 1
        game.score -= 5
        correct = False

    # 🧩 Mask updated phrase
    masked = mask_phrase(game.phrase, game.guessed_letters)

    # 🏆 WIN condition
    if "_" not in masked:
        game.completed = True
        game.score += 50

    # ❌ LOSE condition
    if game.attempts_left <= 0:
        game.completed = True

    game.save()

    response_data = {
        "masked": masked,
        "correct": correct,
        "score": game.score,
        "attempts_left": game.attempts_left,
        "completed": game.completed,
        "guessed_letters": game.guessed_letters
    }

    if game.completed:
        response_data["phrase"] = game.phrase

    return Response(response_data)


# 💡 FULL PHRASE GUESS
@api_view(['POST'])
def guess_full_phrase(request, game_id):
    user_input = request.data.get("phrase", "").upper().strip()

    if not user_input:
        return Response({"error": "Enter a phrase"})

    try:
        game = GameSession.objects.get(id=game_id)
    except GameSession.DoesNotExist:
        return Response({"error": "Game not found"})

    if game.completed:
        return Response({"message": "Game already finished"})

    if user_input == game.phrase:
        game.score += 100
        game.completed = True
        game.save()

        return Response({
            "message": "Correct! 🎉",
            "phrase": game.phrase,
            "score": game.score,
            "completed": True
        })
    elif user_input == "GIVE_UP":
        game.completed = True
        game.save()

        return Response({
            "message": "You Gave Up ❌",
            "phrase": game.phrase,
            "score": game.score,
            "completed": True,
            "attempts_left": game.attempts_left
        })

    else:
        game.attempts_left -= 2
        game.score -= 10

        if game.attempts_left <= 0:
            game.completed = True

        game.save()

        response_data = {
            "message": "Wrong guess ❌",
            "attempts_left": game.attempts_left,
            "score": game.score,
            "completed": game.completed
        }

        if game.completed:
            response_data["phrase"] = game.phrase

        return Response(response_data)