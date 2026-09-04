from __future__ import annotations

import json
import logging
import threading
import time
import uuid
from pathlib import Path

from .calibration import calibrate_score
from .classifier import ClassificationPipeline
from .correction_store import CorrectionStore
from .embedding_cache import EmbeddingCache
from .local_trainer import LocalClassifier
from .reference_bank import ReferenceBank
from .schemas import ClassifyProgress, ClassifyResult, ClipStatusResponse
from .taxonomy_loader import Taxonomy, load_taxonomy

logger = logging.getLogger("grimoire.clip.job")


class ClassifyJob:
    def __init__(self, job_id: str, folder_path: str):
        self.job_id = job_id
        self.folder_path = folder_path
        self.cancel_flag = threading.Event()
        self.progress = ClassifyProgress(job_id=job_id, phase="queued")
        self.result: ClassifyResult | None = None
        self.error: str | None = None
        self.done = threading.Event()


class JobManager:
    def __init__(self):
        self._jobs: dict[str, ClassifyJob] = {}
        self._worker_thread: threading.Thread | None = None
        self._lock = threading.Lock()
        self._cache: EmbeddingCache | None = None
        self._reference_bank: ReferenceBank | None = None
        self._taxonomy: Taxonomy | None = None
        self._correction_store: CorrectionStore | None = None
        self._local_classifier: LocalClassifier | None = None
        self._model_loading = False

    @property
    def cache(self) -> EmbeddingCache:
        if self._cache is None:
            self._cache = EmbeddingCache()
        return self._cache

    @property
    def correction_store(self) -> CorrectionStore:
        if self._correction_store is None:
            self._correction_store = CorrectionStore()
        return self._correction_store

    @property
    def local_classifier(self) -> LocalClassifier:
        if self._local_classifier is None:
            self._local_classifier = LocalClassifier()
            self._local_classifier.load()
        return self._local_classifier

    def train_local_classifier_async(self):
        def _train():
            try:
                from . import model_manager
                trained = self.local_classifier.train(
                    correction_store=self.correction_store,
                    embedding_cache=self.cache,
                    model_version=model_manager.get_model().version,
                    min_per_category=5,
                )
                if trained:
                    logger.info("Local CLIP classifier updated from user corrections")
            except Exception:
                logger.exception("Local CLIP classifier training failed")

        threading.Thread(target=_train, daemon=True, name="clip-local-train").start()

    def get_status(self) -> ClipStatusResponse:
        from . import model_manager
        status = model_manager.get_status()
        return ClipStatusResponse(
            loaded=status["loaded"],
            model=status.get("model", ""),
            device=status.get("device", ""),
            taxonomy_loaded=self._taxonomy is not None,
            taxonomy_version=self._taxonomy.version if self._taxonomy else "",
            reference_count=self._reference_bank.count if self._reference_bank else 0,
        )

    def warm_up(self):
        if self._model_loading:
            return
        self._model_loading = True

        def _load():
            try:
                from . import model_manager
                model_manager.get_model()
                self._taxonomy = load_taxonomy()
                self._reference_bank = ReferenceBank()
                self._reference_bank.load(cache=self.cache)
                logger.info("CLIP warm-up complete")
            except Exception as e:
                logger.error("CLIP warm-up failed: %s", e)
            finally:
                self._model_loading = False

        t = threading.Thread(target=_load, daemon=True, name="clip-warmup")
        t.start()

    def submit_job(
        self,
        folder_path: str,
        taxonomy_path: str | None = None,
        reference_path: str | None = None,
        user_data_path: str | None = None,
    ) -> str:
        job_id = uuid.uuid4().hex[:12]
        job = ClassifyJob(job_id, folder_path)
        with self._lock:
            self._jobs[job_id] = job

        t = threading.Thread(
            target=self._run_job,
            args=(job, taxonomy_path, reference_path, user_data_path),
            daemon=True,
            name=f"clip-job-{job_id}",
        )
        t.start()
        return job_id

    def get_progress(self, job_id: str) -> ClassifyProgress | None:
        job = self._jobs.get(job_id)
        if job is None:
            return None
        return job.progress

    def get_result(self, job_id: str) -> ClassifyResult | None:
        job = self._jobs.get(job_id)
        if job is None:
            return None
        return job.result

    def cancel_job(self, job_id: str) -> bool:
        job = self._jobs.get(job_id)
        if job is None:
            return False
        job.cancel_flag.set()
        return True

    def _run_job(
        self, job: ClassifyJob,
        taxonomy_path: str | None, reference_path: str | None,
        user_data_path: str | None,
    ):
        try:
            job.progress.phase = "loading_model"
            from . import model_manager
            model_manager.get_model()

            if job.cancel_flag.is_set():
                job.progress.phase = "cancelled"
                job.done.set()
                return

            job.progress.phase = "loading_taxonomy"
            tax_path = Path(taxonomy_path) if taxonomy_path else None
            taxonomy = load_taxonomy(tax_path)
            self._taxonomy = taxonomy

            if self._reference_bank is None or not self._reference_bank.is_loaded:
                job.progress.phase = "loading_references"
                self._reference_bank = ReferenceBank()
                ref_path = Path(reference_path) if reference_path else None
                self._reference_bank.load(reference_path=ref_path, cache=self.cache)

            user_thresholds = None
            from .paths import user_thresholds_path
            thresh_file = user_thresholds_path()
            if thresh_file.exists():
                user_thresholds = json.loads(thresh_file.read_text(encoding="utf-8"))

            job.progress.phase = "scanning"
            from services.ean_renamer.services.folder_scanner import SKIPPED_DIR_NAMES_NORMALIZED, image_id_for_name
            from .media_inspector import SUPPORTED_EXTENSIONS
            image_paths: list[Path] = []
            image_ids: list[str] = []
            relative_paths: list[str] = []

            folder = Path(job.folder_path)
            import os
            for root_str, dirs, files in os.walk(folder):
                root_dir = Path(root_str)
                dirs[:] = [d for d in dirs if d.lower() not in SKIPPED_DIR_NAMES_NORMALIZED]
                for f in sorted(files):
                    fp = root_dir / f
                    # PDF documents are valid Bulk Working artifacts but cannot be
                    # encoded by CLIP. Keep them in the manual Artwork workflow and
                    # do not turn them into failed/corrupt classification records.
                    if fp.suffix.lower() in SUPPORTED_EXTENSIONS:
                        image_paths.append(fp)
                        rel = str(fp.relative_to(folder)).replace("\\", "/")
                        image_ids.append(image_id_for_name(rel))
                        relative_paths.append(rel)

            job.progress.total = len(image_paths)
            if not image_paths:
                job.progress.phase = "done"
                job.result = ClassifyResult(
                    job_id=job.job_id,
                    folder_path=job.folder_path,
                    total_images=0,
                    classifications=[],
                    model_version=model_manager.get_model().version,
                    taxonomy_version=taxonomy.version,
                )
                job.done.set()
                return

            if job.cancel_flag.is_set():
                job.progress.phase = "cancelled"
                job.done.set()
                return

            job.progress.phase = "preparing_prompts"
            pipeline = ClassificationPipeline(
                taxonomy=taxonomy,
                cache=self.cache,
                reference_bank=self._reference_bank,
                user_thresholds=user_thresholds,
                local_classifier=self.local_classifier,
            )
            pipeline.prepare_text_embeddings()

            if job.cancel_flag.is_set():
                job.progress.phase = "cancelled"
                job.done.set()
                return

            job.progress.phase = "classifying"
            t_start = time.time()

            def _progress(done, total):
                job.progress.processed = done
                job.progress.total = total
                elapsed = time.time() - t_start
                if done > 0:
                    job.progress.batch_speed = round(done / elapsed, 1)
                    remaining = total - done
                    job.progress.eta_seconds = round(remaining / job.progress.batch_speed, 1)

            classifications = pipeline.classify_batch(
                image_paths=image_paths,
                image_ids=image_ids,
                relative_paths=relative_paths,
                batch_size=32,
                cancel_flag=job.cancel_flag,
                progress_cb=_progress,
            )

            category_counts: dict[str, int] = {}
            for c in classifications:
                category_counts[c.main_category] = category_counts.get(c.main_category, 0) + 1

            job.result = ClassifyResult(
                job_id=job.job_id,
                folder_path=job.folder_path,
                total_images=len(classifications),
                classifications=classifications,
                category_counts=category_counts,
                model_version=model_manager.get_model().version,
                taxonomy_version=taxonomy.version,
            )
            job.progress.phase = "done"
            job.progress.processed = len(classifications)
            logger.info("Job %s complete: %d images classified", job.job_id, len(classifications))

        except Exception as e:
            logger.exception("Job %s failed: %s", job.job_id, e)
            job.progress.phase = "error"
            job.progress.error = str(e)
            job.error = str(e)
        finally:
            job.done.set()


_manager: JobManager | None = None
_manager_lock = threading.Lock()


def get_manager() -> JobManager:
    global _manager
    if _manager is not None:
        return _manager
    with _manager_lock:
        if _manager is not None:
            return _manager
        _manager = JobManager()
        return _manager
