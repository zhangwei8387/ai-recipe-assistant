from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Recipe Assistant"
    VERSION: str = "0.1.0"
    ALLOWED_ORIGINS: list[str] = ["http://localhost:4200"]
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
