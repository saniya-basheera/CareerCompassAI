import os
import json
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_resume(data):

    prompt = f"""
You are an expert ATS Resume Writer and Career Coach.

Generate a PROFESSIONAL ATS-friendly resume in JSON format.

User Details:

Name: {data["fullName"]}
Email: {data["email"]}
Phone: {data["phone"]}
Location: {data["location"]}
LinkedIn: {data["linkedin"]}
GitHub: {data["github"]}

Target Role:
{data["jobRole"]}

Education:
Degree: {data["degree"]}
College: {data["college"]}
Graduation Year: {data["graduationYear"]}
CGPA: {data["cgpa"]}

Skills:
{", ".join(data["skills"])}

Experience:
Company: {data["company"]}
Role: {data["role"]}
Employment Type: {data["employmentType"]}
Duration: {data["duration"]}

Project:
Title: {data["projectTitle"]}
Technologies: {data["projectTech"]}

Instructions:

Write:

1. Professional Summary (4-5 lines)

2. Experience
Generate 4 professional resume bullet points.

3. Project
Generate 4 professional bullet points describing the project.

4. Suggest 5 additional ATS skills related to the target job.

Return ONLY valid JSON.

Example:

{{
"summary":"...",
"experience":[
"...",
"...",
"...",
"..."
],
"project":[
"...",
"...",
"...",
"..."
],
"skills":[
"...",
"...",
"...",
"...",
"..."
]
}}

Do not write markdown.
Do not use ```json.
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
    text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)