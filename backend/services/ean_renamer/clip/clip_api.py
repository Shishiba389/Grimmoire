from __future__ import annotations

import logging
from pathlib import Path

from fastapi import APIRouter, HTTPException

from .job_manager import get_manager
from .schemas import (
    ClassifyProgress,
    ClassifyRequest,
    ClassifyResult,
    ClipStatusResponse,
    CorrectionCommitRequest,
)

logger = logging.getLogger("grimoire.clip.api")

router = APIRouter()


@router.get("/clip/status", response_model=ClipStatusResponse)
async def clip_status():
    return get_manager().get_status()


@router.post("/clip/warm-up")
async def clip_warmup():
    get_manager().warm_up()
    return {"status": "warming_up"}


@router.post("/clip/classify")
async def clip_classify(req: ClassifyRequest):
    manager = get_manager()
    job_id = manager.submit_job(
        folder_path=req.folder_path,
        taxonomy_path=req.taxonomy_path,
        reference_path=req.reference_path,
        user_data_path=req.user_data_path,
    )
    return {"job_id": job_id}


@router.get("/clip/classify/{job_id}/progress", response_model=ClassifyProgress)
async def clip_progress(job_id: str):
    progress = get_manager().get_progress(job_id)
    if progress is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return progress


@router.get("/clip/classify/{job_id}/result")
async def clip_result(job_id: str):
    manager = get_manager()
    progress = manager.get_progress(job_id)
    if progress is None:
        raise HTTPException(status_code=404, detail="Job not found")
    if progress.phase not in ("done", "error", "cancelled"):
        return {"status": progress.phase, "result": None}
    result = manager.get_result(job_id)
    if result is None:
        return {"status": progress.phase, "error": progress.error, "result": None}
    return {"status": "done", "result": result}


@router.post("/clip/classify/{job_id}/cancel")
async def clip_cancel(job_id: str):
    ok = get_manager().cancel_job(job_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"status": "cancelled"}


@router.post("/clip/corrections/commit")
async def clip_commit_corrections(req: CorrectionCommitRequest):
    manager = get_manager()
    from . import model_manager
    from .embedding_cache import EmbeddingCache

    folder = Path(req.folder_path).expanduser().resolve()
    normalized_records = []
    for record in req.corrections:
        image_path = (folder / record.relative_path).resolve()
        try:
            image_path.relative_to(folder)
        except ValueError:
            logger.warning("Skipping correction outside source folder: %s", record.relative_path)
            continue
        if not image_path.is_file():
            logger.warning("Skipping correction for missing image: %s", image_path)
            continue
        image_hash = EmbeddingCache.compute_file_hash(image_path)
        normalized_records.append(record.model_copy(update={
            "image_hash": image_hash,
            "embedding_cache_key": image_hash,
            "clip_model_version": model_manager.get_model().version,
            "taxonomy_version": manager.get_status().taxonomy_version,
        }))

    manager.correction_store.commit_batch(normalized_records)
    manager.train_local_classifier_async()
    count = manager.correction_store.get_correction_count()
    return {"committed": len(normalized_records), "total_corrections": count}


@router.get("/clip/corrections/count")
async def clip_correction_count():
    manager = get_manager()
    count = manager.correction_store.get_correction_count()
    cat_counts = manager.correction_store.get_category_counts()
    return {"total": count, "by_category": cat_counts}


@router.post("/clip/corrections/export")
async def clip_export_corrections():
    manager = get_manager()
    path = manager.correction_store.export_excel()
    return {"path": str(path)}


@router.post("/clip/train")
async def clip_train():
    from . import model_manager
    from .local_trainer import LocalClassifier

    manager = get_manager()
    if not model_manager.is_loaded():
        raise HTTPException(status_code=400, detail="CLIP model not loaded yet")

    trainer = LocalClassifier()
    success = trainer.train(
        correction_store=manager.correction_store,
        embedding_cache=manager.cache,
        model_version=model_manager.get_model().version,
    )
    if not success:
        return {"status": "insufficient_data", "message": "Not enough corrections to train"}
    return {"status": "trained"}
