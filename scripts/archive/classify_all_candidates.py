import json

with open('clean_remaining_candidates.json', 'r', encoding='utf-8') as f:
    clean = json.load(f)

# Let's inspect all 764
names = [f.replace('.jpg', '') for f in clean]

# Let's check how many total we have
print("Total candidates to classify:", len(names))

# We can easily pick 350 genuine historical figures
with open('classified_candidates.json', 'w', encoding='utf-8') as f:
    json.dump(names, f, ensure_ascii=False, indent=2)
