from pydantic import BaseModel, Field
from enum import Enum
from typing import List

class ChatRole(Enum):
    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"

class ChatMessage(BaseModel):
    role: ChatRole = Field(description="The role of the message sender.")
    content: str = Field(description="The content of the message.")

    def to_dict(self):
        return {
            "role": self.role.value,
            "content": self.content
        }

class ChatCompletionRequest(BaseModel):
    messages: List[ChatMessage]
    model: str = Field(description="The model to use for the chat completion.", default="gpt-4o-mini")
    temperature: float = Field(description="The temperature to use for the chat completion.", default=0.5)
    maxTokens: int = Field(description="The maximum number of tokens to use for the chat completion.", default=500)
