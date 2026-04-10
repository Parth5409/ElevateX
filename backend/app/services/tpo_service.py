# backend/app/services/tpo_service.py

# This service handles administrative tasks for the TPO faculty.
# It includes student analytics and internship approval logic.

from app.core.database import get_collection
from bson import ObjectId
from typing import Dict, Any

class TPOService:
    async def get_analytics_summary(self) -> Dict[str, Any]:
        profiles_col = get_collection("profiles")
        
        # Total Students
        total_students = await profiles_col.count_documents({})

        # Avg CGPA
        cgpa_pipeline = [{"$group": {"_id": None, "avg_cgpa": {"$avg": "$cgpa"}}}]
        cgpa_res = await profiles_col.aggregate(cgpa_pipeline).to_list(1)
        avg_cgpa = round(cgpa_res[0]["avg_cgpa"], 2) if cgpa_res else 0.0

        # Aggregate Placed vs Unplaced
        pipeline = [
            {"$group": {"_id": "$placement_status", "count": {"$sum": 1}}}
        ]
        status_counts = await profiles_col.aggregate(pipeline).to_list(length=10)
        placement_data = [
            {
                "name": item["_id"] or "Unknown", 
                "value": item["count"], 
                "color": "#00C49F" if item["_id"] == "Placed" else "#FF8042"
            } 
            for item in status_counts
        ]
        
        # Aggregate Top Skills
        skills_pipeline = [
            {"$unwind": "$skills"},
            {"$group": {"_id": "$skills", "score": {"$sum": 1}}},
            {"$sort": {"score": -1}},
            {"$limit": 5}
        ]
        top_skills = await profiles_col.aggregate(skills_pipeline).to_list(length=5)
        skills_distribution = [{"name": item["_id"], "score": item["score"]} for item in top_skills]
        
        return {
            "total_students": total_students,
            "avg_cgpa": avg_cgpa,
            "active_drives": 3,
            "avg_package_lpa": 12.0,
            "placement_data": placement_data,
            "skills_distribution": skills_distribution
        }

    async def approve_internship(self, internship_id: str, status: str):
        internships_col = get_collection("internships")
        result = await internships_col.update_one(
            {"_id": ObjectId(internship_id)},
            {"$set": {"status": status}}
        )
        return result.modified_count > 0
        
    async def list_students(self, filters: dict = None):
        profiles_col = get_collection("profiles")
        query = {}
        if filters:
            if "status" in filters:
                query["placement_status"] = filters["status"]
            if "branch" in filters:
                query["branch"] = filters["branch"]
            if "cgpa_gt" in filters:
                query["cgpa"] = {"$gte": float(filters["cgpa_gt"])}
        
        cursor = profiles_col.find(query)
        students = await cursor.to_list(length=100)
        for student in students:
            student["_id"] = str(student["_id"])
        return students

    async def get_internships(self, status: str = None):
        internships_col = get_collection("internships")
        query = {}
        if status:
            query["status"] = status
        cursor = internships_col.find(query)
        internships = await cursor.to_list(length=100)
        for i in internships:
            i["_id"] = str(i["_id"])
        return internships

    async def create_invite(self, student_id: str, title: str, message: str):
        from datetime import datetime
        notifications_col = get_collection("notifications")
        notification = {
            "student_id": student_id,
            "type": "Invite",
            "title": title,
            "message": message,
            "missing_skills": [],
            "action_item": "",
            "is_read": False,
            "date": datetime.utcnow()
        }
        result = await notifications_col.insert_one(notification)
        return {"status": "success", "notification_id": str(result.inserted_id)}

tpo_service = TPOService()
