import librosa
import matplotlib.pyplot as plt
import numpy as np

# Load the audio file
# file_path = "Hello-Xin-chào.mp3"
# file_path = "adrian-saying-hello.mp3"
file_path = "Bed-Ghế-ngồi.mp3"
y, sr = librosa.load(file_path)


D = librosa.stft(y)  # Short-time Fourier transform
S_db = librosa.amplitude_to_db(np.abs(D), ref=np.max)

# Plot spectrogram
plt.figure(figsize=(12, 4))
librosa.display.specshow(S_db, x_axis='time', y_axis='log')
plt.colorbar(format='%+2.0f dB')
plt.title('Spectrogram')
plt.xlabel('Time (s)')
plt.ylabel('Frequency (Hz)')
plt.show()