from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import recipes
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-powered recipe assistant API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recipes.router, prefix="/api/v1/recipes", tags=["recipes"])


@app.get("/health")
async def health_check():
    return {"status": "ok", "version": settings.VERSION}
