import os
import subprocess
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routers import resume, tailor, export

app = FastAPI(title="Resume Tailor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router, prefix="/api/resume", tags=["resume"])
app.include_router(tailor.router, prefix="/api/tailor", tags=["tailor"])
app.include_router(export.router, prefix="/api/export", tags=["export"])

@app.on_event("startup")
async def startup_event():
    # Check if agy is installed
    try:
        subprocess.run(["agy", "--version"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except (FileNotFoundError, subprocess.CalledProcessError):
        print("WARNING: agy CLI not found or failed to run. Ensure agy is installed and in PATH.")

@app.get("/api/health")
def health():
    return {"status": "ok"}
