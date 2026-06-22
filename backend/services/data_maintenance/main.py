from __future__ import annotations

import argparse
import json
from pathlib import Path

from .service import run_data_maintenance


def main() -> int:
    parser = argparse.ArgumentParser(description="Run DATA_MAINTANCE audit on a master data file.")
    parser.add_argument("--input", required=True, help="Path to master data .xlsx/.xlsm/.csv")
    parser.add_argument("--output", help="Optional output .xlsx path")
    args = parser.parse_args()

    summary = run_data_maintenance(Path(args.input), Path(args.output) if args.output else None)
    print(json.dumps(summary.model_dump(), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
