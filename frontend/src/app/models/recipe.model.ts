export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  servings: number;
  prep_time_minutes: number;
  cook_time_minutes: number;
  tags: string[];
}

export interface RecipeRecommendRequest {
  query: string;
  dietary_preferences: string[];
  available_ingredients: string[];
  max_results: number;
}

export interface RecipeRecommendResponse {
  recipes: Recipe[];
  message: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface RecipeChatRequest {
  message: string;
  history: ChatMessage[];
}

export interface RecipeChatResponse {
  reply: string;
}
