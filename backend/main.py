from jobs import get_jobs
from jobmatcher import generate_job_match
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from mock_interview import evaluate_answer

from ai_service import (
    generate_roadmap,
    generate_course_recommendation,
    generate_interview,
)
from resume import generate_resume

app = FastAPI(title="CareerCompass AI API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Models
# -----------------------------
class CareerRequest(BaseModel):
    jobRole: str

class CourseRequest(BaseModel):
    jobRole: str
    currentSkills: str
class ResumeRequest(BaseModel):
    fullName: str
    email: str
    phone: str
    location: str
    linkedin: str
    github: str
    jobRole: str

    degree: str
    college: str
    graduationYear: str
    cgpa: str

    skills: List[str]

    company: str
    role: str
    employmentType: str
    duration: str

    projectTitle: str
    projectTech: str

class JobMatchRequest(BaseModel):
    jobRole: str
    skills: str
    experience: str

class JobSearchRequest(BaseModel):
    jobRole: str
    location: str = "India"

class MockInterviewRequest(BaseModel):
    jobRole: str
    question: str
    answer: str
# -----------------------------
# Routes
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "CareerCompass AI Backend is Running!"
    }

@app.post("/generate-roadmap")
def roadmap(data: CareerRequest):
    return generate_roadmap(data.jobRole)


@app.post("/generate-interview")
def interview(data: CareerRequest):
    return generate_interview(data.jobRole)

@app.post("/course-recommendation")
def course_recommendation(data: CourseRequest):
    return generate_course_recommendation(
        data.jobRole,
        data.currentSkills
    )

@app.post("/generate-resume")
def resume(data: ResumeRequest):
    return generate_resume(data.model_dump())

@app.post("/job-match")
def job_match(data: JobMatchRequest):
    return generate_job_match(
        data.jobRole,
        data.skills,
        data.experience
    )
@app.post("/job-openings")
def job_openings(data: JobSearchRequest):
    return get_jobs(
        data.jobRole,
        data.location
    )
@app.post("/mock-interview")
def mock_interview(data: MockInterviewRequest):
    return evaluate_answer(
        data.jobRole,
        data.question,
        data.answer
    )