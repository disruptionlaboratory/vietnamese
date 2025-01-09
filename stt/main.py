from fastapi import FastAPI, Request, File, UploadFile, Body
from transformers import WhisperProcessor, WhisperForConditionalGeneration
import librosa
import soundfile as sf
import base64
from pydub import AudioSegment
import io


# processor = WhisperProcessor.from_pretrained("openai/whisper-small")
# model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-small")
# processor = WhisperProcessor.from_pretrained("openai/whisper-medium")
# model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-medium")
# processor = WhisperProcessor.from_pretrained("openai/whisper-large")
# model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-large")
# processor = WhisperProcessor.from_pretrained("openai/whisper-large-v3-turbo")
# model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-large-v3-turbo")
processor = WhisperProcessor.from_pretrained("openai/whisper-large-v3")
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-large-v3")

model.config.forced_decoder_ids = None

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Vietnamese STT API"}

@app.post("/transcribe")
async def generate(request: Request):
    json_data = await request.json()
    audio_data = json_data.get("audio")
    audio_bytes = base64.b64decode(audio_data)

    audio_segment = AudioSegment.from_mp3(io.BytesIO(audio_bytes))
    sound = io.BytesIO()
    audio_segment.export(sound, format="mp3")

    audio, sr = librosa.load(sound,  sr=16000)
    input_features = processor(audio, sampling_rate=sr, return_tensors="pt").input_features
    predicted_ids = model.generate(input_features, language="vietnamese", task="transcribe")
    transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)
    return {"transcript": transcription[0]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=3008)