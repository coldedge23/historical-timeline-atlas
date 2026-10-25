import json

with open('clean_remaining_candidates.json', 'r', encoding='utf-8') as f:
    remaining = json.load(f)

print(f"Total clean candidates: {len(remaining)}")

# Let's save a sorted text file of all 764 candidate names to inspect
names = sorted([f.replace('.jpg', '') for f in remaining])
with open('all_clean_candidate_names.txt', 'w', encoding='utf-8') as f:
    for n in names:
        f.write(n + '\n')

print("Wrote all_clean_candidate_names.txt successfully!")
