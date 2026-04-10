# backend/app/core/database.py

# This file handles the asynchronous connection to MongoDB using the Motor driver.
# It provides a global database object that can be used throughout the application services.
# Key features:
# - Asynchronous connection management
# - Access to specific collections (Users, Profiles, Internships, Notifications)
# - Lifecycle hooks for connecting and disconnecting from the database

from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

class Database:
    client: AsyncIOMotorClient = None
    db = None

db = Database()

async def connect_to_mongo():
    db.client = AsyncIOMotorClient(settings.MONGO_URI)
    db.db = db.client[settings.DB_NAME]
    print(f"Connected to MongoDB at {settings.MONGO_URI}")

async def close_mongo_connection():
    db.client.close()
    print("Closed MongoDB connection")

# Helper to get collections
def get_collection(name: str):
    if db.db is None:
        raise RuntimeError(
            f"Database was not initialized before accessing collection '{name}'. "
            "Ensure connect_to_mongo() was called or the app startup event processed."
        )
    return db.db[name]
