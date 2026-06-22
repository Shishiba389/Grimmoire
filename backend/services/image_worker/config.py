from __future__ import annotations

IMAGE_DIMENSION_PRESETS = {
    "square_800": {"width": 800, "height": 800},
    "square_1000": {"width": 1000, "height": 1000},
    "square_1200": {"width": 1200, "height": 1200},
    "square_1500": {"width": 1500, "height": 1500},
    "amazon_main": {"width": 2000, "height": 2000},
    "shopify_square": {"width": 2048, "height": 2048},
    "tiktok_shop": {"width": 1200, "height": 1200},
}


AI_UPSCALE_OPTIONS = {
    "none": {
        "installed": True,
        "description": "No AI upscale. Uses standard high-quality Lanczos resizing.",
    },
    "real_esrgan": {
        "installed": True,
        "description": "Good general-purpose 2x/4x super-resolution. Installed through Real-ESRGAN ncnn-vulkan executable.",
    },
    "real_esrgan_ncnn": {
        "installed": True,
        "description": "Local Real-ESRGAN ncnn-vulkan executable. Recommended production path for this Windows local setup.",
    },
    "swinir": {
        "installed": False,
        "description": "Strong detail restoration, slower and more engineering-heavy than Real-ESRGAN.",
    },
    "stable_sr": {
        "installed": False,
        "description": "Diffusion-based enhancement. Powerful but more likely to hallucinate details, not ideal for strict product accuracy.",
    },
}
