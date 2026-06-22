from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING

import numpy as np
from PIL import Image

if TYPE_CHECKING:
    from .models import ImageEditRequest


COMPOSE_STYLES = {
    "tight":     {"target_occupancy": 0.92, "context_padding": 1.10},
    "balanced":  {"target_occupancy": 0.80, "context_padding": 1.30},
    "breathe":   {"target_occupancy": 0.65, "context_padding": 1.50},
    "cinematic": {"target_occupancy": 0.55, "context_padding": 1.80},
}


@dataclass(frozen=True)
class SceneProfile:
    bg_type: str
    product_bbox: tuple[int, int, int, int] | None
    product_occupancy: float
    centroid: tuple[float, float]
    has_face: bool
    face_bbox: tuple[float, float, float, float] | None
    content_density: float
    img_width: int
    img_height: int


@dataclass(frozen=True)
class ViewportTransform:
    crop_left: float
    crop_top: float
    crop_right: float
    crop_bottom: float
    scale: float
    offset_x: int
    offset_y: int


def analyze_scene(image: Image.Image, white_threshold: int = 248) -> SceneProfile:
    from .processor import (
        analyze_background,
        has_white_background,
        product_content_mask,
    )
    from .models import ImageEditRequest

    dummy_request = ImageEditRequest(canvas_background_mode="smart")
    analysis = analyze_background(image, dummy_request)
    bg_type = analysis.classification if analysis else "white_product"

    rgba = image.convert("RGBA")
    mask = product_content_mask(rgba, white_threshold)
    content_density = float(np.mean(mask))

    product_bbox = None
    product_occupancy = 0.0
    centroid = (0.5, 0.5)
    if np.any(mask):
        ys, xs = np.where(mask)
        product_bbox = (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1)
        bbox_w = product_bbox[2] - product_bbox[0]
        bbox_h = product_bbox[3] - product_bbox[1]
        product_occupancy = (bbox_w * bbox_h) / max(1, image.width * image.height)
        centroid = (
            (product_bbox[0] + product_bbox[2]) / 2 / max(1, image.width),
            (product_bbox[1] + product_bbox[3]) / 2 / max(1, image.height),
        )

    has_face = False
    face_bbox = None
    try:
        import mediapipe as mp
        rgb = image.convert("RGB")
        rgb.thumbnail((512, 512), Image.Resampling.LANCZOS)
        frame = np.asarray(rgb)
        with mp.solutions.face_detection.FaceDetection(model_selection=0, min_detection_confidence=0.45) as fd:
            result = fd.process(frame)
            if result.detections:
                has_face = True
                det = result.detections[0].location_data.relative_bounding_box
                face_bbox = (det.xmin, det.ymin, det.width, det.height)
    except Exception:
        pass

    return SceneProfile(
        bg_type=bg_type,
        product_bbox=product_bbox,
        product_occupancy=product_occupancy,
        centroid=centroid,
        has_face=has_face,
        face_bbox=face_bbox,
        content_density=content_density,
        img_width=image.width,
        img_height=image.height,
    )


def classify_scene(profile: SceneProfile) -> str:
    if profile.has_face:
        return "lifestyle_person"
    if profile.product_bbox is None:
        return "full_frame"
    if profile.product_occupancy < 0.04:
        return "tiny_product"
    if profile.content_density > 0.65:
        return "full_frame"
    if profile.bg_type in {"complex_lifestyle", "smooth_gradient"} and profile.product_occupancy < 0.55:
        return "product_in_context"
    if profile.content_density > 0.35:
        return "multi_product"
    return "solo_product"


def _style_params(style: str) -> tuple[float, float]:
    params = COMPOSE_STYLES.get(style, COMPOSE_STYLES["balanced"])
    return params["target_occupancy"], params["context_padding"]


def _cover_scale(img_w: int, img_h: int, canvas_w: int, canvas_h: int) -> float:
    return max(canvas_w / max(1, img_w), canvas_h / max(1, img_h))


def compose_solo_product(
    profile: SceneProfile, canvas_w: int, canvas_h: int, style: str,
) -> ViewportTransform:
    target_occ, _ = _style_params(style)
    bbox = profile.product_bbox
    if bbox is None:
        return _center_fit(profile, canvas_w, canvas_h)
    bw = bbox[2] - bbox[0]
    bh = bbox[3] - bbox[1]
    product_scale = min(
        canvas_w / max(1, bw) * target_occ,
        canvas_h / max(1, bh) * target_occ,
    )
    min_scale = _cover_scale(profile.img_width, profile.img_height, canvas_w, canvas_h)
    scale = max(product_scale, min_scale)
    product_cx = (bbox[0] + bbox[2]) / 2
    product_cy = (bbox[1] + bbox[3]) / 2
    offset_x = int(round(canvas_w / 2 - product_cx * scale))
    offset_y = int(round(canvas_h / 2 - product_cy * scale))
    offset_x = min(0, max(canvas_w - int(round(profile.img_width * scale)), offset_x))
    offset_y = min(0, max(canvas_h - int(round(profile.img_height * scale)), offset_y))
    return ViewportTransform(0.0, 0.0, 0.0, 0.0, scale, offset_x, offset_y)


def compose_product_in_context(
    profile: SceneProfile, canvas_w: int, canvas_h: int, style: str,
) -> ViewportTransform:
    target_occ, context_pad = _style_params(style)
    bbox = profile.product_bbox
    if bbox is None:
        return _center_fit(profile, canvas_w, canvas_h)
    pad_w = int((bbox[2] - bbox[0]) * (context_pad - 1) / 2)
    pad_h = int((bbox[3] - bbox[1]) * (context_pad - 1) / 2)
    crop_l = max(0, bbox[0] - pad_w) / max(1, profile.img_width)
    crop_t = max(0, bbox[1] - pad_h) / max(1, profile.img_height)
    crop_r = max(0, profile.img_width - bbox[2] - pad_w) / max(1, profile.img_width)
    crop_b = max(0, profile.img_height - bbox[3] - pad_h) / max(1, profile.img_height)
    cropped_w = profile.img_width * (1 - crop_l - crop_r)
    cropped_h = profile.img_height * (1 - crop_t - crop_b)
    scale = min(canvas_w / max(1, cropped_w), canvas_h / max(1, cropped_h))
    offset_x = int(round((canvas_w - cropped_w * scale) / 2))
    offset_y = int(round((canvas_h - cropped_h * scale) / 2))
    return ViewportTransform(crop_l, crop_t, crop_r, crop_b, scale, offset_x, offset_y)


def compose_lifestyle_person(
    profile: SceneProfile, canvas_w: int, canvas_h: int, style: str,
) -> ViewportTransform:
    target_occ, context_pad = _style_params(style)
    if profile.face_bbox is None:
        return _center_fit(profile, canvas_w, canvas_h)
    fx, fy, fw, fh = profile.face_bbox
    face_cx = fx + fw / 2
    face_cy = fy + fh / 2
    product_cx, product_cy = profile.centroid
    gravity_x = face_cx * 0.6 + product_cx * 0.4
    gravity_y = face_cy * 0.6 + product_cy * 0.4
    view_w = min(1.0, context_pad * max(fw * 4, 0.5))
    view_h = min(1.0, context_pad * max(fh * 5, 0.5))
    crop_l = max(0.0, gravity_x - view_w / 2)
    crop_t = max(0.0, gravity_y - view_h / 2)
    if crop_l + view_w > 1.0:
        crop_l = max(0.0, 1.0 - view_w)
    if crop_t + view_h > 1.0:
        crop_t = max(0.0, 1.0 - view_h)
    crop_r = max(0.0, 1.0 - crop_l - view_w)
    crop_b = max(0.0, 1.0 - crop_t - view_h)
    cropped_w = profile.img_width * (1 - crop_l - crop_r)
    cropped_h = profile.img_height * (1 - crop_t - crop_b)
    scale = min(canvas_w / max(1, cropped_w), canvas_h / max(1, cropped_h))
    offset_x = int(round((canvas_w - cropped_w * scale) / 2))
    offset_y = int(round((canvas_h - cropped_h * scale) / 2))
    return ViewportTransform(crop_l, crop_t, crop_r, crop_b, scale, offset_x, offset_y)


def compose_tiny_product(
    profile: SceneProfile, canvas_w: int, canvas_h: int, style: str,
) -> ViewportTransform:
    target_occ, _ = _style_params(style)
    bbox = profile.product_bbox
    if bbox is None:
        return _center_fit(profile, canvas_w, canvas_h)
    bw = bbox[2] - bbox[0]
    bh = bbox[3] - bbox[1]
    product_scale = min(
        canvas_w / max(1, bw) * target_occ,
        canvas_h / max(1, bh) * target_occ,
    )
    min_scale = _cover_scale(profile.img_width, profile.img_height, canvas_w, canvas_h)
    scale = max(product_scale, min_scale)
    product_cx = (bbox[0] + bbox[2]) / 2
    product_cy = (bbox[1] + bbox[3]) / 2
    offset_x = int(round(canvas_w / 2 - product_cx * scale))
    offset_y = int(round(canvas_h / 2 - product_cy * scale))
    offset_x = min(0, max(canvas_w - int(round(profile.img_width * scale)), offset_x))
    offset_y = min(0, max(canvas_h - int(round(profile.img_height * scale)), offset_y))
    return ViewportTransform(0.0, 0.0, 0.0, 0.0, scale, offset_x, offset_y)


def compose_multi_product(
    profile: SceneProfile, canvas_w: int, canvas_h: int, style: str,
) -> ViewportTransform:
    target_occ, _ = _style_params(style)
    return _center_fit(profile, canvas_w, canvas_h, fill_ratio=target_occ)


def compose_full_frame(
    profile: SceneProfile, canvas_w: int, canvas_h: int, style: str,
) -> ViewportTransform:
    scale = max(canvas_w / max(1, profile.img_width), canvas_h / max(1, profile.img_height))
    offset_x = int(round((canvas_w - profile.img_width * scale) / 2))
    offset_y = int(round((canvas_h - profile.img_height * scale) / 2))
    return ViewportTransform(0.0, 0.0, 0.0, 0.0, scale, offset_x, offset_y)


def _center_fit(
    profile: SceneProfile, canvas_w: int, canvas_h: int, fill_ratio: float = 0.85,
) -> ViewportTransform:
    contain_scale = min(
        canvas_w / max(1, profile.img_width),
        canvas_h / max(1, profile.img_height),
    )
    cover = _cover_scale(profile.img_width, profile.img_height, canvas_w, canvas_h)
    scale = max(contain_scale * fill_ratio, cover)
    offset_x = int(round((canvas_w - profile.img_width * scale) / 2))
    offset_y = int(round((canvas_h - profile.img_height * scale) / 2))
    return ViewportTransform(0.0, 0.0, 0.0, 0.0, scale, offset_x, offset_y)


SCENE_COMPOSERS = {
    "solo_product": compose_solo_product,
    "product_in_context": compose_product_in_context,
    "lifestyle_person": compose_lifestyle_person,
    "tiny_product": compose_tiny_product,
    "multi_product": compose_multi_product,
    "full_frame": compose_full_frame,
}


def viewport_to_layer_params(
    vt: ViewportTransform,
    img_width: int,
    img_height: int,
    canvas_w: int,
    canvas_h: int,
) -> dict:
    return {
        "layer_crop_left": max(0.0, min(1.0, vt.crop_left)),
        "layer_crop_top": max(0.0, min(1.0, vt.crop_top)),
        "layer_crop_right": max(0.0, min(1.0, vt.crop_right)),
        "layer_crop_bottom": max(0.0, min(1.0, vt.crop_bottom)),
        "layer_scale": max(0.01, min(20.0, vt.scale)),
        "layer_x": float(vt.offset_x),
        "layer_y": float(vt.offset_y),
    }


def auto_compose(image: Image.Image, request: ImageEditRequest) -> ImageEditRequest:
    profile = analyze_scene(image, request.white_threshold)
    scene = classify_scene(profile)
    style = getattr(request, "auto_compose_style", "balanced")
    composer = SCENE_COMPOSERS.get(scene, compose_solo_product)
    vt = composer(profile, request.width, request.height, style)
    params = viewport_to_layer_params(vt, image.width, image.height, request.width, request.height)
    return request.model_copy(update={
        "manual_transform_enabled": True,
        **params,
    })
