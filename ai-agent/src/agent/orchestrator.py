from typing import Any, AsyncGenerator
from dataclasses import dataclass, field
from enum import Enum

from src.agent.memory import ConversationMemory
from src.agent.llm_client import LLMClient
from src.agent.tools import BackendTools


class OnboardingNode(str, Enum):
    GREET = "greet"
    COLLECT_ROLE = "collect_role"
    COLLECT_SCHOOL = "collect_school"
    COLLECT_CHILDREN = "collect_children"
    COLLECT_FEES = "collect_fees"
    CONFIRM = "confirm"
    CREATE_RECORDS = "create_records"
    PAYMENT_PROMPT = "payment_prompt"
    COMPLETE = "complete"


NODE_ORDER = [
    OnboardingNode.GREET,
    OnboardingNode.COLLECT_ROLE,
    OnboardingNode.COLLECT_SCHOOL,
    OnboardingNode.COLLECT_CHILDREN,
    OnboardingNode.COLLECT_FEES,
    OnboardingNode.CONFIRM,
    OnboardingNode.CREATE_RECORDS,
    OnboardingNode.PAYMENT_PROMPT,
    OnboardingNode.COMPLETE,
]


@dataclass
class OnboardingState:
    """State for the onboarding flow."""
    current_node: OnboardingNode = OnboardingNode.GREET
    role: str | None = None
    school_id: str | None = None
    school_name: str | None = None
    children: list[dict] = field(default_factory=list)
    selected_fees: list[str] = field(default_factory=list)
    confirmed: bool = False
    records_created: bool = False
    payment_initiated: bool = False


class OnboardingOrchestrator:
    """LangGraph-style orchestrator for onboarding flow."""
    
    def __init__(self, backend_url: str, mock_llm: bool = True):
        self.memory = ConversationMemory()
        self.llm = LLMClient(mock_mode=mock_llm)
        self.tools = BackendTools(backend_url)
        self.state = OnboardingState()
        self._is_new = True
    
    def is_new_session(self) -> bool:
        return self._is_new
    
    def get_state(self) -> dict[str, Any]:
        return {
            "current_node": self.state.current_node.value,
            "progress": self._get_progress(),
        }
    
    def _get_progress(self) -> dict[str, Any]:
        current_index = NODE_ORDER.index(self.state.current_node)
        return {
            "current_step": current_index + 1,
            "total_steps": len(NODE_ORDER),
            "percentage": int((current_index / (len(NODE_ORDER) - 1)) * 100),
        }
    
    async def start(self) -> dict[str, Any]:
        """Start the onboarding flow with greeting."""
        self._is_new = False
        response = await self._execute_node(OnboardingNode.GREET, "")
        return {
            "message": response,
            "current_node": self.state.current_node.value,
            "progress": self._get_progress(),
        }
    
    async def process_message(self, message: str) -> dict[str, Any]:
        """Process a user message and return response."""
        self._is_new = False
        self.memory.add_user_message(message)
        
        # Determine next node based on current state and message
        next_node = self._determine_next_node(message)
        
        # Execute the node
        response = await self._execute_node(next_node, message)
        
        self.memory.add_assistant_message(response)
        
        return {
            "message": response,
            "current_node": self.state.current_node.value,
            "progress": self._get_progress(),
        }
    
    async def stream_response(self, message: str) -> AsyncGenerator[str, None]:
        """Stream the response token by token."""
        self._is_new = False
        self.memory.add_user_message(message)
        
        next_node = self._determine_next_node(message)
        self.state.current_node = next_node
        
        # For mock mode, use pre-defined responses
        if self.llm.mock_mode:
            response = await self._get_mock_response(next_node, message)
            for word in response.split():
                yield word + " "
                import asyncio
                await asyncio.sleep(0.05)
        else:
            # Stream from LLM
            system_prompt = self._get_system_prompt(next_node)
            full_response = ""
            async for token in self.llm.stream(self.memory.get_messages(), system_prompt):
                full_response += token
                yield token
            self.memory.add_assistant_message(full_response)
    
    def _determine_next_node(self, message: str) -> OnboardingNode:
        """Determine the next node based on current state and message."""
        current = self.state.current_node
        msg_lower = message.lower()
        
        if current == OnboardingNode.GREET:
            # After greeting, collect role
            return OnboardingNode.COLLECT_ROLE
        
        elif current == OnboardingNode.COLLECT_ROLE:
            # Detect role from message
            if any(word in msg_lower for word in ["parent", "i'm a parent", "i am a parent"]):
                self.state.role = "parent"
            elif any(word in msg_lower for word in ["admin", "school admin"]):
                self.state.role = "school_admin"
            elif any(word in msg_lower for word in ["tutor"]):
                self.state.role = "tutor"
            
            if self.state.role:
                return OnboardingNode.COLLECT_SCHOOL
            return OnboardingNode.COLLECT_ROLE
        
        elif current == OnboardingNode.COLLECT_SCHOOL:
            # School mentioned, move to children
            if any(word in msg_lower for word in ["greensprings", "school", "yes", "correct"]):
                self.state.school_name = "Greensprings School"
                self.state.school_id = "demo-school-id"
                return OnboardingNode.COLLECT_CHILDREN
            return OnboardingNode.COLLECT_SCHOOL
        
        elif current == OnboardingNode.COLLECT_CHILDREN:
            # Child info provided
            if any(word in msg_lower for word in ["child", "son", "daughter", "kid", "name"]):
                self.state.children.append({"name": "Demo Child", "class": "Primary 4"})
                return OnboardingNode.COLLECT_FEES
            return OnboardingNode.COLLECT_CHILDREN
        
        elif current == OnboardingNode.COLLECT_FEES:
            # Fees selected
            return OnboardingNode.CONFIRM
        
        elif current == OnboardingNode.CONFIRM:
            if any(word in msg_lower for word in ["yes", "confirm", "correct"]):
                self.state.confirmed = True
                return OnboardingNode.CREATE_RECORDS
            return OnboardingNode.CONFIRM
        
        elif current == OnboardingNode.CREATE_RECORDS:
            self.state.records_created = True
            return OnboardingNode.PAYMENT_PROMPT
        
        elif current == OnboardingNode.PAYMENT_PROMPT:
            if any(word in msg_lower for word in ["pay", "yes"]):
                self.state.payment_initiated = True
            return OnboardingNode.COMPLETE
        
        elif current == OnboardingNode.COMPLETE:
            return OnboardingNode.COMPLETE
        
        return current
    
    async def _execute_node(self, node: OnboardingNode, message: str) -> str:
        """Execute a node and return the response."""
        self.state.current_node = node
        
        if self.llm.mock_mode:
            return await self._get_mock_response(node, message)
        
        # Use LLM for response
        system_prompt = self._get_system_prompt(node)
        return await self.llm.generate(self.memory.get_messages(), system_prompt)
    
    async def _get_mock_response(self, node: OnboardingNode, message: str) -> str:
        """Get mock response for a node."""
        from src.agent.llm_client import MOCK_RESPONSES
        
        if node == OnboardingNode.GREET:
            return MOCK_RESPONSES["greet"]
        elif node == OnboardingNode.COLLECT_ROLE:
            if self.state.role == "parent":
                return MOCK_RESPONSES["parent_selected"]
            elif self.state.role == "school_admin":
                return MOCK_RESPONSES["admin_selected"]
            elif self.state.role == "tutor":
                return MOCK_RESPONSES["tutor_selected"]
            return MOCK_RESPONSES["greet"]
        elif node == OnboardingNode.COLLECT_SCHOOL:
            return MOCK_RESPONSES["school_selected"]
        elif node == OnboardingNode.COLLECT_CHILDREN:
            return MOCK_RESPONSES["child_added"]
        elif node == OnboardingNode.COLLECT_FEES:
            return MOCK_RESPONSES["child_added"]
        elif node == OnboardingNode.CONFIRM:
            return MOCK_RESPONSES["confirmed"]
        elif node == OnboardingNode.CREATE_RECORDS:
            return MOCK_RESPONSES["confirmed"]
        elif node == OnboardingNode.PAYMENT_PROMPT:
            return MOCK_RESPONSES["payment_prompt"]
        elif node == OnboardingNode.COMPLETE:
            return MOCK_RESPONSES["complete"]
        
        return MOCK_RESPONSES["default"]
    
    def _get_system_prompt(self, node: OnboardingNode) -> str:
        """Get system prompt for a node."""
        base_prompt = """You are KudEgOwo's AI onboarding assistant. You help Nigerian parents, school administrators, and tutors set up their accounts on the KudEgOwo school payment platform.

Be friendly, helpful, and culturally aware. Use Nigerian English where appropriate. Keep responses concise but warm.

Current user data:
- Role: {role}
- School: {school}
- Children: {children}
"""
        
        context = base_prompt.format(
            role=self.state.role or "Not set",
            school=self.state.school_name or "Not set",
            children=len(self.state.children),
        )
        
        node_prompts = {
            OnboardingNode.GREET: "Welcome the user and ask if they are a Parent, School Admin, or Tutor.",
            OnboardingNode.COLLECT_ROLE: "The user has indicated their role. Acknowledge and ask about their school.",
            OnboardingNode.COLLECT_SCHOOL: "Help the user find or set up their school. Search for schools if needed.",
            OnboardingNode.COLLECT_CHILDREN: "Collect information about the user's children - names and classes.",
            OnboardingNode.COLLECT_FEES: "Present fee categories and ask which ones to set up.",
            OnboardingNode.CONFIRM: "Summarize all collected information and ask for confirmation.",
            OnboardingNode.CREATE_RECORDS: "Confirm that records have been created successfully.",
            OnboardingNode.PAYMENT_PROMPT: "Offer to help with the first payment.",
            OnboardingNode.COMPLETE: "Thank the user and provide next steps.",
        }
        
        return context + "\n\nCurrent task: " + node_prompts.get(node, "Help the user.")
