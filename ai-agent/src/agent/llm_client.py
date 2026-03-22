from typing import AsyncGenerator
from src.config import get_settings


class LLMClient:
    """Wrapper for LLM providers (OpenAI, Anthropic) with mock support."""
    
    def __init__(self, mock_mode: bool = True):
        self.mock_mode = mock_mode
        self.settings = get_settings()
        self._openai_client = None
        self._anthropic_client = None
    
    @property
    def openai_client(self):
        if self._openai_client is None and self.settings.openai_api_key:
            from openai import AsyncOpenAI
            self._openai_client = AsyncOpenAI(api_key=self.settings.openai_api_key)
        return self._openai_client
    
    @property
    def anthropic_client(self):
        if self._anthropic_client is None and self.settings.anthropic_api_key:
            from anthropic import AsyncAnthropic
            self._anthropic_client = AsyncAnthropic(api_key=self.settings.anthropic_api_key)
        return self._anthropic_client
    
    async def generate(
        self,
        messages: list[dict[str, str]],
        system_prompt: str = "",
        tools: list[dict] | None = None,
    ) -> str:
        """Generate a response from the LLM."""
        if self.mock_mode:
            return self._mock_response(messages)
        
        if self.openai_client:
            return await self._openai_generate(messages, system_prompt, tools)
        elif self.anthropic_client:
            return await self._anthropic_generate(messages, system_prompt, tools)
        else:
            return self._mock_response(messages)
    
    async def stream(
        self,
        messages: list[dict[str, str]],
        system_prompt: str = "",
    ) -> AsyncGenerator[str, None]:
        """Stream a response from the LLM."""
        if self.mock_mode:
            response = self._mock_response(messages)
            for word in response.split():
                yield word + " "
            return
        
        if self.openai_client:
            async for token in self._openai_stream(messages, system_prompt):
                yield token
        elif self.anthropic_client:
            async for token in self._anthropic_stream(messages, system_prompt):
                yield token
        else:
            response = self._mock_response(messages)
            for word in response.split():
                yield word + " "
    
    async def _openai_generate(
        self,
        messages: list[dict[str, str]],
        system_prompt: str,
        tools: list[dict] | None,
    ) -> str:
        all_messages = []
        if system_prompt:
            all_messages.append({"role": "system", "content": system_prompt})
        all_messages.extend(messages)
        
        kwargs = {"model": "gpt-4-turbo-preview", "messages": all_messages}
        if tools:
            kwargs["tools"] = [{"type": "function", "function": t} for t in tools]
        
        response = await self.openai_client.chat.completions.create(**kwargs)
        return response.choices[0].message.content or ""
    
    async def _openai_stream(
        self,
        messages: list[dict[str, str]],
        system_prompt: str,
    ) -> AsyncGenerator[str, None]:
        all_messages = []
        if system_prompt:
            all_messages.append({"role": "system", "content": system_prompt})
        all_messages.extend(messages)
        
        stream = await self.openai_client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=all_messages,
            stream=True,
        )
        
        async for chunk in stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content
    
    async def _anthropic_generate(
        self,
        messages: list[dict[str, str]],
        system_prompt: str,
        tools: list[dict] | None,
    ) -> str:
        kwargs = {
            "model": "claude-3-sonnet-20240229",
            "max_tokens": 1024,
            "messages": messages,
        }
        if system_prompt:
            kwargs["system"] = system_prompt
        
        response = await self.anthropic_client.messages.create(**kwargs)
        return response.content[0].text
    
    async def _anthropic_stream(
        self,
        messages: list[dict[str, str]],
        system_prompt: str,
    ) -> AsyncGenerator[str, None]:
        kwargs = {
            "model": "claude-3-sonnet-20240229",
            "max_tokens": 1024,
            "messages": messages,
        }
        if system_prompt:
            kwargs["system"] = system_prompt
        
        async with self.anthropic_client.messages.stream(**kwargs) as stream:
            async for text in stream.text_stream:
                yield text
    
    def _mock_response(self, messages: list[dict[str, str]]) -> str:
        """Generate mock responses based on conversation context."""
        if not messages:
            return MOCK_RESPONSES["greet"]
        
        last_message = messages[-1]["content"].lower()
        
        # Detect intent from message
        if any(word in last_message for word in ["parent", "i'm a parent", "i am a parent"]):
            return MOCK_RESPONSES["parent_selected"]
        elif any(word in last_message for word in ["admin", "school admin"]):
            return MOCK_RESPONSES["admin_selected"]
        elif any(word in last_message for word in ["tutor"]):
            return MOCK_RESPONSES["tutor_selected"]
        elif any(word in last_message for word in ["greensprings", "school"]):
            return MOCK_RESPONSES["school_selected"]
        elif any(word in last_message for word in ["child", "son", "daughter", "kid"]):
            return MOCK_RESPONSES["child_added"]
        elif any(word in last_message for word in ["yes", "confirm", "correct"]):
            return MOCK_RESPONSES["confirmed"]
        elif any(word in last_message for word in ["pay", "payment"]):
            return MOCK_RESPONSES["payment_prompt"]
        elif any(word in last_message for word in ["no", "later", "skip"]):
            return MOCK_RESPONSES["complete"]
        
        return MOCK_RESPONSES["default"]


MOCK_RESPONSES = {
    "greet": """Welcome to KudEgOwo! 🎉

I'm your AI assistant, here to help you get started with Nigeria's smartest school payment platform.

I can help you:
• Set up your school profile
• Add your children
• Configure fee payments
• Explore our features

First, tell me - are you a **Parent**, **School Admin**, or **Tutor**?""",
    
    "parent_selected": """Great! As a parent, you'll be able to:
• Pay school fees seamlessly
• Track your children's attendance
• Receive instant notifications
• Manage meal pre-orders
• Monitor your child's savings goals

Let's find your child's school. What school does your child attend? You can tell me the name or location.""",
    
    "admin_selected": """Welcome, School Administrator! 🏫

With KudEgOwo, you can:
• Receive payments directly to your school wallet
• Track attendance with digital passphrases
• Send emergency alerts to parents
• Manage meal menus and orders
• View real-time analytics

Let's set up your school. What's the name of your school?""",
    
    "tutor_selected": """Welcome, Tutor! 📚

KudEgOwo's tutor marketplace lets you:
• Connect with students
• Receive secure payments
• Build your reputation
• Manage your schedule

Let's create your tutor profile. What subjects do you teach?""",
    
    "school_selected": """I found **Greensprings School** in Lagos! 🏫

This is a private school with the following fee categories:
• Tuition: ₦450,000/term
• Meals: ₦35,000/term
• Transport: ₦50,000/term
• Uniform: ₦25,000/year
• Books: ₦15,000/term

Is this the right school? If yes, let's add your child's details.""",
    
    "child_added": """I've added your child to the system. Here's a summary:

👧 **Child Details:**
• School: Greensprings School
• Class: Primary 4

Would you like to:
1. Add another child
2. Set up fee payments
3. Explore other features

Just let me know!""",
    
    "confirmed": """Everything is set up! ✅

I've created:
• Your parent profile
• School connection to Greensprings School
• Your child's profile

Would you like to make your first payment now? I can guide you through paying any pending fees.""",
    
    "payment_prompt": """Let's set up your first payment! 💳

Here are the pending fees:
1. **Tuition** - ₦450,000 (Due: Jan 15)
2. **Meals** - ₦35,000 (Due: Jan 10)
3. **Transport** - ₦50,000 (Due: Jan 10)

Which fee would you like to pay? You can also set up automatic payments for recurring fees.""",
    
    "complete": """You're all set! 🎉

Here's what you can do next:
• **Dashboard** - View all your children and payments
• **Safe School** - Check attendance and passphrases
• **Financial Literacy** - Help your child learn about money
• **Meals** - Pre-order school meals

If you need any help, just ask! Welcome to the KudEgOwo family! 💚""",
    
    "default": """I understand. Let me help you with that.

Could you tell me more about what you'd like to do? I can help with:
• Setting up your profile
• Finding schools
• Adding children
• Making payments
• Exploring features

Just let me know!""",
}
