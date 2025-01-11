# Running TTI model (Flux.1-dev model) locally

### Setting up Python environment

```shell
python3 -m venv .  
source bin/activate
```


```shell
pip install -U diffusers
pip install torch
pip install transformers
pip install accelerate
pip install protobuf
pip install sentencepiece
pip install fastapi
pip install uvicorn
```


### 
Running TTI RESTful API

```shell
python main.py
```

### Prompting the TTI model via RESTful API and getting image file in the response - a PNG file encoded in base64
```shell
curl -X POST http://127.0.0.1:3006/generate -H 'Content-Type: application/json' -d '{"model":"digiplay/majicMIX_realistic_v7","width":256,"height":256,"prompt":"a living room focusing on the window in the style of Ghibli Studio animation from the 80s"}'
```





