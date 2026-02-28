# AI Recipe Assistant - Copilot Instructions

Welcome to the AI Recipe Assistant project. When writing, examining, or generating code for this repository, please adhere to the following architecture, conventions, and workflows.

## 🏛️ Project Architecture
- **Backend (Python 3.12, FastAPI):** Services are distinctly split between domain entities (`backend/app/models/`) and REST/API interfaces (`backend/app/schemas/`). Built heavily on Pydantic v2.
  - **AI Integration:** System prompts are co-located with their endpoints (e.g., `RECOMMEND_SYSTEM_PROMPT` inside `backend/app/api/routes/recipes.py`).
- **Frontend (Angular 21, TypeScript):** A modern Angular app leaning heavily heavily on Standalone Components and Signals.

## 🚨 Project-Specific Naming Conventions 
This project **deliberately drops common Angular file and class suffixes**. Do not revert to standard `.component.ts` or `.service.ts`.
- **Components:** Named `<component-name>.ts`. (e.g., `recipe-search.ts`).
  - **Classes:** Lack the `Component` suffix (e.g., `export class RecipeSearch` instead of `RecipeSearchComponent`).
- **Services:** Files lack suffixes (e.g., `recipe.ts`), though class names keep it (`export class RecipeService`).
- **Models:** The only exception. Frontend payload structures retain `.model.ts` (e.g., `recipe.model.ts`). Use `snake_case` in frontend models if the backend JSON explicitly sends it that way (e.g., `prep_time_minutes`).

## 🛠️ State Management & Data Patterns
- **Frontend State:** Use Angular Signals natively (`import { signal } from '@angular/core'`) over RxJS observables for local component state.
  - EX: `recipes = signal<Recipe[]>([]);`
- **Component Imports:** Standalone components only. Manage dependencies per component via `imports: [FormsModule, RecipeCard]`.
- **Backend validation:** Always construct or modify `schemas/*.py` request/response shape classes using `pydantic.BaseModel` for validation, separate from data models.

## 🚀 Critical Developer Workflows
- **Running Backend (FastAPI):** `cd backend && python run.py` (Local address: `http://localhost:8000`, Docs: `http://localhost:8000/docs`). Wait until the `.env` has exactly `OPENAI_API_KEY` mapped.
- **Running Frontend (Angular):** `cd frontend && npm start` (Local address: `http://localhost:4200`).
