import os
from dotenv import load_dotenv
from groq import Groq
load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def generate_interview(job_role):

    prompt = f"""
You are a senior technical interviewer.

Generate exactly 30 interview questions for a {job_role}.

Include:
- Basic questions
- Intermediate questions
- Advanced questions
- Coding questions
- System Design questions
- HR/Behavioral questions

Return ONLY valid JSON in this format:

[
  {{
    "id": 1,
    "question": "Question 1"
  }},
  {{
    "id": 2,
    "question": "Question 2"
  }}
]

Do not use markdown.
Return only JSON.
"""

    response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ],
    temperature=0.7,
)

    text = response.choices[0].message.content

    return text