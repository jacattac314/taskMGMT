from fastapi import FastAPI, APIRouter

app = FastAPI()
router = APIRouter()

@router.get("/api/tasks")
async def get_tasks():
    return [{"id": 1, "name": "Task 1"}]

app.include_router(router)