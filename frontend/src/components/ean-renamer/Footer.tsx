import { memo } from "react";
import type { ViewMode, SettingsState, BulkWorkItem } from "./types";

type Props = {
  viewMode: ViewMode;
  previewExpanded: boolean;
  setPreviewExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  busy: boolean;
  folderPath: string;
  settings: SettingsState;
  bulkRootPath: string;
  bulkItems: BulkWorkItem[];
  lastLogPath: string;
  onPreview: () => void;
  onApply: () => void;
  onUndo: () => void;
  onLoadBulkFolder: (path: string) => void;
  onOpenNextBatch: () => void;
};

export const Footer = memo(function Footer(props: Props) {
  const {
    viewMode, previewExpanded, setPreviewExpanded, busy, folderPath,
    settings, bulkRootPath, bulkItems, lastLogPath,
    onPreview, onApply, onUndo, onLoadBulkFolder, onOpenNextBatch,
  } = props;

  return (
    <div className="ren-footer">
      <div className="ren-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setPreviewExpanded((v) => !v)}
          disabled={viewMode === "bulk"}
        >
          {previewExpanded ? "Hide Preview" : "Show Preview"}
        </button>
        <div className="ren-actions-right">
          {viewMode === "bulk" ? (
            <>
              <button className="btn btn-secondary" onClick={() => (bulkRootPath || folderPath) && onLoadBulkFolder(bulkRootPath || folderPath)} disabled={busy || !(bulkRootPath || folderPath)}>
                Rescan
              </button>
              <button className="btn btn-primary" onClick={onOpenNextBatch} disabled={busy || bulkItems.length === 0}>
                Open Next Batch
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={onPreview} disabled={busy || !folderPath}>
                Preview
              </button>
              <button className="btn btn-primary" onClick={onApply} disabled={busy || !folderPath}>
                {settings.outputMode === "copy" ? "Copy" : "Rename"}
              </button>
              <button className="btn btn-secondary" onClick={onUndo} disabled={busy || !lastLogPath}>
                Undo
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
