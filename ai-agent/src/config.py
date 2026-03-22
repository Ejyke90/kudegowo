from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    environment: str = "development"
    backend_url: str = "http://localhost:5000/api"
    redis_url: str = "redis://localhost:6379"
    
    openai_api_key: str = ""
    anthropic_api_key: str = ""
    mock_llm: bool = True
    
    sentry_dsn: str = ""
    
    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
