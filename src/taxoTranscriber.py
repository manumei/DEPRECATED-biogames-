import os

# === Root Directory ===
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# === Paths Taxo ===
webp_root_taxo = os.path.join(root_dir, "assets", "webp", "taxo")
data_path = os.path.join(root_dir, "assets", "data")

def taxonomicTranscriber(root_dir, data_path, webp_root_path):
    ''' 
    Receives the root path of the directory, the txt path to transcribe in, and the root of the tree for the webp images of the category
    
    Explores the folders and takes the images from each leaf folder, tracking its path up
    Creates a blank txt in the data_path as data_path/taxonomy.txt
    
    And writes transcriptions of the organisms into taxonomy.txt, with the format of: 
    Image Name, {Taxonomy Path}, {Absolute WebP Path}
    
    Where Image Name is the file name transformed from underscore_lowercase to Title Case
    And Taxonomy Path are the folders from the relative path after webp_root_path
    And Absolute WebP path is the absolute path to the webp image from the root of the directory
    '''
    output_file = os.path.join(data_path, "taxonomy.txt")
    os.makedirs(data_path, exist_ok=True)

    with open(output_file, "w", encoding="utf-8") as f:
        for dirpath, dirnames, filenames in os.walk(webp_root_path):
            if not dirnames and filenames:
                # Taxonomy path = folders after webp_root_path
                taxonomy_path = os.path.relpath(dirpath, webp_root_path).split(os.sep)

                for file in filenames:
                    if file.lower().endswith(".webp"):
                        base_name = os.path.splitext(file)[0]
                        formatted_name = base_name.replace("_", " ").title()

                        # WebP path relative to root
                        rel_webp_path = os.path.relpath(os.path.join(dirpath, file), root_dir).replace("\\", "/")

                        # Compose line
                        line = f"{formatted_name}, {{{', '.join(taxonomy_path)}}}, {{{rel_webp_path}}}\n"
                        f.write(line)

    print(f"✅ Taxonomy transcription complete! Written to: {output_file}")

def clear_taxonomy(data_path):
    '''
    Clears the contents of taxonomy.txt located in the given data_path,
    leaving the file empty.
    '''
    taxonomy_file = os.path.join(data_path, "taxonomy.txt")
    os.makedirs(data_path, exist_ok=True)  # Just in case the folder doesn't exist

    with open(taxonomy_file, "w", encoding="utf-8") as f:
        pass  # This empties the file

    print(f"🧹 taxonomy.txt has been cleared at: {taxonomy_file}")

# Write the file
taxonomicTranscriber(root_dir, data_path, webp_root_taxo)

# Clear the taxonomy file
# clear_taxonomy(data_path)