from transformers import VitsModel, AutoTokenizer
import torch
from pydub import AudioSegment
import numpy as np

model = VitsModel.from_pretrained("facebook/mms-tts-vie")
tokenizer = AutoTokenizer.from_pretrained("facebook/mms-tts-vie")

text = "xanh da trời"
inputs = tokenizer(text, return_tensors="pt")

with torch.no_grad():
    output = model(**inputs)

waveform = output.waveform

data_np = waveform.numpy()
data_np_squeezed = np.squeeze(data_np)

if data_np_squeezed.dtype != np.int16:
    data_np_squeezed = (data_np_squeezed * 32767).astype(np.int16)

audio_segment = AudioSegment(
    data_np_squeezed.tobytes(),
    frame_rate=model.config.sampling_rate,
    sample_width=data_np_squeezed.dtype.itemsize,
    channels=1  # Assuming mono audio
)

normalized_audio = audio_segment.normalize()

normalized_audio.export("output.mp3", format="mp3", bitrate="320k")
