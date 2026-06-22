from __future__ import annotations

from enum import StrEnum
from pathlib import Path

from pydantic import BaseModel, Field, field_validator, model_validator


class FitMode(StrEnum):
    contain = "contain"
    cover = "cover"
    stretch = "stretch"


class MarginMode(StrEnum):
    percent = "percent"
    pixels = "pixels"


class OutputMode(StrEnum):
    zip = "zip"
    local_folder = "local_folder"


class CanvasBackgroundMode(StrEnum):
    white = "white"
    smart = "smart"
    edge_extend = "edge_extend"
    blur_cover = "blur_cover"
    ai_expand = "ai_expand"


class BackgroundRemovalMode(StrEnum):
    border_white = "border_white"
    rembg = "rembg"
    sam2 = "sam2"


class StandardUpscaleMethod(StrEnum):
    pillow_lanczos = "pillow_lanczos"
    pillow_bicubic = "pillow_bicubic"
    opencv_lanczos4 = "opencv_lanczos4"
    opencv_cubic = "opencv_cubic"


class ClarityEnhanceMode(StrEnum):
    auto = "auto"
    none = "none"
    light = "light"
    medium = "medium"
    strong = "strong"


class ImageEditRequest(BaseModel):
    layout_preset: str = "manual"
    width: int = Field(default=1000, ge=1, le=12000)
    height: int = Field(default=1000, ge=1, le=12000)
    fit_mode: FitMode = FitMode.contain
    margin: float = Field(default=0, ge=0, le=6000)
    margin_mode: MarginMode = MarginMode.percent
    dpi: int = Field(default=72, ge=1, le=2400)
    background: str = "#FFFFFF"
    canvas_background_mode: CanvasBackgroundMode = CanvasBackgroundMode.white
    background_removal_mode: BackgroundRemovalMode = BackgroundRemovalMode.border_white
    output_format: str = "jpg"
    output_quality: int = Field(default=95, ge=1, le=100)
    max_file_size_mb: float = Field(default=0, ge=0, le=100)
    naming_rule: str = "{ean}_{index}"
    crop_to_content: bool = True
    remove_white_space_around_product: bool = False
    product_fill_enabled: bool = False
    product_fill_ratio: int = Field(default=88, ge=10, le=100)
    product_safe_padding: int = Field(default=8, ge=0, le=1000)
    white_threshold: int = Field(default=248, ge=0, le=255)
    require_white_background: bool = False
    reject_human_parts: bool = False
    auto_product_fill: bool = False
    fill_ratio: float = Field(default=0.88, ge=0.1, le=1.0)
    safe_padding: int = Field(default=0, ge=0, le=1000)
    normalize_product_size: bool = False
    product_target_occupancy: float = Field(default=0.88, ge=0.1, le=1.0)
    remove_shadow: bool = False
    remove_background: bool = False
    manual_transform_enabled: bool = False
    layer_x: float | None = None
    layer_y: float | None = None
    layer_scale: float = Field(default=1.0, ge=0.01, le=20)
    layer_scale_x: float | None = Field(default=None, ge=0.01, le=20)
    layer_scale_y: float | None = Field(default=None, ge=0.01, le=20)
    layer_crop_left: float = Field(default=0, ge=0, le=1)
    layer_crop_top: float = Field(default=0, ge=0, le=1)
    layer_crop_right: float = Field(default=0, ge=0, le=1)
    layer_crop_bottom: float = Field(default=0, ge=0, le=1)
    auto_compose_enabled: bool = False
    auto_compose_style: str = "balanced"
    ai_canvas_expand_enabled: bool = False
    ai_canvas_expand_provider: str = "comfyui"
    ai_canvas_expand_prompt: str = "clean commercial product photo background, consistent lighting"
    upscale_mode: str = "none"
    standard_upscale_method: StandardUpscaleMethod = StandardUpscaleMethod.pillow_lanczos
    clarity_enhance: ClarityEnhanceMode = ClarityEnhanceMode.auto
    upscale_scale: int = Field(default=2, ge=2, le=4)
    upscale_model: str = "realesrgan-x4plus"
    upscale_cpu_fallback: bool = True
    max_workers: int = Field(default=2, ge=1, le=16)
    include_subfolders: bool = True
    preserve_folder_structure: bool = True
    output_mode: OutputMode = OutputMode.zip

    @model_validator(mode="after")
    def apply_layout_options(self) -> "ImageEditRequest":
        if self.product_fill_enabled:
            self.auto_product_fill = True
            self.normalize_product_size = True
            self.fill_ratio = self.product_fill_ratio / 100
            self.product_target_occupancy = self.product_fill_ratio / 100
            self.safe_padding = self.product_safe_padding
        if self.layout_preset == "canva_fill":
            self.fit_mode = FitMode.cover
            self.crop_to_content = False
            self.auto_product_fill = False
            self.normalize_product_size = False
            self.manual_transform_enabled = False
        elif self.layout_preset == "object_aware_canvas":
            self.fit_mode = FitMode.contain
            self.canvas_background_mode = CanvasBackgroundMode.smart
            self.crop_to_content = True
            self.remove_white_space_around_product = True
            self.auto_product_fill = True
            self.normalize_product_size = True
            self.fill_ratio = self.product_fill_ratio / 100
            self.product_target_occupancy = self.product_fill_ratio / 100
            self.safe_padding = self.product_safe_padding
            self.manual_transform_enabled = False
        elif self.layout_preset == "canva_manual":
            self.crop_to_content = False
            self.remove_white_space_around_product = False
            self.auto_product_fill = False
            self.normalize_product_size = False
            self.manual_transform_enabled = True
        elif self.layout_preset == "auto_compose":
            self.crop_to_content = False
            self.remove_white_space_around_product = False
            self.auto_product_fill = False
            self.normalize_product_size = False
            self.manual_transform_enabled = True
            self.auto_compose_enabled = True
        elif self.layout_preset == "ai_canvas_expand":
            self.canvas_background_mode = CanvasBackgroundMode.ai_expand
            self.ai_canvas_expand_enabled = True
            self.manual_transform_enabled = False
        if self.background_removal_mode in {BackgroundRemovalMode.rembg, BackgroundRemovalMode.sam2}:
            self.remove_background = True
        return self

    @field_validator("output_format")
    @classmethod
    def normalize_output_format(cls, value: str) -> str:
        text = str(value or "jpg").lower().strip().lstrip(".")
        if text == "jpeg":
            return "jpg"
        if text not in {"jpg", "png", "webp", "tiff"}:
            return "jpg"
        return text


class ImageEditSummary(BaseModel):
    input_count: int
    processed_count: int
    skipped_count: int
    output_zip: str = ""
    output_dir: str
    manifest_path: str
    worker_count: int
    progress_percent: int = 100
    current_file: str = ""
    warnings: list[str] = []
    items: list[dict] = []


class ProcessedImage(BaseModel):
    original_filename: str
    output_filename: str
    status: str
    width: int | None = None
    height: int | None = None
    dpi: int | None = None
    message: str = ""
    source_path: Path | None = None
    output_path: Path | None = None
    relative_path: str = ""
    ean: str = ""
    background_classification: str = ""
    background_strategy: str = ""
    background_confidence: float | None = None
