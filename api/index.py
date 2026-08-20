from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pypdf import PdfReader
import os
from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel

load_dotenv()
my_api_key = os.getenv("GROQ_API_KEY")

client = Groq(api_key=my_api_key) if my_api_key else None
model = "openai/gpt-oss-120b"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_cached_resume_text = None

def read_pdf(file_path: Path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

def get_resume_text():
    global _cached_resume_text
    if _cached_resume_text is None:
        candidates = [
            Path(__file__).parent / "Sweta.pdf",
            Path(__file__).parent.parent / "backend" / "Sweta.pdf",
        ]
        for p in candidates:
            if p.exists():
                _cached_resume_text = read_pdf(p)
                break
        if not _cached_resume_text:
            _cached_resume_text = ""
    return _cached_resume_text

class ChatRequest(BaseModel):
    question: str

def ask_candidate(question: str, resume_text: str):
    if not client:
        return "GROQ_API_KEY is not configured. Please add it to Vercel Environment Variables."

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

    return f"AI service temporarily unavailable. Error: {last_err}"

@app.get("/")
@app.get("/api")
def home():
    return {"message": "HiremeAI Backend is Running!"}

@app.post("/chat")
@app.post("/api/chat")
def chat(request: ChatRequest):
    try:
        resume_text = get_resume_text()
        answer = ask_candidate(request.question, resume_text)
        return {"answer": answer}
    except Exception as e:
        return {"answer": f"Server error: {str(e)}"}
