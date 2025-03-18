import os

video_path = '/dumb1/MHWilds-Digital-Art-Book.mp4'  # Path to your MP4 file
output_folder = '/dumb1/extracted_frames'  # Folder to save the frames

if not os.path.exists(video_path):
    print("The video file does not exist.")
