import cv2
import os
from skimage.metrics import structural_similarity as ssim
import numpy as np

def calculate_ssim(image1, image2):
    # Convert images to grayscale
    gray1 = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)

    # Compute SSIM between two images
    score, _ = ssim(gray1, gray2, full=True)
    return score

def remove_similar_images(folder_path, similarity_threshold=0.99):
    # List all images in the folder
    images = [f for f in os.listdir(folder_path) if f.endswith('.jpg')]
    images.sort()  # Sort images to ensure they are in the correct order

    prev_image = None
    deleted_count = 0

    for i in range(1, len(images)):
        current_image_path = os.path.join(folder_path, images[i])
        prev_image_path = os.path.join(folder_path, images[i - 1])

        # Check if the previous image exists (to avoid loading deleted images)
        if not os.path.exists(prev_image_path):
            # print(f"Warning: {prev_image_path} does not exist, skipping comparison.")
            continue

        # Read previous image
        prev_image = cv2.imread(prev_image_path)
        if prev_image is None:
            print(f"Warning: Failed to load {prev_image_path}. Skipping...")
            continue

        # Check if the current image exists
        if not os.path.exists(current_image_path):
            # print(f"Warning: {current_image_path} does not exist, skipping comparison.")
            continue

        # Read current image
        current_image = cv2.imread(current_image_path)
        if current_image is None:
            # print(f"Warning: Failed to load {current_image_path}. Skipping...")
            continue

        # Calculate SSIM between consecutive frames
        similarity = calculate_ssim(prev_image, current_image)

        if similarity > similarity_threshold:
            print(f"Deleting {images[i]} as it's similar to {images[i-1]} with SSIM: {similarity}")
            os.remove(current_image_path)
            deleted_count += 1

    print(f"Completed. Total deleted images: {deleted_count}")

# Example usage
folder_path = 'E:/CodeRepos/personal/working on/PricePlaces/priceplaces/dumb1/extracted_frames'
remove_similar_images(folder_path, similarity_threshold=0.99)
