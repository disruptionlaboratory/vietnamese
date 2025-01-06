from fastapi import FastAPI, Request, File, UploadFile, Body
from transformers import VitsModel, AutoTokenizer
import torch
from pydub import AudioSegment
import numpy as np

from io import BytesIO
import base64

model = VitsModel.from_pretrained("facebook/mms-tts-vie")
tokenizer = AutoTokenizer.from_pretrained("facebook/mms-tts-vie")

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Vietnamese TTS API"}

@app.post("/generate")
async def generate(request: Request):
    json_data = await request.json()

    prompt = json_data.get("prompt", None)
    inputs = tokenizer(prompt, return_tensors="pt")

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

    audio_bytes_io = BytesIO()
    normalized_audio.export(audio_bytes_io, format="mp3", bitrate="320k")
    audio_bytes = audio_bytes_io.getvalue()

    # Encode audio bytes as base64
    encoded_audio = base64.b64encode(audio_bytes).decode('utf-8')

    return {"audio": encoded_audio}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=3007)