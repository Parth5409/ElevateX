# backend/app/api/ai.py

# This file contains the API routes for the core AI features.
# It interfaces with LangChain to perform JD matching and generate feedback.
# Key endpoints:
# - POST /match-jd: Analyzes a JD and returns ranked student matches
# - POST /generate-feedback: Generates skill-gap advice for non-selected students

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any

from app.services.ai_service import ai_service
from app.services.student_service import student_service

router = APIRouter()

class JDMapperRequest(BaseModel):
    jdText: str

class FeedbackRequest(BaseModel):
    jdText: str
    studentId: str

@router.post("/match-jd")
async def match_job_description(request: JDMapperRequest):
    return await ai_service.match_jd(request.jdText)

@router.post("/generate-feedback")
async def generate_skill_feedback(request: FeedbackRequest):
    profile = await student_service.get_student_profile(request.studentId)
    if not profile:
        return {"success": False, "detail": "Student not found"}
        
    result = await ai_service.generate_feedback(profile, request.jdText)
    # Ensure standard response
    return {"success": True, "feedback": result.get("feedback"), "notification_id": "gen_feedback_id"}
