from api.models import ChatCompletionRequest
from api import llm

class Controller:
    """Interface for connecting the API request to API business logic."""

    async def get_chat_completion(self, request: ChatCompletionRequest) -> str:
        return await llm.get_chat_completion(request.messages, request.model, request.temperature, request.maxTokens)
