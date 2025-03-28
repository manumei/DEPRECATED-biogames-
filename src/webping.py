import os
from PIL import Image  # Make sure Pillow is installed: pip install pillow
from colorama import Fore, Style

# === Paths ===
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
img_root = os.path.join(root_dir, "assets", "img", "taxo")
webp_root = os.path.join(root_dir, "assets", "webp", "taxo")

organism_dict = {}
exception_counter = 0

# === Traverse folder structure ===
for dirpath, dirnames, filenames in os.walk(img_root):
    if not dirnames and filenames:
        # Get taxonomy path: folders after 'taxo/'
        parts = dirpath.split(os.sep)
        try:
            taxo_index = parts.index("taxo")
            taxonomy_path = parts[taxo_index + 1:]  # e.g. ['eukaryota', 'fungi']
        except ValueError:
            continue  # Skip if 'taxo' not found

        # Process image files in this leaf folder
        for file in filenames:
            if file.lower().endswith(".png"):
                # === Format species name ===
                name_without_ext = os.path.splitext(file)[0]
                formatted_name = name_without_ext.replace("_", " ").title()

                # === Paths ===
                png_path = os.path.join(dirpath, file)
                relative_webp_path = os.path.join("assets", "webp", "taxo", *taxonomy_path, name_without_ext + ".webp")
                full_webp_folder = os.path.join(webp_root, *taxonomy_path)
                webp_full_file = os.path.join(full_webp_folder, name_without_ext + ".webp")

                # === Ensure target folder exists ===
                os.makedirs(full_webp_folder, exist_ok=True)

                # === Convert to .webp if needed ===
                if not os.path.exists(webp_full_file) or os.path.getmtime(png_path) > os.path.getmtime(webp_full_file):
                    try:
                        with Image.open(png_path) as img:
                            img.save(webp_full_file, "WEBP")
                    except Exception as e:
                        exception_counter += 1
                        print(Fore.RED + Style.BRIGHT + f"❌ Failed to convert {png_path}: {e}" + Style.RESET_ALL)
                        continue

                # === Save to organism_dict ===
                organism_dict[formatted_name] = {
                    "taxonomy": taxonomy_path,
                    "webp_path": relative_webp_path
                }

# === Preview some results ===
species_count = len(organism_dict)
print("\n📖 Sample entries:")
for name, info in list(organism_dict.items()):
    print(f"{name}, {{{', '.join(info['taxonomy'])}}}, {{{info['webp_path']}}}")

print(Fore.BLUE + Style.BRIGHT + f"\n🧬 Total species: {species_count}" + Style.RESET_ALL)

if exception_counter > 0:
    print(Fore.RED + Style.BRIGHT + f"❌ Failed to convert {exception_counter} images" + Style.RESET_ALL)
else :
    print(Fore.GREEN + Style.BRIGHT + "✅ All images converted successfully" + Style.RESET_ALL)

# step 4: txt transcript