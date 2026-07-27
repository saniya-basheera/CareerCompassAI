# CareerCompass AI

## Overview

CareerCompass AI is an AI-powered career guidance platform designed to help students and job seekers make informed career decisions. The application provides personalised career roadmaps, AI-generated learning recommendations, resume generation, interview preparation, job matching, and real-time job listings through an interactive and user-friendly interface.

The platform integrates Large Language Models (LLMs) to deliver intelligent, personalised career assistance while leveraging external APIs to provide live employment opportunities.

---

## Features

### Career Roadmap
- Generates personalised career roadmaps based on the selected career.
- Provides structured learning paths from beginner to advanced.
- Recommends relevant courses and project ideas.

### Course Recommendations
- Suggests learning resources based on the user's current skills.
- Recommends certifications and educational content.

### Interview Question Generator
- Generates technical and behavioural interview questions for different job roles.

### AI Mock Interview
- Simulates interview sessions.
- Evaluates candidate responses using AI.
- Provides:
  - Interview score
  - Constructive feedback
  - Suggested ideal answer

### Resume Builder
- Generates an ATS-friendly resume.
- Creates:
  - Professional summary
  - Experience descriptions
  - Project descriptions
  - Additional technical skills

### Job Match Analysis
- Evaluates how well a candidate's profile matches a target job role.
- Provides:
  - Match score
  - Strengths
  - Missing skills
  - Recommendations for improvement

### Real-Time Job Search
- Retrieves live job opportunities using the JSearch API.
- Displays:
  - Company
  - Job title
  - Location
  - Employment type
  - Direct application link

---

## Technology Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- FastAPI
- Python

### AI Integration
- Groq API
- Llama 3.3 70B Versatile

### External APIs
- JSearch API (RapidAPI)

---

## Project Structure

```
CareerCompassAI
│
├── backend
│   ├── main.py
│   ├── ai_service.py
│   ├── resume.py
│   ├── jobmatcher.py
│   ├── mock_interview.py
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/CareerCompassAI.git
cd CareerCompassAI
```

---

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate the virtual environment.

**Windows**

```bash
venv\Scripts\activate
```

Install the required packages.

```bash
pip install -r requirements.txt
```

Create a `.env` file.

```env
GROQ_API_KEY=your_groq_api_key
RAPIDAPI_KEY=your_rapidapi_key
```

Run the backend server.

```bash
uvicorn main:app --reload
```

The backend will be available at:

```
http://127.0.0.1:8000
```

API documentation is available at:

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

## API Integrations

This project integrates the following APIs:

- Groq API (Llama 3.3 70B Versatile) for AI-powered career guidance and interview evaluation.
- JSearch API (RapidAPI) for real-time job listings and application links.

---

## Future Enhancements

Potential improvements include:

- User authentication
- Resume PDF export
- Interview history tracking
- Saved job listings
- Personalised user dashboard
- Company recommendations
- Progress tracking and analytics

---

## Author

**Saniya-basheera**

---

## License

This project was developed for educational and academic purposes.