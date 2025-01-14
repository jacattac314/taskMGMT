from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/api/status")
async def get_status():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
