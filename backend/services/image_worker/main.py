from __future__ import annotations

import argparse
import json
from pathlib import Path

from .models import FitMode, ImageEditRequest, MarginMode
from .processor import run_image_edit


def main() -> int:
    parser = argparse.ArgumentParser(description="Run IMAGE_EDIT processing on image files or zip files.")
    parser.add_argument("--input", nargs="+", required=True, help="Image file(s) or zip file(s)")
    parser.add_argument("--output-dir", required=True, help="Output directory")
    parser.add_argument("--width", type=int, default=1000)
    parser.add_argument("--height", type=int, default=1000)
    parser.add_argument("--fit-mode", choices=[mode.value for mode in FitMode], default=FitMode.contain.value)
    parser.add_argument("--margin", type=float, default=0)
    parser.add_argument("--margin-mode", choices=[mode.value for mode in MarginMode], default=MarginMode.percent.value)
    parser.add_argument("--dpi", type=int, default=72)
    parser.add_argument("--format", default="jpg")
    parser.add_argument("--naming-rule", default="{original_stem}_{width}x{height}_{index}")
    parser.add_argument("--no-crop", action="store_true")
    parser.add_argument("--upscale-mode", default="none")
    parser.add_argument("--upscale-scale", type=int, default=2)
    parser.add_argument("--upscale-model", default="realesrgan-x4plus")
    parser.add_argument("--no-cpu-fallback", action="store_true")
    parser.add_argument("--max-workers", type=int, default=2)
    args = parser.parse_args()

    request = ImageEditRequest(
        width=args.width,
        height=args.height,
        fit_mode=FitMode(args.fit_mode),
        margin=args.margin,
        margin_mode=MarginMode(args.margin_mode),
        dpi=args.dpi,
        output_format=args.format,
        naming_rule=args.naming_rule,
        crop_to_content=not args.no_crop,
        upscale_mode=args.upscale_mode,
        upscale_scale=args.upscale_scale,
        upscale_model=args.upscale_model,
        upscale_cpu_fallback=not args.no_cpu_fallback,
        max_workers=args.max_workers,
    )
    summary = run_image_edit([Path(value) for value in args.input], Path(args.output_dir), request)
    print(json.dumps(summary.model_dump(), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
