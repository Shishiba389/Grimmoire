import { useState, useRef, useCallback } from "react";
import { apiJson } from "../ToolShared";
import { useMasterData, matchesQuery } from "./hooks";
import { MatchThumbnail } from "./MatchThumbnail";
import type { ScanResult, MatchResponse, MatchResult, SortJobRecord } from "./types";

interface Props {
  folder: string;
  query: string;
  notify: (msg: string, opts?: Record<string, unknown>) => void;
  onSortStarted: (job: SortJobRecord) => void;
  onMatchResults: (results: MatchResult[]) => void;
}

const TIER_STYLE: Record<string, string> = {
  ean: "sor-tier-ean",
  code: "sor-tier-code",
  name: "sor-tier-name",
};

export function ScannerView({ folder, query, notify, onSortStarted, onMatchResults }: Props) {
  const master = useMasterData();
  const masterFileRef = useRef<HTMLInputElement>(null);

  const [busy, setBusy] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [matchSummary, setMatchSummary] = useState<MatchResponse["summary"] | null>(null);
  const [deleteEmpty, setDeleteEmpty] = useState(false);
  const [looseCollected, setLooseCollected] = useState(false);

  const hasAmbiguous = matchResults.some((r) => r.status === "ambiguous");

  async function doDeepScan() {
    if (!folder) { notify("Choose a folder first", { type: "warning" }); return; }
    setBusy(true);
    setMatchResults([]);
    setMatchSummary(null);
    setLooseCollected(false);
    try {
      const res = await apiJson<ScanResult>("/api/ean-sorter/deep-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      setScanResult(res);
      localStorage.setItem("grimoire-ean-sorter-root", res.folder || folder);
      notify("Deep scan complete", {
        type: "success",
        message: `${res.total_count} images in ${res.subfolder_count} subfolders, ${res.loose_images.length} loose`,
      });
    } catch (err) {
      notify("Scan failed", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setBusy(false);
    }
  }

  async function doCollectLoose() {
    setBusy(true);
    try {
      const res = await apiJson<{ ok: boolean; count: number }>("/api/ean-sorter/collect-loose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      setLooseCollected(true);
      notify(`Collected ${res.count} loose image(s) into _LOOSE_IMAGES`, { type: "success" });
    } catch (err) {
      notify("Failed to collect loose images", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setBusy(false);
    }
  }

  async function handleMasterFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await master.uploadFile(file);
      notify(`Master data loaded: ${file.name}`, { type: "success" });
    } catch (err) {
      notify("Failed to load master data", { type: "error", message: err instanceof Error ? err.message : String(err) });
    }
  }

  async function handleMasterPick() {
    if (!window.__grimoire?.pickFile) {
      masterFileRef.current?.click();
      return;
    }
    const picked = await window.__grimoire.pickFile(
      "Select master data file",
      "Excel workbooks (*.xlsx;*.xls)|*.xlsx;*.xls|CSV (*.csv)|*.csv|All files (*.*)|*.*",
    );
    if (!picked) return;
    try {
      await master.uploadPath(picked);
      notify("Master data loaded", { type: "success" });
    } catch (err) {
      notify("Failed to load master data", { type: "error", message: err instanceof Error ? err.message : String(err) });
    }
  }

  async function doMatch() {
    if (!scanResult) { notify("Run a deep scan first", { type: "warning" }); return; }
    setBusy(true);
    try {
      const res = await apiJson<MatchResponse>("/api/ean-sorter/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder, session_id: master.sessionId }),
      });
      setMatchResults(res.results);
      setMatchSummary(res.summary);
      onMatchResults(res.results);
      notify("Matching complete", {
        type: res.summary.ambiguous > 0 ? "warning" : "success",
        message: `${res.summary.matched} matched, ${res.summary.ambiguous} ambiguous, ${res.summary.unmatched} unmatched`,
      });
    } catch (err) {
      notify("Match failed", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setBusy(false);
    }
  }

  const handleSelectCandidate = useCallback((imgPath: string, candidateIdx: number) => {
    setMatchResults((prev) =>
      prev.map((r) =>
        r.image_path === imgPath
          ? { ...r, selected_index: candidateIdx, status: "matched" as const }
          : r,
      ),
    );
  }, []);

  async function doSort() {
    if (hasAmbiguous) { notify("Resolve all ambiguous matches first", { type: "warning" }); return; }

    setBusy(true);
    try {
      await apiJson("/api/ean-sorter/match/override", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: master.sessionId,
          overrides: matchResults
            .filter((r) => r.selected_index !== null)
            .map((r) => ({ image_path: r.image_path, selected_index: r.selected_index })),
        }),
      });

      const job = await apiJson<SortJobRecord>("/api/ean-sorter/sort-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folder,
          session_id: master.sessionId,
          delete_empty: deleteEmpty,
        }),
      });
      onSortStarted(job);
      notify("Sort job started", { type: "info" });
    } catch (err) {
      notify("Sort failed", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setBusy(false);
    }
  }

  const filtered = matchResults.filter((r) =>
    matchesQuery(query, r.image_name, r.source_folder, r.candidates?.[0]?.ean, r.candidates?.[0]?.product_name),
  );

  return (
    <div className="sor-view-content">
      {/* Hero */}
      <section className="sor-hero">
        <div className="sor-hero-main">
          <div className="sor-chips">
            {["Deep Scan", "Master Data", "3-Tier Match", "Auto Sort"].map((c) => (
              <span className="sor-chip" key={c}>{c}</span>
            ))}
          </div>
          <div>
            <p className="sor-eyebrow">EAN Sorter v2</p>
            <h1 className="sor-headline">Smart image sorting by product data</h1>
          </div>
          <div className="sor-hero-actions">
            <button className="sor-btn-primary" onClick={doDeepScan} disabled={busy || !folder}>
              Deep Scan
            </button>
            <button className="sor-btn-secondary" onClick={doMatch} disabled={busy || !scanResult}>
              Match
            </button>
            <button className="sor-btn-primary" onClick={doSort} disabled={busy || !matchResults.length || hasAmbiguous}>
              Sort
            </button>
            <label className="sor-toggle">
              <input type="checkbox" checked={deleteEmpty} onChange={(e) => setDeleteEmpty(e.target.checked)} />
              <span />
              Delete empty folders
            </label>
          </div>
        </div>

        <div className="sor-action-card">
          <div>
            <span className="sor-card-label">Master Data</span>
            <strong>{master.rowCount > 0 ? `${master.rowCount} rows` : "Not loaded"}</strong>
          </div>
          {master.columnsDetected.length > 0 && (
            <p>{master.columnsDetected.join(" · ")}</p>
          )}
          {master.warnings.length > 0 && (
            <p style={{ color: "#eab308" }}>{master.warnings[0]}</p>
          )}
          <button className="sor-btn-gold" onClick={handleMasterPick} disabled={master.loading}>
            {master.loading ? "Loading..." : "Upload Master Data"}
          </button>
          <input ref={masterFileRef} type="file" accept=".xlsx,.xls,.csv" className="sor-hidden-file" onChange={handleMasterFile} />
        </div>
      </section>

      {/* Stats */}
      {scanResult && (
        <div className="sor-stats">
          <div className="sor-stat"><span>Total Images</span><strong>{scanResult.total_count}</strong></div>
          <div className="sor-stat"><span>Subfolders</span><strong>{scanResult.subfolder_count}</strong></div>
          <div className="sor-stat"><span>Loose Images</span><strong>{scanResult.loose_images.length}</strong></div>
          <div className="sor-stat"><span>Matched</span><strong>{matchSummary?.matched ?? "—"}</strong></div>
          <div className="sor-stat"><span>Ambiguous</span><strong>{matchSummary?.ambiguous ?? "—"}</strong></div>
        </div>
      )}

      {/* Loose images banner */}
      {scanResult && scanResult.loose_images.length > 0 && !looseCollected && (
        <div className="sor-info-banner" style={{ marginTop: 18 }}>
          <span>{scanResult.loose_images.length} image(s) not inside any subfolder.</span>
          <button className="sor-btn-compact" onClick={doCollectLoose} disabled={busy}>
            Collect into _LOOSE_IMAGES
          </button>
        </div>
      )}
      {looseCollected && (
        <div className="sor-info-banner success" style={{ marginTop: 18 }}>
          Loose images collected successfully.
        </div>
      )}

      {/* Match results table */}
      {matchResults.length > 0 && (
        <div className="sor-panel" style={{ marginTop: 22 }}>
          <div className="sor-panel-head">
            <h2>Match Results</h2>
            <span className="sor-count">{filtered.length} of {matchResults.length}</span>
          </div>
          <div className="sor-table-wrap sor-report-wrap">
            <table className="sor-tbl">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Image Name</th>
                  <th>Tier</th>
                  <th>Matched EAN</th>
                  <th>Product</th>
                  <th>Confidence</th>
                  <th>Source</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="sor-empty">No results match your search.</td></tr>
                )}
                {filtered.map((r) => {
                  const best = r.candidates[r.selected_index ?? 0];
                  const tierClass = best ? TIER_STYLE[best.tier] || "sor-tier-none" : "sor-tier-none";
                  return (
                    <tr key={r.image_path} className={r.status === "ambiguous" ? "sor-row-ambiguous" : ""}>
                      <td><MatchThumbnail folder={folder} result={r} /></td>
                      <td title={r.image_path}>{r.image_name}</td>
                      <td>
                        <span className={`sor-tag ${tierClass}`}>
                          {best?.tier?.toUpperCase() || "NONE"}
                        </span>
                      </td>
                      <td>
                        {r.status === "ambiguous" && r.candidates.length > 1 ? (
                          <select
                            value={r.selected_index ?? ""}
                            onChange={(e) => handleSelectCandidate(r.image_path, Number(e.target.value))}
                            style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--bg-input)", color: "var(--text-primary)", font: "inherit", fontSize: 13 }}
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
                      <td className="sor-path-cell">{best?.product_name || "—"}</td>
                      <td>{best ? `${Math.round(best.confidence * 100)}%` : "—"}</td>
                      <td className="sor-path-cell" title={r.source_folder}>{r.source_folder.split(/[\\/]/).pop()}</td>
                      <td>
                        <span className={`sor-tag ${r.status === "matched" ? "sor-tier-ean" : r.status === "ambiguous" ? "sor-tier-name" : "missing"}`}>
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
      )}
    </div>
  );
}
