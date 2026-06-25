import { useState, useRef, useEffect, useMemo } from "react";
import { apiJson, pickFolder } from "../ToolShared";
import { matchesQuery } from "./hooks";
import type { UncategorizedItem, StatusFileData, SortJobRecord } from "./types";

interface Props {
  folder: string;
  query: string;
  notify: (msg: string, opts?: Record<string, unknown>) => void;
}

const CATEGORY_OPTIONS = [
  "Active",
  "Upcoming",
  "Limited",
  "Blanks",
  "N/A",
  "Unknown",
  "Non-ACR",
  "Others",
] as const;

export function CategorizeView({ folder, query, notify }: Props) {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [categoriesCreated, setCategoriesCreated] = useState(false);
  const [uncategorized, setUncategorized] = useState<UncategorizedItem[]>([]);
  const [selectedUncategorized, setSelectedUncategorized] = useState<Set<string>>(new Set());
  const [moveTarget, setMoveTarget] = useState("");
  const [showMoveConfirm, setShowMoveConfirm] = useState(false);
  const [catBusy, setCatBusy] = useState(false);

  const statusFileRef = useRef<HTMLInputElement>(null);
  const [statusData, setStatusData] = useState<StatusFileData | null>(null);
  const [statusBusy, setStatusBusy] = useState(false);
  const [statusFilePath, setStatusFilePath] = useState("");
  const [statusBrowserFileName, setStatusBrowserFileName] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set());
  const [statusDest, setStatusDest] = useState("");
  const [showNoBarcodePrompt, setShowNoBarcodePrompt] = useState(false);
  const [showDuplicatePrompt, setShowDuplicatePrompt] = useState(false);
  const [useNameForNoBarcode, setUseNameForNoBarcode] = useState(false);
  const [noBarcodeStatuses, setNoBarcodeStatuses] = useState<Set<string>>(new Set());
  const [perProductForDuplicates, setPerProductForDuplicates] = useState(false);
  const [statusFoldersCreated, setStatusFoldersCreated] = useState(false);
  const [statusCreateResult, setStatusCreateResult] = useState<{ count: number; skipped_count: number } | null>(null);
  const [statusJob, setStatusJob] = useState<SortJobRecord | null>(null);

  const noBarcodeStatusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const product of statusData?.no_barcode ?? []) {
      const status = product.status?.trim() || "Blanks";
      counts[status] = (counts[status] || 0) + 1;
    }
    return counts;
  }, [statusData?.no_barcode]);

  const visibleNoBarcodeProducts = useMemo(() => {
    if (!statusData) return [];
    return statusData.no_barcode.filter((p) => noBarcodeStatuses.has(p.status?.trim() || "Blanks"));
  }, [noBarcodeStatuses, statusData]);

  const filteredUncategorized = uncategorized.filter((u) =>
    matchesQuery(query, u.name, u.type, u.oldFolder),
  );

  /* ── Status file job polling ── */
  useEffect(() => {
    if (!statusJob || !["pending", "running"].includes(statusJob.status)) return;
    let cancelled = false;
    const timer = window.setInterval(async () => {
      try {
        const next = await apiJson<SortJobRecord>(`/api/jobs/${statusJob.id}`);
        if (cancelled) return;
        setStatusJob(next);
        if (next.status === "completed") {
          window.clearInterval(timer);
          const summary = next.summary || {};
          const count = Number(summary.created_count || 0);
          const skipped = Number(summary.skipped_count || 0);
          setStatusFoldersCreated(true);
          setStatusCreateResult({ count, skipped_count: skipped });
          setStatusBusy(false);
          notify(`Created ${count} folder(s)`, {
            type: "success",
            message: skipped > 0 ? `${skipped} product(s) skipped (no barcode)` : undefined,
          });
        } else if (next.status === "failed") {
          window.clearInterval(timer);
          setStatusBusy(false);
          notify("Failed to create folders", { type: "error", message: next.error || "Status folder job failed" });
        }
      } catch (err) {
        window.clearInterval(timer);
        setStatusBusy(false);
        notify("Could not check folder job", { type: "error", message: err instanceof Error ? err.message : String(err) });
      }
    }, 1000);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, [statusJob?.id, statusJob?.status]);

  /* ── Category helpers ── */
  function toggleCategory(cat: string) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedCategories.size === CATEGORY_OPTIONS.length) {
      setSelectedCategories(new Set());
    } else {
      setSelectedCategories(new Set(CATEGORY_OPTIONS));
    }
  }

  async function createCategoryFolders() {
    if (!folder || selectedCategories.size === 0) return;
    setCatBusy(true);
    try {
      await apiJson("/api/ean-sorter/categorize/create-folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder, categories: [...selectedCategories] }),
      });
      setCategoriesCreated(true);
      notify("Category folders created", { type: "success", message: `${selectedCategories.size} folder(s) created` });
      await loadUncategorized();
    } catch (err) {
      notify("Failed to create folders", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setCatBusy(false);
    }
  }

  async function loadUncategorized() {
    if (!folder) return;
    setCatBusy(true);
    try {
      const res = await apiJson<{ items: UncategorizedItem[] }>("/api/ean-sorter/categorize/uncategorized", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      setUncategorized(res.items);
      setSelectedUncategorized(new Set());
    } catch (err) {
      notify("Failed to load uncategorized items", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setCatBusy(false);
    }
  }

  function toggleUncategorizedItem(path: string) {
    setSelectedUncategorized((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path); else next.add(path);
      return next;
    });
  }

  function toggleAllUncategorized() {
    if (selectedUncategorized.size === filteredUncategorized.length) {
      setSelectedUncategorized(new Set());
    } else {
      setSelectedUncategorized(new Set(filteredUncategorized.map((u) => u.path)));
    }
  }

  function promptMove(category: string) {
    if (selectedUncategorized.size === 0) {
      notify("Select images to move first", { type: "warning" });
      return;
    }
    setMoveTarget(category);
    setShowMoveConfirm(true);
  }

  async function confirmMove() {
    if (!folder || !moveTarget || selectedUncategorized.size === 0) return;
    setShowMoveConfirm(false);
    setCatBusy(true);
    try {
      const res = await apiJson<{ moved: number; errors: string[] }>("/api/ean-sorter/categorize/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder, category: moveTarget, paths: [...selectedUncategorized] }),
      });
      notify(`Moved ${res.moved} item(s) to ${moveTarget}`, { type: "success" });
      if (res.errors.length > 0) {
        notify(`${res.errors.length} error(s)`, { type: "warning", message: res.errors.slice(0, 3).join("; ") });
      }
      await loadUncategorized();
    } catch (err) {
      notify("Move failed", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setCatBusy(false);
      setMoveTarget("");
    }
  }

  /* ── Status file helpers ── */
  async function pickStatusFile() {
    if (!window.__grimoire?.pickFile) {
      statusFileRef.current?.click();
      return;
    }
    const picked = await window.__grimoire.pickFile(
      "Select status file",
      "Excel workbooks (*.xlsx;*.xls)|*.xlsx;*.xls|All files (*.*)|*.*",
    );
    if (picked) {
      setStatusFilePath(picked);
      setStatusBrowserFileName("");
      if (statusFileRef.current) statusFileRef.current.value = "";
    }
  }

  async function handleStatusFileUpload() {
    const file = statusFileRef.current?.files?.[0];
    if (!file && !statusFilePath) { notify("Select a status file", { type: "warning" }); return; }
    setStatusBusy(true);
    setStatusData(null);
    setStatusFoldersCreated(false);
    setStatusCreateResult(null);
    setStatusJob(null);
    setSelectedStatuses(new Set());
    setNoBarcodeStatuses(new Set());
    setUseNameForNoBarcode(false);
    setPerProductForDuplicates(false);
    try {
      const res = statusFilePath
        ? await apiJson<StatusFileData & { ok: boolean }>("/api/ean-sorter/categorize/read-status-file-path", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: statusFilePath }),
          })
        : await (async () => {
            const form = new FormData();
            form.append("file", file as File);
            return apiJson<StatusFileData & { ok: boolean }>("/api/ean-sorter/categorize/read-status-file", {
              method: "POST",
              body: form,
            });
          })();
      setStatusData(res);
      setNoBarcodeStatuses(new Set(res.no_barcode.map((p) => p.status?.trim() || "Blanks")));
      notify(`Read ${res.total} products for ${res.brand}`, { type: "success" });
      if (res.no_barcode_count > 0) setShowNoBarcodePrompt(true);
      if (Object.keys(res.duplicates).length > 0) setShowDuplicatePrompt(true);
    } catch (err) {
      notify("Failed to read status file", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setStatusBusy(false);
    }
  }

  function toggleStatus(s: string) {
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else next.add(s);
      return next;
    });
  }

  function toggleNoBarcodeStatus(status: string) {
    setNoBarcodeStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status); else next.add(status);
      return next;
    });
  }

  async function pickStatusDest() {
    const picked = await pickFolder("Select destination for status folders");
    if (picked) setStatusDest(picked);
  }

  async function createStatusFolders() {
    if (!statusData || selectedStatuses.size === 0 || !statusDest) {
      notify("Select statuses and a destination folder", { type: "warning" });
      return;
    }
    setStatusBusy(true);
    try {
      const res = await apiJson<SortJobRecord>("/api/ean-sorter/categorize/create-status-folders-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: statusDest,
          products: statusData.products,
          statuses: [...selectedStatuses],
          brand: statusData.brand,
          use_name_for_no_barcode: useNameForNoBarcode,
          no_barcode_statuses: [...noBarcodeStatuses],
          per_product_for_duplicates: perProductForDuplicates,
        }),
      });
      setStatusJob(res);
      notify("Status folder job started", { type: "info", message: res.id });
    } catch (err) {
      notify("Failed to create folders", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setStatusBusy(false);
    }
  }

  return (
    <div className="sor-view-content">
      {!categoriesCreated ? (
        <div className="sor-cat-setup">
          {/* Category folder creation */}
          <div className="sor-panel">
            <div className="sor-panel-head">
              <h2>Create Category Folders</h2>
              <span className="sor-count">{selectedCategories.size} selected</span>
            </div>
            <div className="sor-cat-body">
              <p className="sor-cat-desc">
                Select which category folders to create inside your working directory.
                These folders will be used to organize uncategorized images (items with no EAN detected).
              </p>
              <div className="sor-cat-select-all">
                <label className="sor-cat-check">
                  <input type="checkbox" checked={selectedCategories.size === CATEGORY_OPTIONS.length} onChange={toggleSelectAll} />
                  <span>Select All</span>
                </label>
              </div>
              <div className="sor-cat-grid">
                {CATEGORY_OPTIONS.map((cat) => (
                  <label key={cat} className={`sor-cat-option${selectedCategories.has(cat) ? " selected" : ""}`}>
                    <input type="checkbox" checked={selectedCategories.has(cat)} onChange={() => toggleCategory(cat)} />
                    <span className="sor-cat-name">{cat}</span>
                  </label>
                ))}
              </div>
              <div className="sor-cat-actions">
                <button className="sor-btn-primary" onClick={createCategoryFolders} disabled={catBusy || !folder || selectedCategories.size === 0}>
                  {catBusy ? "Creating..." : "Create Folders"}
                </button>
              </div>
            </div>
          </div>

          {/* Status file folder creation */}
          <div className="sor-panel" style={{ marginTop: 16 }}>
            <div className="sor-panel-head">
              <h2>Create Folders from Status File</h2>
            </div>
            <div className="sor-cat-body">
              <p className="sor-cat-desc">
                Upload a <strong>[Brand]_Missing_Data_Status.xlsx</strong> file to create product folders
                organized by status, with EAN barcodes as subfolder names.
              </p>
              <div className="sor-status-file-row">
                <input
                  ref={statusFileRef}
                  type="file"
                  accept=".xlsx,.xls"
                  className="sor-hidden-file"
                  onChange={(e) => {
                    const nextFile = e.currentTarget.files?.[0];
                    if (nextFile) {
                      setStatusFilePath("");
                      setStatusBrowserFileName(nextFile.name);
                    }
                  }}
                />
                <button className="sor-btn-secondary" onClick={pickStatusFile} disabled={statusBusy}>
                  Choose File
                </button>
                <span className="sor-status-file-name">
                  {statusFilePath || statusBrowserFileName || "No file chosen"}
                </span>
                <button className="sor-btn-primary" onClick={handleStatusFileUpload} disabled={statusBusy}>
                  {statusBusy ? "Reading..." : "Read File"}
                </button>
              </div>

              {statusData && (
                <>
                  <div className="sor-cat-desc" style={{ marginBottom: 8, padding: "8px 12px", background: "var(--sor-card-bg, #1e1e2e)", borderRadius: 6 }}>
                    <strong>{statusData.brand}</strong> — {statusData.total} products
                    {Object.entries(statusData.statuses).map(([s, c]) => (
                      <span key={s} style={{ marginLeft: 12, opacity: 0.8 }}>{s}: {c}</span>
                    ))}
                  </div>

                  <p className="sor-cat-desc" style={{ marginBottom: 6 }}>Select which status folders to create:</p>
                  <div className="sor-cat-grid">
                    {Object.entries(statusData.statuses).map(([s, count]) => (
                      <label key={s} className={`sor-cat-option${selectedStatuses.has(s) ? " selected" : ""}`}>
                        <input type="checkbox" checked={selectedStatuses.has(s)} onChange={() => toggleStatus(s)} />
                        <span className="sor-cat-name">{s} ({count})</span>
                      </label>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12 }}>
                    <button className="sor-btn-secondary" onClick={pickStatusDest}>
                      {statusDest ? "Change Destination" : "Choose Destination"}
                    </button>
                    {statusDest && <span className="sor-cat-desc" style={{ fontSize: 12 }}>{statusDest}</span>}
                  </div>

                  <div className="sor-cat-actions" style={{ marginTop: 12 }}>
                    <button className="sor-btn-primary" onClick={createStatusFolders} disabled={statusBusy || selectedStatuses.size === 0 || !statusDest}>
                      {statusBusy ? "Creating..." : "Create Status Folders"}
                    </button>
                  </div>

                  {statusJob && ["pending", "running"].includes(statusJob.status) && (
                    <div className="sor-cat-desc" style={{ marginTop: 10, padding: "8px 12px", background: "var(--sor-card-bg, #1e1e2e)", borderRadius: 6 }}>
                      Creating folders... {Number((statusJob.summary as Record<string, unknown>)?.progress_percent || 0)}%
                      {(statusJob.summary as Record<string, unknown>)?.current_file ? ` - ${String((statusJob.summary as Record<string, unknown>).current_file)}` : ""}
                    </div>
                  )}

                  {statusFoldersCreated && statusCreateResult && (
                    <div className="sor-cat-desc" style={{ marginTop: 10, padding: "8px 12px", background: "var(--sor-success-bg, #1a3a2a)", borderRadius: 6, color: "var(--sor-success, #4ade80)" }}>
                      Created {statusCreateResult.count} folder(s).
                      {statusCreateResult.skipped_count > 0 && ` Skipped ${statusCreateResult.skipped_count} product(s) without barcode.`}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Step 2: Move uncategorized images */
        <div className="sor-cat-workspace">
          <div className="sor-panel">
            <div className="sor-panel-head">
              <h2>Uncategorized Images</h2>
              <div className="sor-panel-actions">
                <span className="sor-count">{selectedUncategorized.size} of {filteredUncategorized.length} selected</span>
                <button className="sor-btn-compact" onClick={loadUncategorized} disabled={catBusy || !folder}>
                  Refresh
                </button>
                <button className="sor-btn-compact" onClick={() => { setCategoriesCreated(false); setUncategorized([]); setSelectedUncategorized(new Set()); }}>
                  Back to setup
                </button>
              </div>
            </div>
            <div className="sor-table-wrap" style={{ maxHeight: 340 }}>
              <table className="sor-tbl">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}>
                      <input type="checkbox" checked={filteredUncategorized.length > 0 && selectedUncategorized.size === filteredUncategorized.length} onChange={toggleAllUncategorized} />
                    </th>
                    <th>Preview</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Current Folder</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUncategorized.map((item, i) => (
                    <tr key={`${item.path}-${i}`} className={selectedUncategorized.has(item.path) ? "sor-row-selected" : ""}>
                      <td>
                        <input type="checkbox" checked={selectedUncategorized.has(item.path)} onChange={() => toggleUncategorizedItem(item.path)} />
                      </td>
                      <td>
                        {item.thumbnail ? (
                          <img className="sor-thumb" src={item.thumbnail} alt="" loading="lazy" />
                        ) : (
                          <div className="sor-thumb sor-thumb-placeholder">No image</div>
                        )}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td className="sor-path-cell" title={item.oldFolder}>{item.oldFolder}</td>
                    </tr>
                  ))}
                  {filteredUncategorized.length === 0 && (
                    <tr>
                      <td colSpan={5} className="sor-empty">
                        {catBusy ? "Loading..." : uncategorized.length === 0 ? "No uncategorized items found." : "No items match your search."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="sor-panel sor-cat-move-panel">
            <div className="sor-panel-head">
              <h2>Move to Category</h2>
            </div>
            <div className="sor-cat-move-grid">
              {[...selectedCategories].sort().map((cat) => (
                <button key={cat} className="sor-cat-move-btn" disabled={catBusy || selectedUncategorized.size === 0} onClick={() => promptMove(cat)}>
                  <span className="sor-cat-move-icon">{"\u{1F4C1}"}</span>
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Move confirmation modal */}
      {showMoveConfirm && (
        <div className="sor-modal" onClick={(e) => { if (e.target === e.currentTarget) setShowMoveConfirm(false); }}>
          <div className="sor-modal-card">
            <div className="sor-panel-head">
              <h2>Confirm Move</h2>
              <button className="sor-btn-icon" onClick={() => setShowMoveConfirm(false)}>Close</button>
            </div>
            <div className="sor-guide-copy">
              <p>Move <strong>{selectedUncategorized.size}</strong> selected item(s) to the <strong>{moveTarget}</strong> folder?</p>
              <p style={{ fontSize: 13, opacity: 0.7 }}>Files will be moved from their current location into <strong>{folder}\{moveTarget}</strong></p>
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button className="sor-btn-primary" onClick={confirmMove}>Move</button>
                <button className="sor-btn-secondary" onClick={() => setShowMoveConfirm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No barcode prompt */}
      {showNoBarcodePrompt && statusData && (
        <div className="sor-modal" onClick={(e) => { if (e.target === e.currentTarget) setShowNoBarcodePrompt(false); }}>
          <div className="sor-modal-card">
            <div className="sor-panel-head">
              <h2>Products Without Barcode</h2>
              <button className="sor-btn-icon" onClick={() => setShowNoBarcodePrompt(false)}>Close</button>
            </div>
            <div className="sor-guide-copy">
              <p><strong>{statusData.no_barcode_count}</strong> product(s) do not have a barcode (EAN):</p>
              <p style={{ fontSize: 12, opacity: 0.75, marginTop: 8 }}>
                Select which status values should keep using product-name folders.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                {Object.entries(noBarcodeStatusCounts).map(([status, count]) => (
                  <label key={status} className={`sor-cat-option${noBarcodeStatuses.has(status) ? " selected" : ""}`} style={{ width: "auto", minWidth: 132, padding: "8px 10px" }}>
                    <input type="checkbox" checked={noBarcodeStatuses.has(status)} onChange={() => toggleNoBarcodeStatus(status)} />
                    <span className="sor-cat-name">{status} ({count})</span>
                  </label>
                ))}
              </div>
              <div className="sor-table-wrap" style={{ maxHeight: 200, marginTop: 8 }}>
                <table className="sor-tbl">
                  <thead><tr><th>Code</th><th>Product Name</th><th>Status</th></tr></thead>
                  <tbody>
                    {visibleNoBarcodeProducts.map((p, i) => (
                      <tr key={i}><td>{p.code}</td><td>{p.name}</td><td>{p.status}</td></tr>
                    ))}
                    {visibleNoBarcodeProducts.length === 0 && (
                      <tr><td colSpan={3} style={{ textAlign: "center", opacity: 0.7 }}>No status selected.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: 12 }}>Use product names for <strong>{visibleNoBarcodeProducts.length}</strong> selected product(s)?</p>
              <p style={{ fontSize: 12, opacity: 0.7 }}>Format: <strong>{statusData.brand}_Product Name_Status</strong></p>
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button className="sor-btn-primary" disabled={noBarcodeStatuses.size === 0} onClick={() => { setUseNameForNoBarcode(true); setShowNoBarcodePrompt(false); }}>
                  Yes, Use Product Name
                </button>
                <button className="sor-btn-secondary" onClick={() => { setUseNameForNoBarcode(false); setNoBarcodeStatuses(new Set()); setShowNoBarcodePrompt(false); }}>
                  No, Skip These
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Duplicate barcode prompt */}
      {showDuplicatePrompt && statusData && (
        <div className="sor-modal" onClick={(e) => { if (e.target === e.currentTarget) setShowDuplicatePrompt(false); }}>
          <div className="sor-modal-card">
            <div className="sor-panel-head">
              <h2>Duplicate Barcodes Found</h2>
              <button className="sor-btn-icon" onClick={() => setShowDuplicatePrompt(false)}>Close</button>
            </div>
            <div className="sor-guide-copy">
              <p>The following barcodes are shared by multiple products:</p>
              <div className="sor-table-wrap" style={{ maxHeight: 200, marginTop: 8 }}>
                <table className="sor-tbl">
                  <thead><tr><th>Barcode</th><th>Count</th><th>Products</th></tr></thead>
                  <tbody>
                    {Object.entries(statusData.duplicates).map(([bc, cnt]) => (
                      <tr key={bc}>
                        <td>{bc}</td>
                        <td>{cnt}</td>
                        <td>{statusData.duplicate_products.filter((p) => p.barcode === bc).map((p) => p.name).join("; ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: 12 }}>Do you want to create one subfolder per product for these, or keep one shared folder per barcode?</p>
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button className="sor-btn-primary" onClick={() => { setPerProductForDuplicates(true); setShowDuplicatePrompt(false); }}>
                  One Folder Per Product
                </button>
                <button className="sor-btn-secondary" onClick={() => { setPerProductForDuplicates(false); setShowDuplicatePrompt(false); }}>
                  Keep Shared Folder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
