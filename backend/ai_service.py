import os
import json
import re

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


# ==========================================================
# Helper
# ==========================================================

def extract_json(text: str):
    """
    Extract JSON from Groq response.
    """

    text = text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if match:
        text = match.group()

    return json.loads(text)


# ==========================================================
# ROADMAP
# ==========================================================

def generate_roadmap(job_role):

    prompt = f"""
You are an expert AI Career Mentor.

A student wants to become a {job_role}.

Return ONLY valid JSON.

JSON format:

{{
  "career":"{job_role}",

  "roadmap":[
    "...10 roadmap steps..."
  ],

  "courses":[
    {{
      "title":"",
      "platform":"",
      "url":""
    }}
  ],

  "projects":[
    {{
      "title":"",
      "description":"",
      "difficulty":"",
      "techStack":[
        ""
      ],
      "githubIdea":"",
      "githubRepositories":[
        {{
          "name":"",
          "url":""
        }}
      ]
    }}
  ]
}}

Rules:

- Return ONLY JSON.
- No markdown.
- No explanation.
- Exactly 10 roadmap steps.
- Exactly 10 courses.
- Exactly 10 projects.
- Every course must contain:
  title
  platform
  url
- Every project must contain:
  title
  description
  difficulty
  techStack
  githubIdea
  githubRepositories
- githubRepositories must contain exactly 3 repositories.
- Use real official course URLs.
- Use real GitHub repositories.
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
# ==========================================================
# COURSE RECOMMENDATION
# ==========================================================

def generate_course_recommendation(job_role, current_skills):

    prompt = f"""
You are an expert AI Career Mentor.

The user wants to become a {job_role}.

Current skills:
{current_skills}

Return ONLY valid JSON.

Structure:

{{
  "courses":[
    {{
      "title":"",
      "platform":"",
      "url":""
    }}
  ],

  "projects":[
    {{
      "title":"",
      "description":""
    }}
  ],

  "youtube":[
    {{
      "channel":"",
      "url":""
    }}
  ],

  "certifications":[
    {{
      "name":"",
      "provider":"",
      "url":""
    }}
  ]
}}

Rules:

- Return ONLY JSON.
- Exactly 5 courses.
- Exactly 5 projects.
- Exactly 5 YouTube channels.
- Exactly 5 certifications.
- Use official URLs wherever possible.
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

    return extract_json(text)
# ==========================================================
# INTERVIEW QUESTIONS
# ==========================================================

def generate_interview(job_role):

    prompt = f"""
You are a Senior Technical Interviewer.

Generate interview questions for a {job_role}.

Return ONLY valid JSON.

Structure:

{{
  "questions":[
    {{
      "id":1,
      "question":"..."
    }}
  ]
}}

Rules:
- Return ONLY JSON.
- No markdown.
- Generate exactly 20 interview questions.
- Questions should progress from beginner to advanced.
- Include theory, coding, debugging and scenario-based questions.
- Do NOT include answers.
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
    data = extract_json(text)

    return data["questions"]

# ==========================================================
# TEST CONNECTION
# ==========================================================
def test_connection():
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": "Reply with only the word OK."
                }
            ],
            temperature=0
        )

        return {
            "status": "success",
            "response": response.choices[0].message.content.strip()
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }