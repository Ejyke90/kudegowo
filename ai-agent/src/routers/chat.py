import json
import uuid
from typing import AsyncGenerator

from fastapi import APIRouter, Request
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse

from src.agent.orchestrator import OnboardingOrchestrator
from src.config import get_settings

router = APIRouter()

# In-memory session store (use Redis in production)
sessions: dict[str, OnboardingOrchestrator] = {}


class ChatMessage(BaseModel):
    session_id: str | None = None
    message: str


class ChatResponse(BaseModel):
    session_id: str
    message: str
    node: str
    progress: dict


@router.post("/message")
async def send_message(chat_message: ChatMessage) -> ChatResponse:
    """Send a message and get a response (non-streaming)."""
    settings = get_settings()
    
    session_id = chat_message.session_id or str(uuid.uuid4())
    
    if session_id not in sessions:
        sessions[session_id] = OnboardingOrchestrator(
            backend_url=settings.backend_url,
            mock_llm=settings.mock_llm,
        )
    
    orchestrator = sessions[session_id]
    response = await orchestrator.process_message(chat_message.message)
    
    return ChatResponse(
        session_id=session_id,
        message=response["message"],
        node=response["current_node"],
        progress=response["progress"],
    )


@router.get("/stream")
async def stream_chat(request: Request, session_id: str | None = None):
    """SSE endpoint for streaming chat responses."""
    settings = get_settings()
    
    sid = session_id or str(uuid.uuid4())
    
    if sid not in sessions:
        sessions[sid] = OnboardingOrchestrator(
            backend_url=settings.backend_url,
            mock_llm=settings.mock_llm,
        )
    
    async def event_generator() -> AsyncGenerator[dict, None]:
        # Send session info
        yield {
            "event": "session",
            "data": json.dumps({"session_id": sid}),
        }
        
        # Send initial greeting if new session
        orchestrator = sessions[sid]
        if orchestrator.is_new_session():
            response = await orchestrator.start()
            yield {
                "event": "message",
                "data": json.dumps({
                    "message": response["message"],
                    "node": response["current_node"],
                    "progress": response["progress"],
                }),
            }
        
        # Keep connection alive
        while True:
            if await request.is_disconnected():
                break
            yield {"event": "ping", "data": ""}
            import asyncio
            await asyncio.sleep(30)
    
    return EventSourceResponse(event_generator())


@router.post("/stream/message")
async def stream_message(chat_message: ChatMessage):
    """Send a message and stream the response."""
    settings = get_settings()
    
    session_id = chat_message.session_id or str(uuid.uuid4())
    
    if session_id not in sessions:
        sessions[session_id] = OnboardingOrchestrator(
            backend_url=settings.backend_url,
            mock_llm=settings.mock_llm,
        )
    
    orchestrator = sessions[session_id]
    
    async def event_generator() -> AsyncGenerator[dict, None]:
        async for token in orchestrator.stream_response(chat_message.message):
            yield {
                "event": "token",
                "data": json.dumps({"token": token}),
            }
        
        # Send final state
        state = orchestrator.get_state()
        yield {
            "event": "complete",
            "data": json.dumps({
                "node": state["current_node"],
                "progress": state["progress"],
            }),
        }
    
    return EventSourceResponse(event_generator())


@router.delete("/session/{session_id}")
async def end_session(session_id: str):
    """End a chat session."""
    if session_id in sessions:
        del sessions[session_id]
        return {"status": "session_ended"}
    return {"status": "session_not_found"}
