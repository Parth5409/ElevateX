import asyncio
import sys
import os
from datetime import datetime, timezone

# Add backend directory to sys.path to resolve 'app' module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import connect_to_mongo, close_mongo_connection, get_collection
from app.services.auth_service import pwd_context

async def seed_data():
    await connect_to_mongo()
    
    users_col = get_collection("users")
    profiles_col = get_collection("profiles")
    internships_col = get_collection("internships")

    print("Clearing existing mock data...")
    await users_col.delete_many({})
    await profiles_col.delete_many({})
    await internships_col.delete_many({})

    print("Seeding TPO user...")
    tpo_user = {
        "email": "tpo@aithon.edu",
        "role": "tpo",
        "password_hash": pwd_context.hash("tpopassword123"),
        "created_at": datetime.now(timezone.utc)
    }
    tpo_result = await users_col.insert_one(tpo_user)

    print("Seeding Student users and profiles...")
    students = [
        {
            "email": "jane.doe@example.com",
            "password": "password123",
            "profile": {
                "full_name": "Jane Doe",
                "branch": "Computer Science",
                "cgpa": 9.2,
                "skills": ["Python", "FastAPI", "React", "Docker"],
                "domain_interests": ["Full Stack Development", "Cloud Computing"],
                "projects": [
                    {
                        "title": "E-Commerce Backend",
                        "tech_stack": ["FastAPI", "MongoDB", "Stripe"],
                        "description": "Scalable REST API for an e-commerce platform.",
                        "link": "https://github.com/janedoe/ecommerce"
                    }
                ],
                "placement_status": "Placed"
            },
            "internship": {
                "company_name": "Tech Corp",
                "role": "Backend Intern",
                "duration_months": 6,
                "status": "Approved"
            }
        },
        {
            "email": "john.smith@example.com",
            "password": "password123",
            "profile": {
                "full_name": "John Smith",
                "branch": "Information Technology",
                "cgpa": 8.5,
                "skills": ["JavaScript", "Node.js", "Express", "MongoDB"],
                "domain_interests": ["Web Development", "UI/UX"],
                "projects": [
                    {
                        "title": "Chat Application",
                        "tech_stack": ["Node.js", "Socket.io", "React"],
                        "description": "Real-time chat application.",
                        "link": "https://github.com/johnsmith/chat-app"
                    }
                ],
                "placement_status": "Unplaced"
            },
            "internship": {
                "company_name": "Startup Inc",
                "role": "Frontend Intern",
                "duration_months": 3,
                "status": "Pending"
            }
        },
        {
            "email": "alice.johnson@example.com",
            "password": "password123",
            "profile": {
                "full_name": "Alice Johnson",
                "branch": "Electronics",
                "cgpa": 9.0,
                "skills": ["C++", "Embedded Systems", "IoT"],
                "domain_interests": ["Internet of Things", "Hardware"],
                "projects": [
                    {
                        "title": "Smart Home Hub",
                        "tech_stack": ["C++", "Arduino", "MQTT"],
                        "description": "Central hub for monitoring IoT devices.",
                        "link": None
                    }
                ],
                "placement_status": "Unplaced"
            },
            "internship": None
        }
    ]

    for student_data in students:
        # Create user
        user = {
            "email": student_data["email"],
            "role": "student",
            "password_hash": pwd_context.hash(student_data["password"]),
            "created_at": datetime.now(timezone.utc)
        }
        user_result = await users_col.insert_one(user)
        user_id = str(user_result.inserted_id)

        # Create profile
        profile = student_data["profile"]
        profile["user_id"] = user_id
        profile["updated_at"] = datetime.now(timezone.utc)
        await profiles_col.insert_one(profile)

        # Create internship if exists
        internship_data = student_data.get("internship")
        if internship_data:
            internship_data["student_id"] = user_id
            internship_data["submitted_at"] = datetime.now(timezone.utc)
            await internships_col.insert_one(internship_data)

    print("Seed complete! 1 TPO and 3 Students added.")
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(seed_data())
