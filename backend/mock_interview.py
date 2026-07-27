import os
import json
import re
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def extract_json(text):
    text = text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if match:
        text = match.group()

    return json.loads(text)


def evaluate_answer(job_role, question, answer):

    prompt = f"""
You are an expert technical interviewer.

Job Role:
{job_role}

Interview Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer.

Return ONLY valid JSON.

{{
    "score": 8,
    "feedback": "Short feedback",
    "idealAnswer": "A professional ideal answer."
}}

Rules:
- Score should be between 1 and 10.
- Give constructive feedback.
- Return ONLY JSON.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.5
    )

    text = response.choices[0].message.content

    return extract_json(text)