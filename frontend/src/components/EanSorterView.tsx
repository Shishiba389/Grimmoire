import { useState, useRef, useCallback, useEffect } from "react";
import { apiJson, pickFolder } from "./ToolShared";
import { useNotifications } from "../contexts/NotificationContext";

/* ── Types ── */

type SorterRow = {
  name: string;
  path?: string;
  ean: string;
  type?: string;
  kind?: string;
  oldFolder?: string;
  thumbnail?: string;
};

type ProductRow = { ean: string; count: number };

type ReportRow = {
  numbering: string;
  ean: string;
  name: string;
  type: string;
  oldFolder: string;
  newFolder: string;
};

type GalleryItem = { name: string; ean: string; thumbnail: string };

type SorterJobRecord = {
  id: string;
  status: "pending" | "running" | "completed" | "failed";
  error?: string | null;
  summary?: Record<string, unknown>;
};

type SorterResult = {
  ok?: boolean;
  folder: string;
  items: number;
  files: number;
  folders: number;
  products: number;
  notFound: number;
  moved?: number;
  rows?: SorterRow[];
  reportRows?: ReportRow[];
  productRows?: ProductRow[];
  gallery?: GalleryItem[];
};

type SubView = "sorter" | "gallery" | "report" | "categorize";

type UncategorizedItem = {
  name: string;
  path: string;
  kind: string;
  type: string;
  oldFolder: string;
  thumbnail: string;
};

/* ── Helpers ── */

function matchesQuery(query: string, ...fields: (string | undefined)[]) {
  if (!query) return true;
  const q = query.toLowerCase();
  return fields.some((f) => (f || "").toLowerCase().includes(q));
}

/* ── Component ── */

export function EanSorterView() {
  const { notify } = useNotifications();

  const [activeView, setActiveView] = useState<SubView>("sorter");
  const [folder, setFolder] = useState("");
  const [busy, setBusy] = useState(false);
  const [deleteEmpty, setDeleteEmpty] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SorterResult | null>(null);
  const [statusTitle, setStatusTitle] = useState("Ready");
  const [statusText, setStatusText] = useState("Choose a folder to begin.");
  const [guideOpen, setGuideOpen] = useState(false);

  /* hover preview (follows cursor like original) */
  const [preview, setPreview] = useState<{
    src: string;
    x: number;
    y: number;
  } | null>(null);
  const previewRef = useRef<boolean>(false);
  const previewSrcRef = useRef<string>("");

  const onThumbEnter = useCallback((src: string) => {
    previewRef.current = true;
    previewSrcRef.current = src;
  }, []);

  const onThumbLeave = useCallback(() => {
    previewRef.current = false;
    previewSrcRef.current = "";
    setPreview(null);
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!previewRef.current || !previewSrcRef.current) return;
      const pad = 16;
      const maxW = 360 + 12 + pad;
      const maxH = 360 + 12 + pad;
      const left =
        e.clientX + maxW > window.innerWidth
          ? e.clientX - maxW
          : e.clientX + pad;
      const top =
        e.clientY + maxH > window.innerHeight
          ? Math.max(0, e.clientY - maxH)
          : e.clientY + pad;
      setPreview({ src: previewSrcRef.current, x: left, y: top });
    }
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  /* api calls */
  async function doScan() {
    if (!folder) {
      notify("Choose a folder first", { type: "warning" });
      return;
    }
    setBusy(true);
    setStatusTitle("Scanning");
    setStatusText("Analyzing folder contents for EAN barcodes.");
    try {
      const res = await apiJson<SorterResult>("/api/ean-sorter/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      setResult(res);
      setFolder(res.folder || folder);
      localStorage.setItem("grimoire-ean-sorter-root", res.folder || folder);
      setStatusTitle("Scan complete");
      setStatusText(
        `${res.items} item(s), ${res.products} product EAN group(s), ${res.notFound} not found.`
      );
      notify("Scan complete", {
        type: "success",
        message: `${res.products} products, ${res.files} files`,
      });
    } catch (err) {
      setStatusTitle("Error");
      setStatusText(err instanceof Error ? err.message : String(err));
      notify("Scan failed", {
        type: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setBusy(false);
    }
  }

  async function doSortAndReport() {
    if (!folder) {
      notify("Choose a folder first", { type: "warning" });
      return;
    }
    setBusy(true);
    setStatusTitle("Sorting");
    setStatusText("Moving files into product folders and generating report.");
    try {
      const res = await apiJson<SorterResult>("/api/ean-sorter/sort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder, deleteEmpty }),
      });
      setResult(res);
      setFolder(res.folder || folder);
      localStorage.setItem("grimoire-ean-sorter-root", res.folder || folder);
      setStatusTitle("Sort complete");
      setStatusText(
        `${res.moved ?? 0} item(s) moved into ${res.products} EAN folder(s).`
      );
      notify("Sort complete", {
        type: "success",
        message: `${res.moved ?? 0} files moved`,
      });
    } catch (err) {
      setStatusTitle("Error");
      setStatusText(err instanceof Error ? err.message : String(err));
      notify("Sort failed", {
        type: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setBusy(false);
    }
  }

  async function loadReport() {
    if (!folder) return;
    setBusy(true);
    try {
      const res = await apiJson<SorterResult>("/api/ean-sorter/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      setResult((prev) =>
        prev ? { ...prev, reportRows: res.reportRows } : res
      );
      notify("Report loaded", { type: "success" });
    } catch (err) {
      notify("Failed to load report", {
        type: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setBusy(false);
    }
  }

  async function openInExcel() {
    try {
      await apiJson("/api/ean-sorter/report/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
    } catch (err) {
      notify("Failed to open report", {
        type: "error",
        message: err instanceof Error ? err.message : String(err),
      });
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
      notify("Export failed", {
        type: "error",
        message: err instanceof Error ? err.message : String(err),
      });
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
      } catch {
        /* ignore */
      }
    }
  }

  /* ── Categorize state ── */
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

  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [categoriesCreated, setCategoriesCreated] = useState(false);
  const [uncategorized, setUncategorized] = useState<UncategorizedItem[]>([]);
  const [selectedUncategorized, setSelectedUncategorized] = useState<
    Set<string>
  >(new Set());
  const [moveTarget, setMoveTarget] = useState("");
  const [showMoveConfirm, setShowMoveConfirm] = useState(false);
  const [catBusy, setCatBusy] = useState(false);

  /* ── Status file folder creation state ── */
  interface StatusProduct { code: string; barcode: string | null; status: string; name: string; }
  interface StatusFileData {
    brand: string;
    total: number;
    products: StatusProduct[];
    statuses: Record<string, number>;
    no_barcode: StatusProduct[];
    no_barcode_count: number;
    duplicates: Record<string, number>;
    duplicate_products: StatusProduct[];
  }
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
  const [perProductForDuplicates, setPerProductForDuplicates] = useState(false);
  const [statusFoldersCreated, setStatusFoldersCreated] = useState(false);
  const [statusCreateResult, setStatusCreateResult] = useState<{ count: number; skipped_count: number } | null>(null);
  const [statusJob, setStatusJob] = useState<SorterJobRecord | null>(null);

  async function pickStatusFile() {
    if (!window.__grimoire?.pickFile) {
      statusFileRef.current?.click();
      return;
    }
    const picked = await window.__grimoire.pickFile(
      "Select status file",
      "Excel workbooks (*.xlsx;*.xls)|*.xlsx;*.xls|All files (*.*)|*.*"
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
    setUseNameForNoBarcode(false);
    setPerProductForDuplicates(false);
    try {
      const res = statusFilePath
        ? await apiJson<StatusFileData & { ok: boolean }>(
            "/api/ean-sorter/categorize/read-status-file-path",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ path: statusFilePath }),
            }
          )
        : await (async () => {
            const form = new FormData();
            form.append("file", file as File);
            return apiJson<StatusFileData & { ok: boolean }>(
              "/api/ean-sorter/categorize/read-status-file",
              { method: "POST", body: form }
            );
          })();
      setStatusData(res);
      notify(`Read ${res.total} products for ${res.brand}`, { type: "success" });

      if (res.no_barcode_count > 0) {
        setShowNoBarcodePrompt(true);
      }
      if (Object.keys(res.duplicates).length > 0) {
        setShowDuplicatePrompt(true);
      }
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
      const res = await apiJson<SorterJobRecord>(
        "/api/ean-sorter/categorize/create-status-folders-job",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            destination: statusDest,
            products: statusData.products,
            statuses: [...selectedStatuses],
            brand: statusData.brand,
            use_name_for_no_barcode: useNameForNoBarcode,
            per_product_for_duplicates: perProductForDuplicates,
          }),
        }
      );
      setStatusJob(res);
      notify("Status folder job started", { type: "info", message: res.id });
    } catch (err) {
      notify("Failed to create folders", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setStatusBusy(false);
    }
  }

  useEffect(() => {
    if (!statusJob || !["pending", "running"].includes(statusJob.status)) return;
    let cancelled = false;
    const timer = window.setInterval(async () => {
      try {
        const next = await apiJson<SorterJobRecord>(`/api/jobs/${statusJob.id}`);
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
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [statusJob?.id, statusJob?.status]);

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
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
        body: JSON.stringify({
          folder,
          categories: [...selectedCategories],
        }),
      });
      setCategoriesCreated(true);
      notify("Category folders created", {
        type: "success",
        message: `${selectedCategories.size} folder(s) created`,
      });
      await loadUncategorized();
    } catch (err) {
      notify("Failed to create folders", {
        type: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setCatBusy(false);
    }
  }

  async function loadUncategorized() {
    if (!folder) return;
    setCatBusy(true);
    try {
      const res = await apiJson<{ items: UncategorizedItem[] }>(
        "/api/ean-sorter/categorize/uncategorized",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder }),
        }
      );
      setUncategorized(res.items);
      setSelectedUncategorized(new Set());
    } catch (err) {
      notify("Failed to load uncategorized items", {
        type: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setCatBusy(false);
    }
  }

  function toggleUncategorizedItem(path: string) {
    setSelectedUncategorized((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  function toggleAllUncategorized() {
    if (selectedUncategorized.size === filteredUncategorized.length) {
      setSelectedUncategorized(new Set());
    } else {
      setSelectedUncategorized(
        new Set(filteredUncategorized.map((u) => u.path))
      );
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
      const res = await apiJson<{ moved: number; errors: string[] }>(
        "/api/ean-sorter/categorize/move",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            folder,
            category: moveTarget,
            paths: [...selectedUncategorized],
          }),
        }
      );
      notify(`Moved ${res.moved} item(s) to ${moveTarget}`, {
        type: "success",
      });
      if (res.errors.length > 0) {
        notify(`${res.errors.length} error(s)`, {
          type: "warning",
          message: res.errors.slice(0, 3).join("; "),
        });
      }
      await loadUncategorized();
    } catch (err) {
      notify("Move failed", {
        type: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setCatBusy(false);
      setMoveTarget("");
    }
  }

  /* filtered data */
  const rows = (result?.rows ?? []).filter((r) =>
    matchesQuery(query, r.name, r.ean, r.type, r.kind, r.oldFolder)
  );
  const galleryItems = (result?.gallery ?? []).filter((g) =>
    matchesQuery(query, g.name, g.ean)
  );
  const reportRows = (result?.reportRows ?? []).filter((r) =>
    matchesQuery(query, r.numbering, r.ean, r.name, r.type, r.oldFolder, r.newFolder)
  );

  const filteredUncategorized = uncategorized.filter((u) =>
    matchesQuery(query, u.name, u.type, u.oldFolder)
  );

  const stats = {
    items: result?.items ?? 0,
    files: result?.files ?? 0,
    folders: result?.folders ?? 0,
    products: result?.products ?? 0,
    notFound: result?.notFound ?? 0,
  };

  return (
    <div className="view tool-view sor-shell">
      {/* ── Left Sidebar ── */}
      <aside className="sor-sidebar">
        <div className="sor-brand">
          <div className="sor-brand-mark">E</div>
          <span>EAN SORTER</span>
        </div>

        <nav className="sor-nav">
          {(
            [
              { key: "sorter" as SubView, label: "Sorter", icon: "/icons/ean-sorter-sort.png" },
              { key: "gallery" as SubView, label: "Gallery", icon: "/icons/ean-sorter-gallery.png" },
              { key: "report" as SubView, label: "Report", icon: "/icons/ean-sorter-report.png" },
              { key: "categorize" as SubView, label: "Categorize", icon: "/icons/ean-sorter-categorize.png" },
            ]
          ).map((v) => (
            <button
              key={v.key}
              className={`sor-nav-item${activeView === v.key ? " active" : ""}`}
              onClick={() => {
                setActiveView(v.key);
                if (v.key === "categorize" && folder && uncategorized.length === 0 && categoriesCreated) {
                  loadUncategorized();
                }
              }}
            >
              <img src={v.icon} alt="" className="sor-nav-icon" />
              {v.label}
            </button>
          ))}
        </nav>

        <div className="sor-sidebar-spacer" />

        <button className="sor-guide-btn" onClick={() => setGuideOpen(true)}>
          Guide
        </button>

        <div className="sor-mini-card">
          <span>Selected folder</span>
          <strong title={folder || "None"}>{folder || "None"}</strong>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="sor-content">
        {/* Top bar */}
        <header className="sor-topbar">
          <div className="sor-search">
            <span>Search</span>
            <input
              type="text"
              placeholder="Search EAN or image name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            className="sor-btn-compact"
            onClick={async () => {
              const f = await pickFolder("Select folder to scan", folder);
              if (f) setFolder(f);
            }}
          >
            Choose folder
          </button>
          <button className="sor-btn-icon" onClick={revealFolder}>
            Open
          </button>
          <div className="sor-profile">
            <div className="sor-avatar">EAN</div>
            <span>Local desktop</span>
          </div>
        </header>

        {/* ── SORTER VIEW ── */}
        {activeView === "sorter" && (
          <div className="sor-view-content">
            {/* Hero */}
            <section className="sor-hero">
              <div className="sor-hero-main">
                <div className="sor-chips">
                  {["EAN-8", "EAN-13", "Excel report", "Folder sort"].map(
                    (c) => (
                      <span className="sor-chip" key={c}>
                        {c}
                      </span>
                    )
                  )}
                </div>
                <div>
                  <p className="sor-eyebrow">Product Data Cleaner</p>
                  <h1 className="sor-headline">
                    Sort files by product barcode
                  </h1>
                </div>
                <div className="sor-hero-actions">
                  <button
                    className="sor-btn-primary"
                    onClick={doScan}
                    disabled={busy || !folder}
                  >
                    Scan
                  </button>
                  <button
                    className="sor-btn-secondary"
                    onClick={doSortAndReport}
                    disabled={busy || !folder}
                  >
                    Sort and report
                  </button>
                  <label className="sor-toggle">
                    <input
                      type="checkbox"
                      checked={deleteEmpty}
                      onChange={(e) => setDeleteEmpty(e.target.checked)}
                    />
                    <span />
                    Delete empty folders
                  </label>
                </div>
              </div>

              <aside className="sor-action-card">
                <span className="sor-card-label">Status</span>
                <strong>{statusTitle}</strong>
                <p>{statusText}</p>
                <button
                  className="sor-btn-gold"
                  onClick={() => setActiveView("report")}
                >
                  Show report
                </button>
              </aside>
            </section>

            {/* Stats (always visible) */}
            <section className="sor-stats">
              {(
                [
                  ["Items", stats.items],
                  ["Files", stats.files],
                  ["Folders", stats.folders],
                  ["Products", stats.products],
                  ["Not found", stats.notFound],
                ] as [string, number][]
              ).map(([label, value]) => (
                <article className="sor-stat" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </section>

            {/* Workspace */}
            <section className="sor-workspace">
              {/* Scan Results */}
              <div className="sor-panel sor-results-panel">
                <div className="sor-panel-head">
                  <h2>Scan Results</h2>
                  <span className="sor-count">{rows.length} rows</span>
                </div>
                <div className="sor-table-wrap">
                  <table className="sor-tbl">
                    <thead>
                      <tr>
                        <th>Preview</th>
                        <th>Name</th>
                        <th>EAN</th>
                        <th>Type</th>
                        <th>Old Folder</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={`${row.path ?? row.name}-${i}`}>
                          <td>
                            {row.thumbnail ? (
                              <img
                                className="sor-thumb"
                                src={row.thumbnail}
                                alt=""
                                loading="lazy"
                                onMouseEnter={() =>
                                  onThumbEnter(row.thumbnail!)
                                }
                                onMouseLeave={onThumbLeave}
                              />
                            ) : (
                              <div className="sor-thumb sor-thumb-placeholder">
                                No image
                              </div>
                            )}
                          </td>
                          <td>{row.name}</td>
                          <td>
                            <span
                              className={`sor-tag${row.ean === "not found" ? " missing" : ""}`}
                            >
                              {row.ean}
                            </span>
                          </td>
                          <td>{row.type || row.kind || ""}</td>
                          <td className="sor-path-cell" title={row.oldFolder}>
                            {row.oldFolder || ""}
                          </td>
                        </tr>
                      ))}
                      {rows.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="sor-empty"
                          >
                            {busy
                              ? "Scanning..."
                              : "No scan yet."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Products */}
              <div className="sor-panel sor-products-panel">
                <div className="sor-panel-head">
                  <h2>Products</h2>
                  <span className="sor-count">
                    {result?.productRows?.length ?? 0}
                  </span>
                </div>
                <div className="sor-product-list">
                  {(result?.productRows ?? []).map((p) => (
                    <div className="sor-product-row" key={p.ean}>
                      <strong>{p.ean}</strong>
                      <span>
                        {p.count} item{p.count === 1 ? "" : "s"}
                      </span>
                    </div>
                  ))}
                  {(!result?.productRows ||
                    result.productRows.length === 0) && (
                    <div className="sor-empty-box">No EAN groups yet.</div>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ── GALLERY VIEW ── */}
        {activeView === "gallery" && (
          <div className="sor-view-content">
            <div className="sor-panel">
              <div className="sor-panel-head">
                <h2>Gallery</h2>
                <span className="sor-count">{galleryItems.length} images</span>
              </div>
              <div className="sor-gallery-grid">
                {galleryItems.map((item, i) => (
                  <article
                    className="sor-gallery-card"
                    key={`${item.ean}-${item.name}-${i}`}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      loading="lazy"
                    />
                    <div>
                      <strong title={item.name}>{item.name}</strong>
                      <span>{item.ean}</span>
                    </div>
                  </article>
                ))}
                {galleryItems.length === 0 && (
                  <div className="sor-empty-box" style={{ gridColumn: "1 / -1" }}>
                    {result
                      ? "No matching images."
                      : "Scan a folder to load images."}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── REPORT VIEW ── */}
        {activeView === "report" && (
          <div className="sor-view-content">
            <div className="sor-panel sor-report-panel">
              <div className="sor-panel-head">
                <h2>Report Output</h2>
                <div className="sor-panel-actions">
                  <button
                    className="sor-btn-compact"
                    onClick={loadReport}
                    disabled={busy || !folder}
                  >
                    Load report
                  </button>
                  <button
                    className="sor-btn-compact"
                    onClick={exportReport}
                    disabled={!folder}
                  >
                    Export report
                  </button>
                  <button
                    className="sor-btn-compact"
                    onClick={openInExcel}
                    disabled={!folder}
                  >
                    Open in Excel
                  </button>
                </div>
              </div>
              <div className="sor-table-wrap sor-report-wrap">
                <table className="sor-tbl">
                  <thead>
                    <tr>
                      <th>Numbering</th>
                      <th>EAN</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Old Folder</th>
                      <th>New Folder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportRows.map((row, i) => (
                      <tr key={`${row.ean}-${row.name}-${i}`}>
                        <td>{row.numbering}</td>
                        <td>{row.ean}</td>
                        <td>{row.name}</td>
                        <td>{row.type || ""}</td>
                        <td className="sor-path-cell" title={row.oldFolder}>
                          {row.oldFolder || ""}
                        </td>
                        <td className="sor-path-cell" title={row.newFolder}>
                          {row.newFolder || ""}
                        </td>
                      </tr>
                    ))}
                    {reportRows.length === 0 && (
                      <tr>
                        <td colSpan={6} className="sor-empty">
                          {result?.reportRows
                            ? "No rows match your search."
                            : "Run Sort and report, or load an existing report."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── CATEGORIZE VIEW ── */}
        {activeView === "categorize" && (
          <div className="sor-view-content">
            {/* Step 1: Choose categories */}
            {!categoriesCreated ? (
              <div className="sor-cat-setup">
                <div className="sor-panel">
                  <div className="sor-panel-head">
                    <h2>Create Category Folders</h2>
                    <span className="sor-count">
                      {selectedCategories.size} selected
                    </span>
                  </div>
                  <div className="sor-cat-body">
                    <p className="sor-cat-desc">
                      Select which category folders to create inside your working
                      directory. These folders will be used to organize uncategorized
                      images (items with no EAN detected).
                    </p>
                    <div className="sor-cat-select-all">
                      <label className="sor-cat-check">
                        <input
                          type="checkbox"
                          checked={
                            selectedCategories.size === CATEGORY_OPTIONS.length
                          }
                          onChange={toggleSelectAll}
                        />
                        <span>Select All</span>
                      </label>
                    </div>
                    <div className="sor-cat-grid">
                      {CATEGORY_OPTIONS.map((cat) => (
                        <label
                          key={cat}
                          className={`sor-cat-option${selectedCategories.has(cat) ? " selected" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.has(cat)}
                            onChange={() => toggleCategory(cat)}
                          />
                          <span className="sor-cat-name">{cat}</span>
                        </label>
                      ))}
                    </div>
                    <div className="sor-cat-actions">
                      <button
                        className="sor-btn-primary"
                        onClick={createCategoryFolders}
                        disabled={
                          catBusy ||
                          !folder ||
                          selectedCategories.size === 0
                        }
                      >
                        {catBusy ? "Creating..." : "Create Folders"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── Status File Folder Creation ── */}
                <div className="sor-panel" style={{ marginTop: 16 }}>
                  <div className="sor-panel-head">
                    <h2>Create Folders from Status File</h2>
                  </div>
                  <div className="sor-cat-body">
                    <p className="sor-cat-desc">
                      Upload a <strong>[Brand]_Missing_Data_Status.xlsx</strong> file to create product folders organized by status, with EAN barcodes as subfolder names.
                    </p>
                    <div className="sor-status-file-row">
                      <input
                        ref={statusFileRef}
                        type="file"
                        accept=".xlsx,.xls"
                        className="sor-hidden-file"
                        onChange={(event) => {
                          const nextFile = event.currentTarget.files?.[0];
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
                            <label
                              key={s}
                              className={`sor-cat-option${selectedStatuses.has(s) ? " selected" : ""}`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedStatuses.has(s)}
                                onChange={() => toggleStatus(s)}
                              />
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
                          <button
                            className="sor-btn-primary"
                            onClick={createStatusFolders}
                            disabled={statusBusy || selectedStatuses.size === 0 || !statusDest}
                          >
                            {statusBusy ? "Creating..." : "Create Status Folders"}
                          </button>
                        </div>

                        {statusJob && ["pending", "running"].includes(statusJob.status) && (
                          <div className="sor-cat-desc" style={{ marginTop: 10, padding: "8px 12px", background: "var(--sor-card-bg, #1e1e2e)", borderRadius: 6 }}>
                            Creating folders... {Number(statusJob.summary?.progress_percent || 0)}%
                            {statusJob.summary?.current_file ? ` - ${String(statusJob.summary.current_file)}` : ""}
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
                {/* Uncategorized items table */}
                <div className="sor-panel">
                  <div className="sor-panel-head">
                    <h2>Uncategorized Images</h2>
                    <div className="sor-panel-actions">
                      <span className="sor-count">
                        {selectedUncategorized.size} of{" "}
                        {filteredUncategorized.length} selected
                      </span>
                      <button
                        className="sor-btn-compact"
                        onClick={loadUncategorized}
                        disabled={catBusy || !folder}
                      >
                        Refresh
                      </button>
                      <button
                        className="sor-btn-compact"
                        onClick={() => {
                          setCategoriesCreated(false);
                          setUncategorized([]);
                          setSelectedUncategorized(new Set());
                        }}
                      >
                        Back to setup
                      </button>
                    </div>
                  </div>
                  <div className="sor-table-wrap" style={{ maxHeight: 340 }}>
                    <table className="sor-tbl">
                      <thead>
                        <tr>
                          <th style={{ width: 40 }}>
                            <input
                              type="checkbox"
                              checked={
                                filteredUncategorized.length > 0 &&
                                selectedUncategorized.size ===
                                  filteredUncategorized.length
                              }
                              onChange={toggleAllUncategorized}
                            />
                          </th>
                          <th>Preview</th>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Current Folder</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUncategorized.map((item, i) => (
                          <tr
                            key={`${item.path}-${i}`}
                            className={
                              selectedUncategorized.has(item.path)
                                ? "sor-row-selected"
                                : ""
                            }
                          >
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedUncategorized.has(item.path)}
                                onChange={() =>
                                  toggleUncategorizedItem(item.path)
                                }
                              />
                            </td>
                            <td>
                              {item.thumbnail ? (
                                <img
                                  className="sor-thumb"
                                  src={item.thumbnail}
                                  alt=""
                                  loading="lazy"
                                  onMouseEnter={() =>
                                    onThumbEnter(item.thumbnail)
                                  }
                                  onMouseLeave={onThumbLeave}
                                />
                              ) : (
                                <div className="sor-thumb sor-thumb-placeholder">
                                  No image
                                </div>
                              )}
                            </td>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td
                              className="sor-path-cell"
                              title={item.oldFolder}
                            >
                              {item.oldFolder}
                            </td>
                          </tr>
                        ))}
                        {filteredUncategorized.length === 0 && (
                          <tr>
                            <td colSpan={5} className="sor-empty">
                              {catBusy
                                ? "Loading..."
                                : uncategorized.length === 0
                                  ? "No uncategorized items found."
                                  : "No items match your search."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Move-to buttons */}
                <div className="sor-panel sor-cat-move-panel">
                  <div className="sor-panel-head">
                    <h2>Move to Category</h2>
                  </div>
                  <div className="sor-cat-move-grid">
                    {[...selectedCategories].sort().map((cat) => (
                      <button
                        key={cat}
                        className="sor-cat-move-btn"
                        disabled={
                          catBusy || selectedUncategorized.size === 0
                        }
                        onClick={() => promptMove(cat)}
                      >
                        <span className="sor-cat-move-icon">📁</span>
                        <span>{cat}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Move confirmation modal ── */}
      {showMoveConfirm && (
        <div
          className="sor-modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowMoveConfirm(false);
          }}
        >
          <div className="sor-modal-card">
            <div className="sor-panel-head">
              <h2>Confirm Move</h2>
              <button
                className="sor-btn-icon"
                onClick={() => setShowMoveConfirm(false)}
              >
                Close
              </button>
            </div>
            <div className="sor-guide-copy">
              <p>
                Move <strong>{selectedUncategorized.size}</strong> selected
                item(s) to the <strong>{moveTarget}</strong> folder?
              </p>
              <p style={{ fontSize: 13, opacity: 0.7 }}>
                Files will be moved from their current location into{" "}
                <strong>
                  {folder}\{moveTarget}
                </strong>
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                <button className="sor-btn-primary" onClick={confirmMove}>
                  Move
                </button>
                <button
                  className="sor-btn-secondary"
                  onClick={() => setShowMoveConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── No barcode prompt ── */}
      {showNoBarcodePrompt && statusData && (
        <div className="sor-modal" onClick={(e) => { if (e.target === e.currentTarget) setShowNoBarcodePrompt(false); }}>
          <div className="sor-modal-card">
            <div className="sor-panel-head">
              <h2>Products Without Barcode</h2>
              <button className="sor-btn-icon" onClick={() => setShowNoBarcodePrompt(false)}>Close</button>
            </div>
            <div className="sor-guide-copy">
              <p><strong>{statusData.no_barcode_count}</strong> product(s) do not have a barcode (EAN):</p>
              <div className="sor-table-wrap" style={{ maxHeight: 200, marginTop: 8 }}>
                <table className="sor-tbl">
                  <thead><tr><th>Code</th><th>Product Name</th><th>Status</th></tr></thead>
                  <tbody>
                    {statusData.no_barcode.map((p, i) => (
                      <tr key={i}><td>{p.code}</td><td>{p.name}</td><td>{p.status}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: 12 }}>Would you like to use the product name as the folder name instead?</p>
              <p style={{ fontSize: 12, opacity: 0.7 }}>Format: <strong>{statusData.brand}_Product Name_Status</strong></p>
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button className="sor-btn-primary" onClick={() => { setUseNameForNoBarcode(true); setShowNoBarcodePrompt(false); }}>
                  Yes, Use Product Name
                </button>
                <button className="sor-btn-secondary" onClick={() => { setUseNameForNoBarcode(false); setShowNoBarcodePrompt(false); }}>
                  No, Skip These
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Duplicate barcode prompt ── */}
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

      {/* ── Hover preview popup ── */}
      {preview && (
        <div
          className="sor-img-preview"
          style={{ left: preview.x, top: preview.y }}
        >
          <img src={preview.src} alt="" />
        </div>
      )}

      {/* ── Guide modal ── */}
      {guideOpen && (
        <div className="sor-modal" onClick={(e) => {
          if (e.target === e.currentTarget) setGuideOpen(false);
        }}>
          <div className="sor-modal-card">
            <div className="sor-panel-head">
              <h2>Guide</h2>
              <button
                className="sor-btn-icon"
                onClick={() => setGuideOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="sor-guide-copy">
              <p>1. Click Choose folder and select the product image folder.</p>
              <p>
                2. Click Scan to preview every detected item, EAN group, and
                image thumbnail.
              </p>
              <p>
                3. Use the search bar to filter by EAN or image name.
              </p>
              <p>
                4. Open Gallery to review all images inside the selected folder.
              </p>
              <p>
                5. Click Sort and report to create one folder per EAN and write
                EAN_report.xlsx.
              </p>
              <p>
                6. Open Report to preview, export, or open the Excel report on
                this computer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Scoped styles ── */}
      <style>{`
        /* ── Shell layout ── */
        .sor-shell {
          display: grid !important;
          grid-template-columns: 210px 1fr;
          min-height: calc(100vh - var(--topbar-height, 56px) - 48px);
          padding: 0 !important;
          gap: 0;
        }

        /* ── Sidebar ── */
        .sor-sidebar {
          display: flex;
          flex-direction: column;
          padding: 34px 28px;
          background: var(--bg-sidebar);
          border-right: 1px solid var(--border);
        }
        .sor-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 17px;
          font-weight: 800;
          color: var(--text-primary);
        }
        .sor-brand-mark {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #f5f7fb;
          color: #121820;
          font-size: 18px;
          font-weight: 800;
          flex-shrink: 0;
        }
        .sor-nav {
          display: grid;
          gap: 14px;
          margin-top: 54px;
        }
        .sor-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 11px 6px;
          border-radius: 8px;
          background: transparent;
          border: 0;
          color: var(--text-secondary);
          text-align: left;
          cursor: pointer;
          font: inherit;
          font-size: 14px;
          font-weight: 500;
        }
        .sor-nav-dot {
          width: 8px;
          height: 8px;
          border: 1px solid currentColor;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .sor-nav-item.active {
          color: var(--accent);
        }
        .sor-nav-item.active::before {
          content: "";
          width: 4px;
          height: 24px;
          margin-left: -28px;
          border-radius: 999px;
          background: var(--accent);
        }
        .sor-sidebar-spacer {
          flex: 1;
        }
        .sor-guide-btn {
          min-height: 44px;
          margin-bottom: 14px;
          font-weight: 800;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          color: var(--text-primary);
          cursor: pointer;
          font: inherit;
          font-size: 14px;
        }
        .sor-mini-card {
          display: grid;
          gap: 10px;
          min-height: 94px;
          padding: 18px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
        }
        .sor-mini-card span {
          color: var(--text-muted);
          font-size: 13px;
        }
        .sor-mini-card strong {
          overflow: hidden;
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 600;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* ── Main content ── */
        .sor-content {
          padding: 24px 30px 34px 36px;
          overflow: auto;
        }
        .sor-view-content {
          margin-top: 28px;
        }

        /* ── Topbar ── */
        .sor-topbar {
          display: grid;
          grid-template-columns: minmax(320px, 1fr) 150px 80px auto;
          align-items: center;
          gap: 14px;
        }
        .sor-search {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 44px;
          padding: 0 18px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-input);
        }
        .sor-search span {
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 800;
          flex-shrink: 0;
        }
        .sor-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text-primary);
          font: inherit;
          font-size: 14px;
        }
        .sor-search input::placeholder {
          color: var(--text-muted);
        }
        .sor-btn-compact {
          min-height: 44px;
          padding: 0 16px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          color: var(--text-primary);
          font: inherit;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          white-space: nowrap;
        }
        .sor-btn-compact:hover:not(:disabled) {
          background: var(--bg-card-hover);
        }
        .sor-btn-compact:disabled {
          opacity: 0.4;
          cursor: default;
        }
        .sor-btn-icon {
          min-width: 44px;
          height: 44px;
          padding: 0 14px;
          border: 0;
          border-radius: 8px;
          background: var(--bg-input);
          color: var(--text-primary);
          font: inherit;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }
        .sor-profile {
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-primary);
          font-size: 14px;
        }
        .sor-avatar {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f09834, #b62731);
          font-size: 12px;
          font-weight: 800;
          color: white;
        }

        /* ── Hero ── */
        .sor-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 290px;
          gap: 18px;
        }
        .sor-hero-main {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 310px;
          padding: 26px;
          overflow: hidden;
          border-radius: 8px;
          background:
            linear-gradient(90deg, rgba(8, 15, 24, 0.22), rgba(8, 15, 24, 0.76)),
            radial-gradient(circle at 28% 38%, rgba(255, 121, 43, 0.65), transparent 28%),
            radial-gradient(circle at 72% 24%, rgba(192, 29, 48, 0.72), transparent 32%),
            linear-gradient(140deg, #253546 0%, #13202f 45%, #070d13 100%);
          box-shadow: var(--shadow-lg);
        }
        .sor-hero-main::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: linear-gradient(90deg, black, transparent);
          pointer-events: none;
        }
        .sor-chips {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .sor-chip {
          padding: 8px 18px;
          border-radius: 999px;
          background: rgba(8, 10, 18, 0.45);
          color: #fff;
          font-size: 13px;
        }
        .sor-eyebrow {
          margin: 0 0 10px;
          color: var(--accent);
          font-weight: 700;
          font-size: 14px;
        }
        .sor-headline {
          max-width: 620px;
          margin: 0;
          font-size: 54px;
          line-height: 1.02;
          color: var(--text-primary);
          font-weight: 800;
        }
        .sor-hero-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .sor-btn-primary {
          min-height: 46px;
          padding: 0 24px;
          border: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, #ff7836, #bb2639);
          color: white;
          font: inherit;
          font-weight: 800;
          cursor: pointer;
        }
        .sor-btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .sor-btn-secondary {
          min-height: 46px;
          padding: 0 24px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          color: var(--text-primary);
          font: inherit;
          font-weight: 800;
          cursor: pointer;
        }
        .sor-btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Toggle */
        .sor-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-primary);
          font-size: 14px;
          cursor: pointer;
          user-select: none;
        }
        .sor-toggle input { display: none; }
        .sor-toggle > span {
          position: relative;
          width: 42px;
          height: 24px;
          border-radius: 999px;
          background: var(--border-light);
          flex-shrink: 0;
        }
        .sor-toggle > span::after {
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          transition: transform 0.2s ease;
        }
        .sor-toggle input:checked + span {
          background: var(--accent);
        }
        .sor-toggle input:checked + span::after {
          transform: translateX(18px);
        }

        /* Action card (status) */
        .sor-action-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 310px;
          padding: 28px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background:
            radial-gradient(circle at 80% 24%, rgba(218, 35, 45, 0.9), transparent 34%),
            linear-gradient(140deg, #8b6729, #931f30 58%, #101823);
        }
        .sor-card-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
        }
        .sor-action-card strong {
          display: block;
          margin-top: 12px;
          font-size: 30px;
          color: white;
        }
        .sor-action-card p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.5;
          font-size: 14px;
          margin: 0;
        }
        .sor-btn-gold {
          width: 100%;
          min-height: 46px;
          padding: 0 24px;
          border: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, #d99b2f, #af6425);
          color: white;
          font: inherit;
          font-weight: 800;
          cursor: pointer;
        }

        /* ── Stats ── */
        .sor-stats {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-top: 26px;
        }
        .sor-stat {
          display: grid;
          gap: 8px;
          padding: 18px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
        }
        .sor-stat span {
          color: var(--text-muted);
          font-size: 13px;
        }
        .sor-stat strong {
          font-size: 30px;
          color: var(--text-primary);
        }

        /* ── Workspace ── */
        .sor-workspace {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 310px;
          gap: 18px;
          margin-top: 22px;
        }

        /* ── Panel ── */
        .sor-panel {
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          overflow: hidden;
        }
        .sor-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 20px;
          flex-wrap: wrap;
        }
        .sor-panel-head h2 {
          margin: 0;
          font-size: 18px;
          color: var(--text-primary);
        }
        .sor-panel-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .sor-count {
          color: var(--text-muted);
          font-size: 13px;
        }

        /* ── Table ── */
        .sor-table-wrap {
          max-height: 420px;
          overflow: auto;
        }
        .sor-report-wrap {
          max-height: calc(100vh - 200px);
        }
        .sor-tbl {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .sor-tbl th,
        .sor-tbl td {
          padding: 12px 20px;
          border-top: 1px solid var(--border);
          text-align: left;
          vertical-align: middle;
        }
        .sor-tbl th {
          position: sticky;
          top: 0;
          z-index: 1;
          background: var(--bg-input);
          color: var(--text-secondary);
          font-weight: 700;
        }
        .sor-tbl td {
          color: var(--text-primary);
        }
        .sor-tbl tbody tr:hover {
          background: var(--bg-card-hover);
        }
        .sor-empty {
          color: var(--text-muted);
          text-align: center;
          padding: 40px 20px !important;
        }
        .sor-empty-box {
          color: var(--text-muted);
          text-align: center;
          padding: 40px;
        }
        .sor-path-cell {
          max-width: 260px;
          overflow: hidden;
          color: var(--text-secondary);
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Thumbnails */
        .sor-thumb {
          display: block;
          width: 74px;
          height: 54px;
          border: 1px solid var(--border);
          border-radius: 8px;
          object-fit: cover;
          background: var(--bg-input);
          cursor: zoom-in;
        }
        .sor-thumb-placeholder {
          display: grid;
          place-items: center;
          color: var(--text-muted);
          font-size: 11px;
          cursor: default;
        }

        /* Tags */
        .sor-tag {
          display: inline-flex;
          min-width: 84px;
          justify-content: center;
          padding: 5px 9px;
          border-radius: 999px;
          background: rgba(73, 209, 125, 0.13);
          color: var(--green);
          font-weight: 800;
        }
        .sor-tag.missing {
          background: rgba(255, 107, 44, 0.14);
          color: var(--accent);
        }

        /* Products */
        .sor-product-list {
          display: grid;
          gap: 10px;
          max-height: 420px;
          padding: 0 18px 18px;
          overflow: auto;
        }
        .sor-product-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 8px;
          background: var(--bg-input);
          font-size: 13px;
          color: var(--text-primary);
        }
        .sor-product-row span {
          color: var(--text-muted);
        }

        /* ── Gallery ── */
        .sor-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          gap: 16px;
          max-height: calc(100vh - 200px);
          padding: 0 20px 20px;
          overflow: auto;
        }
        .sor-gallery-card {
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-input);
          transition: border-color 0.15s, transform 0.15s;
        }
        .sor-gallery-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .sor-gallery-card img {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          background: var(--bg-input);
        }
        .sor-gallery-card div {
          display: grid;
          gap: 6px;
          padding: 12px;
        }
        .sor-gallery-card strong {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          color: var(--text-primary);
        }
        .sor-gallery-card span {
          color: var(--green);
          font-size: 12px;
          font-weight: 800;
        }

        /* ── Hover preview ── */
        .sor-img-preview {
          position: fixed;
          z-index: 100;
          pointer-events: none;
          padding: 6px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg-card);
          box-shadow: var(--shadow-lg);
        }
        .sor-img-preview img {
          display: block;
          max-width: 360px;
          max-height: 360px;
          border-radius: 8px;
          object-fit: contain;
          background: var(--bg-input);
        }

        /* ── Guide modal ── */
        .sor-modal {
          position: fixed;
          inset: 0;
          z-index: 10;
          display: grid;
          place-items: center;
          padding: 24px;
          background: rgba(0, 0, 0, 0.56);
        }
        .sor-modal-card {
          width: min(620px, 100%);
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-modal);
          box-shadow: var(--shadow-lg);
        }
        .sor-guide-copy {
          display: grid;
          gap: 10px;
          padding: 0 20px 24px;
          color: var(--text-primary);
        }
        .sor-guide-copy p {
          margin: 0;
          line-height: 1.5;
          font-size: 14px;
        }

        /* ── Nav icons ── */
        .sor-nav-icon {
          width: 22px;
          height: 22px;
          object-fit: contain;
          flex-shrink: 0;
          opacity: 0.7;
          filter: grayscale(1);
          transition: opacity 0.15s, filter 0.15s;
        }
        .sor-nav-item.active .sor-nav-icon {
          opacity: 1;
          filter: none;
        }
        .sor-nav-item:hover .sor-nav-icon {
          opacity: 1;
        }

        /* ── Categorize view ── */
        .sor-cat-body {
          padding: 0 20px 24px;
        }
        .sor-cat-desc {
          margin: 0 0 18px;
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.6;
        }
        .sor-cat-select-all {
          margin-bottom: 14px;
        }
        .sor-cat-check {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 700;
          user-select: none;
        }
        .sor-cat-check input {
          width: 16px;
          height: 16px;
          accent-color: var(--accent);
          cursor: pointer;
        }
        .sor-cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .sor-cat-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-input);
          cursor: pointer;
          user-select: none;
          transition: border-color 0.15s, background 0.15s;
        }
        .sor-cat-option:hover {
          border-color: var(--accent);
        }
        .sor-cat-option.selected {
          border-color: var(--accent);
          background: rgba(249, 115, 22, 0.08);
        }
        .sor-cat-option input {
          width: 16px;
          height: 16px;
          accent-color: var(--accent);
          cursor: pointer;
        }
        .sor-cat-name {
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 600;
        }
        .sor-cat-actions {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }

        .sor-status-file-row {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .sor-hidden-file {
          display: none;
        }
        .sor-status-file-name {
          min-width: 0;
          overflow: hidden;
          color: var(--text-secondary);
          font-size: 13px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .sor-cat-workspace {
          display: grid;
          gap: 18px;
        }

        .sor-row-selected {
          background: rgba(249, 115, 22, 0.06) !important;
        }

        .sor-cat-move-panel {
          min-height: 0;
        }
        .sor-cat-move-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          padding: 0 20px 20px;
        }
        .sor-cat-move-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 18px 12px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-input);
          color: var(--text-primary);
          font: inherit;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s, transform 0.15s;
        }
        .sor-cat-move-btn:hover:not(:disabled) {
          border-color: var(--accent);
          background: rgba(249, 115, 22, 0.08);
          transform: translateY(-1px);
        }
        .sor-cat-move-btn:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .sor-cat-move-icon {
          font-size: 24px;
        }

        /* ── Light mode overrides ── */
        [data-theme="light"] .sor-hero-main {
          background:
            linear-gradient(90deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.76)),
            radial-gradient(circle at 28% 38%, rgba(255, 121, 43, 0.45), transparent 28%),
            radial-gradient(circle at 72% 24%, rgba(192, 29, 48, 0.42), transparent 32%),
            linear-gradient(140deg, #fef3e2 0%, #fde8d8 45%, #fceade 100%);
        }
        [data-theme="light"] .sor-hero-main::after {
          background-image:
            linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
        }
        [data-theme="light"] .sor-action-card {
          background:
            radial-gradient(circle at 80% 24%, rgba(218, 35, 45, 0.7), transparent 34%),
            linear-gradient(140deg, #e8a84c, #c03040 58%, #f5e6d0);
        }
        [data-theme="light"] .sor-chip {
          background: rgba(0, 0, 0, 0.08);
          color: var(--text-primary);
        }
        [data-theme="light"] .sor-brand-mark {
          background: var(--bg-input);
          color: var(--text-primary);
        }
        [data-theme="light"] .sor-tag {
          background: rgba(22, 163, 74, 0.1);
        }
        [data-theme="light"] .sor-tag.missing {
          background: rgba(255, 107, 44, 0.1);
        }

        /* ── Responsive ── */
        @media (max-width: 1120px) {
          .sor-shell {
            grid-template-columns: 176px 1fr !important;
          }
          .sor-topbar,
          .sor-hero,
          .sor-workspace {
            grid-template-columns: 1fr;
          }
          .sor-profile {
            justify-self: start;
          }
          .sor-headline {
            font-size: 44px;
          }
          .sor-action-card {
            min-height: 180px;
          }
        }
        @media (max-width: 860px) {
          .sor-shell {
            grid-template-columns: 1fr !important;
          }
          .sor-sidebar {
            display: none;
          }
          .sor-stats {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
