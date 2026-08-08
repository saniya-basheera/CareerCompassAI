import json
from ai_client import client
def generate_jd_resume(data):
    prompt = f"""
You are an expert ATS Resume Writer and Career Coach.

Create a professional ATS-friendly resume tailored specifically
to the Job Description provided below.

IMPORTANT RULES:
- Use only the candidate's actual information.
- Do NOT invent companies, degrees, certifications, achievements,
  experience, or skills.
- Tailor the wording to the Job Description.
- Prioritize keywords that genuinely match the candidate's information.
- Keep the resume professional and concise.
- Return ONLY valid JSON.

JOB DESCRIPTION:
{data["jobDescription"]}

CANDIDATE INFORMATION:

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

1. Write a professional summary of 4-5 lines tailored to the
   Job Description.

2. Generate 4 experience bullet points emphasizing experience
   relevant to the Job Description.

3. Generate 4 project bullet points emphasizing technologies,
   responsibilities, and skills relevant to the Job Description.

4. Identify the most relevant ATS keywords from the Job Description
   that match the candidate's existing skills and experience.

5. Suggest up to 5 additional skills that would be useful for the role.
   Do NOT claim that the candidate already possesses these skills.

Return this JSON structure:

{{
    "summary": "...",
    "experience": [
        "...",
        "...",
        "...",
        "..."
    ],
    "project": [
        "...",
        "...",
        "...",
        "..."
    ],
    "matchedSkills": [
        "...",
        "..."
    ],
    "suggestedSkills": [
        "...",
        "..."
    ]
}}

Do not write markdown.
Do not use ```json.
Return only valid JSON.
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