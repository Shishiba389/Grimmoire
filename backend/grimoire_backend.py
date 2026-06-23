from __future__ import annotations

import argparse

import uvicorn


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the GRIMOIRE backend service.")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=7788)
    parser.add_argument("--log-level", default="warning")
    args = parser.parse_args()

    uvicorn.run(
        "main:app",
        host=args.host,
        port=args.port,
        log_level=args.log_level,
        access_log=False,
        timeout_keep_alive=30,
    )


if __name__ == "__main__":
    main()
