# GRIMOIRE 2.1.0

## Bulk Working

- Fixed PDF retention in bulk scans and folder opening.
- Root scans now return lightweight folder summaries, then load full files only
  for the folder being worked on.
- PDF files stay visible for manual review and are not sent to CLIP.
- Added queue search and status filters.
- Replaced the endlessly horizontal board with a responsive grid and internal
  column scrolling.
- Added a direct selected-file move control and persistent custom output
  columns compatible with EAN Renamer output rules.

## Simplified application

- Removed EAN Sorter, Packshot Browser, SharePoint browsing, and Image Edit
  from this GRIMOIRE build.
- Moved Image Edit source to a separate unbuilt workspace for future dedicated
  application work.
- Removed Image Edit-only native workers, dependencies, and packaging assets
  from the GRIMOIRE runtime.

## Quality and packaging

- Added backend PDF scanner/API tests and frontend output-mapping tests.
- Added an actionable frontend lint configuration and test command.
- Rebuilt the frontend before desktop packaging so WebView2 receives the
  current UI.
- Patch archives now include a deletion manifest, so retired files can be
  removed during an in-place update.

## Update notes

Close GRIMOIRE before applying a patch. A full installer remains the recovery
path if a workstation skipped several releases or has a damaged runtime.
