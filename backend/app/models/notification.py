# backend/app/models/notification.py

# This file defines the Notification model for the "Suggestion Box" and AI-Mentor feedback loop.
# It stores invitation alerts and LangChain-generated skill-gap feedback for students.
# Key fields: type (Invite/Skill_Feedback), message, missing_skills, and action_items.

from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional

class Notification(BaseModel):
    student_id: str
    type: str # "Invite" or "Skill_Feedback"
    title: str
    message: str
    missing_skills: List[str] = []
    action_item: Optional[str] = None
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
