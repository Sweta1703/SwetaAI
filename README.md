# HireMeAI

HireMeAI is a personal AI chatbot and portfolio project built to represent **Sweta Mondal** as a job candidate. It lets recruiters, hiring managers, or visitors ask questions about her skills, projects, internship experience, education, and achievements through a chat interface instead of reading everything manually from a resume.

The project combines a **React + Vite frontend** with a **FastAPI backend** and uses the **Groq API** to answer questions based only on resume content.

## What This Project Does

- Turns a resume into an interactive AI assistant
- Answers recruiter-style questions like:
  - "What is her tech stack?"
  - "Tell me about her internship experience."
  - "Why should I hire Sweta?"
- Shows portfolio sections for projects, skills, experience, education, achievements, and contact details
- Uses a resume PDF as the chatbot's main knowledge source
- Restricts answers to resume-based information to reduce hallucination

## Features

- AI recruiter-style chatbot
- Resume-based question answering
- FastAPI backend with Groq integration
- React frontend with a modern portfolio layout
- Suggested prompts for quick interaction
- Recruiter shortcut buttons for key sections
- Resume text caching on the backend for faster responses

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- FastAPI
- Pydantic
- Groq Python SDK
- PyPDF
- Python Dotenv

## Project Structure

```text
hiremeai/
|- backend/
|  |- main.py
|  |- Sweta.pdf
|- frontend/
|  |- src/
|  |  |- components/
|  |  |- data/
|  |- package.json
|  |- vite.config.js
|- main.py
|- pyproject.toml
|- README.md
```

## How It Works

1. The backend reads the resume PDF.
2. Resume text is extracted using `pypdf`.
3. A system prompt tells the model to answer only from the resume.
4. The frontend sends user questions to the backend at `/api/chat`.
5. The backend calls Groq and returns the final answer to the UI.

## API

### `GET /`

Health check endpoint.

Example response:

```json
{
  "message": "HiremeAI is Running!"
}
```

### `POST /chat`

Sends a question to the AI assistant.

Request body:

```json
{
  "question": "What are Sweta's strongest skills?"
}
```

Response body:

```json
{
  "answer": "..."
}
```

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd hiremeai
```

### 2. Set up the backend

Create a `.env` file inside the `backend` folder:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Install Python dependencies:

```bash
uv sync
```

Or, if you prefer `pip`:

```bash
pip install fastapi groq pydantic pypdf python-docx python-dotenv uvicorn
```

Start the backend from the `backend` folder:

```bash
cd backend
uvicorn main:app --reload --port 8000
```

Note: run the backend from `backend/` because the app reads `Sweta.pdf` from the current folder.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5000
```

The Vite dev server proxies `/api` requests to:

```text
http://localhost:8000
```

## Environment Variables

The backend currently requires:

```env
GROQ_API_KEY=your_groq_api_key_here
```

## Current Model

The backend is configured to use:

```text
openai/gpt-oss-120b
```

through the Groq client.

## Example Questions

- What are Sweta's strongest skills?
- Tell me about her best project.
- What internship experience does she have?
- What is her tech stack?
- Why should I hire Sweta?

## Why This Project Is Useful

This project makes a personal portfolio more interactive and memorable. Instead of asking recruiters to scan a PDF, it gives them a conversational way to evaluate the candidate quickly. It is especially useful as a showcase project for:

- full-stack development
- LLM integration
- prompt engineering
- resume parsing and document-based AI workflows
- developer portfolio presentation

## Limitations

- The chatbot depends on the resume content, so missing resume details cannot be answered.
- The backend currently reads a fixed file: `backend/Sweta.pdf`.
- If the backend is started from the wrong folder, PDF loading may fail.
- Some frontend text shows encoding issues and could be cleaned up later.
- There is no persistent chat history or authentication yet.

## Future Improvements

- Add support for uploading different resumes
- Store parsed resume data in structured JSON
- Add streaming responses for a smoother chat experience
- Add chat history
- Improve prompt design for more natural recruiter answers
- Deploy frontend and backend publicly
- Add tests for backend endpoints

## Screenshots

You can add screenshots here later:

```md
![Homepage](./path-to-image.png)
![Chatbot Demo](./path-to-image.png)
```

## Author

**Sweta Mondal**

- GitHub: [Sweta1703](https://github.com/Sweta1703)
- LinkedIn: [mondalsweta](https://www.linkedin.com/in/mondalsweta/)
- Email: mondalsweta03@gmail.com

## License

This project is for personal portfolio and learning purposes. You can add an official license here if you want to make reuse terms explicit.
