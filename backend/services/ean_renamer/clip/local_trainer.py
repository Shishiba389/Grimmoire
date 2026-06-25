from __future__ import annotations

import logging
import pickle
from pathlib import Path

import numpy as np

from .correction_store import CorrectionStore
from .embedding_cache import EmbeddingCache
from .paths import local_classifier_path as _default_model_path

logger = logging.getLogger("grimoire.clip.trainer")


class LocalClassifier:
    def __init__(self, model_path: Path | None = None):
        self._model_path = model_path or _default_model_path()
        self._model = None
        self._classes: list[str] = []
        self._loaded = False

    @property
    def is_trained(self) -> bool:
        return self._loaded and self._model is not None

    def load(self) -> bool:
        if not self._model_path.exists():
            return False
        try:
            with open(self._model_path, "rb") as f:
                data = pickle.load(f)
            self._model = data["model"]
            self._classes = data["classes"]
            self._loaded = True
            logger.info("Local classifier loaded: %d classes", len(self._classes))
            return True
        except Exception as e:
            logger.warning("Failed to load local classifier: %s", e)
            return False

    def train(
        self,
        correction_store: CorrectionStore,
        embedding_cache: EmbeddingCache,
        model_version: str,
        min_per_category: int = 10,
    ) -> bool:
        training_data = correction_store.get_training_data(min_per_category=min_per_category)
        if training_data is None:
            logger.info("Not enough corrections to train (min %d per category)", min_per_category)
            return False

        hashes, labels = training_data
        embeddings = []
        valid_labels = []

        for h, label in zip(hashes, labels):
            emb = embedding_cache.lookup_hash(h, model_version)
            if emb is not None:
                embeddings.append(emb.astype(np.float32))
                valid_labels.append(label)

        if len(valid_labels) < 20:
            logger.info("Not enough valid embeddings to train: %d", len(valid_labels))
            return False

        X = np.stack(embeddings)
        y = np.array(valid_labels)

        from sklearn.linear_model import LogisticRegression
        from sklearn.model_selection import StratifiedKFold, cross_val_score
        from sklearn.preprocessing import LabelEncoder

        le = LabelEncoder()
        y_encoded = le.fit_transform(y)

        n_splits = min(5, min(np.bincount(y_encoded)))
        if n_splits < 2:
            logger.info("Not enough samples per class for cross-validation")
            return False

        clf = LogisticRegression(
            max_iter=1000, C=1.0, solver="lbfgs",
        )

        cv = StratifiedKFold(n_splits=n_splits, shuffle=True, random_state=42)
        scores = cross_val_score(clf, X, y_encoded, cv=cv, scoring="accuracy")
        mean_acc = scores.mean()
        logger.info("CV accuracy: %.3f (+/- %.3f)", mean_acc, scores.std())

        if mean_acc < 0.5:
            logger.warning("CV accuracy too low (%.3f), not saving model", mean_acc)
            return False

        clf.fit(X, y_encoded)

        self._model_path.parent.mkdir(parents=True, exist_ok=True)
        with open(self._model_path, "wb") as f:
            pickle.dump({
                "model": clf,
                "classes": le.classes_.tolist(),
                "label_encoder": le,
                "accuracy": mean_acc,
                "n_samples": len(y),
            }, f)

        self._model = clf
        self._classes = le.classes_.tolist()
        self._loaded = True
        logger.info("Local classifier trained and saved: %d samples, %.1f%% accuracy", len(y), mean_acc * 100)
        return True

    def predict(self, embedding: np.ndarray) -> dict[str, float] | None:
        if not self.is_trained:
            return None
        X = embedding.astype(np.float32).reshape(1, -1)
        probas = self._model.predict_proba(X)[0]
        return {cls: float(p) for cls, p in zip(self._classes, probas)}
