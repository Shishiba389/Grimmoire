from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_env: str = "development"
    local_storage_root: Path = Field(default=Path("storage"))
    uploads_dir: Path = Field(default=Path("storage/uploads"))
    outputs_dir: Path = Field(default=Path("storage/outputs"))
    database_url: str = "file:./storage/aio-local.db"

    @property
    def project_root(self) -> Path:
        return Path(__file__).resolve().parents[2]

    @property
    def database_path(self) -> Path:
        if self.database_url.startswith("file:"):
            raw = self.database_url.removeprefix("file:")
            path = Path(raw)
        else:
            path = Path(self.database_url)
        if not path.is_absolute():
            path = self.project_root / path
        return path.resolve()

    def resolve_storage_path(self, path: Path) -> Path:
        if path.is_absolute():
            return path.resolve()
        return (self.project_root / path).resolve()

    def ensure_directories(self) -> None:
        self.resolve_storage_path(self.local_storage_root).mkdir(parents=True, exist_ok=True)
        self.resolve_storage_path(self.uploads_dir).mkdir(parents=True, exist_ok=True)
        self.resolve_storage_path(self.outputs_dir).mkdir(parents=True, exist_ok=True)
        self.database_path.parent.mkdir(parents=True, exist_ok=True)


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    settings.ensure_directories()
    return settings
