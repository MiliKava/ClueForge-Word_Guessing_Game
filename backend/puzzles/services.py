import json
import re
import random
from google import genai
from django.conf import settings
from .models import PuzzleSeed

# ✅ Gemini client
client = genai.Client(api_key=settings.GEMINI_API_KEY)

# ✅ Store used phrases (avoid duplicates in-session)
used_phrases = set()

def generate_puzzle(category="bollywood song", difficulty="easy"):
    global used_phrases

    # 🎯 Category-specific rules
    if category.lower() == "animal":
        extra_rule = "Return ONLY a single word (animal name). No sentence."
    elif category.lower() == "country":
        extra_rule = "Return ONLY a single word (country name)."
    elif category.lower() in ["movie", "bollywood movie"]:
        extra_rule = "Return ONLY movie name. No sentence."
    elif category.lower() == "bollywood song":
        extra_rule = "Return only song name, not full lyrics."
    elif category.lower() == "food":
        extra_rule = "Return ONLY a single food or dish name. No sentence."
    elif category.lower() == "bollywood dialogue":
        extra_rule = "Return ONLY a famous bollywood dialogue. No sentence."
    else:
        extra_rule = ""

    prompt = f"""
    Generate a word puzzle.

    Category: {category}
    Difficulty: {difficulty}
    Randomness Seed: {random.randint(1, 100000)}

    Rules:
    - Use famous entries only
    - {extra_rule}
    - Do NOT include answer in hints
    - Provide exactly 2 hints
    - CRITICAL: Provide the FULL, UNMASKED phrase. Do NOT include underscores (_) in the phrase!
    - IMPORTANT: Ensure the item you pick is completely random and different each time. Avoid the most obvious choices (like Pizza for food).

    Return ONLY valid JSON:
    {{
      "phrase": "...",
      "hints": ["hint1", "hint2"]
    }}
    """

    # 🔁 Try multiple times with AI
    for _ in range(3):
        try:
            # Use the model specified by the user or fallback to standard flash
            model_to_use = "gemini-2.5-flash"
            # Note: The user mentioned gemini-2.5-pro-preview-tts earlier, 
            # but we'll stick to a reliable one unless specified otherwise in settings.
            
            response = client.models.generate_content(
                model=model_to_use,
                contents=prompt
            )

            text = response.text.strip()
            text = re.sub(r"```json|```", "", text).strip()

            data = json.loads(text)

            phrase = data.get("phrase", "").upper()
            hints = data.get("hints", ["Hint 1", "Hint 2"])

            if not phrase or phrase in used_phrases:
                continue

            if category.lower() in ["animal", "country"] and " " in phrase:
                continue

            used_phrases.add(phrase)
            return {"phrase": phrase, "hints": hints}

        except Exception as e:
            print(f"Gemini AI Error: {e}")
            break # Jump to database fallback if API fails

    # 🔁 Fallback to Database if AI fails or returns duplicates
    print(f"Falling back to database for category: {category}")
    seeds = PuzzleSeed.objects.filter(category__iexact=category)
    
    # If no items for specific category, get any random items
    if not seeds.exists():
        seeds = PuzzleSeed.objects.all()

    if seeds.exists():
        # Get a random item from the filtered seeds
        seed = random.choice(seeds)
        return {
            "phrase": seed.phrase.upper(),
            "hints": [seed.hint1, seed.hint2]
        }

    # 🚨 Ultimate Hardcoded Fallback (Absolute last resort)
    return {
        "phrase": "SHOLAY",
        "hints": ["Famous Bollywood Movie", "Gabbar Singh character"]
    }
