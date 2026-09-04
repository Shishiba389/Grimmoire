# Bulk Working

Bulk Working is the queue-based EAN output workflow in GRIMOIRE.

## Performance model

1. Selecting a root folder runs a lightweight scan. Each queue card receives a
   folder path, file count, PDF count, and up to four sample previews.
2. Opening a card loads the complete media list only for that folder.
3. CLIP classifies supported visual media. PDFs stay in the workflow but are
   not sent to CLIP, preventing false corruption errors and unnecessary work.

This removes the former full-queue payload bottleneck and keeps root scans
responsive for large collections.

## Operator flow

1. Choose a root folder.
2. Optionally load master data or import an existing mapping.
3. Filter the queue by folder, EAN, product name, or status.
4. Open a folder, review automatic results and PDFs, then classify files.
5. Set per-category output folders.
6. Preview all output paths and conflicts.
7. Copy or rename, then continue with Done or Next.

## UI and accessibility

- The board uses a responsive grid instead of an endlessly horizontal lane.
- Each category has its own internal file scroll area.
- Drag and drop remains available, but selected files can also be moved with a
  direct destination control.
- Queue filters reduce visual load for large batches.
- Motion is disabled when the operating system requests reduced motion.

## Custom columns and output

Use **Manage columns** to add a category such as `Detail shots`. The category
appears immediately in the board and output bar. Its safe key is sent to the
EAN Renamer backend as a custom category, so its files are written to the
matching output folder. Custom columns are remembered in the local browser
profile; per-folder output paths remain explicitly selected by the user.

## Validation coverage

`backend/tests/test_bulk_scanner.py` covers PDF retention in summary scans,
full folder opening, and the Bulk Scan API response. Frontend helper tests cover
standard and custom output-category mapping.
