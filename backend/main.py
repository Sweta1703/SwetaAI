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
my_api_key = os.getenv("GROQ_API_KEY")

client = Groq(api_key=my_api_key) if my_api_key else None
model = "openai/gpt-oss-120b"

app = FastAPI()

# Allow requests from any origin (local & deployed frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cache raw resume text once (avoids re-reading PDF on every request)
_cached_resume_text = None

def get_resume_text():
    global _cached_resume_text
    if _cached_resume_text is None:
        pdf_path = Path(__file__).parent / "Sweta.pdf"
        if pdf_path.exists():
            _cached_resume_text = read_pdf(pdf_path)
        else:
            _cached_resume_text = ""
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
    if not client:
        return "GROQ_API_KEY is not configured in the server environment variables."
    
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
    
    models_to_try = [model, "llama-3.1-8b-instant", "llama3-70b-8192", "llama3-8b-8192"]
    last_err = None

    for m in models_to_try:
        try:
            response = client.chat.completions.create(
                model=m,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": question}
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            last_err = str(e)
            continue
            
    return f"AI service temporarily unavailable: {last_err}"

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
