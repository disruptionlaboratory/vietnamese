from fastapi import FastAPI, Request, Body
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3009",
]

pipe = pipeline("text-generation", model="microsoft/phi-4", trust_remote_code=True)
pipe = pipe.to("mps")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Vietnamese LLM API"}

@app.post("/transcribe")
async def generate(request: Request):
    json_data = await request.json()
    prompt = json_data.get("prompt")
    message = pipe(prompt)
    return {"message": message}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=3010)