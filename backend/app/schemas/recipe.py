from pydantic import BaseModel


class RecipeRecommendRequest(BaseModel):
    query: str
    dietary_preferences: list[str] = []
    available_ingredients: list[str] = []
    max_results: int = 3


class RecipeRecommendResponse(BaseModel):
    recipes: list[dict]
    message: str = ""


class RecipeChatRequest(BaseModel):
    message: str
    history: list[dict] = []


class RecipeChatResponse(BaseModel):
    reply: str
