# Running TTS Vietnamese model locally

### Setting up Python environment 

```shell
python3 -m venv .  
source bin/activate
```
### Installing necessary libraries

```shell
pip install torch torchvision
pip install --upgrade transformers accelerate
pip install scipy 
pip install pydub
pip install fastapi
pip install uvicorn
```

### Testing infer script
```shell
python infer.py
````
### Testing audio output
```shell
afplay output.wav
```
### 
Running TTS RESTful API

```shell
python main.py
```

### Prompting the TTS model via RESTful API and getting audio file in the response - an mp3 file encoded in base64
```shell
curl -X POST http://127.0.0.1:3007/generate -H 'Content-Type: application/json' -d '{"prompt": "xanh lá cây"}'
```
