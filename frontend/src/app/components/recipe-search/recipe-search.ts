import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Recipe, RecipeRecommendRequest } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe';
import { RecipeCard } from '../recipe-card/recipe-card';

@Component({
  selector: 'app-recipe-search',
  imports: [FormsModule, RecipeCard],
  templateUrl: './recipe-search.html',
  styleUrl: './recipe-search.scss',
})
export class RecipeSearch {
  query = '';
  dietaryPreferences = '';
  availableIngredients = '';
  maxResults = 3;

  recipes = signal<Recipe[]>([]);
  message = signal('');
  loading = signal(false);
  error = signal('');

  constructor(private recipeService: RecipeService) {}

  search(): void {
    if (!this.query.trim()) return;

    this.loading.set(true);
    this.error.set('');
    this.recipes.set([]);

    const request: RecipeRecommendRequest = {
      query: this.query.trim(),
      dietary_preferences: this.dietaryPreferences
        ? this.dietaryPreferences.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      available_ingredients: this.availableIngredients
        ? this.availableIngredients.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      max_results: this.maxResults,
    };

    this.recipeService.recommendRecipes(request).subscribe({
      next: (res) => {
        this.recipes.set(res.recipes);
        this.message.set(res.message);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.detail || 'Failed to get recommendations. Please try again.');
        this.loading.set(false);
      },
    });
  }
}
