# backend/app/models/internship.py

# This file defines the Internship model for tracking student internship logs and certificates.
# It includes fields for the company, role, duration, and approval status (Pending/Approved/Rejected).
# This data is used by the TPO for verification and analytics.

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Internship(BaseModel):
    student_id: str
    company_name: str
    role: str
    duration_months: int
    certificate_url: Optional[str] = None
    status: str = "Pending"
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
