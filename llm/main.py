from fastapi import FastAPI, Request, Body
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    '*'
]

pipe = pipeline(
    "text-generation",
    model="HuggingFaceTB/SmolLM2-360M-Instruct",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/")
def read_root():
    return {"message": "Vietnamese LLM API"}

@app.post("/api/generate")
async def generate(request: Request):
    json_data = await request.json()
    system = json_data.get("system")
    prompt = json_data.get("prompt")
    messages = [
        {"role": "system", "content": system },
        {"role": "user", "content": prompt },
    ]
    outputs = pipe(messages, max_new_tokens=256)

    print({"system": system })
    print({"prompt": prompt })
    message = outputs[0]["generated_text"][2]["content"]
    print({"message": message })
    return {"message": message}