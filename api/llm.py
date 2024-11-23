from openai import AsyncOpenAI
from api.settings import Settings 
from api.models import ChatMessage
from typing import List

settings = Settings()

client = AsyncOpenAI(api_key=settings.openai_api_key)

async def get_chat_completion(
    messages: List[ChatMessage],
    model: str,
    temperature: float,
    max_tokens: int 
) -> str:
    response = await client.chat.completions.create(
        model=model,
        messages=[message.to_dict() for message in messages],
        temperature=temperature,
        max_tokens=max_tokens
    )
    return response.choices[0].message.content

