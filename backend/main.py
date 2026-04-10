import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from supabase import create_client, Client
from typing import List, Optional

# Load environment variables
load_dotenv()

app = FastAPI(title="Gemini Hackathon API")

# Configure CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

class HealthResponse(BaseModel):
    status: str
    supabase_connected: bool

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return {
        "status": "ok",
        "supabase_connected": supabase is not None
    }

# Import routes
from routes import ai_handler
app.include_router(ai_handler.router, prefix="/api/ai", tags=["AI"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
