from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pypdf import PdfReader
import json
import os
import time
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel

load_dotenv()
my_api_key=os.getenv("GROQ_API_KEY")
if not my_api_key:
    raise ValueError("API key kothai??")

client = Groq(api_key=my_api_key)
model="openai/gpt-oss-120b"



app=FastAPI()

# Allow requests from the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://127.0.0.1:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cache raw resume text once (avoids re-reading PDF on every request)
_cached_resume_text = None

def get_resume_text():
    global _cached_resume_text
    if _cached_resume_text is None:
        _cached_resume_text = read_pdf(Path("Sweta.pdf"))
    return _cached_resume_text

#parse resume
class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None
    skills_used: list[str] = []

class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    total_experience_years: float | None = None
    skills: list[str] = []
    experiences: list[Experience] = []
    education: list[str] = []
    projects: list[str] = []
    certifications: list[str] = []
resume_schema=Resume.model_json_schema()

class ChatRequest(BaseModel):
    question: str

def ask_candidate(question: str, resume_text: str):
    system_prompt = f"""
    You are an AI assistant representing a job candidate named Sweta Mondal.
    Below is her complete resume. Use ALL the details to answer questions accurately.

    --- RESUME START ---
    {resume_text}
    --- RESUME END ---

    Rules:
    1. Answer only using the resume information above.
    2. Never hallucinate or add information not present in the resume.
    3. If information is not in the resume, say "I don't have that information."
    4. Be professional, concise, and helpful.
    5. When describing projects, include tech stack, features, and key achievements.
    """
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ]
    )
    return response.choices[0].message.content

def parse_resume(resume_text):
    system_prompt=f"""
    You are an expert resume parser.

    Extract information from the resume based on its meaning,
    not only based on exact section headings.

    Different resumes may use different headings.

    For example:
    - Experience
    - Professional Experience
    - Work History
    - Employment
    - Internships

    These may all contain relevant experience.

    Skills may also appear in the skills section, work experience,
    internships or projects.

    Return ONLY valid JSON matching this schema:

    {resume_schema}

    Important rules:

    1. Do not invent information.
    2. If a value is not available, return null.
    3. If a list has no information, return an empty list.
    4. Include internships inside experiences.
    5. Extract skills mentioned across the entire resume.
    """
    user_prompt=f"""
    Parse the following resume:
    {resume_text}
    """
    message_system={
        "role": "system",
        "content": system_prompt
    }
    message_user={
        "role": "user",
        "content": user_prompt
    }
    messages=[message_system, message_user]
    response_format={
        "type": "json_object"
    }
    response=client.chat.completions.create(model=model, messages=messages, response_format=response_format)
    raw_output=response.choices[0].message.content
    data=json.loads(raw_output)
    return Resume(**data)


#pdf extraction
def read_pdf(file_path: Path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

@app.get("/")
def home():
    return {
        "message" : "HiremeAI is Running!"
    }

@app.post("/chat")
def chat(request: ChatRequest):
    resume_text = get_resume_text()
    answer = ask_candidate(request.question, resume_text)
    return {
        "answer": answer
    }
