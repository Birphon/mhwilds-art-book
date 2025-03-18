import os
from PIL import Image

def resize_and_save(image_path, output_base_folder, sizes):
    """
    Resize an image to multiple screen sizes and save with the appropriate filename in different folders.
    :param image_path: The path of the image to resize.
    :param output_base_folder: The base folder where resized images will be saved.
    :param sizes: List of screen sizes (width x height) for resizing.
    """
    # Open the original image
    img = Image.open(image_path)

    for size in sizes:
        screen_width, screen_height = size

        # Calculate the resized dimensions while maintaining the aspect ratio
        width, height = img.size
        if width / height > screen_width / screen_height:
            new_width = screen_width
            new_height = int((screen_width / float(width)) * float(height))
        else:
            new_height = screen_height
            new_width = int((screen_height / float(height)) * float(width))

        # Resize image using LANCZOS (formerly ANTIALIAS)
        img_resized = img.resize((new_width, new_height), Image.LANCZOS)

        # Determine the folder based on screen size
        if screen_width == 3840 and screen_height == 2160:
            size_folder = "4k-desktop"
        elif screen_width == 2560 and screen_height == 1080:
            size_folder = "ultrawide"
        elif screen_width == 1920 and screen_height == 1080:
            size_folder = "full-hd"
        elif screen_width == 1366 and screen_height == 768:
            size_folder = "laptop"
        elif screen_width == 1080 and screen_height == 1920:
            size_folder = "mobile-portrait"
        elif screen_width == 2560 and screen_height == 1440:
            size_folder = "qhd"
        else:
            size_folder = f"{screen_width}x{screen_height}"  # Generic folder name

        # Create the output folder if it doesn't exist
        output_folder = os.path.join(output_base_folder, size_folder)
        os.makedirs(output_folder, exist_ok=True)

        # Save the resized image with the screen size included in the filename
        base_filename = os.path.basename(image_path)
        filename_without_ext = os.path.splitext(base_filename)[0]
        output_filename = f"{filename_without_ext}-{screen_width}x{screen_height}.jpg"
        output_path = os.path.join(output_folder, output_filename)

        # Save the resized image
        img_resized.save(output_path)
        print(f"Saved resized image as {output_filename} in folder {size_folder}")


def process_images(input_folder, output_base_folder, sizes):
    """
    Process all images in the input folder, resize them to various sizes, and save in different folders.
    :param input_folder: The folder containing the images to resize.
    :param output_base_folder: The base folder where resized images will be saved.
    :param sizes: List of screen sizes (width x height) for resizing.
    """
    # List all image files in the folder
    images = [f for f in os.listdir(input_folder) if f.endswith('.jpg')]

    for image in images:
        image_path = os.path.join(input_folder, image)
        resize_and_save(image_path, output_base_folder, sizes)


# Define screen sizes (add any more that you need)
screen_sizes = [
    (1920, 1080),  # Full HD (Desktop)
    (2560, 1440),  # Quad HD (Desktop)
    (3840, 2160),  # 4K (Desktop)
    (1366, 768),   # Laptop (HD)
    (1600, 900),   # Laptop (HD+)
    (1440, 900),   # Laptop (WXGA+)
    (1080, 1920),  # Mobile Portrait (1080x1920)
    (750, 1334),   # iPhone 6/7/8 (Mobile)
    (1440, 2560),  # Mobile (Quad HD)
    (2560, 1080),  # Ultra-wide (21:9)
    (3440, 1440),  # Ultra-wide (21:9)
]

# Define folder paths
input_folder = 'E:/CodeRepos/personal/working on/PricePlaces/priceplaces/dumb1/extracted_frames'
output_base_folder = 'E:/CodeRepos/personal/working on/PricePlaces/priceplaces/dumb1/resized_frames'

# Process images
process_images(input_folder, output_base_folder, screen_sizes)
