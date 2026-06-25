import { memo } from "react";
import type { BulkMatchResult } from "./types";

type MatchSummary = {
  total: number;
  matched: number;
  ambiguous: number;
  unmatched: number;
};

type Props = {
  results: BulkMatchResult[];
  summary: MatchSummary | null;
  onSelect: (key: string, candidateIdx: number) => void;
  onConfirm: () => void;
  onClose: () => void;
};

export const MasterDataMatchModal = memo(function MasterDataMatchModal({
  results,
  summary,
  onSelect,
  onConfirm,
  onClose,
}: Props) {
  return (
    <div className="ren-modal-overlay" onClick={onClose}>
      <div className="ren-modal ren-match-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ren-modal-header">
          <h3>Master Data Match Results</h3>
          <button className="ren-modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="ren-modal-body">
          {summary && (
            <div className="ren-match-summary">
              <div className="ren-match-stat"><span>Total</span><strong>{summary.total}</strong></div>
              <div className="ren-match-stat ren-match-ok"><span>Matched</span><strong>{summary.matched}</strong></div>
              <div className="ren-match-stat ren-match-amb"><span>Ambiguous</span><strong>{summary.ambiguous}</strong></div>
              <div className="ren-match-stat ren-match-miss"><span>Unmatched</span><strong>{summary.unmatched}</strong></div>
            </div>
          )}
          <table className="ren-preview-table ren-preview-table-full">
            <thead>
              <tr>
                <th>Folder</th>
                <th>Tier</th>
                <th>Matched EAN</th>
                <th>Product</th>
                <th>Confidence</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => {
                const best = r.candidates[r.selected_index ?? 0];
                const hasAmbiguous = r.status === "ambiguous" || (r.candidates.length > 1 && r.selected_index === null);
                return (
                  <tr key={r.key} className={hasAmbiguous ? "ren-row-ambiguous" : ""}>
                    <td title={r.name}>{r.name}</td>
                    <td>
                      {best ? (
                        <span className={`ren-tier-badge ren-tier-${best.tier}`}>{best.tier.toUpperCase()}</span>
                      ) : (
                        <span className="ren-tier-badge ren-tier-none">NONE</span>
                      )}
                    </td>
                    <td>
                      {hasAmbiguous && r.candidates.length > 1 ? (
                        <select
                          value={r.selected_index ?? ""}
                          onChange={(e) => onSelect(r.key, Number(e.target.value))}
                          className="ren-match-select"
                        >
                          <option value="" disabled>Select...</option>
                          {r.candidates.map((c, ci) => (
                            <option key={ci} value={ci}>
                              {c.ean} — {c.product_name || "N/A"} ({Math.round(c.confidence * 100)}%)
                            </option>
                          ))}
                        </select>
                      ) : (
                        best?.ean || "—"
                      )}
                    </td>
                    <td>{best?.product_name || "—"}</td>
                    <td>{best ? `${Math.round(best.confidence * 100)}%` : "—"}</td>
                    <td>
                      <span className={`ren-bulk-status ${r.status === "matched" ? "ready" : r.status === "ambiguous" ? "missing" : ""}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="ren-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-primary"
            onClick={onConfirm}
            disabled={results.some((r) => r.status === "ambiguous" && r.selected_index === null)}
          >
            Apply Matches
          </button>
        </div>
      </div>
    </div>
  );
});
