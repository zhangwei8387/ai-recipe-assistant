import { Routes } from '@angular/router';

import { RecipeChat } from './components/recipe-chat/recipe-chat';
import { RecipeSearch } from './components/recipe-search/recipe-search';

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: RecipeSearch },
  { path: 'chat', component: RecipeChat },
  { path: '**', redirectTo: 'search' },
];
