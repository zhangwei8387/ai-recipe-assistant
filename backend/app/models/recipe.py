from pydantic import BaseModel


class Ingredient(BaseModel):
    name: str
    amount: str
    unit: str = ""


class Recipe(BaseModel):
    id: str
    title: str
    description: str
    ingredients: list[Ingredient]
    steps: list[str]
    servings: int
    prep_time_minutes: int
    cook_time_minutes: int
    tags: list[str] = []
