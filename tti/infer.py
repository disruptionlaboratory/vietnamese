import torch
from diffusers import FluxPipeline
import uuid

pipe = FluxPipeline.from_pretrained("black-forest-labs/FLUX.1-dev", torch_dtype=torch.bfloat16).to("mps")

# prompt = "Stunning Japanese woman, completely naked, standing in front of an old concrete factory wall, facing forward"
prompt = "a living room focusing on the window in the style of Ghibli Studio animation from the 80s"

image = pipe(
    prompt,
    height=1024,
    width=1024,
    guidance_scale=3.5,
    num_inference_steps=50,
    max_sequence_length=512,
    generator=torch.Generator("mps").manual_seed(0)
).images[0]

random_name = uuid.uuid4()
output_image_path = f"{random_name}.png"
image.save(output_image_path)