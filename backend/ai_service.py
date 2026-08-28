import os
import json
import re

from dotenv import load_dotenv
from groq import Groq


# ==========================================================
# GROQ SETUP
# ==========================================================

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MODEL_NAME = "openai/gpt-oss-120b"


# ==========================================================
# HELPER - EXTRACT JSON
# ==========================================================

def extract_json(text: str):
    """
    Extract and parse JSON from a Groq response.
    Handles plain JSON and JSON wrapped in markdown fences.
    """

    if not text:
        raise ValueError("Groq returned an empty response.")

    text = text.strip()

    # Remove markdown code fences
    text = re.sub(r"^```json\s*", "", text, flags=re.IGNORECASE)
    text = re.sub(r"^```\s*", "", text)
    text = re.sub(r"\s*```$", "", text)

    text = text.strip()

    # First try the complete response directly
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # If extra text exists, find the JSON object
    start = text.find("{")
    end = text.rfind("}")

    if start != -1 and end != -1 and end > start:
        json_text = text[start:end + 1]

        try:
            return json.loads(json_text)
        except json.JSONDecodeError as e:
            raise ValueError(
                f"Invalid JSON returned by Groq: {e}"
            ) from e

    raise ValueError("No valid JSON object found in Groq response.")


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
  "career": "{job_role}",
  "roadmap": [
    "...10 roadmap steps..."
  ],
  "courses": [
    {{
      "title": "",
      "platform": "",
      "url": ""
    }}
  ],
  "projects": [
    {{
      "title": "",
      "description": "",
      "difficulty": "",
      "techStack": [
        ""
      ],
      "githubIdea": "",
      "githubRepositories": [
        {{
          "name": "",
          "url": ""
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
- Make the roadmap practical for a student.
- Make the roadmap progress from beginner to advanced.
"""

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            response_format={
                "type": "json_object"
            }
        )

        text = response.choices[0].message.content

        print("ROADMAP RESPONSE RECEIVED")

        data = extract_json(text)

        print("ROADMAP JSON PARSED SUCCESSFULLY")

        return data

    except Exception as e:

        print("ROADMAP ERROR:", str(e))

        if "response" in locals():
            try:
                print(
                    "RAW ROADMAP RESPONSE:",
                    response.choices[0].message.content
                )
            except Exception:
                pass

        raise


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
  "courses": [
    {{
      "title": "",
      "platform": "",
      "url": ""
    }}
  ],
  "projects": [
    {{
      "title": "",
      "description": ""
    }}
  ],
  "youtube": [
    {{
      "channel": "",
      "url": ""
    }}
  ],
  "certifications": [
    {{
      "name": "",
      "provider": "",
      "url": ""
    }}
  ]
}}

Rules:

- Return ONLY JSON.
- No markdown.
- No explanation.
- Exactly 5 courses.
- Exactly 5 projects.
- Exactly 5 YouTube channels.
- Exactly 5 certifications.
- Use official URLs wherever possible.
"""

    try:

        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            response_format={
                "type": "json_object"
            }
        )

        text = response.choices[0].message.content

        return extract_json(text)

    except Exception as e:

        print("COURSE RECOMMENDATION ERROR:", str(e))

        if "response" in locals():
            try:
                print(
                    "RAW COURSE RESPONSE:",
                    response.choices[0].message.content
                )
            except Exception:
                pass

        raise


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
  "questions": [
    {{
      "id": 1,
      "question": "..."
    }}
  ]
}}

Rules:

- Return ONLY JSON.
- No markdown.
- No explanation.
- Generate exactly 20 interview questions.
- Questions should progress from beginner to advanced.
- Include theory questions.
- Include coding questions.
- Include debugging questions.
- Include scenario-based questions.
- Do NOT include answers.
"""

    try:

        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            response_format={
                "type": "json_object"
            }
        )

        text = response.choices[0].message.content

        data = extract_json(text)

        questions = data.get("questions", [])

        if not isinstance(questions, list):
            raise ValueError(
                "Interview response does not contain a valid questions list."
            )

        return questions

    except Exception as e:

        print("INTERVIEW ERROR:", str(e))

        if "response" in locals():
            try:
                print(
                    "RAW INTERVIEW RESPONSE:",
                    response.choices[0].message.content
                )
            except Exception:
                pass

        raise


# ==========================================================
# TEST CONNECTION
# ==========================================================

def test_connection():

    try:

        response = client.chat.completions.create(
            model=MODEL_NAME,
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