import os
import json
import django

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from puzzles.models import PuzzleSeed

def seed_database():
    json_path = "fallback_dataset.json"
    
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found. Please run generate_dataset.py first.")
        return

    print(f"Reading {json_path}...")
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    print(f"Found {len(data)} items. Seeding database...")
    
    count = 0
    for item in data:
        # Use update_or_create to avoid duplicates if run multiple times
        obj, created = PuzzleSeed.objects.update_or_create(
            category=item['category'],
            phrase=item['phrase'].upper(),
            defaults={
                'hint1': item['hints'][0] if len(item['hints']) > 0 else "No hint available",
                'hint2': item['hints'][1] if len(item['hints']) > 1 else "No hint available"
            }
        )
        if created:
            count += 1

    print(f"Success! Added {count} new items to the database.")
    print(f"Total items in PuzzleSeed table: {PuzzleSeed.objects.count()}")

if __name__ == "__main__":
    seed_database()
