import { Component, input, signal } from '@angular/core';

import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard {
  recipe = input.required<Recipe>();
  expanded = signal(false);

  toggleExpand(): void {
    this.expanded.update((v) => !v);
  }
}
