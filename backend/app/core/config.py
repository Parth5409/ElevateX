# backend/app/core/config.py

# This file handles the application configuration and environment variables.
# It uses Pydantic Settings to validate and load variables from a .env file.
# Key settings include:
# - MongoDB URI and Database Name
# - Google API Key for AI Layer (LangChain/Gemini)
# - Secret Keys for JWT Authentication
# - Environment (Development/Production)

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    # App Settings
    PROJECT_NAME: str = "AI-Powered TPO Platform"
    API_V1_STR: str = "/api/v1"
    
    # MongoDB Settings
    MONGO_URI: str = "mongodb://localhost:27017"
    DB_NAME: str = "aithon_db"
    
    # AI Settings
    GOOGLE_API_KEY: Optional[str] = None
    
    # Auth Settings
    JWT_SECRET: str = "your-secret-key-here" # Change in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 1 week
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
