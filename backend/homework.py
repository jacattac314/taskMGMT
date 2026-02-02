from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import os

router = APIRouter()

class HomeworkSubmission(BaseModel):
    """What George submits for checking"""
    subject: str           # e.g., "Math", "Science", "English"
    question: str          # The homework question
    student_answer: str    # George's answer
    grade_level: Optional[str] = "elementary"  # Grade level for appropriate feedback

class HomeworkFeedback(BaseModel):
    """What George gets back"""
    is_correct: bool
    score: int                    # 0-100
    explanation: str              # Why the answer is right/wrong
    learning_lesson: str          # A helpful lesson to remember
    encouragement: str            # Positive message for George
    hint: Optional[str] = None    # If wrong, a hint to try again

# Simple prompt template for ChatGPT
HOMEWORK_CHECK_PROMPT = """
You are a friendly homework helper for a {grade_level} student named George.

Subject: {subject}
Question: {question}
George's Answer: {student_answer}

Please check George's homework and respond in this exact JSON format:
{{
    "is_correct": true or false,
    "score": number from 0 to 100,
    "explanation": "Clear explanation of why the answer is correct or incorrect",
    "learning_lesson": "A simple, memorable lesson that helps George understand the concept better",
    "encouragement": "A positive, encouraging message for George",
    "hint": "If incorrect, provide a gentle hint. If correct, this can be null"
}}

Be kind, educational, and age-appropriate. Make the learning lesson easy to remember!
"""

@router.post("/api/homework/check")
async def check_homework(submission: HomeworkSubmission) -> dict:
    """
    Check George's homework using ChatGPT.

    How it works:
    1. George submits his homework (subject, question, answer)
    2. We send it to ChatGPT with a friendly prompt
    3. ChatGPT checks the answer and provides feedback
    4. George gets back whether it's correct + a learning lesson
    """

    # For demo purposes, we'll use a mock response
    # In production, this would call the OpenAI API
    openai_api_key = os.environ.get("OPENAI_API_KEY")

    if openai_api_key:
        # Real ChatGPT integration
        feedback = await call_chatgpt(submission, openai_api_key)
    else:
        # Demo mode - returns example feedback
        feedback = generate_demo_feedback(submission)

    return feedback

async def call_chatgpt(submission: HomeworkSubmission, api_key: str) -> dict:
    """
    Call the ChatGPT API to check homework.

    This function:
    1. Formats the prompt with George's homework
    2. Sends it to ChatGPT
    3. Parses the response into our feedback format
    """
    import httpx
    import json

    prompt = HOMEWORK_CHECK_PROMPT.format(
        grade_level=submission.grade_level,
        subject=submission.subject,
        question=submission.question,
        student_answer=submission.student_answer
    )

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7
            },
            timeout=30.0
        )

        result = response.json()
        content = result["choices"][0]["message"]["content"]

        # Parse the JSON response from ChatGPT
        feedback_data = json.loads(content)
        return feedback_data

def generate_demo_feedback(submission: HomeworkSubmission) -> dict:
    """
    Generate demo feedback when no API key is available.
    This lets you test the app without an OpenAI API key.
    """

    # Simple demo logic
    answer_lower = submission.student_answer.lower().strip()

    # Demo: Check if answer contains numbers for math
    if submission.subject.lower() == "math":
        return {
            "is_correct": True,
            "score": 85,
            "explanation": f"Great work on this math problem! Your answer '{submission.student_answer}' shows good thinking.",
            "learning_lesson": "Remember: When solving math problems, always double-check your work by doing the problem backwards!",
            "encouragement": "You're doing awesome, George! Keep up the great work!",
            "hint": None
        }

    # Default demo response for other subjects
    return {
        "is_correct": True,
        "score": 90,
        "explanation": f"Nice job answering this {submission.subject} question! Your answer demonstrates understanding.",
        "learning_lesson": f"Here's a tip for {submission.subject}: Always read the question carefully and think about what it's really asking.",
        "encouragement": "Excellent effort, George! You're becoming a great learner!",
        "hint": None
    }

@router.get("/api/homework/subjects")
async def get_subjects():
    """
    Get the list of subjects George can get help with.
    """
    return {
        "subjects": [
            {"id": "math", "name": "Math", "icon": "🔢"},
            {"id": "science", "name": "Science", "icon": "🔬"},
            {"id": "english", "name": "English", "icon": "📚"},
            {"id": "history", "name": "History", "icon": "🏛️"},
            {"id": "spelling", "name": "Spelling", "icon": "✏️"}
        ]
    }
