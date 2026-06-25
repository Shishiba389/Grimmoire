from __future__ import annotations

from functools import lru_cache
import os
from pathlib import Path
import shutil

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
    def user_data_root(self) -> Path:
        configured = os.environ.get("GRIMOIRE_DATA")
        if configured:
            return Path(configured).expanduser().resolve()

        local_appdata = os.environ.get("LOCALAPPDATA")
        if local_appdata:
            return (Path(local_appdata) / "Grimoire").resolve()

        appdata = os.environ.get("APPDATA")
        if appdata:
            return (Path(appdata) / "Grimoire").resolve()

        return (Path.home() / ".grimoire").resolve()

    @property
    def database_path(self) -> Path:
        if self.database_url.startswith("file:"):
            raw = self.database_url.removeprefix("file:")
            path = Path(raw)
        else:
            path = Path(self.database_url)
        if not path.is_absolute():
            path = self.user_data_root / path
        return path.resolve()

    def resolve_storage_path(self, path: Path) -> Path:
        if path.is_absolute():
            return path.resolve()
        return (self.user_data_root / path).resolve()

    def ensure_directories(self) -> None:
        self.user_data_root.mkdir(parents=True, exist_ok=True)
        self.resolve_storage_path(self.local_storage_root).mkdir(parents=True, exist_ok=True)
        self.resolve_storage_path(self.uploads_dir).mkdir(parents=True, exist_ok=True)
        self.resolve_storage_path(self.outputs_dir).mkdir(parents=True, exist_ok=True)
        self.database_path.parent.mkdir(parents=True, exist_ok=True)
        self._migrate_legacy_database()

    def _migrate_legacy_database(self) -> None:
        """Preserve data from builds that stored SQLite beside the backend."""
        target = self.database_path
        legacy = (self.project_root / "storage" / "aio-local.db").resolve()
        if target.exists() or not legacy.is_file() or target == legacy:
            return
        try:
            shutil.copy2(legacy, target)
        except OSError:
            # A read-only or incomplete legacy installation should not prevent
            # startup; SQLite will create a fresh database in user data.
            pass


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    settings.ensure_directories()
    return settings
