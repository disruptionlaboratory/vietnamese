import librosa
import matplotlib.pyplot as plt
import numpy as np

# Load the audio file
# file_path = "Hello-Xin-chào.mp3"
# file_path = "adrian-saying-hello.mp3"
file_path = "Bed-Ghế-ngồi.mp3"
y, sr = librosa.load(file_path)

# Compute pitch using librosa's pyin algorithm
f0, voiced_flag, voiced_prob = librosa.pyin(y, fmin=librosa.note_to_hz('C2'), fmax=librosa.note_to_hz('C7'))

# Convert time stamps to seconds
times = librosa.times_like(f0)

print(times)
print(f0)

# Plot the pitch contour
plt.figure(figsize=(12, 6))
plt.plot(times, f0, label='f0')
plt.title('Pitch Contour')
plt.xlabel('Time (s)')
plt.ylabel('Frequency (Hz)')
plt.legend()
plt.show()