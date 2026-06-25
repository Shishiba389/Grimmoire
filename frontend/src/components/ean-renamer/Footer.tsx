import { memo } from "react";
import type { SettingsState } from "./types";

type Props = {
  previewExpanded: boolean;
  setPreviewExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  busy: boolean;
  folderPath: string;
  settings: SettingsState;
  lastLogPath: string;
  onPreview: () => void;
  onApply: () => void;
  onUndo: () => void;
};

export const Footer = memo(function Footer(props: Props) {
  const {
    previewExpanded, setPreviewExpanded, busy, folderPath,
    settings, lastLogPath,
    onPreview, onApply, onUndo,
  } = props;

  return (
    <div className="ren-footer">
      <div className="ren-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setPreviewExpanded((v) => !v)}
        >
          {previewExpanded ? "Hide Preview" : "Show Preview"}
        </button>
        <div className="ren-actions-right">
          <button className="btn btn-secondary" onClick={onPreview} disabled={busy || !folderPath}>
            Preview
          </button>
          <button className="btn btn-primary" onClick={onApply} disabled={busy || !folderPath}>
            {settings.outputMode === "copy" ? "Copy" : "Rename"}
          </button>
          <button className="btn btn-secondary" onClick={onUndo} disabled={busy || !lastLogPath}>
            Undo
          </button>
        </div>
      </div>
    </div>
  );
});
