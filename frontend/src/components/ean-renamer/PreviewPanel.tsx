import { memo, type RefObject } from "react";
import type { RenamePlanItem } from "./types";
import { planOutput } from "./types";

type PlanStats = {
  renamed: number;
  skipped: number;
  conflicts: number;
};

type Props = {
  renamePlan: RenamePlanItem[];
  planStats: PlanStats;
  previewHeight: number;
  resizeRef: RefObject<HTMLDivElement | null>;
  busy: boolean;
  folderPath: string;
  onRefresh: () => void;
  onClose: () => void;
  onResizeStart: (e: React.MouseEvent) => void;
};

export const PreviewPanel = memo(function PreviewPanel({
  renamePlan,
  planStats,
  previewHeight,
  resizeRef,
  busy,
  folderPath,
  onRefresh,
  onClose,
  onResizeStart,
}: Props) {
  return (
    <div className="ren-preview-popover">
      <div className="ren-preview-popover-head">
        <strong>Rename Preview</strong>
        <div className="ren-preview-popover-actions">
          <button className="btn btn-secondary btn-sm" onClick={onRefresh} disabled={busy || !folderPath}>Refresh</button>
          <button className="ren-modal-close" onClick={onClose}>&times;</button>
        </div>
      </div>
      <div className="ren-resize-handle" ref={resizeRef} onMouseDown={onResizeStart} />
      <div className="ren-preview-panel" style={{ height: previewHeight }}>
        <div className="ren-preview-table-wrap">
          <table className="ren-preview-table">
            <thead>
              <tr>
                <th>Current Name</th>
                <th></th>
                <th>Output Path</th>
              </tr>
            </thead>
            <tbody>
              {renamePlan.slice(0, 50).map((item, i) => (
                <tr key={i} className={`ren-plan-${item.status || "rename"}`}>
                  <td>{item.oldName}</td>
                  <td className="ren-arrow">&rarr;</td>
                  <td>{planOutput(item)}</td>
                </tr>
              ))}
              {renamePlan.length === 0 && (
                <tr>
                  <td colSpan={3} className="ren-table-empty">Click Preview to generate rename plan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="ren-summary-card">
          <div className="ren-summary-item ren-summary-green">
            <strong>{planStats.renamed}</strong>
            <span>To rename</span>
          </div>
          <div className="ren-summary-item">
            <strong>{planStats.skipped}</strong>
            <span>Skipped</span>
          </div>
          <div className={`ren-summary-item ${planStats.conflicts > 0 ? "ren-summary-amber" : ""}`}>
            <strong>{planStats.conflicts}</strong>
            <span>Conflicts</span>
          </div>
        </div>
      </div>
    </div>
  );
});
