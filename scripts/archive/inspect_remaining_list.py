import json

with open('remaining_available_names.json', 'r', encoding='utf-8') as f:
    names = json.load(f)

print(f"Total remaining pool: {len(names)}")
print("Sample first 100:")
print(names[:100])
