# backend/app/api/student.py

from fastapi import APIRouter, Depends, HTTPException
from app.models.profile import StudentProfile
from app.models.internship import Internship
from app.services.student_service import student_service
from app.api.deps import get_current_student

router = APIRouter()

@router.get("/profile")
async def get_profile(current_student: dict = Depends(get_current_student)):
    user_id = current_student["id"]
    profile = await student_service.get_student_profile(user_id)
    if not profile:
        # Return a blank skeleton for new users instead of 404
        return {
            "user_id": user_id,
            "full_name": "New Student", # Default, can be refined if we fetch from User collection
            "branch": "Computer Science Engineering",
            "cgpa": 0.0,
            "skills": [],
            "domain_interests": [],
            "projects": [],
            "placement_status": "Unplaced"
        }
    return profile

@router.put("/profile")
async def update_profile(profile: StudentProfile, current_student: dict = Depends(get_current_student)):
    user_id = current_student["id"]
    # Force the user_id from token to ensure they only update their own profile
    profile.user_id = user_id
    await student_service.update_student_profile(user_id, profile)
    updated_profile = await student_service.get_student_profile(user_id)
    return {"success": True, "updated_profile": updated_profile}

@router.get("/internships")
async def get_internships(current_student: dict = Depends(get_current_student)):
    user_id = current_student["id"]
    return await student_service.get_internships(user_id)

@router.post("/internships")
async def submit_internship(internship: Internship, current_student: dict = Depends(get_current_student)):
    user_id = current_student["id"]
    result = await student_service.submit_internship(user_id, internship)
    return {"success": True, "internship_id": result["internship_id"]}

@router.get("/notifications")
async def get_notifications(current_student: dict = Depends(get_current_student)):
    user_id = current_student["id"]
    return await student_service.get_notifications(user_id)
