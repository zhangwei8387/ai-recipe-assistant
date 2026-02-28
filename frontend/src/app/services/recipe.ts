import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  RecipeChatRequest,
  RecipeChatResponse,
  RecipeRecommendRequest,
  RecipeRecommendResponse,
} from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly apiBase = 'http://localhost:8000/api/v1/recipes';

  constructor(private http: HttpClient) {}

  recommendRecipes(request: RecipeRecommendRequest): Observable<RecipeRecommendResponse> {
    return this.http.post<RecipeRecommendResponse>(`${this.apiBase}/recommend`, request);
  }

  chat(request: RecipeChatRequest): Observable<RecipeChatResponse> {
    return this.http.post<RecipeChatResponse>(`${this.apiBase}/chat`, request);
  }
}
