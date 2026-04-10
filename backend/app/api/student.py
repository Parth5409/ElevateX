# backend/app/api/student.py

# This file contains the API routes for student-specific operations.
# It handles requests for profile management, internship submissions, and notifications.
# Key endpoints:
# - GET /profile: Fetch student's academic and tech data
# - POST /profile: Update profile details for AI analysis
# - POST /internships: Submit a new internship log/certificate
# - GET /notifications: Fetch AI-Mentor suggestions and invites

from fastapi import APIRouter
from app.models.profile import StudentProfile
from app.models.internship import Internship

from fastapi import APIRouter, Depends, HTTPException
from app.models.profile import StudentProfile
from app.models.internship import Internship
from app.services.student_service import student_service

router = APIRouter()

# In a real app, user_id should come from a dependency like `get_current_user`
# using the Auth service. For this hackathon scope, we'll pass it as query/header parameter
# to keep things straightforward while demonstrating backend logic.

@router.get("/profile/{user_id}")
async def get_profile(user_id: str):
    profile = await student_service.get_student_profile(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.post("/profile/{user_id}")
async def update_profile(user_id: str, profile: StudentProfile):
    # Ensure the URL user_id matches the submitted profile data
    if user_id != profile.user_id:
        raise HTTPException(status_code=400, detail="User ID mismatch")
    return await student_service.update_student_profile(user_id, profile)

@router.get("/notifications/{user_id}")
async def get_notifications(user_id: str):
    return await student_service.get_notifications(user_id)

