import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recipe } from '../../models/recipe.model';
import { RecipeCard } from './recipe-card';

const mockRecipe: Recipe = {
  id: '1',
  title: 'Test Recipe',
  description: 'A test recipe',
  ingredients: [{ name: 'salt', amount: '1', unit: 'tsp' }],
  steps: ['Mix ingredients'],
  servings: 2,
  prep_time_minutes: 5,
  cook_time_minutes: 10,
  tags: ['easy'],
};

describe('RecipeCard', () => {
  let component: RecipeCard;
  let fixture: ComponentFixture<RecipeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCard);
    fixture.componentRef.setInput('recipe', mockRecipe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
