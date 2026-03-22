from typing import Any
from dataclasses import dataclass, field


@dataclass
class ConversationMemory:
    """Stores conversation history and collected data."""
    
    messages: list[dict[str, str]] = field(default_factory=list)
    collected_data: dict[str, Any] = field(default_factory=dict)
    current_node: str = "greet"
    
    def add_user_message(self, content: str) -> None:
        self.messages.append({"role": "user", "content": content})
    
    def add_assistant_message(self, content: str) -> None:
        self.messages.append({"role": "assistant", "content": content})
    
    def get_messages(self) -> list[dict[str, str]]:
        return self.messages.copy()
    
    def set_data(self, key: str, value: Any) -> None:
        self.collected_data[key] = value
    
    def get_data(self, key: str, default: Any = None) -> Any:
        return self.collected_data.get(key, default)
    
    def clear(self) -> None:
        self.messages.clear()
        self.collected_data.clear()
        self.current_node = "greet"
