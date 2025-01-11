from fastapi import FastAPI, Request, File, UploadFile, Body
from io import BytesIO
import base64
import torch
from diffusers import FluxPipeline

pipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-dev", torch_dtype=torch.bfloat16).to("mps")

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "FLUX.1-dev API"}

@app.post("/generate")
async def generate(request: Request):
    json_data = await request.json()

    prompt = json_data.get("prompt", None)
    width = json_data.get("width", None)
    height = json_data.get("height", None)

    image = pipe(
        prompt,
        height=height, # 1024
        width=width, # 1024
        guidance_scale=3.5,
        num_inference_steps=25, # 50
        max_sequence_length=512,
        generator=torch.Generator("mps").manual_seed(0)
    ).images[0]

    img_bytes = BytesIO()
    image.save(img_bytes, 'PNG')
    encoded_img = base64.b64encode(img_bytes.getvalue()).decode('utf-8')

    return {"image": encoded_img}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=3006)