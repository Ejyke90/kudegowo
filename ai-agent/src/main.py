from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import get_settings
from src.routers import chat, health

settings = get_settings()

# Initialize Sentry if DSN is provided
if settings.sentry_dsn:
    from src.instrument import init_sentry
    init_sentry()

app = FastAPI(
    title="KudEgOwo AI Agent",
    description="AI-powered onboarding assistant for KudEgOwo",
    version="0.1.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router)
app.include_router(chat.router, prefix="/chat", tags=["chat"])


@app.get("/")
async def root():
    return {
        "service": "kudegowo-ai-agent",
        "version": "0.1.0",
        "status": "running",
        "mock_llm": settings.mock_llm,
    }
