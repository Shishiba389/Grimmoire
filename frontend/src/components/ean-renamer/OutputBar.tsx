import { memo } from "react";
import type { KanbanColumn } from "./types";
import { columnCategoryKey, outputLabelForColumn } from "./types";

type Props = {
  workflowColumns: KanbanColumn[];
  outputFolders: Record<string, string>;
  onSetOutputFolders: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onPickOutput: (category: string) => void;
};

export const OutputBar = memo(function OutputBar({
  workflowColumns,
  outputFolders,
  onSetOutputFolders,
  onPickOutput,
}: Props) {
  return (
    <div className="ren-output-bar">
      <span className="ren-output-label">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        Output
      </span>
      <div className="ren-output-fields">
        {workflowColumns.map((col) => {
          const category = columnCategoryKey(col.key);
          const legacyPath = outputFolders[outputLabelForColumn(col)] || outputFolders[col.title];
          const outputPath = outputFolders[category] || outputFolders[col.key] || legacyPath;
          return (
            <div key={col.key} className="ren-output-field" onClick={() => onPickOutput(category)}>
              <span className="ren-output-cat">{outputLabelForColumn(col)}</span>
              <span className="ren-output-path">{outputPath || "Set output"}</span>
              {outputPath && (
                <button
                  className="ren-output-clear"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetOutputFolders((prev) => {
                      const next = { ...prev };
                      delete next[category];
                      delete next[col.key];
                      delete next[col.title];
                      delete next[outputLabelForColumn(col)];
                      return next;
                    });
                  }}
                >
                  &times;
                </button>
              )}
            </div>
          );
        })}
      </div>
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => onSetOutputFolders({})}
        disabled={Object.keys(outputFolders).length === 0}
      >
        Clear all
      </button>
    </div>
  );
});
