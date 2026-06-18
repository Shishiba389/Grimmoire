import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNotifications } from "../contexts/NotificationContext";
import { apiUrl } from "./ToolShared";

/* ── Types ── */

type JobStatus = "pending" | "running" | "completed" | "failed";

interface JobRecord {
  id: string;
  status: JobStatus;
  original_filename?: string | null;
  output_path?: string | null;
  error?: string | null;
  summary?: Record<string, unknown>;
}

interface ReportSheet {
  headers: string[];
  rows: Record<string, unknown>[];
}

interface ReportData {
  sheets: Record<string, ReportSheet>;
}

interface RuleProfile {
  included_statuses: string[];
  priority_fields: Record<string, string[]>;
  fields_to_audit?: string[];
}

interface AuditRun {
  id: number;
  job_id?: string | null;
  source_path?: string | null;
  output_path?: string | null;
  created_at?: string | null;
  brand_count?: number;
  included_rows?: number;
  total_rows?: number;
  action_count?: number;
  validation_error_count?: number;
}

type SortDir = "asc" | "desc";

interface SortState {
  col: string;
  dir: SortDir;
}

type Priority = "Critical" | "High" | "Medium" | "Low";

const PRIORITY_ORDER: Record<string, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

const PRI_CLS: Record<string, string> = {
  Critical: "solid-crit",
  High: "solid-high",
  Medium: "solid-med",
  Low: "solid-low",
};

const STATUS_CLS: Record<string, string> = {
  "To Do": "out-open",
  "In Progress": "out-prog",
  Done: "out-res",
  Completed: "out-closed",
};

const TABS = [
  "Overview",
  "Summary Tracker",
  "Action Tracker",
  "Brand Scorecard",
  "SKU Missing Detail",
  "Validation Errors",
  "Run Summary",
] as const;

type TabName = (typeof TABS)[number];

type AioSubtab =
  | "dqc"
  | "master"
  | "steward"
  | "rules"
  | "history"
  | "reports"
  | "config";

const ALL_STATUSES = [
  "ACTIVE",
  "Upcoming",
  "Limited",
  "Non-Active",
  "Discontinued",
  "N/A",
  "Unknown",
  "Others",
  "NON-ACR",
];

const DEFAULT_STATUSES = [
  "ACTIVE",
  "Upcoming",
  "Limited",
  "N/A",
  "Unknown",
  "Others",
  "NON-ACR",
];

const PRIORITIES: Priority[] = ["Critical", "High", "Medium", "Low"];

const NUMERIC_COLS = new Set([
  "Total",
  "# Missing",
  "Active",
  "Upcoming",
  "Limited",
  "Non-Active",
  "Discontinued",
  "Blanks",
  "N/A",
  "Unknown",
  "Non-ACR",
  "Others",
  "Source Row",
]);

/* ── Helpers ── */

async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(path), init);
  if (!response.ok) {
    let detail = response.statusText;
    try {
      const payload = await response.json();
      detail =
        typeof payload.detail === "string"
          ? payload.detail
          : JSON.stringify(payload.detail ?? payload);
    } catch {
      detail = await response.text().catch(() => response.statusText);
    }
    throw new Error(detail);
  }
  return response.json() as Promise<T>;
}

function cellText(v: unknown): string {
  if (v == null) return "";
  return String(v);
}

function priorityForField(field: string): Priority {
  if (
    [
      "Description (250+ words)",
      "EU Responsible person",
      "UK Responsible person",
    ].includes(field)
  )
    return "Critical";
  if (
    [
      "CPNP Number",
      "UK SCPN NUMBER",
      "Manufacturer name",
      "Ingredient list",
    ].includes(field)
  )
    return "High";
  if (
    [
      "BAR CODE",
      "Net Weight (g)",
      "Gross weight (g)",
      "PAO (Months)",
      "Shelf Life (Months)",
      "SUPPLY PRICE",
    ].includes(field)
  )
    return "Medium";
  return "Low";
}

function sheetForTab(
  tab: TabName,
  reportSheets: Record<string, ReportSheet> | null
): ReportSheet | null {
  if (!reportSheets) return null;
  const sheetName = tab === "Overview" ? "Missing Data Overview" : tab;
  return reportSheets[sheetName] || null;
}

function normalizedSheetRows(
  tab: TabName,
  sheet: ReportSheet | null
): Record<string, unknown>[] {
  if (!sheet || !sheet.rows) return [];
  if (tab !== "SKU Missing Detail") return sheet.rows;

  const grouped = new Map<string, Record<string, unknown>>();
  for (const row of sheet.rows) {
    const key = [
      row.Brand || "",
      row.SKU || "",
      row["Product Name"] || "",
      row.Status || "",
      row["Source Row"] || "",
    ].join("|");
    const existing = grouped.get(key) || {
      Brand: row.Brand || "",
      SKU: row.SKU || "",
      "Product Name": row["Product Name"] || "",
      Status: row.Status || "",
      "Missing Fields": [] as string[],
      Priority:
        (row.Priority as string) ||
        priorityForField(cellText(row["Missing Field"])),
      "Source Row": row["Source Row"] || "",
    };
    if (row["Missing Field"]) {
      (existing["Missing Fields"] as string[]).push(
        cellText(row["Missing Field"])
      );
    }
    if (
      PRIORITY_ORDER[row.Priority as string] <
      PRIORITY_ORDER[existing.Priority as string]
    ) {
      existing.Priority = row.Priority;
    }
    grouped.set(key, existing);
  }
  return Array.from(grouped.values()).map((row) => ({
    ...row,
    "Missing Fields": (row["Missing Fields"] as string[]).join("; "),
  }));
}

function columnsFor(tab: TabName, sheet: ReportSheet | null): string[] {
  if (!sheet || !sheet.headers) return [];
  if (tab === "SKU Missing Detail")
    return [
      "Brand",
      "SKU",
      "Product Name",
      "Status",
      "Missing Fields",
      "Priority",
      "Source Row",
    ];
  return sheet.headers.filter(
    (header) => header && !String(header).startsWith("Column ")
  );
}

const AIO_NAV: Array<
  | { section: string; id?: never; label?: never; icon?: never }
  | { id: AioSubtab | "imageedit"; label: string; icon: Parameters<typeof IconLine>[0]["name"]; section?: never }
> = [
  { section: "DATA_MAINTENANCE" },
  { id: "dqc", label: "Data Quality Control", icon: "shield" },
  { id: "master", label: "Master Data", icon: "db" },
  { id: "steward", label: "Data Steward", icon: "user" },
  { id: "rules", label: "Rule Profiles", icon: "list" },
  { id: "history", label: "Audit History", icon: "clock" },
  { id: "reports", label: "Reports", icon: "report" },
  { id: "config", label: "Configuration", icon: "gear" },
  { section: "IMAGE_EDIT" },
  { id: "imageedit", label: "Image Edit", icon: "image" },
];

const AIO_TITLES: Record<AioSubtab, string> = {
  dqc: "Data Quality Control",
  master: "Master Data",
  steward: "Data Steward",
  rules: "Rule Profiles",
  history: "Audit History",
  reports: "Reports",
  config: "Configuration",
};

function formatRunDate(value?: string | null) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function downloadJobReport(jobId?: string | null) {
  if (!jobId) return;
  window.open(apiUrl(`/api/jobs/${encodeURIComponent(jobId)}/download`), "_blank");
}

function useAuditHistory(notifyError: (message: string) => void) {
  const [runs, setRuns] = useState<AuditRun[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiJson<AuditRun[]>(
        "/api/data-quality-control/history?limit=100"
      );
      setRuns(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      notifyError(`Could not load audit history: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, [notifyError]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    window.addEventListener("aio:reports:refresh", refresh);
    return () => window.removeEventListener("aio:reports:refresh", refresh);
  }, [refresh]);

  return { runs, loading, error, refresh };
}

function AioMetricCard({
  label,
  value,
  sub,
  tone,
  filename,
}: {
  label: string;
  value: React.ReactNode;
  sub: string;
  tone?: "green" | "red";
  filename?: boolean;
}) {
  return (
    <div className="aio-card aio-metric">
      <div className="aio-metric-label">{label}</div>
      <div className={`aio-metric-value ${tone || ""} ${filename ? "filename" : ""}`} title={typeof value === "string" ? value : undefined}>{value}</div>
      <div className="aio-muted">{sub}</div>
    </div>
  );
}

interface MasterDataState {
  loaded: boolean;
  dqc_file?: string;
  master_file?: string;
  brands?: string[];
  master_brands?: string[];
  selected_brand?: string | null;
}

function MasterDataSubtab() {
  const { notify } = useNotifications();
  const [state, setState] = useState<MasterDataState>({ loaded: false });
  const [brand, setBrand] = useState("");
  const [productCount, setProductCount] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingStatus, setGeneratingStatus] = useState(false);
  const [showStatusPrompt, setShowStatusPrompt] = useState(false);
  const dqcRef = useRef<HTMLInputElement>(null);
  const masterRef = useRef<HTMLInputElement>(null);
  const [dqcFileName, setDqcFileName] = useState("");
  const [masterFileName, setMasterFileName] = useState("");

  useEffect(() => {
    apiJson<MasterDataState>("/api/master-data/state").then((s) => {
      setState(s);
      if (s.selected_brand) {
        setBrand(s.selected_brand);
        apiJson<{ product_count: number }>("/api/master-data/select-brand", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ brand: s.selected_brand }),
        }).then((r) => setProductCount(r.product_count)).catch(() => {});
      }
      if (s.dqc_file) setDqcFileName(s.dqc_file);
      if (s.master_file) setMasterFileName(s.master_file);
    }).catch(() => {});
  }, []);

  async function handleUpload() {
    const dqcFile = dqcRef.current?.files?.[0];
    const masterFile = masterRef.current?.files?.[0];
    if (!dqcFile || !masterFile) {
      notify("Please select both files", { type: "warning" });
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("dqc_file", dqcFile);
      form.append("master_file", masterFile);
      const res = await apiJson<{ brands: string[]; master_brands: string[]; dqc_file: string; master_file: string }>(
        "/api/master-data/upload",
        { method: "POST", body: form }
      );
      setState({ loaded: true, brands: res.brands, master_brands: res.master_brands, dqc_file: res.dqc_file, master_file: res.master_file, selected_brand: null });
      setDqcFileName(res.dqc_file);
      setMasterFileName(res.master_file);
      setBrand("");
      setProductCount(null);
      notify(`Files uploaded — ${res.brands.length} brands found in DQC report`, { type: "success" });
    } catch (err) {
      notify("Upload failed", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setUploading(false);
    }
  }

  async function handleBrandSelect(b: string) {
    setBrand(b);
    if (!b) { setProductCount(null); return; }
    try {
      const res = await apiJson<{ product_count: number }>("/api/master-data/select-brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand: b }),
      });
      setProductCount(res.product_count);
    } catch (err) {
      notify("Could not select brand", { type: "error", message: err instanceof Error ? err.message : String(err) });
    }
  }

  async function handleGenerate() {
    if (!brand) { notify("Select a brand first", { type: "warning" }); return; }
    setGenerating(true);
    try {
      const resp = await fetch(apiUrl("/api/master-data/generate"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand }),
      });
      if (!resp.ok) throw new Error(await resp.text());
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${brand}_Missing_Data.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
      notify(`${brand}_Missing_Data.xlsx downloaded`, { type: "success" });
      setShowStatusPrompt(true);
    } catch (err) {
      notify("Generation failed", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setGenerating(false);
    }
  }

  async function handleGenerateStatus() {
    setGeneratingStatus(true);
    try {
      const resp = await fetch(apiUrl("/api/master-data/generate-status"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand }),
      });
      if (!resp.ok) throw new Error(await resp.text());
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${brand}_Missing_Data_Status.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
      notify(`${brand}_Missing_Data_Status.xlsx downloaded`, { type: "success" });
    } catch (err) {
      notify("Status file generation failed", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setGeneratingStatus(false);
      setShowStatusPrompt(false);
    }
  }

  const brands = state.brands ?? [];

  return (
    <div className="aio-fade">
      <div className="aio-stat-grid">
        <AioMetricCard label="DQC Report" value={dqcFileName || "—"} sub={state.loaded ? "uploaded" : "not uploaded"} filename />
        <AioMetricCard label="Master Data" value={masterFileName || "—"} sub={state.loaded ? "uploaded" : "not uploaded"} filename />
        <AioMetricCard label="Brands (DQC)" value={brands.length || "—"} sub="from DQC report" />
        <AioMetricCard label="Products" value={productCount ?? "—"} sub={brand ? `in ${brand}` : "select a brand"} tone={productCount ? "green" : undefined} />
      </div>

      <section className="aio-card aio-pad">
        <h3>Upload Files</h3>
        <p className="aio-muted">Upload the DQC report (downloaded from Data Quality Control tab) and the Master Data Excel file.</p>
        <div className="aio-form-grid">
          <label>
            DQC Report (.xlsx)
            <input ref={dqcRef} type="file" accept=".xlsx,.xls" className="aio-input" />
          </label>
          <label>
            Master Data (.xlsx)
            <input ref={masterRef} type="file" accept=".xlsx,.xls" className="aio-input" />
          </label>
        </div>
        <div className="aio-actions-row" style={{ marginTop: 12 }}>
          <button className="btn btn-primary btn-sm" onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload & Read Files"}
          </button>
        </div>
      </section>

      {state.loaded && (
        <section className="aio-card aio-pad">
          <h3>Generate Missing Data</h3>
          <div className="aio-form-grid">
            <label>
              Select Brand
              <select className="aio-input" value={brand} onChange={(e) => handleBrandSelect(e.target.value)}>
                <option value="">— choose brand —</option>
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </label>
          </div>
          {brand && productCount !== null && (
            <p className="aio-muted" style={{ marginTop: 8 }}>
              {productCount} products found for <strong>{brand}</strong>
            </p>
          )}
          <div className="aio-actions-row" style={{ marginTop: 12 }}>
            <button className="btn btn-primary btn-sm" onClick={handleGenerate} disabled={!brand || generating}>
              {generating ? "Generating..." : `Generate ${brand || "Brand"}_Missing_Data.xlsx`}
            </button>
          </div>
        </section>
      )}

      {showStatusPrompt && (
        <AioModal title="Generate Status File?" onClose={() => setShowStatusPrompt(false)}>
          <p>Would you also like to generate <strong>{brand}_Missing_Data_Status.xlsx</strong>?</p>
          <p className="aio-muted">This file lists all {productCount} products with their status from the master data.</p>
          <div className="aio-modal-actions">
            <button className="btn btn-secondary" onClick={() => setShowStatusPrompt(false)}>No, Skip</button>
            <button className="btn btn-primary" disabled={generatingStatus} onClick={handleGenerateStatus}>
              {generatingStatus ? "Generating..." : "Yes, Generate"}
            </button>
          </div>
        </AioModal>
      )}
    </div>
  );
}

function DataStewardSubtab() {
  return (
    <section className="aio-card aio-pad">
      <h3>Action Ownership</h3>
      <p className="aio-muted">
        Action Tracker rows are generated from the current DQC report. Ownership workflow is empty until real assignments are created.
      </p>
      <div className="aio-table-wrap">
        <table className="aio-table">
          <thead><tr><th>Brand</th><th>Field</th><th>Priority</th><th>Status</th><th>Owner</th></tr></thead>
          <tbody><tr><td colSpan={5} className="aio-empty">No stewardship assignments have been created yet.</td></tr></tbody>
        </table>
      </div>
    </section>
  );
}

function RuleProfilesSubtab() {
  const { notify } = useNotifications();
  const [rules, setRules] = useState<RuleProfile | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [includedText, setIncludedText] = useState("");
  const [priorityText, setPriorityText] = useState("");
  const [saving, setSaving] = useState(false);

  const loadRules = useCallback(() => {
    apiJson<RuleProfile>("/api/data-quality-control/rule-profile")
      .then(setRules)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  useEffect(() => {
    loadRules();
  }, [loadRules]);

  function openEditor() {
    setIncludedText((rules?.included_statuses || []).join("\n"));
    setPriorityText(JSON.stringify(rules?.priority_fields || {}, null, 2));
    setEditing(true);
  }

  useEffect(() => {
    window.addEventListener("aio:rules:edit", openEditor);
    return () => window.removeEventListener("aio:rules:edit", openEditor);
  });

  async function saveRules() {
    setSaving(true);
    try {
      const updated = await apiJson<RuleProfile>(
        "/api/data-quality-control/rule-profile",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            included_statuses: includedText
              .split(/\r?\n|,/)
              .map((v) => v.trim())
              .filter(Boolean),
            priority_fields: JSON.parse(priorityText || "{}"),
          }),
        }
      );
      setRules(updated);
      setEditing(false);
      notify("Rule profile saved", { type: "success" });
    } catch (err) {
      notify("Could not save rule profile", {
        type: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setSaving(false);
    }
  }

  const priorityFields = Object.entries(rules?.priority_fields || {});
  return (
    <div className="aio-rules-grid">
      <section className="aio-card aio-pad">
        <h3>Active Rule Profile</h3>
        {error && <div className="aio-error">{error}</div>}
        <p className="aio-muted">
          The backend rule profile controls included statuses and priority scoring for every new DQC run.
        </p>
        <h4>Included Statuses</h4>
        <div className="aio-chip-row">
          {(rules?.included_statuses || []).map((status) => (
            <span key={status || "Blank"} className="aio-chip">{status || "Blank"}</span>
          ))}
          {!rules && <span className="aio-muted">Loading...</span>}
        </div>
      </section>
      <section className="aio-card">
        <div className="aio-card-head">
          <strong>Priority Fields</strong>
          <button className="btn btn-secondary btn-sm" onClick={openEditor}>Edit</button>
        </div>
        <table className="aio-table">
          <thead><tr><th>Priority</th><th>Fields</th><th>Count</th></tr></thead>
          <tbody>
            {priorityFields.map(([priority, fields]) => (
              <tr key={priority}>
                <td><span className={`aio-priority ${priority.toLowerCase()}`}>{priority}</span></td>
                <td>{fields.join(", ")}</td>
                <td className="num">{fields.length}</td>
              </tr>
            ))}
            {!priorityFields.length && <tr><td colSpan={3} className="aio-empty">No rule profile loaded.</td></tr>}
          </tbody>
        </table>
      </section>
      {editing && (
        <AioModal title="Edit Rule Profile" onClose={() => setEditing(false)} wide>
          <label className="aio-block-label">Included Statuses<textarea className="aio-input aio-textarea" value={includedText} onChange={(e) => setIncludedText(e.target.value)} /></label>
          <label className="aio-block-label">Priority Fields JSON<textarea className="aio-input aio-textarea code" value={priorityText} onChange={(e) => setPriorityText(e.target.value)} /></label>
          <div className="aio-modal-actions">
            <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            <button className="btn btn-primary" disabled={saving} onClick={saveRules}>{saving ? "Saving..." : "Save Rule Profile"}</button>
          </div>
        </AioModal>
      )}
    </div>
  );
}

function AuditHistorySubtab() {
  const { notify } = useNotifications();
  const notifyError = useCallback((message: string) => notify(message, { type: "error" }), [notify]);
  const { runs, loading, error, refresh } = useAuditHistory(notifyError);
  const latest = runs[0] || null;
  const latestIssues = Number(latest?.action_count || 0) + Number(latest?.validation_error_count || 0);

  return (
    <div className="aio-fade">
      <div className="aio-stat-grid">
        <AioMetricCard label="Latest Brands" value={latest ? latest.brand_count ?? 0 : "-"} sub="latest completed run" tone="green" />
        <AioMetricCard label="Included Rows" value={latest ? latest.included_rows ?? 0 : "-"} sub="selected status rows" />
        <AioMetricCard label="Open Issues" value={latest ? latestIssues : "-"} sub="actions + validations" tone="red" />
        <AioMetricCard label="History" value={runs.length} sub="stored audit runs" />
      </div>
      <section className="aio-card aio-pad">
        <div className="aio-card-title-row">
          <h3>Audit Timeline</h3>
          <button className="btn btn-secondary btn-sm" onClick={refresh} disabled={loading}><IconLine name="refresh" size={15} /> Refresh</button>
        </div>
        {error && <div className="aio-error">{error}</div>}
        <div className="aio-timeline">
          {runs.map((run) => (
            <div className="aio-timeline-item" key={run.id}>
              <span className="aio-dot" />
              <div className="aio-timeline-body">
                <div className="aio-muted">{formatRunDate(run.created_at)}</div>
                <strong>{run.source_path ? run.source_path.split(/[\\/]/).pop() : "Data Quality Control Run"}</strong>
                <div className="aio-run-meta">
                  <span>{run.brand_count ?? 0} brands</span>
                  <span>{run.included_rows ?? 0}/{run.total_rows ?? 0} rows</span>
                  <span>{run.action_count ?? 0} actions</span>
                  <span>{run.validation_error_count ?? 0} validations</span>
                  <span className="aio-chip green">Completed</span>
                  <button className="btn btn-success btn-sm" disabled={!run.job_id} onClick={() => downloadJobReport(run.job_id)}>
                    <IconDownload size={14} /> Report
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!runs.length && <div className="aio-empty">{loading ? "Loading audit history..." : "No audit history yet. Run DQC to create the first record."}</div>}
        </div>
      </section>
    </div>
  );
}

function ReportsSubtab() {
  const { notify } = useNotifications();
  const notifyError = useCallback((message: string) => notify(message, { type: "error" }), [notify]);
  const { runs, loading, error, refresh } = useAuditHistory(notifyError);

  return (
    <section className="aio-card">
      <div className="aio-card-head">
        <strong>Generated Reports</strong>
        <button className="btn btn-secondary btn-sm" onClick={refresh} disabled={loading}><IconLine name="refresh" size={15} /> Refresh</button>
      </div>
      {error && <div className="aio-error in-card">{error}</div>}
      <table className="aio-table">
        <thead><tr><th>File</th><th>Generated</th><th>Rows</th><th>Issues</th><th></th></tr></thead>
        <tbody>
          {runs.map((run) => {
            const filename = run.output_path ? run.output_path.split(/[\\/]/).pop() : "report.xlsx";
            const issues = Number(run.action_count || 0) + Number(run.validation_error_count || 0);
            return (
              <tr key={run.id}>
                <td><strong>{filename}</strong></td>
                <td>{formatRunDate(run.created_at)}</td>
                <td className="num">{run.included_rows ?? 0}/{run.total_rows ?? 0}</td>
                <td className="num">{issues}</td>
                <td><button className="btn btn-success btn-sm" disabled={!run.job_id} onClick={() => downloadJobReport(run.job_id)}><IconDownload size={14} /> Download</button></td>
              </tr>
            );
          })}
          {!runs.length && <tr><td colSpan={5} className="aio-empty">{loading ? "Loading reports..." : "No generated reports yet."}</td></tr>}
        </tbody>
      </table>
    </section>
  );
}

function ConfigurationSubtab() {
  const { notify } = useNotifications();
  const [section, setSection] = useState("General");
  const [toggles, setToggles] = useState({ autoAudit: false, email: false, weekly: false, lockDrafts: false });
  const [thresholds, setThresholds] = useState({ crit: 95, high: 85, med: 70 });
  const [freq, setFreq] = useState("Weekly");

  useEffect(() => {
    const save = () => notify("Configuration saved locally", { type: "success" });
    window.addEventListener("aio:config:save", save);
    return () => window.removeEventListener("aio:config:save", save);
  }, [notify]);

  function toggle(key: keyof typeof toggles) {
    setToggles((current) => ({ ...current, [key]: !current[key] }));
  }

  function Switch({ stateKey }: { stateKey: keyof typeof toggles }) {
    return <button className={`aio-switch${toggles[stateKey] ? " on" : ""}`} onClick={() => toggle(stateKey)} />;
  }

  return (
    <div className="aio-config-grid">
      <div className="aio-card aio-config-nav">
        {["General", "Thresholds", "Connections", "Notifications"].map((item) => (
          <button key={item} className={section === item ? "active" : ""} onClick={() => setSection(item)}>
            <IconLine name={item === "General" ? "gear" : item === "Thresholds" ? "shield" : item === "Connections" ? "db" : "report"} size={17} /> {item}
          </button>
        ))}
      </div>
      <section className="aio-card aio-pad">
        {section === "General" && (
          <>
            <h3>General</h3>
            <SettingRow name="Auto-run audit" desc="Reserved for scheduled local runs"><Switch stateKey="autoAudit" /></SettingRow>
            <SettingRow name="Audit frequency" desc="Used when scheduling is enabled">
              <div className="aio-segmented">{["Daily", "Weekly", "Monthly"].map((f) => <button key={f} className={freq === f ? "active" : ""} onClick={() => setFreq(f)}>{f}</button>)}</div>
            </SettingRow>
            <SettingRow name="Lock draft records from audit" desc="Exclude incomplete drafts from scoring"><Switch stateKey="lockDrafts" /></SettingRow>
          </>
        )}
        {section === "Thresholds" && (
          <>
            <h3>Score Thresholds</h3>
            {[
              ["crit", "Critical fields"],
              ["high", "High-priority fields"],
              ["med", "Medium fields"],
            ].map(([key, label]) => (
              <SettingRow key={key} name={label} desc="Completion threshold">
                <div className="aio-number-wrap">
                  <input className="aio-input" type="number" value={thresholds[key as keyof typeof thresholds]} onChange={(e) => setThresholds((current) => ({ ...current, [key]: Math.min(100, Number(e.target.value) || 0) }))} />
                  <span>%</span>
                </div>
              </SettingRow>
            ))}
            <button className="btn btn-primary btn-sm" onClick={() => notify("Thresholds saved locally", { type: "success" })}>Save Thresholds</button>
          </>
        )}
        {section === "Connections" && (
          <>
            <h3>Data Connections</h3>
            <p className="aio-muted">This local build reads uploaded Excel/CSV files directly. External connectors are not enabled.</p>
          </>
        )}
        {section === "Notifications" && (
          <>
            <h3>Notifications</h3>
            <SettingRow name="Email digest" desc="Reserved for future local notification setup"><Switch stateKey="email" /></SettingRow>
            <SettingRow name="Weekly scorecard" desc="Reserved for future local notification setup"><Switch stateKey="weekly" /></SettingRow>
          </>
        )}
      </section>
    </div>
  );
}

function SettingRow({
  name,
  desc,
  children,
}: {
  name: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="aio-setting-row">
      <div>
        <strong>{name}</strong>
        <div className="aio-muted">{desc}</div>
      </div>
      {children}
    </div>
  );
}

function AioModal({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="aio-modal-backdrop">
      <div className={`aio-modal${wide ? " wide" : ""}`}>
        <div className="aio-modal-head">
          <strong>{title}</strong>
          <button className="aio-icon-btn" onClick={onClose}><IconLine name="x" size={16} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function DataQcView() {
  const { notify } = useNotifications();
  const [subtab, setSubtab] = useState<AioSubtab>("dqc");
  const [collapsed, setCollapsed] = useState(false);

  function openDqcUpload() {
    setSubtab("dqc");
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("aio:dqc:open-upload"));
    }, 0);
  }

  function navTo(id: AioSubtab | "imageedit") {
    if (id === "imageedit") {
      notify("Use the main GRIMOIRE Image Edit tab for the full image workflow.", {
        type: "info",
      });
      return;
    }
    setSubtab(id);
  }

  const actions: Record<AioSubtab, React.ReactNode> = {
    dqc: (
      <>
        <button className="btn btn-secondary" onClick={openDqcUpload}><IconDownload size={15} /> Upload Master Data</button>
        <button className="btn btn-primary" onClick={openDqcUpload}><IconPlay size={15} /> Run Audit</button>
      </>
    ),
    master: (
      <>
        <button className="btn btn-secondary" onClick={openDqcUpload}><IconDownload size={15} /> Import Master Data</button>
        <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent("aio:master:new-record"))}>+ New Record</button>
      </>
    ),
    steward: <button className="btn btn-primary" disabled><IconLine name="refresh" size={15} /> Auto-Assign</button>,
    rules: <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent("aio:rules:edit"))}>Edit Rule Profile</button>,
    history: <button className="btn btn-primary" onClick={openDqcUpload}><IconPlay size={15} /> Run Audit</button>,
    reports: <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent("aio:reports:refresh"))}><IconLine name="refresh" size={15} /> Refresh Reports</button>,
    config: <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent("aio:config:save"))}><IconCheck size={14} /> Save Changes</button>,
  };

  const content: Record<AioSubtab, React.ReactNode> = {
    dqc: <DataQualityControlPanel />,
    master: <MasterDataSubtab />,
    steward: <DataStewardSubtab />,
    rules: <RuleProfilesSubtab />,
    history: <AuditHistorySubtab />,
    reports: <ReportsSubtab />,
    config: <ConfigurationSubtab />,
  };

  return (
    <div className={`aio-embed${collapsed ? " collapsed" : ""}`}>
      <aside className="aio-sidebar">
        <div className="aio-sidebar-top">
          <span className="aio-brand-mark"><IconLine name="grid" size={15} /></span>
          <span className="aio-brand-name">UNIFICATION AIO</span>
          <button className="aio-collapse" onClick={() => setCollapsed((value) => !value)} title="Toggle sidebar">
            <IconLine name="menu" size={18} />
          </button>
        </div>
        <nav className="aio-nav">
          {AIO_NAV.map((item, index) =>
            "section" in item ? (
              <div key={`${item.section}-${index}`} className="aio-nav-section">{item.section}</div>
            ) : (
              <button
                key={item.id}
                className={`aio-nav-item${subtab === item.id ? " active" : ""}`}
                onClick={() => navTo(item.id)}
                title={item.label}
              >
                <IconLine name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            )
          )}
        </nav>
        <div className="aio-side-foot">
          <button className="aio-account"><span className="aio-avatar"><IconLine name="user" size={16} /></span><span>Data Admin</span><IconChevDown size={14} /></button>
        </div>
      </aside>
      <div className="aio-main">
        <header className="aio-topbar">
          <h2>{AIO_TITLES[subtab]}</h2>
          <div className="aio-topbar-actions">{actions[subtab]}</div>
        </header>
        <main className="aio-content">{content[subtab]}</main>
      </div>
      <style>{`
        .aio-embed {
          --aio-red: var(--accent);
          --aio-ink: var(--text-primary);
          --aio-secondary: var(--text-secondary);
          --aio-muted: var(--text-muted);
          --aio-line: var(--border);
          --aio-line-strong: var(--border-light);
          --aio-soft: var(--accent-soft);
          --aio-card: var(--bg-card);
          --aio-card-hover: var(--bg-card-hover);
          --aio-input: var(--bg-input);
          --aio-green: var(--green);
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: calc(100vh - var(--topbar-height, 56px));
          margin: -24px -28px;
          background: var(--bg-base);
          color: var(--aio-ink);
        }
        .aio-sidebar {
          display: flex;
          flex-direction: column;
          min-height: inherit;
          background: var(--bg-sidebar);
          border-right: 1px solid var(--aio-line);
        }
        .aio-sidebar-top {
          height: 64px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 16px;
          border-bottom: 1px solid var(--aio-line);
        }
        .aio-brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--accent), #c05621);
          color: #fff;
        }
        .aio-brand-name {
          font-weight: 800;
          font-size: 13.5px;
          flex: 1;
        }
        .aio-collapse,
        .aio-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--aio-secondary);
          cursor: pointer;
        }
        .aio-collapse:hover,
        .aio-icon-btn:hover {
          background: var(--aio-soft);
          color: var(--aio-ink);
        }
        .aio-nav {
          padding: 16px 12px;
          flex: 1;
          overflow-y: auto;
        }
        .aio-nav-section {
          margin: 14px 10px 8px;
          color: var(--aio-red);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .7px;
        }
        .aio-nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--aio-secondary);
          padding: 10px 12px;
          cursor: pointer;
          font: inherit;
          font-size: 14px;
          text-align: left;
        }
        .aio-nav-item:hover {
          background: var(--aio-soft);
        }
        .aio-nav-item.active {
          background: var(--aio-soft);
          color: var(--aio-red);
          font-weight: 700;
        }
        .aio-side-foot {
          border-top: 1px solid var(--aio-line);
          padding: 12px;
        }
        .aio-account {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 0;
          background: transparent;
          padding: 9px;
          color: var(--aio-secondary);
          font-weight: 700;
          cursor: pointer;
        }
        .aio-avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--aio-input);
          color: var(--aio-secondary);
        }
        .aio-account span:nth-child(2) {
          flex: 1;
          text-align: left;
        }
        .aio-main {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .aio-topbar {
          height: 64px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 28px;
          background: var(--bg-topbar);
          border-bottom: 1px solid var(--aio-line);
        }
        .aio-topbar h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 800;
        }
        .aio-topbar-actions {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .aio-content {
          padding: 24px 28px 40px;
          min-width: 0;
        }
        .aio-card {
          background: var(--aio-card);
          border: 1px solid var(--aio-line);
          border-radius: 12px;
          box-shadow: var(--shadow);
        }
        .aio-pad {
          padding: 20px;
        }
        .aio-card h3,
        .aio-card h4 {
          margin: 0 0 10px;
        }
        .aio-muted {
          color: var(--aio-muted);
          font-size: 13px;
          line-height: 1.5;
        }
        .aio-stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 18px;
        }
        .aio-metric-label {
          color: var(--aio-muted);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .5px;
          margin-bottom: 10px;
        }
        .aio-metric-value {
          font-size: 26px;
          font-weight: 800;
          min-height: 32px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .aio-metric-value.filename {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.4;
          min-height: 32px;
          display: flex;
          align-items: center;
        }
        .aio-metric-value.green { color: var(--green); }
        .aio-metric-value.red { color: var(--aio-red); }
        .aio-actions-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
        }
        .aio-table-wrap {
          overflow: auto;
          border: 1px solid var(--aio-line);
          border-radius: 8px;
          margin-top: 16px;
        }
        .aio-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .aio-table th,
        .aio-table td {
          padding: 12px 14px;
          border-bottom: 1px solid var(--aio-line);
          text-align: left;
        }
        .aio-table th {
          color: var(--aio-muted);
          background: var(--aio-input);
          font-size: 11.5px;
          text-transform: uppercase;
          letter-spacing: .35px;
        }
        .aio-table .num {
          text-align: right;
          font-variant-numeric: tabular-nums;
        }
        .aio-empty {
          text-align: center;
          color: var(--aio-muted);
          padding: 36px !important;
        }
        .aio-card-head,
        .aio-card-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 18px;
          border-bottom: 1px solid var(--aio-line);
        }
        .aio-card-title-row {
          padding: 0 0 16px;
          border-bottom: 0;
        }
        .aio-rules-grid,
        .aio-config-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 18px;
          align-items: start;
        }
        .aio-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .aio-chip,
        .aio-priority {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 3px 9px;
          font-size: 12px;
          font-weight: 700;
          background: var(--aio-input);
          border: 1px solid var(--aio-line);
          color: var(--aio-secondary);
        }
        .aio-chip.green {
          background: rgba(74, 222, 128, 0.1);
          border-color: rgba(74, 222, 128, 0.35);
          color: var(--green);
        }
        .aio-priority.critical { background: rgba(239, 68, 68, 0.12); color: var(--red); border-color: rgba(239, 68, 68, 0.35); }
        .aio-priority.high { background: rgba(249, 115, 22, 0.12); color: #f97316; border-color: rgba(249, 115, 22, 0.35); }
        .aio-priority.medium { background: rgba(250, 204, 21, 0.12); color: var(--yellow); border-color: rgba(250, 204, 21, 0.35); }
        .aio-priority.low { background: rgba(96, 165, 250, 0.12); color: var(--blue); border-color: rgba(96, 165, 250, 0.35); }
        .aio-error {
          margin: 10px 0;
          padding: 10px 12px;
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 8px;
          background: rgba(239, 68, 68, 0.1);
          color: var(--red);
          font-size: 13px;
        }
        .aio-error.in-card {
          margin: 14px;
        }
        .aio-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--overlay);
          padding: 24px;
        }
        .aio-modal {
          width: min(620px, 100%);
          max-height: calc(100vh - 48px);
          overflow: auto;
          background: var(--bg-modal);
          border: 1px solid var(--aio-line);
          border-radius: 12px;
          box-shadow: var(--shadow-lg);
          padding: 18px;
        }
        .aio-modal.wide {
          width: min(760px, 100%);
        }
        .aio-modal-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .aio-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .aio-form-grid label,
        .aio-block-label {
          display: grid;
          gap: 6px;
          color: var(--aio-secondary);
          font-size: 12.5px;
          font-weight: 700;
        }
        .span-2 {
          grid-column: span 2;
        }
        .aio-input {
          width: 100%;
          border: 1px solid var(--aio-line);
          border-radius: 8px;
          background: var(--aio-input);
          color: var(--aio-ink);
          padding: 9px 11px;
          font: inherit;
          font-size: 13px;
        }
        .aio-textarea {
          min-height: 120px;
          resize: vertical;
        }
        .aio-textarea.code {
          min-height: 210px;
          font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
        }
        .aio-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 16px;
        }
        .aio-timeline {
          display: grid;
          gap: 16px;
        }
        .aio-timeline-item {
          display: grid;
          grid-template-columns: 16px 1fr;
          gap: 12px;
        }
        .aio-dot {
          width: 10px;
          height: 10px;
          margin-top: 5px;
          border-radius: 999px;
          background: var(--green);
          box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.12);
        }
        .aio-run-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 9px;
          color: var(--aio-secondary);
          font-size: 13px;
        }
        .aio-config-nav {
          padding: 8px;
        }
        .aio-config-nav button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          padding: 11px 12px;
          font: inherit;
          text-align: left;
          color: var(--aio-secondary);
          cursor: pointer;
        }
        .aio-config-nav button.active {
          background: var(--aio-soft);
          color: var(--aio-red);
          font-weight: 800;
        }
        .aio-setting-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-top: 1px solid var(--aio-line);
          padding: 16px 0;
        }
        .aio-switch {
          width: 42px;
          height: 24px;
          border: 0;
          border-radius: 999px;
          background: var(--aio-input);
          border: 1px solid var(--aio-line);
          position: relative;
          cursor: pointer;
        }
        .aio-switch::after {
          content: "";
          position: absolute;
          top: 3px;
          left: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--text-primary);
          transition: transform .15s;
        }
        .aio-switch.on {
          background: var(--aio-red);
        }
        .aio-switch.on::after {
          transform: translateX(18px);
        }
        .aio-segmented {
          display: inline-flex;
          border: 1px solid var(--aio-line);
          border-radius: 8px;
          overflow: hidden;
        }
        .aio-segmented button {
          border: 0;
          border-right: 1px solid var(--aio-line);
          padding: 7px 10px;
          background: var(--aio-card);
          color: var(--aio-secondary);
          cursor: pointer;
        }
        .aio-segmented button:last-child {
          border-right: 0;
        }
        .aio-segmented button.active {
          background: var(--aio-red);
          color: #fff;
          font-weight: 800;
        }
        .aio-number-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 110px;
        }
        .aio-number-wrap .aio-input {
          text-align: right;
        }
        .aio-embed.collapsed {
          grid-template-columns: 72px 1fr;
        }
        .aio-embed.collapsed .aio-brand-name,
        .aio-embed.collapsed .aio-nav-section,
        .aio-embed.collapsed .aio-nav-item span,
        .aio-embed.collapsed .aio-account span,
        .aio-embed.collapsed .aio-account > svg {
          display: none;
        }
        .aio-embed.collapsed .aio-sidebar-top {
          justify-content: center;
          padding: 0 8px;
        }
        .aio-embed.collapsed .aio-brand-mark {
          display: none;
        }
        .aio-embed.collapsed .aio-nav-item {
          justify-content: center;
          padding: 12px;
        }
        .aio-embed.collapsed .aio-account {
          justify-content: center;
        }
        @media (max-width: 1100px) {
          .aio-stat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .aio-rules-grid,
          .aio-config-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 760px) {
          .aio-embed,
          .aio-embed.collapsed {
            grid-template-columns: 1fr;
          }
          .aio-sidebar {
            min-height: auto;
          }
          .aio-nav {
            display: flex;
            overflow-x: auto;
            gap: 6px;
            padding: 10px;
          }
          .aio-nav-section,
          .aio-side-foot {
            display: none;
          }
          .aio-nav-item {
            width: auto;
            white-space: nowrap;
          }
          .aio-topbar {
            height: auto;
            min-height: 64px;
            align-items: flex-start;
            flex-direction: column;
            padding: 16px;
          }
          .aio-topbar-actions {
            margin-left: 0;
            flex-wrap: wrap;
          }
          .aio-content {
            padding: 16px;
          }
          .aio-stat-grid,
          .aio-form-grid {
            grid-template-columns: 1fr;
          }
          .span-2 {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}

function downloadCSV(
  filename: string,
  columns: string[],
  rows: Record<string, unknown>[]
) {
  const esc = (v: unknown) =>
    '"' + String(v ?? "").replace(/"/g, '""') + '"';
  const header = columns.map(esc).join(",");
  const body = rows
    .map((row) => columns.map((col) => esc(row[col])).join(","))
    .join("\n");
  const blob = new Blob([header + "\n" + body], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ── Icons (inline SVG) ── */

function IconPlay({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconDownload({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconInfo({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function IconCalendar({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconFile({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function IconChevLeft({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function IconChevRight({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function IconChevUp({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function IconSort({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

function IconCheck({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconChevDown({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconLine({
  name,
  size = 18,
}: {
  name:
    | "grid"
    | "menu"
    | "shield"
    | "db"
    | "user"
    | "list"
    | "clock"
    | "report"
    | "gear"
    | "image"
    | "refresh"
    | "x";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths: Record<typeof name, React.ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    menu: (
      <>
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="17" x2="20" y2="17" />
      </>
    ),
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    db: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.8-4 4.4-6 8-6s6.2 2 8 6" />
      </>
    ),
    list: (
      <>
        <line x1="9" y1="6" x2="20" y2="6" />
        <line x1="9" y1="12" x2="20" y2="12" />
        <line x1="9" y1="18" x2="20" y2="18" />
        <circle cx="4" cy="6" r="1" />
        <circle cx="4" cy="12" r="1" />
        <circle cx="4" cy="18" r="1" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 16 14" />
      </>
    ),
    report: (
      <>
        <path d="M6 3h9l3 3v15H6z" />
        <path d="M14 3v4h4" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </>
    ),
    gear: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1-2.1 2.1-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V20h-3v-.2a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1-2.1-2.1.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H4v-3h.2a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1 2.1-2.1.1.1a1.6 1.6 0 0 0 1.8.3 1.6 1.6 0 0 0 1-1.5V4h3v.2a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1 2.1 2.1-.1.1a1.6 1.6 0 0 0-.3 1.8 1.6 1.6 0 0 0 1.5 1h.2v3h-.2a1.6 1.6 0 0 0-1.5 1Z" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="8" cy="10" r="2" />
        <path d="M21 16l-5-5L5 19" />
      </>
    ),
    refresh: (
      <>
        <polyline points="20 6 20 12 14 12" />
        <polyline points="4 18 4 12 10 12" />
        <path d="M6.5 8a7 7 0 0 1 11.7-2L20 8" />
        <path d="M17.5 16a7 7 0 0 1-11.7 2L4 16" />
      </>
    ),
    x: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
  };
  return <svg {...common}>{paths[name]}</svg>;
}

/* ── Badge Components ── */

function PriorityBadge({ value }: { value: string }) {
  const cls = PRI_CLS[value] || "out-closed";
  return <span className={`dqc-badge ${cls}`}>{value}</span>;
}

function StatusBadge({ value }: { value: string }) {
  const cls = STATUS_CLS[value] || "out-open";
  return <span className={`dqc-badge ${cls}`}>{value}</span>;
}

/* ── Cell Renderer ── */

function renderCell(column: string, row: Record<string, unknown>) {
  const value = row[column];
  if (column === "Priority" && value)
    return <PriorityBadge value={cellText(value)} />;
  if (column === "Severity" && value)
    return <PriorityBadge value={cellText(value)} />;
  if (column === "Status" && value && STATUS_CLS[cellText(value)])
    return <StatusBadge value={cellText(value)} />;
  if (column === "Missing Fields" && value) {
    return (
      <span style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {String(value)
          .split("; ")
          .map((field) => (
            <span
              key={field}
              className="dqc-badge out-open"
              style={{ fontSize: 10.5 }}
            >
              {field}
            </span>
          ))}
      </span>
    );
  }
  return cellText(value);
}

function cellClass(column: string, value: unknown): string {
  const text = cellText(value);
  if (column === "Brand" || column === "SKU" || column === "Field")
    return "dqc-cell-bold";
  if (text.startsWith("missing:")) return "dqc-cell-missing";
  if (text === "NO missing") return "dqc-cell-ok";
  if (text === "-") return "dqc-cell-muted";
  if (NUMERIC_COLS.has(column)) return "dqc-cell-num";
  return "";
}

/* ── Stat Card ── */

function StatCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="dqc-stat-card">
      <div className="dqc-stat-head">
        {label} <IconInfo size={13} />
      </div>
      {children}
    </div>
  );
}

/* ── Component ── */

function DataQualityControlPanel() {
  const { notify } = useNotifications();

  // Job state
  const [busy, setBusy] = useState(false);
  const [job, setJob] = useState<JobRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Report data
  const [reportSheets, setReportSheets] = useState<Record<
    string,
    ReportSheet
  > | null>(null);

  // Table state
  const [activeTab, setActiveTab] = useState<TabName>("Overview");
  const [sort, setSort] = useState<SortState>({ col: "Brand", dir: "asc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter state
  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<string, boolean>
  >(() =>
    Object.fromEntries(
      ALL_STATUSES.map((s) => [s, DEFAULT_STATUSES.includes(s)])
    )
  );
  const [selectedPriorities, setSelectedPriorities] = useState<
    Record<string, boolean>
  >(() => Object.fromEntries(PRIORITIES.map((p) => [p, true])));

  const activeStatuses = Object.entries(selectedStatuses)
    .filter(([, enabled]) => enabled)
    .map(([status]) => status);

  /* ── Polling ── */
  useEffect(() => {
    if (!job || !["pending", "running"].includes(job.status)) return;
    let cancelled = false;
    const timer = window.setInterval(async () => {
      try {
        const next = await apiJson<JobRecord>(`/api/jobs/${job.id}`);
        if (cancelled) return;
        setJob(next);
        if (next.status === "completed") {
          window.clearInterval(timer);
          notify("Data QC report ready", { type: "success" });
          fetchReport(next.id);
        } else if (next.status === "failed") {
          window.clearInterval(timer);
          setError(next.error ?? "Job failed");
          notify("Data QC job failed", {
            type: "error",
            message: next.error ?? undefined,
          });
        }
      } catch {
        window.clearInterval(timer);
      }
    }, 1200);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job?.id, job?.status]);

  /* ── Fetch report data ── */
  const fetchReport = useCallback(async (jobId: string) => {
    try {
      const data = await apiJson<ReportData>(
        `/api/jobs/${jobId}/report-data`
      );
      setReportSheets(data.sheets);
      setActiveTab("Overview");
      setPage(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  /* ── Run audit ── */
  async function runAuditFile(file: File) {
    if (!activeStatuses.length) {
      setError("Select at least one STATUS before running DQC.");
      return;
    }
    setBusy(true);
    setError(null);
    setJob(null);
    setReportSheets(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("chunk_size", "5000");
      formData.append(
        "max_workers",
        String(Math.min(4, navigator.hardwareConcurrency || 2))
      );
      formData.append("keep_detail_rows", "true");
      formData.append("selected_statuses", JSON.stringify(activeStatuses));
      notify(`Running DQC for ${file.name}`, { type: "info" });
      const created = await apiJson<JobRecord>(
        "/api/data-quality-control/jobs",
        { method: "POST", body: formData }
      );
      setJob(created);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      notify("Failed to start audit", { type: "error", message: msg });
    } finally {
      setBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  /* ── Download report file ── */
  function downloadReport() {
    if (!job?.id) return;
    window.open(apiUrl(`/api/jobs/${encodeURIComponent(job.id)}/download`), "_blank");
  }

  /* ── Resolve active sheet ── */
  const sheet = sheetForTab(activeTab, reportSheets);
  const rows = useMemo(
    () => normalizedSheetRows(activeTab, sheet),
    [activeTab, sheet]
  );
  const columns = useMemo(
    () => columnsFor(activeTab, sheet),
    [activeTab, sheet]
  );

  /* ── Client-side filtering ── */
  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const pri =
        (row.Priority as string) ||
        (row.Severity as string) ||
        priorityForField(cellText(row.Field ?? row["Missing Field"]));
      if (pri && selectedPriorities[pri] === false) return false;
      return true;
    });
  }, [rows, selectedPriorities]);

  /* ── Client-side sorting ── */
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const isPriCol = sort.col === "Priority" || sort.col === "Severity";
      const av = isPriCol
        ? (PRIORITY_ORDER[cellText(a[sort.col])] ?? 99)
        : cellText(a[sort.col]).toLowerCase();
      const bv = isPriCol
        ? (PRIORITY_ORDER[cellText(b[sort.col])] ?? 99)
        : cellText(b[sort.col]).toLowerCase();
      const dir = sort.dir === "asc" ? 1 : -1;
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }, [filtered, sort]);

  /* ── Pagination (1-based) ── */
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageRows = sorted.slice(start, start + pageSize);

  // Reset page when tab/filters/sort change
  useEffect(() => {
    setPage(1);
  }, [activeTab, pageSize, selectedPriorities, sort.col, sort.dir, reportSheets]);

  // Set default sort per tab
  useEffect(() => {
    const defaultKey =
      activeTab === "Action Tracker"
        ? "Priority"
        : activeTab === "Validation Errors"
          ? "Severity"
          : "Brand";
    setSort({ col: defaultKey, dir: "asc" });
  }, [activeTab]);

  const summary = job?.summary ?? null;

  function toggleStatus(status: string) {
    setSelectedStatuses((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  }

  function togglePriority(priority: string) {
    setSelectedPriorities((prev) => ({
      ...prev,
      [priority]: !prev[priority],
    }));
  }

  function onHeader(col: string) {
    setSort((prev) => ({
      col,
      dir: prev.col === col && prev.dir === "asc" ? "desc" : "asc",
    }));
  }

  const isRunning = job?.status === "pending" || job?.status === "running";

  useEffect(() => {
    const openUpload = () => fileInputRef.current?.click();
    window.addEventListener("aio:dqc:open-upload", openUpload);
    return () => window.removeEventListener("aio:dqc:open-upload", openUpload);
  }, []);

  return (
    <div className="view tool-view dqc-view">
      <div className="view-header">
        <h1>Data Quality Control</h1>
        <div className="view-header-actions">
          <button
            className="btn btn-secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Master Data
          </button>
          <button
            className="btn btn-primary"
            onClick={() => fileInputRef.current?.click()}
            disabled={busy || isRunning}
          >
            Run Audit
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xlsm,.csv"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) runAuditFile(f);
        }}
      />

      {/* ── Top Panel: Title + Actions ── */}
      <section className="tool-card dqc-run-panel">
        <div className="dqc-run-panel-left">
          <div className="dqc-section-title">Data Quality Control</div>
          <div className="dqc-sub">
            {job
              ? `Job ${job.id} | ${job.status}`
              : "Upload master data and run DQC with the selected STATUS filter."}
          </div>
          {error && <div className="dqc-error">{error}</div>}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => fileInputRef.current?.click()}
          disabled={busy || isRunning}
        >
          <IconPlay size={15} />{" "}
          {busy || isRunning ? "Running..." : "Run DQC Audit"}
        </button>
        <button
          className="btn btn-success"
          disabled={!job || job.status !== "completed"}
          onClick={downloadReport}
        >
          <IconDownload size={15} /> Download Report
        </button>
      </section>

      {/* ── Stat Cards (always visible) ── */}
      <div className="dqc-stat-grid">
        <StatCard label="Brands Audited">
          <div className="dqc-stat-val green">
            {summary ? String(summary.brand_count ?? 0) : "-"}
          </div>
          <div className="dqc-stat-sub">from current run</div>
        </StatCard>
        <StatCard label="Critical Actions">
          <div className="dqc-stat-val red">
            {summary ? String(summary.critical_actions ?? 0) : "-"}
          </div>
          <div className="dqc-stat-sub">priority rows</div>
        </StatCard>
        <StatCard label="Validation Errors">
          <div className="dqc-stat-val red">
            {summary ? String(summary.validation_error_count ?? 0) : "-"}
          </div>
          <div className="dqc-stat-sub">rule violations</div>
        </StatCard>
        <StatCard label="Included Rows">
          <div className="dqc-stat-date">
            <IconCalendar size={16} />{" "}
            {summary
              ? `${summary.included_rows}/${summary.total_rows}`
              : "-"}
          </div>
          <div className="dqc-stat-sub">selected status / total rows</div>
        </StatCard>
      </div>

      {/* ── Two-column layout: table + filters ── */}
      <div className="dqc-grid">
        {/* Left: tabbed data table */}
        <div className="tool-card dqc-table-card">
          {/* Tabs */}
          <div className="dqc-tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`dqc-tab${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table className="dqc-tbl">
              <thead>
                <tr>
                  {(columns.length ? columns : ["NO DATA"]).map((col) => (
                    <th
                      key={col}
                      className="dqc-sortable"
                      onClick={() => columns.length > 0 && onHeader(col)}
                    >
                      <span
                        className="dqc-th-in"
                        style={{
                          color:
                            sort.col === col
                              ? "var(--red, #ef4444)"
                              : undefined,
                        }}
                      >
                        {col}
                        {columns.length > 0 &&
                          (sort.col === col && sort.dir === "asc" ? (
                            <IconChevUp size={13} />
                          ) : (
                            <IconSort size={13} />
                          ))}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row, idx) => (
                  <tr key={idx}>
                    {columns.map((col) => (
                      <td key={col} className={cellClass(col, row[col])}>
                        {renderCell(col, row)}
                      </td>
                    ))}
                  </tr>
                ))}
                {pageRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={Math.max(columns.length, 1)}
                      style={{
                        textAlign: "center",
                        color: "var(--text-muted)",
                        padding: 40,
                      }}
                    >
                      {busy || isRunning
                        ? "Audit is running..."
                        : "No live DQC data loaded. Run an audit to populate this tab."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="dqc-pager">
            <div className="dqc-pager-info">
              {total === 0
                ? "No entries"
                : `Showing ${start + 1} to ${Math.min(start + pageSize, total)} of ${total} entries`}
            </div>
            <div className="dqc-pg-nums">
              <button
                className="dqc-pg dqc-pg-arrow"
                disabled={safePage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <IconChevLeft size={15} />
              </button>
              <button className="dqc-pg dqc-pg-active">{safePage}</button>
              <button
                className="dqc-pg dqc-pg-arrow"
                disabled={safePage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <IconChevRight size={15} />
              </button>
            </div>
            <div className="dqc-select-wrap">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(+e.target.value)}
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n} / page
                  </option>
                ))}
              </select>
              <span className="dqc-chev">
                <IconChevDown size={14} />
              </span>
            </div>
          </div>
        </div>

        {/* Right: filter panel */}
        <aside className="tool-card dqc-filter-panel">
          <div className="dqc-rules-h">Run Filters</div>
          <div className="dqc-subhead">Master Data STATUS</div>
          {ALL_STATUSES.map((status) => (
            <label
              key={status}
              className={`dqc-chk${selectedStatuses[status] ? " on" : ""}`}
              onClick={() => toggleStatus(status)}
            >
              <span className="dqc-box">
                <IconCheck size={13} />
              </span>
              {status}
            </label>
          ))}
          <div className="dqc-subhead">Priority Filter</div>
          {PRIORITIES.map((priority) => (
            <label
              key={priority}
              className={`dqc-chk${selectedPriorities[priority] ? " on" : ""}`}
              onClick={() => togglePriority(priority)}
            >
              <span className="dqc-box">
                <IconCheck size={13} />
              </span>
              {priority}
            </label>
          ))}
          <div className="dqc-filter-note">
            Included statuses are sent to the backend before Excel parsing
            and missing-data counting.
          </div>
        </aside>
      </div>

      {/* ── Bottom: Download Current View ── */}
      <section className="tool-card dqc-download-section">
        <div className="dqc-rules-h" style={{ marginBottom: 14 }}>
          Download Current View
        </div>
        <div className="dqc-dl-row">
          <div className="dqc-file-ico">
            <IconFile size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>
              {activeTab.replace(/ /g, "_")}_{total}_rows.csv
            </div>
            <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
              {total} filtered entries from the current report sheet
            </div>
          </div>
          <button
            className="btn btn-success btn-sm"
            disabled={!columns.length}
            onClick={() => {
              downloadCSV(
                `${activeTab.replace(/ /g, "_")}_export.csv`,
                columns,
                sorted
              );
              notify(`Exported ${total} rows to CSV`, { type: "success" });
            }}
          >
            <IconDownload size={15} /> Download
          </button>
        </div>
      </section>

      {/* ── Scoped Styles ── */}
      <style>{`
        .dqc-view {
          --dqc-red: var(--red);
          --dqc-green: var(--green);
          --dqc-yellow: var(--yellow);
          --dqc-blue: var(--blue);
          --dqc-orange: #f97316;
          --bg-card: var(--aio-card);
          --bg-input: var(--aio-input);
          --bg-primary: var(--bg-base);
          --text-primary: var(--aio-ink);
          --text-secondary: var(--aio-secondary);
          --text-muted: var(--aio-muted);
          --border: var(--aio-line);
          --accent: var(--aio-red);
          --accent-soft: var(--aio-soft);
          background: transparent;
          color: var(--text-primary);
          min-height: auto;
          margin: 0;
          padding: 0;
        }
        .dqc-view .view-header {
          display: none;
        }
        .dqc-view .view-header h1 {
          color: var(--text-primary);
          font-size: 22px;
          font-weight: 800;
        }
        .dqc-view .btn {
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          box-shadow: none;
        }
        .dqc-view .btn-primary {
          background: var(--accent);
          color: #fff;
        }
        .dqc-view .btn-primary:hover:not(:disabled) {
          background: var(--accent-hover);
        }
        .dqc-view .btn-secondary {
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-primary);
        }
        .dqc-view .tool-card,
        .dqc-view .dqc-stat-card {
          background: var(--bg-card) !important;
          border: 1px solid var(--border) !important;
          border-radius: 12px !important;
          box-shadow: var(--shadow);
        }

        /* Run panel */
        .dqc-run-panel {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding: 18px 20px;
        }
        .dqc-run-panel-left {
          flex: 1;
          min-width: 0;
        }
        .dqc-section-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .dqc-sub {
          font-size: 12.5px;
          color: var(--text-muted);
        }
        .dqc-error {
          margin-top: 8px;
          padding: 8px 12px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-sm, 6px);
          color: var(--dqc-red);
          font-size: 12.5px;
        }

        /* Stat cards */
        .dqc-stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        .dqc-stat-card {
          background: var(--bg-card, #1e1e2e);
          border: 1px solid var(--border, #2a2a3a);
          border-radius: var(--radius, 8px);
          padding: 16px 18px;
        }
        .dqc-stat-head {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .dqc-stat-head svg {
          opacity: 0.5;
        }
        .dqc-stat-val {
          font-size: 26px;
          font-weight: 700;
          line-height: 1.2;
        }
        .dqc-stat-val.green { color: var(--green, #4ade80); }
        .dqc-stat-val.red { color: var(--red, #ef4444); }
        .dqc-stat-date {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .dqc-stat-sub {
          font-size: 11.5px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        /* Content grid */
        .dqc-grid {
          display: grid;
          grid-template-columns: 1fr 260px;
          gap: 16px;
          align-items: start;
          margin-bottom: 16px;
        }

        /* Tabs */
        .dqc-tabs {
          display: flex;
          gap: 0;
          border-bottom: 1px solid var(--border, #2a2a3a);
          padding: 0 16px;
          overflow-x: auto;
        }
        .dqc-tab {
          border: 0;
          background: transparent;
          color: var(--text-muted);
          padding: 10px 14px;
          cursor: pointer;
          font: inherit;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: all 0.15s;
          margin-bottom: -1px;
        }
        .dqc-tab:hover {
          color: var(--text-primary);
        }
        .dqc-tab.active {
          color: var(--accent, #ef4444);
          border-bottom-color: var(--accent, #ef4444);
          font-weight: 600;
        }

        /* Table card */
        .dqc-table-card {
          min-width: 0;
          overflow: hidden;
          padding: 0 !important;
        }

        /* Table */
        .dqc-tbl {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
        }
        .dqc-tbl thead {
          background: var(--bg-input, #1a1a2a);
        }
        .dqc-tbl th {
          padding: 10px 14px;
          text-align: left;
          font-weight: 600;
          font-size: 11.5px;
          color: var(--text-secondary);
          white-space: nowrap;
          border-bottom: 1px solid var(--border, #2a2a3a);
        }
        .dqc-tbl td {
          padding: 9px 14px;
          border-bottom: 1px solid var(--border-subtle, rgba(255,255,255,0.04));
          color: var(--text-secondary);
          vertical-align: middle;
        }
        .dqc-tbl tbody tr:hover {
          background: rgba(255,255,255,0.02);
        }
        .dqc-sortable {
          cursor: pointer;
          user-select: none;
        }
        .dqc-th-in {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* Cell classes */
        .dqc-cell-bold { font-weight: 600; color: var(--text-primary); }
        .dqc-cell-missing { color: var(--dqc-red); font-weight: 500; }
        .dqc-cell-ok { color: var(--dqc-green); font-weight: 500; }
        .dqc-cell-muted { color: var(--text-muted); }
        .dqc-cell-num { font-variant-numeric: tabular-nums; text-align: right; }

        /* Badges */
        .dqc-badge {
          display: inline-flex;
          align-items: center;
          padding: 2px 9px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
        }
        .dqc-badge.solid-crit {
          background: rgba(239,68,68,0.15);
          color: #ef4444;
        }
        .dqc-badge.solid-high {
          background: rgba(249,115,22,0.15);
          color: #f97316;
        }
        .dqc-badge.solid-med {
          background: rgba(250,204,21,0.15);
          color: #facc15;
        }
        .dqc-badge.solid-low {
          background: rgba(96,165,250,0.15);
          color: #60a5fa;
        }
        .dqc-badge.out-open {
          background: rgba(255,255,255,0.06);
          color: var(--text-secondary);
          border: 1px solid var(--border, #2a2a3a);
        }
        .dqc-badge.out-prog {
          background: rgba(96,165,250,0.12);
          color: #60a5fa;
        }
        .dqc-badge.out-res {
          background: rgba(74,222,128,0.12);
          color: #4ade80;
        }
        .dqc-badge.out-closed {
          background: rgba(255,255,255,0.06);
          color: var(--text-muted);
        }

        /* Pagination */
        .dqc-pager {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-top: 1px solid var(--border, #2a2a3a);
          font-size: 12.5px;
        }
        .dqc-pager-info {
          color: var(--text-muted);
        }
        .dqc-pg-nums {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .dqc-pg {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          height: 32px;
          border: 1px solid var(--border, #2a2a3a);
          border-radius: var(--radius-sm, 6px);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          font: inherit;
          font-size: 12.5px;
          transition: all 0.15s;
        }
        .dqc-pg:hover:not(:disabled) {
          background: rgba(255,255,255,0.04);
          color: var(--text-primary);
        }
        .dqc-pg:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .dqc-pg-active {
          background: var(--accent, #ef4444) !important;
          color: white !important;
          border-color: var(--accent, #ef4444) !important;
          font-weight: 600;
        }
        .dqc-select-wrap {
          position: relative;
          width: 110px;
        }
        .dqc-select-wrap select {
          width: 100%;
          appearance: none;
          background: var(--bg-input, #1a1a2a);
          color: var(--text-primary);
          border: 1px solid var(--border, #2a2a3a);
          border-radius: var(--radius-sm, 6px);
          padding: 6px 30px 6px 10px;
          font: inherit;
          font-size: 12.5px;
          outline: none;
          cursor: pointer;
        }
        .dqc-chev {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-muted);
        }

        /* Filter panel */
        .dqc-filter-panel {
          position: sticky;
          top: calc(var(--topbar-height, 56px) + 24px);
          padding: 18px 16px;
        }
        .dqc-rules-h {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--text-primary);
          margin-bottom: 14px;
        }
        .dqc-subhead {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          margin-bottom: 8px;
          margin-top: 16px;
        }
        .dqc-subhead:first-of-type {
          margin-top: 0;
        }
        .dqc-chk {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 5px 0;
          font-size: 12.5px;
          color: var(--text-secondary);
          cursor: pointer;
          user-select: none;
        }
        .dqc-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1.5px solid var(--border, #2a2a3a);
          background: transparent;
          color: transparent;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .dqc-chk.on .dqc-box {
          background: var(--accent, #ef4444);
          border-color: var(--accent, #ef4444);
          color: white;
        }
        .dqc-filter-note {
          margin-top: 16px;
          font-size: 12.5px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Download section */
        .dqc-download-section {
          padding: 18px 20px;
        }
        .dqc-dl-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .dqc-file-ico {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm, 6px);
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        /* Btn variants */
        .btn-success {
          background: var(--green, #4ade80);
          color: #000;
        }
        .btn-success:hover:not(:disabled) {
          background: color-mix(in srgb, var(--green, #4ade80), white 10%);
        }
        .btn-success:disabled {
          opacity: 0.4;
          cursor: default;
        }

        .dqc-view .dqc-run-panel {
          margin-bottom: 18px;
        }
        .dqc-view .dqc-section-title,
        .dqc-view .dqc-rules-h {
          color: var(--text-primary);
        }
        .dqc-view .dqc-sub,
        .dqc-view .dqc-stat-head,
        .dqc-view .dqc-stat-sub,
        .dqc-view .dqc-filter-note,
        .dqc-view .dqc-pager-info {
          color: var(--text-muted);
        }
        .dqc-view .dqc-tabs,
        .dqc-view .dqc-pager {
          border-color: var(--border);
        }
        .dqc-view .dqc-tab {
          color: var(--text-muted);
        }
        .dqc-view .dqc-tab.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }
        .dqc-view .dqc-tbl thead {
          background: var(--bg-input);
        }
        .dqc-view .dqc-tbl th {
          color: var(--text-muted);
          border-bottom-color: var(--border);
        }
        .dqc-view .dqc-tbl td {
          color: var(--text-secondary);
          border-bottom-color: var(--border);
        }
        .dqc-view .dqc-tbl tbody tr:hover {
          background: var(--accent-soft);
        }
        .dqc-view .dqc-cell-bold {
          color: var(--text-primary);
        }
        .dqc-view .dqc-badge.out-open,
        .dqc-view .dqc-badge.out-closed {
          background: var(--bg-input);
          border-color: var(--border);
          color: var(--text-secondary);
        }
        .dqc-view .dqc-pg {
          background: var(--bg-input);
          border-color: var(--border);
          color: var(--text-secondary);
        }
        .dqc-view .dqc-pg-active {
          background: var(--accent-soft) !important;
          border-color: var(--accent) !important;
          color: var(--accent) !important;
        }
        .dqc-view .dqc-select-wrap select {
          background: var(--bg-input);
          border-color: var(--border);
          color: var(--text-primary);
        }
        .dqc-view .dqc-chk {
          color: var(--text-secondary);
        }
        .dqc-view .dqc-box {
          border-color: var(--border-light);
        }
        .dqc-view .dqc-chk.on .dqc-box {
          background: var(--accent);
          border-color: var(--accent);
        }
        .dqc-view .btn-success {
          background: rgba(74, 222, 128, 0.08);
          border: 1px solid rgba(74, 222, 128, 0.35);
          color: var(--green);
        }
        .dqc-view .btn-success:hover:not(:disabled) {
          background: rgba(74, 222, 128, 0.14);
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .dqc-grid {
            grid-template-columns: 1fr;
          }
          .dqc-stat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .dqc-filter-panel {
            position: static;
          }
        }
        @media (max-width: 760px) {
          .dqc-stat-grid {
            grid-template-columns: 1fr;
          }
          .dqc-run-panel {
            flex-direction: column;
            align-items: stretch;
          }
          .dqc-dl-row {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
