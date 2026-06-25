from __future__ import annotations

import os
from pathlib import Path


def _backend_root() -> Path:
    return Path(__file__).resolve().parents[3]


def _app_root() -> Path:
    return _backend_root().parent


def app_data_dir() -> Path:
    """Ship-with-app data: reference examples, taxonomy."""
    return _app_root() / "data"


def taxonomy_path() -> Path:
    return app_data_dir() / "taxonomy" / "CLIP_Image_Classification_Taxonomy_with_Prompts.xlsx"


def reference_examples_path() -> Path:
    return app_data_dir() / "reference_examples"


def user_data_dir() -> Path:
    """Per-user data: caches, corrections, thresholds, local classifier."""
    env = os.environ.get("GRIMOIRE_DATA")
    if env:
        p = Path(env)
    else:
        appdata = os.environ.get("APPDATA")
        if appdata:
            p = Path(appdata) / "Grimoire"
        else:
            p = Path.home() / ".grimoire"
    p.mkdir(parents=True, exist_ok=True)
    return p


def user_thresholds_path() -> Path:
    return user_data_dir() / "user_thresholds.json"


def embedding_cache_path() -> Path:
    return user_data_dir() / "clip_embeddings.db"


def corrections_db_path() -> Path:
    return user_data_dir() / "clip_corrections.db"


def local_classifier_path() -> Path:
    return user_data_dir() / "local_classifier.pkl"
