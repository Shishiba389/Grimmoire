"""GRIMOIRE — Desktop App Launcher.
Starts the unified FastAPI backend, then opens a native PyWebView window.
"""
from __future__ import annotations

import os
import sys
import threading
import time
import socket

ROOT = os.path.dirname(os.path.abspath(__file__))
BACKEND = os.path.join(ROOT, "backend")

sys.path.insert(0, BACKEND)
os.chdir(BACKEND)

BACKEND_PORT = 7788
APP_TITLE = "GRIMOIRE"


def find_free_port(preferred: int) -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind(("127.0.0.1", preferred))
            return preferred
        except OSError:
            s.bind(("127.0.0.1", 0))
            return s.getsockname()[1]


def start_backend(port: int) -> None:
    import uvicorn
    from main import app

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=port,
        log_level="warning",
        access_log=False,
    )


def wait_for_backend(port: int, timeout: float = 30.0) -> bool:
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with socket.create_connection(("127.0.0.1", port), timeout=1):
                return True
        except OSError:
            time.sleep(0.3)
    return False


def ensure_storage() -> None:
    for sub in ["storage", "storage/uploads", "storage/outputs", "storage/rules"]:
        os.makedirs(os.path.join(BACKEND, sub), exist_ok=True)


def main() -> None:
    ensure_storage()

    port = find_free_port(BACKEND_PORT)

    server_thread = threading.Thread(target=start_backend, args=(port,), daemon=True)
    server_thread.start()

    print(f"[GRIMOIRE] Starting backend on port {port}...")
    if not wait_for_backend(port):
        print("[ERROR] Backend did not start within 30 seconds.")
        sys.exit(1)
    print(f"[GRIMOIRE] Backend ready at http://127.0.0.1:{port}")
    print(f"[GRIMOIRE] API docs at http://127.0.0.1:{port}/docs")

    import webview

    window = webview.create_window(
        APP_TITLE,
        url=f"http://127.0.0.1:{port}",
        width=1440,
        height=900,
        min_size=(1024, 600),
        resizable=True,
        text_select=True,
    )
    webview.start(debug=("--debug" in sys.argv))


if __name__ == "__main__":
    main()
