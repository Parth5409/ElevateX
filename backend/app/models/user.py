# backend/app/models/user.py

# This file defines the User model for authentication and role-based access control.
# It uses Pydantic to validate data and provides schemas for:
# - User Creation (Base)
# - Database storage (with password hashes)
# - API Response (excluding sensitive data like passwords)

from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    role: str # "student" or "tpo"

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserOut(UserBase):
    id: str = Field(alias="_id")
    created_at: datetime
