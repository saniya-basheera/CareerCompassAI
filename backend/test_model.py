import os
from dotenv import load_dotenv
from groq import Groq
load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

models = [
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-flash-latest",
    "gemini-pro-latest",
]

for model in models:
    try:
        response = client.models.generate_content(
            model=model,
            contents="Reply only with OK"
        )
        print(f"✅ {model} works: {response.text}")
    except Exception as e:
        print(f"❌ {model}: {e}")