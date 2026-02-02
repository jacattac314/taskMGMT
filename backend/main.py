from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .tasks import router as tasks_router
from .homework import router as homework_router

app = FastAPI(
    title="George's Homework Helper",
    description="A friendly app that checks homework and provides learning lessons"
)

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/status")
async def get_status():
    return {"status": "ok", "app": "George's Homework Helper"}

app.include_router(tasks_router)
app.include_router(homework_router)

# ...existing code...
