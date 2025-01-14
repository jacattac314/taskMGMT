from fastapi import FastAPI
from .tasks import router as tasks_router

app = FastAPI()

@app.get("/api/status")
async def get_status():
    return {"status": "ok"}

app.include_router(tasks_router)

# ...existing code...
