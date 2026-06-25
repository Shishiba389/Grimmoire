# GRIMOIRE

Desktop application for product data management and image processing.

## Features

### AIO (All-In-One)
- Product data quality check and validation
- Batch processing for large datasets

### EAN Sorter
- Sort and categorize product images by EAN barcode
- Smart file-image matching — 3-tier engine: EAN → Article Code → Product Name (fuzzy)
- Gallery view with filtering and reporting
- Bulk folder processing

### EAN Renamer
- Rename product images following standardized naming conventions
- Bulk working mode with folder queue
- Custom EAN/Product Name input support
- Batch status tracking (Done/In Progress)

### Image Editor
- Built-in image editing tools for product photos
- Background removal and transparency support

## What's New in 2.0.0

### CLIP AI Image Classification
- Auto-classification suggests product categories based on image content
- Excel-driven taxonomy with customizable prompts
- Reference image bank per category for improved accuracy
- Correction learning — user fixes are stored and improve future predictions

### New Installer
- Full setup wizard with component selection (Core / CLIP Taxonomy / Reference Examples)
- Auto-detects and cleans up previous Grimoire installations
- Portable — no hardcoded paths, works on any Windows x64 machine

### Auto-Update
- Background update check via GitHub on startup
- Patch updates — only downloads changed files, not the full installer
- One-click apply with automatic restart

### Optimizations
- Torch CPU-only for AI features (~122 MB vs ~2.5 GB CUDA)
- Removed unnecessary PySide6 dependency (~200 MB saved)
- LZMA2 ultra compression for smallest installer size

## System Requirements
- Windows 10/11 (64-bit)
- ~500 MB disk space (full installation)
- All dependencies bundled — no additional software required
