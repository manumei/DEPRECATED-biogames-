import os

# === Root Directory ===
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# === Paths Taxo ===
img_root_taxo = os.path.join(root_dir, "assets", "img", "taxo")
webp_root_taxo = os.path.join(root_dir, "assets", "webp", "taxo")

def taxonomicTranscriber(data_path, webp_root_path):
    ''' Given the root path to the webp images of the category
    Explores the folders and takes the images from each leaf folder, tracking its path up 
    And transcribes into data_path/taxonomy.txt'''
