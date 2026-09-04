"""GRIMOIRE — Unified backend entry point for Data QC and EAN Renamer workflows."""
from __future__ import annotations

import logging
import anyio

from services.data_maintenance.api import app
from services.ean_renamer.api import router as renamer_router
from services.ean_renamer.clip.clip_api import router as clip_router

logger = logging.getLogger("grimoire")

THREADPOOL_TOKENS = 256


@app.on_event("startup")
async def _expand_threadpool() -> None:
    limiter = anyio.to_thread.current_default_thread_limiter()
    limiter.total_tokens = THREADPOOL_TOKENS
    logger.info("GRIMOIRE started — threadpool expanded to %s", limiter.total_tokens)


app.include_router(renamer_router, prefix="/api/ean-renamer", tags=["EAN Renamer"])
app.include_router(clip_router, prefix="/api/ean-renamer", tags=["CLIP Classifier"])
