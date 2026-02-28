import json

from fastapi import APIRouter, HTTPException

from app.core.ai_client import get_openai_client
from app.core.config import settings
from app.schemas.recipe import (
    RecipeChatRequest,
    RecipeChatResponse,
    RecipeRecommendRequest,
    RecipeRecommendResponse,
)

router = APIRouter()

RECOMMEND_SYSTEM_PROMPT = """You are a professional chef and recipe expert.
When given a query, dietary preferences, and available ingredients, recommend recipes.
Return your response as a JSON object with this structure:
{
  "recipes": [
    {
      "id": "<unique_id>",
      "title": "<recipe title>",
      "description": "<brief description>",
      "ingredients": [{"name": "<name>", "amount": "<amount>", "unit": "<unit>"}],
      "steps": ["<step 1>", "<step 2>"],
      "servings": <number>,
      "prep_time_minutes": <number>,
      "cook_time_minutes": <number>,
      "tags": ["<tag>"]
    }
  ],
  "message": "<optional helpful message>"
}
Respond with valid JSON only."""

CHAT_SYSTEM_PROMPT = """You are a friendly and knowledgeable AI recipe assistant.
Help users with cooking questions, ingredient substitutions, technique tips, and recipe ideas.
Be concise, helpful, and encouraging."""


@router.post("/recommend", response_model=RecipeRecommendResponse)
async def recommend_recipes(request: RecipeRecommendRequest):
    """Get AI-powered recipe recommendations based on query and preferences."""
    if not settings.OPENAI_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="AI service is not configured. Please set OPENAI_API_KEY.",
        )

    user_message = f"Query: {request.query}"
    if request.dietary_preferences:
        user_message += f"\nDietary preferences: {', '.join(request.dietary_preferences)}"
    if request.available_ingredients:
        user_message += f"\nAvailable ingredients: {', '.join(request.available_ingredients)}"
    user_message += f"\nNumber of recipes to recommend: {request.max_results}"

    client = get_openai_client()
    completion = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": RECOMMEND_SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        response_format={"type": "json_object"},
    )

    content = completion.choices[0].message.content or "{}"
    data = json.loads(content)
    return RecipeRecommendResponse(**data)


@router.post("/chat", response_model=RecipeChatResponse)
async def chat_with_assistant(request: RecipeChatRequest):
    """Chat with the AI recipe assistant."""
    if not settings.OPENAI_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="AI service is not configured. Please set OPENAI_API_KEY.",
        )

    messages = [{"role": "system", "content": CHAT_SYSTEM_PROMPT}]
    for history_message in request.history:
        messages.append(history_message)
    messages.append({"role": "user", "content": request.message})

    client = get_openai_client()
    completion = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=messages,
    )

    reply = completion.choices[0].message.content or ""
    return RecipeChatResponse(reply=reply)
