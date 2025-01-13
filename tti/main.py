from fastapi import FastAPI, Request, File, UploadFile, Body
from diffusers import DiffusionPipeline
from io import BytesIO
import base64
import uuid

app = FastAPI()

@app.get("/api/")
def read_root():
    return {"message": "Stable Diffusion API"}

@app.post("/api/generate")
async def generate(request: Request):
    json_data = await request.json()

    prompt = json_data.get("prompt", None)
    width = json_data.get("width", None)
    height = json_data.get("height", None)
    model = json_data.get("model", None)

    pipe = DiffusionPipeline.from_pretrained(model).to("cpu")

    image = pipe(prompt, height=height, width=width).images[0]

    random_name = uuid.uuid4()
    output_image_path = f"{random_name}.png"
    image.save(output_image_path)

    img_bytes = BytesIO()
    image.save(img_bytes, 'PNG')
    encoded_img = base64.b64encode(img_bytes.getvalue()).decode('utf-8')

    return {"image": encoded_img}