from fastapi import APIRouter
from api.models import ChatCompletionRequest
from api.controller import Controller

controller = Controller()

router = APIRouter(prefix="/api")

@router.post("/chat/completions")
async def get_chat_completion(request: ChatCompletionRequest):
    completion = await controller.get_chat_completion(request)
    return {"role": "assistant", "content": completion}