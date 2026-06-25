import { memo } from "react";
import type { RenamePlanItem } from "./types";
import { planOutput } from "./types";

type Props = {
  renamePlan: RenamePlanItem[];
  onApply: () => void;
  onClose: () => void;
};

export const PreviewModal = memo(function PreviewModal({ renamePlan, onApply, onClose }: Props) {
  return (
    <div className="ren-modal-overlay" onClick={onClose}>
      <div className="ren-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ren-modal-header">
          <h3>Rename Preview</h3>
          <button className="ren-modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="ren-modal-body">
          <table className="ren-preview-table ren-preview-table-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Current Name</th>
                <th></th>
                <th>Output Path</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {renamePlan.map((item, i) => (
                <tr key={i} className={`ren-plan-${item.status || "rename"}`}>
                  <td>{i + 1}</td>
                  <td>{item.category}</td>
                  <td>{item.oldName}</td>
                  <td className="ren-arrow">&rarr;</td>
                  <td>{planOutput(item)}</td>
                  <td>
                    <span className={`ren-status-badge ren-status-${item.status || "rename"}`}>{item.status || "rename"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ren-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onApply();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
});
