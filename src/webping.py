import os
from PIL import Image

## Auxiliary functions


## Main script for Taxonomic Images
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tree_root = os.path.join(root_dir, "assets", "img", "taxo")
organism_dict = {}

# Traverse the folder tree
for dirpath, dirnames, filenames in os.walk(tree_root):
    # If it's a leaf folder (no subfolders, contains files)
    if not dirnames and filenames:
        # Break path into parts to extract taxonomy
        parts = dirpath.split(os.sep)
        try:
            taxo_index = parts.index("taxo")
            taxonomy_path = parts[taxo_index + 1:]  # e.g. ['eukaryota', 'fungi']
        except ValueError:
            continue  # 'taxo' not in path, skip

        # Loop through all image files in this folder
        for file in filenames:
            if file.lower().endswith(".png"):
                base_name = os.path.splitext(file)[0]  # agaricus_bisporus
                formatted_name = base_name.replace("_", " ").title()  # Agaricus Bisporus
                organism_dict[formatted_name] = taxonomy_path

# ✅ Print a few entries for verification
for name, path in list(organism_dict.items()):
    print(f"{name} → {path}")



# Step 3: webp



# Step 4: txt transcript
