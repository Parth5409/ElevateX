# backend/app/main.py

# This is the main entry point for the FastAPI application.
# It initializes the app, configures CORS, sets up database lifecycle hooks, 
# and includes all API route controllers (Auth, Student, TPO, AI).

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import connect_to_mongo, close_mongo_connection
from app.api import auth, student, tpo, ai

app = FastAPI(title=settings.PROJECT_NAME)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database lifecycle hooks
@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(student.router, prefix="/api/student", tags=["Student"])
app.include_router(tpo.router, prefix="/api/tpo", tags=["TPO"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI Engine"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "Backend is running and connected to MongoDB"}
