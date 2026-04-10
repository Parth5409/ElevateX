# backend/app/api/auth.py

# This file contains the API routes for authentication (Login, Register).
# It handles requests, validates input using Pydantic, and calls the Auth Service.
# Key endpoints:
# - POST /login: Authenticate user and return JWT
# - POST /register: Create a new user account

from fastapi import APIRouter, Depends, HTTPException
from app.models.user import UserCreate, UserOut
# from app.services.auth_service import AuthService

from fastapi import APIRouter, Depends, HTTPException, status, Response
from app.models.user import UserCreate, UserOut, UserLogin
from app.services.auth_service import auth_service

router = APIRouter()

@router.post("/signup")
async def signup(user_in: UserCreate, response: Response):
    try:
        user = await auth_service.create_user(user_in)
        # Create token right after signup
        access_token = auth_service.create_access_token(
            data={"sub": user["email"], "role": user["role"], "id": str(user["_id"])}
        )
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            max_age=1800,
            expires=1800,
            samesite="lax",
            secure=False,  # Set to True in production with HTTPS
        )
        return {
            "_id": str(user["_id"]),
            "email": user["email"],
            "role": user["role"]
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
async def login(login_data: UserLogin, response: Response):
    user = await auth_service.authenticate_user(login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = auth_service.create_access_token(
        data={"sub": user["email"], "role": user["role"], "id": str(user["_id"])}
    )
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=1800,
        expires=1800,
        samesite="lax",
        secure=False,  # Set to True in production with HTTPS
    )
    return {
        "_id": str(user["_id"]),
        "email": user["email"],
        "role": user["role"]
    }

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}
