from __future__ import annotations

import os
from pathlib import Path


def project_root() -> Path:
    return Path(__file__).resolve().parents[2]


def node_executable() -> str:
    root = project_root()
    candidates = []
    if os.name == "nt":
        candidates.extend([
            root / "node" / "node.exe",
            root / "node.exe",
        ])
    else:
        candidates.extend([
            root / "node" / "bin" / "node",
            root / "node",
        ])

    for candidate in candidates:
        if candidate.exists():
            return str(candidate)
    return "node"
