import json
import os
import re

# Load candidate list
with open('clean_remaining_candidates.json', 'r', encoding='utf-8') as f:
    clean_candidates = json.load(f)

print(f"Total clean candidates: {len(clean_candidates)}")

# We will select exactly 350 candidates
# Let's write a curated selection database
