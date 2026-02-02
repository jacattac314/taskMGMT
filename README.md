# George's Homework Helper

A friendly app that checks George's homework using ChatGPT and provides helpful learning lessons!

## How It Works (Easy Explanation)

```
1. George types in his homework question
2. George types in his answer
3. Click "Check My Homework!"
4. ChatGPT looks at the answer
5. George gets feedback + a learning lesson!
```

## What George Gets Back

- **Is it correct?** - A clear yes or no with celebration!
- **Score** - Points from 0-100
- **Explanation** - Why the answer is right or wrong
- **Learning Lesson** - A helpful tip to remember
- **Hint** - If wrong, a gentle hint to try again
- **Encouragement** - A positive message!

## Project Structure

```
taskMGMT/
├── backend/
│   ├── main.py           # Server setup
│   ├── homework.py       # Homework checking API (uses ChatGPT)
│   └── tasks.py          # Task management
├── frontend/
│   ├── HomeworkChecker.jsx   # Main homework form
│   ├── LearningLesson.jsx    # Shows feedback & lessons
│   ├── index.html            # Web page
│   ├── index.js              # App entry point
│   └── style.css             # Pretty colors!
└── requirements.txt          # Python packages needed
```

## Setup

1. Install Python packages:
    ```bash
    pip install -r requirements.txt
    ```

2. (Optional) Set your OpenAI API key for real ChatGPT:
    ```bash
    export OPENAI_API_KEY="your-key-here"
    ```
    Without the key, the app runs in demo mode with sample feedback.

3. Start the server:
    ```bash
    uvicorn backend.main:app --reload
    ```

4. For the frontend, use a React bundler like Vite:
    ```bash
    cd frontend
    npm install react react-dom
    npm run dev
    ```

## API Endpoints

### Check Homework
```
POST /api/homework/check

Body:
{
    "subject": "math",
    "question": "What is 5 + 3?",
    "student_answer": "8",
    "grade_level": "elementary"
}

Response:
{
    "is_correct": true,
    "score": 100,
    "explanation": "Great job! 5 + 3 equals 8.",
    "learning_lesson": "When adding, count up from the bigger number!",
    "encouragement": "You're a math star, George!",
    "hint": null
}
```

### Get Subjects
```
GET /api/homework/subjects

Response:
{
    "subjects": [
        {"id": "math", "name": "Math", "icon": "..."},
        {"id": "science", "name": "Science", "icon": "..."},
        ...
    ]
}
```

## Subjects Available

- Math
- Science
- English
- History
- Spelling

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.