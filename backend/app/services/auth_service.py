# backend/app/services/auth_service.py

# This service handles user authentication, password hashing, and JWT token generation.
# It ensures secure access to the platform for both students and TPO faculty.
# Key functions:
# - User registration and login
# - Password verification (using passlib)
# - Token creation and validation (using python-jose)

from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from app.core.config import settings
from app.core.database import get_collection
from app.models.user import UserCreate, UserInDB
from fastapi import HTTPException, status
from bson import ObjectId

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    def verify_password(self, plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(self, password):
        return pwd_context.hash(password)

    def create_access_token(self, data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.ALGORITHM)
        return encoded_jwt

    async def create_user(self, user_in: UserCreate):
        users_collection = get_collection("users")
        
        if len(user_in.password.encode('utf-8')) > 72:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password cannot be longer than 72 characters"
            )

        # Check if user exists
        existing_user = await users_collection.find_one({"email": user_in.email})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        hashed_password = self.get_password_hash(user_in.password)
        db_user = UserInDB(
            email=user_in.email,
            role=user_in.role,
            password_hash=hashed_password
            # created_at handled by default_factory
        )
        
        result = await users_collection.insert_one(db_user.model_dump())
        
        # Return user data with the new MongoDB ID (as string)
        user_out = db_user.model_dump(exclude={"password_hash"})
        user_out["_id"] = str(result.inserted_id)
        return user_out

    async def authenticate_user(self, email: str, password: str):
        users_collection = get_collection("users")
        user = await users_collection.find_one({"email": email})
        
        if not user:
            return False
            
        if not self.verify_password(password, user["password_hash"]):
            return False
            
        return user

auth_service = AuthService()
