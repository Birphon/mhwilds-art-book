import cv2
import os

def extract_frames(video_path, output_folder):
    # Check if the video file exists
    if not os.path.exists(video_path):
        print(f"Error: The video file '{video_path}' does not exist.")
        return

    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Open the video file
    video_capture = cv2.VideoCapture(video_path)

    # Check if the video opened successfully
    if not video_capture.isOpened():
        print("Error: Could not open video.")
        return

    print("Video opened successfully!")

    # Get the video properties
    total_frames = int(video_capture.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = video_capture.get(cv2.CAP_PROP_FPS)
    print(f"Total frames: {total_frames}, FPS: {fps}")

    # Loop through all frames
    frame_number = 0
    while True:
        ret, frame = video_capture.read()

        if not ret:
            break  # Exit the loop when no more frames are available

        # Save the frame as an image
        frame_filename = os.path.join(output_folder, f"frame_{frame_number:04d}.jpg")
        cv2.imwrite(frame_filename, frame)
        print(f"Extracting frame {frame_number + 1}/{total_frames}")

        frame_number += 1

    # Release the video capture object
    video_capture.release()
    print(f"Extraction complete. All frames are saved to '{output_folder}'.")

# Example usage
video_path = 'E:/CodeRepos/personal/working on/mhwilds-art-book/rescaling/MHWilds-Digital-Art-Book.mp4'  # NOT INCLUDED
output_folder = 'E:/CodeRepos/personal/working on/mhwilds-art-book/rescaling/extracted_frames'  # Folder to save the frames
extract_frames(video_path, output_folder)
