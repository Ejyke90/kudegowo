from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    environment: str = "development"
    celery_broker_url: str = "redis://localhost:6379/0"
    celery_result_backend: str = "mongodb://localhost:27017/kudegowo_celery"
    backend_url: str = "http://localhost:5000/api"
    sentry_dsn: str = ""
    
    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
