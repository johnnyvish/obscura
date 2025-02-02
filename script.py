# import subprocess
# import sys

# def cut_first_three_seconds(input_file, output_file):
#     """
#     Cuts the first three seconds from the given video file and saves it as output_file.
#     """
#     command = [
#         "ffmpeg",
#         "-y",             # Overwrite output file without asking
#         "-ss", "3",       # Seek 3 seconds into the input
#         "-i", input_file, # Input file
#         "-c", "copy",     # Copy codec (no re-encoding)
#         output_file       # Output file
#     ]
    
#     try:
#         subprocess.run(command, check=True)
#         print(f"Successfully saved trimmed file as {output_file}")
#     except subprocess.CalledProcessError as e:
#         print(f"Error processing file: {e}")

# if __name__ == "__main__":
#     input_file = "/Users/johnnyvishnevskiy/Documents/projects/obscura/public/hero-video.mp4"
#     output_file = "/Users/johnnyvishnevskiy/Documents/projects/obscura/public/hero-video-cut-1.mp4"

#     cut_first_three_seconds(input_file, output_file)

# ---------------------- SCRIPT TO REMOVE LAST 3 SECONDS --------------------- #

import subprocess
import sys
import json

def get_duration(input_file):
    """
    Returns the duration (in seconds) of the input file using ffprobe.
    """
    command = [
        "ffprobe",
        "-v", "error",
        "-show_entries", "format=duration",
        "-of", "json",
        input_file
    ]
    
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        raise Exception(f"ffprobe error: {result.stderr}")
    
    data = json.loads(result.stdout)
    try:
        duration = float(data["format"]["duration"])
    except (KeyError, ValueError):
        raise Exception("Could not retrieve duration from ffprobe output.")
    
    return duration

def remove_last_three_seconds(input_file, output_file):
    """
    Removes the last three seconds from the given video file and saves it as output_file.
    """
    try:
        total_duration = get_duration(input_file)
    except Exception as e:
        print(f"Error obtaining duration: {e}")
        return

    # Calculate new duration (make sure it doesn't go below zero)
    new_duration = max(total_duration - 3, 0)
    print(f"Total Duration: {total_duration:.2f} seconds, New Duration: {new_duration:.2f} seconds")

    command = [
        "ffmpeg",
        "-y",               # Overwrite output file without asking
        "-i", input_file,   # Input file
        "-t", str(new_duration),  # Process only up to new_duration seconds
        "-c", "copy",       # Copy codec (no re-encoding)
        output_file        # Output file
    ]
    
    try:
        subprocess.run(command, check=True)
        print(f"Successfully saved trimmed file as {output_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error processing file: {e}")

if __name__ == "__main__":
    # Update these file paths as needed:
    input_file = "/Users/johnnyvishnevskiy/Documents/projects/obscura/public/hero-video.mp4"
    output_file = "/Users/johnnyvishnevskiy/Documents/projects/obscura/public/hero-video-cut-1.mp4"

    remove_last_three_seconds(input_file, output_file)