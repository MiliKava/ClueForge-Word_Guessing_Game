import os
import json
import re
import time
import django
from dotenv import load_dotenv
from google import genai

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from puzzles.models import PuzzleSeed

# Load environment variables
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    print("Error: GEMINI_API_KEY not found in .env")
    exit(1)

client = genai.Client(api_key=API_KEY)

categories = [
    # "food",
    # "bollywood song",
    "bollywood dialogue",
    "bollywood movie",
    "country",
    "animal"
]

dataset = []

def get_items(category, count=50):
    extra_rule = ""
    if category.lower() in ["animal", "country"]:
        extra_rule = "Return ONLY single-word names. NO spaces or sentences."
    elif category.lower() in ["bollywood movie"]:
        extra_rule = "Return ONLY movie names."
    elif category.lower() == "bollywood song":
        extra_rule = "Return only song names, not full lyrics."
    elif category.lower() == "food":
        extra_rule = "Return ONLY a single food or dish name."
    elif category.lower() == "bollywood dialogue":
        extra_rule = "Return ONLY famous bollywood dialogues."
        
    prompt = f"""
    Generate a JSON array containing EXACTLY {count} unique word puzzle items for the category: "{category}".
    
    Rules:
    - Use famous entries only
    - {extra_rule}
    - Do NOT include the answer in the hints
    - Provide exactly 2 hints for each item
    - CRITICAL: Provide the FULL, UNMASKED phrase. Do NOT include underscores (_) in the phrase!
    - IMPORTANT: Ensure all {count} items are completely unique.
    
    Return ONLY a valid JSON array matching this exact format, with no markdown wrappers or extra text:
    [
      {{
        "category": "{category}",
        "phrase": "THE ACTUAL UNMASKED ANSWER",
        "hints": ["Hint 1", "Hint 2"]
      }},
      ...
    ]
    """
    
    for attempt in range(3):
        try:
            print(f"Requesting {count} items for '{category}' (Attempt {attempt+1})...")
            response = client.models.generate_content(
                model="gemini-2.5-pro",
                contents=prompt
            )
            
            text = response.text.strip()
            text = re.sub(r"```json|```", "", text).strip()
            
            data = json.loads(text)
            
            if isinstance(data, list) and len(data) > 0:
                print(f"Successfully generated {len(data)} items for '{category}'.")
                return data
            else:
                print("Invalid JSON structure returned.")
        except Exception as e:
            print(f"Error on attempt {attempt+1}: {e}")
            time.sleep(2)
            
    return []

# Generate items per category
for cat in categories:
    print(f"\n--- Generating dataset for {cat} ---")
    
    # Batch 1 (50 items)
    batch1 = get_items(cat, 50)
    dataset.extend(batch1)
    
    time.sleep(2) # rate limit prevention
    
    # Save to Database immediately for this category
    if batch1:
        print(f"Saving {len(batch1)} items for '{cat}' to database...")
        for item in batch1:
            PuzzleSeed.objects.update_or_create(
                category=item['category'],
                phrase=item['phrase'].upper(),
                defaults={
                    'hint1': item['hints'][0] if len(item['hints']) > 0 else "No hint available",
                    'hint2': item['hints'][1] if len(item['hints']) > 1 else "No hint available"
                }
            )

print(f"\nDataset generation complete. Total items: {len(dataset)}")

with open("fallback_dataset.json", "w", encoding="utf-8") as f:
    json.dump(dataset, f, indent=2, ensure_ascii=False)

print("Saved to fallback_dataset.json")
