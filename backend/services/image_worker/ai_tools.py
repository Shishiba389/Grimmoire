from __future__ import annotations

import importlib.util
import os
import subprocess
from pathlib import Path


def project_root() -> Path:
    return Path(__file__).resolve().parents[2]


def realesrgan_executable() -> Path | None:
    tools_dir = project_root() / "tools" / "ai" / "realesrgan-ncnn-vulkan"
    names = ["realesrgan-ncnn-vulkan.exe"] if os.name == "nt" else ["realesrgan-ncnn-vulkan"]
    for name in names:
        matches = [path for path in tools_dir.rglob(name) if path.is_file()]
        if matches:
            return matches[0]
    return None


def pytorch_realesrgan_python() -> Path:
    env_dir = project_root().parent / "realesrgan-pytorch-env"
    if os.name == "nt":
        return env_dir / "Scripts" / "python.exe"
    return env_dir / "bin" / "python"


def pytorch_realesrgan_weight() -> Path:
    return project_root() / "tools" / "ai" / "weights" / "RealESRGAN_x4plus.pth"


def ai_tool_status() -> dict[str, dict[str, object]]:
    exe = realesrgan_executable()
    sharp_status = sharp_tool_status()
    onnx_status = onnxruntime_status()
    return {
        "sharp_libvips": sharp_status,
        "real_esrgan_ncnn_vulkan": {
            "installed": exe is not None,
            "path": str(exe) if exe else "",
            "purpose": "Local 2x/3x/4x product image upscale with low dependency overhead.",
        },
        "rembg": {
            "installed": importlib.util.find_spec("rembg") is not None,
            "purpose": "ONNX background removal and product segmentation.",
        },
        "onnxruntime": onnx_status,
        "npu_acceleration": npu_acceleration_status(onnx_status),
        "mediapipe": {
            "installed": importlib.util.find_spec("mediapipe") is not None,
            "purpose": "Face, hand, and pose detection for people/human-part rejection.",
        },
        "pytorch_real_esrgan": {
            "installed": verify_pytorch_realesrgan(),
            "path": str(pytorch_realesrgan_python()),
            "weight_path": str(pytorch_realesrgan_weight()),
            "purpose": "Separate PyTorch Real-ESRGAN environment isolated from the main AIO venv.",
        },
    }


def onnxruntime_status() -> dict[str, object]:
    if importlib.util.find_spec("onnxruntime") is None:
        return {
            "installed": False,
            "providers": [],
            "purpose": "Local ONNX model inference runtime for background removal and segmentation.",
        }
    try:
        import onnxruntime as ort

        providers = list(ort.get_available_providers())
    except Exception as exc:
        return {
            "installed": True,
            "providers": [],
            "purpose": "Local ONNX model inference runtime for background removal and segmentation.",
            "error": str(exc),
        }
    return {
        "installed": True,
        "providers": providers,
        "purpose": "Local ONNX model inference runtime for background removal and segmentation.",
    }


def npu_acceleration_status(onnx_status: dict[str, object]) -> dict[str, object]:
    providers = [str(provider) for provider in onnx_status.get("providers", [])]
    accelerator_keywords = ("QNN", "OpenVINO", "CoreML", "Dml", "DirectML", "VitisAI", "ROCM", "CUDA")
    accelerated = [provider for provider in providers if any(keyword.lower() in provider.lower() for keyword in accelerator_keywords)]
    return {
        "installed": bool(accelerated),
        "providers": accelerated,
        "purpose": "Optional acceleration path for ONNX segmentation/background-removal models. CPU fallback remains supported.",
        "note": "NPU support depends on machine-specific ONNX Runtime providers; this package does not force one provider globally.",
    }


def verify_realesrgan() -> bool:
    exe = realesrgan_executable()
    if exe is None:
        return False
    result = subprocess.run([str(exe), "-h"], capture_output=True, text=True, timeout=20)
    return "Usage: realesrgan-ncnn-vulkan" in (result.stdout + result.stderr)


def verify_pytorch_realesrgan() -> bool:
    python_exe = pytorch_realesrgan_python()
    if not python_exe.exists():
        return False
    if not pytorch_realesrgan_weight().exists():
        return False
    code = "import numpy, torch, torchvision, basicsr, facexlib, gfpgan, realesrgan"
    result = subprocess.run([str(python_exe), "-c", code], capture_output=True, text=True, timeout=60)
    return result.returncode == 0


def sharp_tool_status() -> dict[str, object]:
    code = (
        "const sharp=require('sharp');"
        "const status={installed:true,sharp:sharp.versions.sharp,vips:sharp.versions.vips,"
        "formats:{jpeg:!!sharp.format.jpeg.input.file,png:!!sharp.format.png.input.file,"
        "webp:!!sharp.format.webp.input.file,tiff:!!sharp.format.tiff.input.file,"
        "avif:!!(sharp.format.heif&&sharp.format.heif.input.file)}};"
        "console.log(JSON.stringify(status));"
    )
    try:
        result = subprocess.run(["node", "-e", code], cwd=project_root(), capture_output=True, text=True, timeout=20)
    except Exception as exc:
        return {
            "installed": False,
            "purpose": "Sharp/libvips high-performance image transforms.",
            "error": str(exc),
        }
    if result.returncode != 0:
        return {
            "installed": False,
            "purpose": "Sharp/libvips high-performance image transforms.",
            "error": (result.stderr or result.stdout).strip(),
        }
    import json

    payload = json.loads(result.stdout)
    payload["purpose"] = "Sharp/libvips high-performance image transforms and AVIF/WebP/JPEG/PNG/TIFF compatibility checks."
    return payload


def verify_sharp() -> bool:
    return bool(sharp_tool_status().get("installed"))
