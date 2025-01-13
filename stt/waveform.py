import librosa
import matplotlib.pyplot as plt
import numpy as np

# Load the audio file
file_path = "Hello-Xin-chào.mp3"
# file_path = "adrian-saying-hello.mp3"
# file_path = "Bed-Ghế-ngồi.mp3"
y, sr = librosa.load(file_path)

# Plot waveform
plt.figure(figsize=(12, 4))
librosa.display.waveshow(y, sr=sr)
plt.title('Waveform')
plt.xlabel('Time (s)')
plt.ylabel('Amplitude')
plt.show()