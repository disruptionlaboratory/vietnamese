from fastapi import FastAPI, Request, File, UploadFile, Body
from diffusers import DiffusionPipeline
from io import BytesIO
import base64
import uuid

# pipe = DiffusionPipeline.from_pretrained("model/name").to("mps")
# Yntec/mistoonAnime2
# digiplay/majicMIX_realistic_v7


app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Stable Diffusion API"}

@app.post("/generate")
async def generate(request: Request):
    json_data = await request.json()

    prompt = json_data.get("prompt", None)
    width = json_data.get("width", None)
    height = json_data.get("height", None)

    model = json_data.get("model", None)
    pipe = DiffusionPipeline.from_pretrained(model).to("mps")

    image = pipe(prompt, height=height, width=width).images[0]

    random_name = uuid.uuid4()
    output_image_path = f"{random_name}.png"
    image.save(output_image_path)

    img_bytes = BytesIO()
    image.save(img_bytes, 'PNG')
    encoded_img = base64.b64encode(img_bytes.getvalue()).decode('utf-8')

    return {"image": encoded_img}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=3006)