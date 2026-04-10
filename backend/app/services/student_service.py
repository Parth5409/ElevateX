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

    async def submit_internship(self, user_id: str, internship: Internship):
        internships_collection = get_collection("internships")
        internship_dict = internship.model_dump()
        internship_dict["student_id"] = user_id
        
        result = await internships_collection.insert_one(internship_dict)
        return {"status": "success", "internship_id": str(result.inserted_id)}

    async def get_internships(self, user_id: str):
        internships_col = get_collection("internships")
        cursor = internships_col.find({"student_id": user_id})
        internships = await cursor.to_list(length=100)
        for i in internships:
            i["_id"] = str(i["_id"])
        return internships

student_service = StudentService()
