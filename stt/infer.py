from transformers import WhisperProcessor, WhisperForConditionalGeneration
import librosa

processor = WhisperProcessor.from_pretrained("openai/whisper-small")
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-small")
# processor = WhisperProcessor.from_pretrained("openai/whisper-medium")
# model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-medium")
model.config.forced_decoder_ids = None

# audio, sr = librosa.load("/Users/adrianlatham/workspace/vietnamese/app/src/resources/audio/Coffee-maker-Máy-pha-cà-phê.mp3", sr=16000)
audio, sr = librosa.load("/Users/adrianlatham/workspace/vietnamese/app/src/resources/audio/Head-Đầu.mp3", sr=16000)
# audio, sr = librosa.load("./audio.webm", sr=16000)

input_features = processor(audio, sampling_rate=sr, return_tensors="pt").input_features
predicted_ids = model.generate(input_features, language="vietnamese", task="transcribe")
# predicted_ids = model.generate(input_features)

transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)
print(transcription)


