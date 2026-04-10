# backend/app/api/auth.py

# This file contains the API routes for authentication (Login, Register).
# It handles requests, validates input using Pydantic, and calls the Auth Service.
# Key endpoints:
# - POST /login: Authenticate user and return JWT
# - POST /register: Create a new user account

from fastapi import APIRouter, Depends, HTTPException
from app.models.user import UserCreate, UserOut
# from app.services.auth_service import AuthService

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.models.user import UserCreate, UserOut
from app.services.auth_service import auth_service

router = APIRouter()

@router.post("/register", response_model=UserOut)
async def register(user_in: UserCreate):
    try:
        user = await auth_service.create_user(user_in)
        return user
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await auth_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = auth_service.create_access_token(
        data={"sub": user["email"], "role": user["role"], "id": str(user["_id"])}
    )
    return {"access_token": access_token, "token_type": "bearer"}
