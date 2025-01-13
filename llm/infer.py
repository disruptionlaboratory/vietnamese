from transformers import pipeline

# pipe = pipeline(
#     "text-generation",
#     model="google/gemma-2-2b",
#     device="mps"
# )
#
# text = "Paint a scene with words that conveys the following word: Blanket }"
# outputs = pipe(text, max_new_tokens=256)
# response = outputs[0]["generated_text"]
#


messages = [
    {"role": "system", "content": "You are a helpful bot that will provide a simple visual description of a word, always using the most popular meaning"},
    {"role": "user", "content": "Button"},
]
pipe = pipeline("text-generation", model="HuggingFaceTB/SmolLM2-360M-Instruct")
outputs = pipe(messages, max_new_tokens=256)

# print(outputs)
print(outputs[0]["generated_text"][2]["content"])
