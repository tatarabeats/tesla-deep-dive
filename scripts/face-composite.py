"""
Face composite: paste real face onto AI-generated body images.
Uses face detection to find the face region in both source and target,
then blends the real face onto the AI body.
"""

import sys
import os
from PIL import Image, ImageFilter
import numpy as np

def find_face_region_center(img, face_fraction=0.25):
    """Estimate face region as upper-center portion of portrait image."""
    w, h = img.size
    # For portraits, face is typically in upper 30-40% centered
    face_w = int(w * face_fraction)
    face_h = int(h * face_fraction)
    cx = w // 2
    cy = int(h * 0.22)  # Face center is roughly 22% from top in portraits
    return (cx - face_w // 2, cy - face_h // 2, cx + face_w // 2, cy + face_h // 2)

def composite_face(real_photo_path, ai_body_path, output_path, face_scale=1.0, y_offset=0):
    """
    Composite real face onto AI-generated body.

    real_photo_path: Path to real photo (source of face)
    ai_body_path: Path to AI-generated image (target body)
    output_path: Where to save result
    face_scale: Scale factor for face size
    y_offset: Vertical offset adjustment
    """
    real = Image.open(real_photo_path).convert("RGBA")
    ai_body = Image.open(ai_body_path).convert("RGBA")

    body_w, body_h = ai_body.size

    # Determine face region on AI body
    if body_w > body_h:
        # Landscape - face is smaller portion
        face_frac = 0.20
    else:
        # Portrait
        face_frac = 0.28

    face_box = find_face_region_center(ai_body, face_frac)
    face_w = face_box[2] - face_box[0]
    face_h = face_box[3] - face_box[1]

    # Scale face
    face_w = int(face_w * face_scale)
    face_h = int(face_h * face_scale)

    # Crop and resize real face
    # Auto-detect: if real photo is a headshot, use center portion
    rw, rh = real.size
    # Crop face from real photo (center, upper portion)
    crop_size = min(rw, rh) * 0.6
    rcx, rcy = rw // 2, int(rh * 0.35)
    r_left = max(0, int(rcx - crop_size / 2))
    r_top = max(0, int(rcy - crop_size / 2))
    r_right = min(rw, int(rcx + crop_size / 2))
    r_bottom = min(rh, int(rcy + crop_size / 2))

    face_crop = real.crop((r_left, r_top, r_right, r_bottom))
    face_crop = face_crop.resize((face_w, face_h), Image.LANCZOS)

    # Create circular/elliptical mask for smooth blending
    mask = Image.new("L", (face_w, face_h), 0)
    mask_np = np.array(mask)
    cy_m, cx_m = face_h // 2, face_w // 2
    ry, rx = face_h // 2 - 2, face_w // 2 - 2
    Y, X = np.ogrid[:face_h, :face_w]
    dist = ((X - cx_m) / rx) ** 2 + ((Y - cy_m) / ry) ** 2
    mask_np[dist <= 1.0] = 255
    # Feather edges
    mask = Image.fromarray(mask_np)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=max(face_w, face_h) // 8))

    # Paste face onto AI body
    result = ai_body.copy()
    paste_x = (face_box[0] + face_box[2]) // 2 - face_w // 2
    paste_y = (face_box[1] + face_box[3]) // 2 - face_h // 2 + y_offset

    result.paste(face_crop, (paste_x, paste_y), mask)

    # Save as WebP
    result = result.convert("RGB")
    result.save(output_path, "webp", quality=92)
    print(f"[OK] {output_path} ({result.size[0]}x{result.size[1]})")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python face-composite.py <real_photo> <ai_body> <output> [scale] [y_offset]")
        sys.exit(1)

    scale = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0
    y_off = int(sys.argv[5]) if len(sys.argv) > 5 else 0
    composite_face(sys.argv[1], sys.argv[2], sys.argv[3], scale, y_off)
