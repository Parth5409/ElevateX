# backend/app/models/internship.py

# This file defines the Internship model for tracking student internship logs and certificates.
# It includes fields for the company, role, duration, and approval status (Pending/Approved/Rejected).
# This data is used by the TPO for verification and analytics.

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Internship(BaseModel):
    student_id: Optional[str] = None
    company_name: str
    domain: str
    duration_months: int
    brief: Optional[str] = None
    status: str = "Pending"
    date: datetime = Field(default_factory=datetime.utcnow)
