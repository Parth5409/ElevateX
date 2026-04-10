# backend/app/api/ai.py

# This file contains the API routes for the core AI features.
# It interfaces with LangChain to perform JD matching and generate feedback.
# Key endpoints:
# - POST /match-jd: Analyzes a JD and returns ranked student matches
# - POST /generate-feedback: Generates skill-gap advice for non-selected students

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class JDMapperRequest(BaseModel):
    jd_text: str

@router.post("/match-jd")
async def match_job_description(request: JDMapperRequest):
    # This will call ai_service.match_jd
    pass

@router.post("/generate-feedback")
async def generate_skill_feedback():
    # This will call ai_service.generate_feedback
    pass
