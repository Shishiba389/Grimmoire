import { apiJson } from "../ToolShared";
import { matchesQuery } from "./hooks";
import { MatchThumbnail } from "./MatchThumbnail";
import type { MatchResult, SortJobRecord } from "./types";

interface Props {
  folder: string;
  query: string;
  notify: (msg: string, opts?: Record<string, unknown>) => void;
  matchResults: MatchResult[];
  sortJob: SortJobRecord | null;
}

const TIER_STYLE: Record<string, string> = {
  ean: "sor-tier-ean",
  code: "sor-tier-code",
  name: "sor-tier-name",
};

export function ReviewView({ folder, query, notify, matchResults, sortJob }: Props) {
  const summary = sortJob?.summary as Record<string, unknown> | undefined;
  const moved = Number(summary?.moved ?? 0);
  const eanFolders = (summary?.ean_folders as string[]) ?? [];
  const errors = (summary?.errors as string[]) ?? [];
  const matched = matchResults.filter((r) => r.status === "matched").length;
  const unmatched = matchResults.filter((r) => r.status === "unmatched").length;

  const filtered = matchResults.filter((r) =>
    matchesQuery(query, r.image_name, r.source_folder, r.candidates?.[0]?.ean, r.candidates?.[0]?.product_name),
  );

  async function openInExcel() {
    try {
      await apiJson("/api/ean-sorter/report/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
    } catch (err) {
      notify("Failed to open report", { type: "error", message: err instanceof Error ? err.message : String(err) });
    }
  }

  async function exportReport() {
    try {
      await apiJson("/api/ean-sorter/report/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      notify("Report exported", { type: "success" });
    } catch (err) {
      notify("Export failed", { type: "error", message: err instanceof Error ? err.message : String(err) });
    }
  }

  async function revealFolder() {
    if (!folder) return;
    if (window.__grimoire?.revealInExplorer) {
      window.__grimoire.revealInExplorer(folder);
    } else {
      try {
        await apiJson("/api/local/reveal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: folder }),
        });
      } catch { /* ignore */ }
    }
  }

  if (!sortJob && matchResults.length === 0) {
    return (
      <div className="sor-view-content">
        <div className="sor-empty-box">
          No results yet. Run a scan and sort from the Scanner tab first.
        </div>
      </div>
    );
  }

  return (
    <div className="sor-view-content">
      {/* Summary stats */}
      <div className="sor-review-summary">
        <div className="sor-stat"><span>Matched</span><strong>{matched}</strong></div>
        <div className="sor-stat"><span>Unmatched</span><strong>{unmatched}</strong></div>
        <div className="sor-stat"><span>Moved</span><strong>{moved}</strong></div>
        <div className="sor-stat"><span>EAN Folders</span><strong>{eanFolders.length}</strong></div>
      </div>

      {/* Sort job status */}
      {sortJob && sortJob.status === "running" && (
        <div className="sor-info-banner" style={{ marginBottom: 18 }}>
          Sorting in progress... {Number((sortJob.summary as Record<string, unknown>)?.progress_percent ?? 0)}%
          <div className="sor-progress-bar">
            <div className="sor-progress-fill" style={{ width: `${Number((sortJob.summary as Record<string, unknown>)?.progress_percent ?? 0)}%` }} />
          </div>
        </div>
      )}

      {sortJob?.status === "failed" && (
        <div className="sor-info-banner" style={{ marginBottom: 18, background: "rgba(239, 68, 68, 0.1)", borderColor: "rgba(239, 68, 68, 0.3)" }}>
          Sort failed: {sortJob.error || "Unknown error"}
        </div>
      )}

      {sortJob?.status === "completed" && (
        <div className="sor-info-banner success" style={{ marginBottom: 18 }}>
          Sort completed. {moved} files moved into {eanFolders.length} EAN folder(s).
          {errors.length > 0 && ` (${errors.length} errors)`}
        </div>
      )}

      {/* Report table */}
      <div className="sor-panel">
        <div className="sor-panel-head">
          <h2>Sort Report</h2>
          <div className="sor-panel-actions">
            <span className="sor-count">{filtered.length} of {matchResults.length}</span>
            <button className="sor-btn-compact" onClick={openInExcel}>Open in Excel</button>
            <button className="sor-btn-compact" onClick={exportReport}>Export</button>
            <button className="sor-btn-compact" onClick={revealFolder}>Reveal folder</button>
          </div>
        </div>
        <div className="sor-table-wrap sor-report-wrap">
          <table className="sor-tbl">
            <thead>
              <tr>
                <th>#</th>
                <th>Preview</th>
                <th>Image Name</th>
                <th>Tier</th>
                <th>Matched EAN</th>
                <th>Product</th>
                <th>Confidence</th>
                <th>Source Folder</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="sor-empty">No results.</td></tr>
              )}
              {filtered.map((r, i) => {
                const best = r.candidates[r.selected_index ?? 0];
                const tierClass = best ? TIER_STYLE[best.tier] || "sor-tier-none" : "sor-tier-none";
                return (
                  <tr key={r.image_path}>
                    <td>{i + 1}</td>
                    <td><MatchThumbnail folder={folder} result={r} /></td>
                    <td title={r.image_path}>{r.image_name}</td>
                    <td><span className={`sor-tag ${tierClass}`}>{best?.tier?.toUpperCase() || "NONE"}</span></td>
                    <td>{best?.ean || "—"}</td>
                    <td className="sor-path-cell">{best?.product_name || "—"}</td>
                    <td>{best ? `${Math.round(best.confidence * 100)}%` : "—"}</td>
                    <td className="sor-path-cell" title={r.source_folder}>{r.source_folder}</td>
                    <td>
                      <span className={`sor-tag ${r.status === "matched" ? "sor-tier-ean" : "missing"}`}>
                        {r.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
