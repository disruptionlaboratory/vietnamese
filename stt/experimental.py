import librosa

file_path = "Bed-Ghế-ngồi.mp3"


transcript = "Ghế ngồi"

with open('temp_transcript.txt', 'w') as f:
    f.write(transcript)

# from aeneas.task import Task
# from aeneas.executetask import ExecuteTask
# import aeneas.globalconstants as gc
#
# config_string = u"task_language=vi|is_text_type=plain|os_task_file_format=json"
# audiofile_path = file_path
# textfile_path = 'temp_transcript.txt'
#
# # Create a task
# cc = gc.Configuration()
# cc.set_configuration(config_string)
# task = Task(cc)
# task.audio_file_path_absolute = audiofile_path
# task.text_file_path_absolute = textfile_path
#
# # Process the task
# ExecuteTask(task).process()
#
# # Get the aligned text
# aligned_text = task.sync_map.serialize(output_format='json')

# print(aligned_text)


y, sr = librosa.load(file_path)

# import parselmouth
# sound = parselmouth.Sound('path_to_audio_file.wav')
# pitch = sound.to_pitch()
# pitch_values = pitch.selected_array['frequency']

# Compute pitch using librosa's pyin algorithm
f0, voiced_flag, voiced_prob = librosa.pyin(y, fmin=librosa.note_to_hz('C2'), fmax=librosa.note_to_hz('C7'))

# Convert time stamps to seconds
times = librosa.times_like(f0)

import matplotlib.pyplot as plt
import numpy as np

# Compute time axis for waveform
time_waveform = librosa.times_like(y)

# Compute time axis for pitch contour
time_pitch = librosa.times_like(f0)

plt.figure(figsize=(14, 6))

# Plot waveform
plt.subplot(2, 1, 1)
librosa.display.waveshow(y, sr=sr)
plt.title('Waveform')
plt.xlabel('Time (s)')
plt.ylabel('Amplitude')

# Plot pitch contour
plt.subplot(2, 1, 2)
plt.plot(time_pitch, f0, label='f0')
plt.title('Pitch Contour')
plt.xlabel('Time (s)')
plt.ylabel('Frequency (Hz)')
plt.legend()

plt.tight_layout()
plt.show()