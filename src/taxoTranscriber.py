import os

# === Root Directory ===
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# === Paths Taxo ===
webp_root_taxo = os.path.join(root_dir, "assets", "webp", "taxo")
data_path = os.path.join(root_dir, "data")

def taxonomicTranscriber(root_dir, data_path, webp_root_path):
    ''' 
    Receives the root path of the directory, the txt path to transcribe in, and the root of the tree for the webp images of the category
    
    Explores the folders and takes the images from each leaf folder, tracking its path up
    Creates a blank txt in the data_path as data_path/taxonomy.txt
    
    And writes transcriptions of the organisms into taxonomy.txt, with the format of: 
    Image Name, {Taxonomy Path}, {Abolsute WebP Path} '
    
    Where Image Name is the file name transformed from underscore_lowercase to Title Case
    And Taxonomy Path are the folders from the relative path after webp_root_path
    And Absolute WebP path is the absolute path to the webp image from the root of the directory
    '''
    
