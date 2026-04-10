# backend/app/services/student_service.py

# This service manages student profile data and internship log operations.
# It acts as the bridge between the API routes and the MongoDB collections.

from app.core.database import get_collection
from app.models.profile import StudentProfile
from app.models.internship import Internship
from bson import ObjectId

class StudentService:
    async def get_student_profile(self, user_id: str):
        profiles_collection = get_collection("profiles")
        profile = await profiles_collection.find_one({"user_id": user_id})
        if profile:
            profile["_id"] = str(profile["_id"])
        return profile

    async def update_student_profile(self, user_id: str, profile_data: StudentProfile):
        profiles_collection = get_collection("profiles")
        profile_dict = profile_data.model_dump()
        
        result = await profiles_collection.update_one(
            {"user_id": user_id},
            {"$set": profile_dict},
            upsert=True
        )
        return {"status": "success", "user_id": user_id}
        
    async def get_notifications(self, user_id: str):
        notifications_collection = get_collection("notifications")
        cursor = notifications_collection.find({"student_id": user_id})
        notifications = await cursor.to_list(length=100)
        for n in notifications:
            n["_id"] = str(n["_id"])
        return notifications

student_service = StudentService()

# ---

# backend/app/services/tpo_service.py

# This service handles administrative tasks for the TPO faculty.
# It includes student analytics and internship approval logic.

class TPOService:
    async def get_analytics_summary(self):
        pass

    async def approve_internship(self, internship_id, status):
        pass

tpo_service = TPOService()
