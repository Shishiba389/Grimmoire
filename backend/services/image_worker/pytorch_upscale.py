from __future__ import annotations

import argparse
from pathlib import Path

import cv2
from basicsr.archs.rrdbnet_arch import RRDBNet
from realesrgan import RealESRGANer


def main() -> int:
    parser = argparse.ArgumentParser(description="CPU/GPU PyTorch Real-ESRGAN upscale helper.")
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--weights", required=True)
    parser.add_argument("--device", choices=["cpu", "cuda", "auto"], default="cpu")
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)
    weights_path = Path(args.weights)
    if not weights_path.exists():
        raise FileNotFoundError(f"Missing Real-ESRGAN weights: {weights_path}")

    model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=4)
    upsampler = RealESRGANer(
        scale=4,
        model_path=str(weights_path),
        model=model,
        tile=0,
        tile_pad=10,
        pre_pad=0,
        half=False,
        gpu_id=None if args.device == "cpu" else 0,
    )

    image = cv2.imread(str(input_path), cv2.IMREAD_UNCHANGED)
    if image is None:
        raise ValueError(f"Could not read input image: {input_path}")
    output, _ = upsampler.enhance(image, outscale=4)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    if not cv2.imwrite(str(output_path), output):
        raise RuntimeError(f"Could not write output image: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
