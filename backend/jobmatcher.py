import os
import json
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_job_match(job_role, skills, experience):
    prompt = f"""
You are an expert AI career coach.

Evaluate how well this candidate matches the role.

Target Job Role:
{job_role}

Skills:
{skills}

Experience:
{experience}

Return ONLY valid JSON in this format:

{{
  "matchScore": 85,
  "strengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3",
    "Strength 4",
    "Strength 5"
  ],
  "missingSkills": [
    "Skill 1",
    "Skill 2",
    "Skill 3",
    "Skill 4",
    "Skill 5"
  ],
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2",
    "Recommendation 3",
    "Recommendation 4",
    "Recommendation 5"
  ]
}}

Rules:
- Match score must be between 0 and 100.
- Give exactly 5 strengths.
- Give exactly 5 missing skills.
- Give exactly 5 recommendations.
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
        temperature=0.7,
    )

    text = response.choices[0].message.content
    text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)