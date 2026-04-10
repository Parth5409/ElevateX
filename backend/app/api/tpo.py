# backend/app/api/tpo.py

from fastapi import APIRouter, Body, HTTPException, Depends
from app.services.tpo_service import tpo_service
from app.api.deps import get_current_tpo

router = APIRouter()

@router.get("/analytics")
async def get_analytics_summary(current_tpo: dict = Depends(get_current_tpo)):
    return await tpo_service.get_analytics_summary()

@router.get("/students")
async def list_students(status: str = None, branch: str = None, cgpa_gt: float = None, current_tpo: dict = Depends(get_current_tpo)):
    filters = {}
    if status:
        filters["status"] = status
    if branch:
        filters["branch"] = branch
    if cgpa_gt is not None:
        filters["cgpa_gt"] = cgpa_gt
    return await tpo_service.list_students(filters)

@router.get("/internships")
async def list_internships(status: str = None, current_tpo: dict = Depends(get_current_tpo)):
    return await tpo_service.get_internships(status)

@router.patch("/internships/{internship_id}")
async def approve_internship(internship_id: str, payload: dict = Body(...), current_tpo: dict = Depends(get_current_tpo)):
    status = payload.get("status")
    if not status:
        raise HTTPException(status_code=400, detail="Status is required")
        
    success = await tpo_service.approve_internship(internship_id, status)
    if not success:
        raise HTTPException(status_code=404, detail="Internship not found or already verified")
    
    return {"message": f"Internship marked as {status}"}

@router.post("/invite/{student_id}")
async def send_invite(student_id: str, payload: dict = Body(...), current_tpo: dict = Depends(get_current_tpo)):
    title = payload.get("title", "Interview Invitation")
    message = payload.get("message", "You have been selected for the next round.")
    
    return await tpo_service.create_invite(student_id, title, message)
