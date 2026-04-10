# backend/app/models/profile.py

# This file defines the StudentProfile model, which stores the detailed data used by the AI Matchmaker.
# It includes academic stats, skills, project details, and GitHub links.
# This data is the primary input for the LangChain-based JD analyzer.

from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Project(BaseModel):
    title: str
    tech_stack: List[str]
    description: str
    link: Optional[str] = None

class StudentProfile(BaseModel):
    user_id: Optional[str] = None
    full_name: str
    branch: str
    cgpa: float
    skills: List[str]
    domain_interests: List[str]
    projects: List[Project]
    placement_status: str = "Unplaced"
    updated_at: datetime = Field(default_factory=datetime.utcnow)
