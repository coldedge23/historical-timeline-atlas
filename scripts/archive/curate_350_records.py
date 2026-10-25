import json
import os
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor

# Load remaining names
with open('remaining_available_names.json', 'r', encoding='utf-8') as f:
    available_names = json.load(f)

available_set = set(available_names)

print(f"Total available names in Koei: {len(available_set)}")
