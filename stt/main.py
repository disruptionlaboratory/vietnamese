from fastapi import FastAPI, Request, File, UploadFile, Body
from transformers import WhisperProcessor, WhisperForConditionalGeneration
import librosa
import soundfile as sf
import base64


processor = WhisperProcessor.from_pretrained("openai/whisper-small")
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-small")
# processor = WhisperProcessor.from_pretrained("openai/whisper-medium")
# model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-medium")
model.config.forced_decoder_ids = None

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Vietnamese STT API"}

@app.post("/transcribe")
async def generate(request: Request):
    json_data = await request.json()
    audio_data = json_data.get("audio")

    if not audio_data:
        return {"error": "Audio data is missing"}, 400

    try:
        audio_bytes = base64.b64decode(audio_data)
        sr = 16000

        try:
            audio, _ = sf.read(audio_bytes, samplerate=sr, dtype='float32')
        except sf.SoundFileError as e:
            return {"error": f"Failed to read audio: {e}"}, 500

        input_features = processor(audio, sampling_rate=sr, return_tensors="pt").input_features

        try:
            predicted_ids = model.generate(input_features, language="vietnamese", task="transcribe")
        except Exception as e:
            return {"error": f"Failed to generate transcription: {e}"}, 500

        try:
            transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)
        except Exception as e:
            return {"error": f"Failed to transcribe audio: {e}"}, 500

        return {"transcript": transcription[0]}
    except Exception as e:
        return {"error": f"Failed to process request: {e}"}, 500


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=3008)