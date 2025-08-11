import json
from PIL import Image
import os

TILE_WIDTH = 40
TILE_HEIGHT = 30

# Load your sprite sheet
sprite_sheet = Image.open("pokemonicons-sheet.png")
sheet_width, sheet_height = sprite_sheet.size

# Make output folder
os.makedirs("sprites", exist_ok=True)

# Slice into tiles
cols = sheet_width // TILE_WIDTH
rows = sheet_height // TILE_HEIGHT

# Open file to generate names
#names = {}

count = 0
for y in range(rows):
    for x in range(cols):
        box = (
            x * TILE_WIDTH,
            y * TILE_HEIGHT,
            (x + 1) * TILE_WIDTH,
            (y + 1) * TILE_HEIGHT
        )
        tile = sprite_sheet.crop(box)
        tile.save(f"sprites/{count}.png")
        #names[count] = f"sprites/%23{count}.png"
        count += 1

print(f"Done! Saved {count} sprites.")

#with open("names.json", "w") as f:
#    json.dump(names, f)