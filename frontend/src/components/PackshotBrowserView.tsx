import { useEffect, useMemo, useState } from "react";
import { apiJson, apiUrl, pickFolder } from "./ToolShared";
import { useNotifications } from "../contexts/NotificationContext";

type PackshotImage = {
  id: string;
  name: string;
  path: string;
  relativePath: string;
  folder: string;
  group: string;
  groupLabel: string;
  eans: string[];
  extension: string;
  sizeBytes: number;
  modifiedAt: string;
  oneDriveState: "local" | "cloud-only";
};

type PackshotGroup = {
  id: string;
  label: string;
  folder: string;
  count: number;
  sizeBytes: number;
  eans: string[];
};

type ScanResult = {
  root: string;
  count: number;
  truncated: boolean;
  images: PackshotImage[];
  groups: PackshotGroup[];
};

type ImageMeta = {
  width: number;
  height: number;
  sizeBytes: number;
  oneDriveState: "local" | "cloud-only";
};

type CopyResult = {
  destination: string;
  copiedCount: number;
  errorCount: number;
  report: string;
};

type HoverState = {
  image: PackshotImage;
  x: number;
  y: number;
} | null;

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function thumbSrc(path: string): string {
  return apiUrl(`/api/packshot-browser/thumb?path=${encodeURIComponent(path)}`);
}

function imageSrc(path: string): string {
  return apiUrl(`/api/packshot-browser/file?path=${encodeURIComponent(path)}`);
}

function shellThumbSrc(path: string): string {
  return apiUrl(`/api/packshot-browser/shell-thumb?path=${encodeURIComponent(path)}`);
}

function onlineThumbSrc(path: string): string {
  return apiUrl(`/api/packshot-browser/online-thumb?path=${encodeURIComponent(path)}`);
}

function isCloudOnly(image: PackshotImage): boolean {
  return image.oneDriveState === "cloud-only";
}

function matchesQuery(image: PackshotImage, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return `${image.name} ${image.relativePath} ${image.folder} ${image.groupLabel} ${image.eans.join(" ")} ${image.extension}`
    .toLowerCase()
    .includes(q);
}

export function PackshotBrowserView() {
  const { notify } = useNotifications();
  const [folder, setFolder] = useState("");
  const [root, setRoot] = useState("");
  const [images, setImages] = useState<PackshotImage[]>([]);
  const [groups, setGroups] = useState<PackshotGroup[]>([]);
  const [activeGroup, setActiveGroup] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [outputFolder, setOutputFolder] = useState("");
  const [preserveFolders, setPreserveFolders] = useState(true);
  const [groupByEan, setGroupByEan] = useState(false);
  const [busy, setBusy] = useState(false);
  const [hover, setHover] = useState<HoverState>(null);
  const [metaCache, setMetaCache] = useState<Record<string, ImageMeta>>({});
  const [shellThumbMisses, setShellThumbMisses] = useState<Set<string>>(new Set());
  const [onlineThumbMisses, setOnlineThumbMisses] = useState<Set<string>>(new Set());
  const [lastCopy, setLastCopy] = useState<CopyResult | null>(null);

  const filtered = useMemo(() => {
    return images.filter((image) => {
      if (activeGroup !== "all" && image.group !== activeGroup) return false;
      return matchesQuery(image, query);
    });
  }, [images, activeGroup, query]);

  const selectedImages = useMemo(
    () => images.filter((image) => selected.has(image.path)),
    [images, selected]
  );

  const localCount = images.filter((image) => image.oneDriveState === "local").length;
  const cloudCount = images.length - localCount;

  async function chooseFolder() {
    const picked = await pickFolder("Select packshot source folder", folder);
    if (picked) {
      setFolder(picked);
      await scanFolder(picked);
    }
  }

  async function chooseOutput() {
    const picked = await pickFolder("Select output folder", outputFolder || root);
    if (picked) setOutputFolder(picked);
  }

  async function scanFolder(path = folder) {
    if (!path) {
      notify("Choose a source folder first", { type: "warning" });
      return;
    }
    setBusy(true);
    setLastCopy(null);
    try {
      const result = await apiJson<ScanResult>("/api/packshot-browser/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: path }),
      });
      setRoot(result.root);
      setFolder(result.root);
      setImages(result.images);
      setGroups(result.groups);
      setSelected(new Set());
      setShellThumbMisses(new Set());
      setOnlineThumbMisses(new Set());
      setActiveGroup("all");
      localStorage.setItem("grimoire-packshot-browser-root", result.root);
      notify("Packshot scan complete", {
        type: result.truncated ? "warning" : "success",
        message: `${result.count} image(s), ${result.groups.length} group(s)`,
      });
    } catch (error) {
      notify("Packshot scan failed", {
        type: "error",
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setBusy(false);
    }
  }

  async function copySelected() {
    if (!root || !outputFolder || selectedImages.length === 0) {
      notify("Select images and an output folder first", { type: "warning" });
      return;
    }
    setBusy(true);
    try {
      const result = await apiJson<CopyResult>("/api/packshot-browser/copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          root,
          destination: outputFolder,
          paths: selectedImages.map((image) => image.path),
          preserve_folder_structure: preserveFolders,
          group_by_ean: groupByEan,
        }),
      });
      setLastCopy(result);
      notify("Copy complete", {
        type: result.errorCount ? "warning" : "success",
        message: `${result.copiedCount} copied, ${result.errorCount} error(s)`,
      });
    } catch (error) {
      notify("Copy failed", {
        type: "error",
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setBusy(false);
    }
  }

  function toggleImage(path: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  function toggleVisible() {
    setSelected((prev) => {
      const visiblePaths = filtered.map((image) => image.path);
      const allVisibleSelected = visiblePaths.length > 0 && visiblePaths.every((path) => prev.has(path));
      const next = new Set(prev);
      if (allVisibleSelected) visiblePaths.forEach((path) => next.delete(path));
      else visiblePaths.forEach((path) => next.add(path));
      return next;
    });
  }

  function reveal(path: string) {
    if (window.__grimoire?.revealInExplorer) {
      window.__grimoire.revealInExplorer(path);
      return;
    }
    void apiJson("/api/local/reveal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    });
  }

  useEffect(() => {
    if (!hover || metaCache[hover.image.path] || isCloudOnly(hover.image)) return;
    let cancelled = false;
    apiJson<ImageMeta>(`/api/packshot-browser/meta?path=${encodeURIComponent(hover.image.path)}`)
      .then((meta) => {
        if (!cancelled) setMetaCache((prev) => ({ ...prev, [hover.image.path]: meta }));
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [hover?.image.path]);

  function renderTile(image: PackshotImage) {
    const checked = selected.has(image.path);
    const cloudOnly = isCloudOnly(image);
    const shellThumbMissing = shellThumbMisses.has(image.path);
    const onlineThumbMissing = onlineThumbMisses.has(image.path);
    return (
      <article
        key={image.path}
        className={`pb-card${checked ? " selected" : ""}`}
        onMouseEnter={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setHover({ image, x: rect.right, y: rect.top });
        }}
        onMouseLeave={() => setHover(null)}
      >
        <button className="pb-thumb-btn" onClick={() => toggleImage(image.path)} title={checked ? "Unselect image" : "Select image"}>
          {cloudOnly && !shellThumbMissing ? (
            <img
              src={shellThumbSrc(image.path)}
              alt={image.name}
              loading="lazy"
              decoding="async"
              onError={() => setShellThumbMisses((prev) => new Set(prev).add(image.path))}
            />
          ) : cloudOnly && !onlineThumbMissing ? (
            <img
              src={onlineThumbSrc(image.path)}
              alt={image.name}
              loading="lazy"
              decoding="async"
              onError={() => setOnlineThumbMisses((prev) => new Set(prev).add(image.path))}
            />
          ) : cloudOnly ? (
            <div className="pb-cloud-placeholder">
              <span>{image.extension.replace(".", "").toUpperCase()}</span>
              <strong>Cloud-only</strong>
            </div>
          ) : (
            <img src={thumbSrc(image.path)} alt={image.name} loading="lazy" decoding="async" />
          )}
          <span className="pb-check">{checked ? "Selected" : "Select"}</span>
          <span className={`pb-cloud ${image.oneDriveState}`}>{image.oneDriveState === "cloud-only" ? "Cloud" : "Local"}</span>
        </button>
        <div className="pb-card-meta">
          <strong title={image.name}>{image.name}</strong>
          <span title={image.relativePath}>{image.relativePath}</span>
          <em>{image.extension.replace(".", "").toUpperCase()} - {formatSize(image.sizeBytes)}</em>
        </div>
      </article>
    );
  }

  const hoverMeta = hover ? metaCache[hover.image.path] : null;

  return (
    <div className="view packshot-browser-view">
      <section className="pb-shell">
        <div className="pb-header">
          <div>
            <span className="pb-kicker">Packshot Browser</span>
            <h1>Browse, preview, and collect product images</h1>
          </div>
          <div className="pb-header-actions">
            <button className="btn btn-secondary" disabled={!root} onClick={() => reveal(root)}>Open source</button>
            <button className="btn btn-secondary" disabled={!lastCopy?.report} onClick={() => lastCopy && reveal(lastCopy.report)}>Open report</button>
          </div>
        </div>

        <div className="pb-toolbar">
          <div className="path-picker pb-path">
            <input value={folder} onChange={(event) => setFolder(event.target.value)} placeholder="Select source folder with packshots" />
            <button className="btn btn-secondary" onClick={chooseFolder} disabled={busy}>Choose</button>
            <button className="btn btn-primary" onClick={() => scanFolder()} disabled={busy || !folder}>{busy ? "Working..." : "Scan"}</button>
          </div>
          <input className="inline-search pb-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search EAN, brand, file name, folder, front, texture..." />
        </div>

        <div className="pb-stats">
          <div><span>Total</span><strong>{images.length}</strong></div>
          <div><span>Groups</span><strong>{groups.length}</strong></div>
          <div><span>Visible</span><strong>{filtered.length}</strong></div>
          <div><span>Selected</span><strong>{selected.size}</strong></div>
          <div><span>OneDrive cloud</span><strong>{cloudCount}</strong></div>
          <div><span>Local</span><strong>{localCount}</strong></div>
        </div>

        <div className="pb-layout">
          <aside className="pb-groups">
            <button className={`pb-group${activeGroup === "all" ? " active" : ""}`} onClick={() => setActiveGroup("all")}>
              <strong>All images</strong>
              <span>{images.length}</span>
            </button>
            {groups.map((group) => (
              <button key={group.id} className={`pb-group${activeGroup === group.id ? " active" : ""}`} onClick={() => setActiveGroup(group.id)}>
                <strong title={group.label}>{group.label}</strong>
                <small title={group.folder}>{group.folder}</small>
                <span>{group.count}</span>
              </button>
            ))}
          </aside>

          <main className="pb-main">
            <div className="pb-main-head">
              <div>
                <h2>{activeGroup === "all" ? "All packshots" : groups.find((group) => group.id === activeGroup)?.label}</h2>
                <span>{filtered.length} visible image(s)</span>
              </div>
              <div className="pb-main-actions">
                <button className="btn btn-secondary" onClick={toggleVisible} disabled={filtered.length === 0}>Select visible</button>
                <button className="btn btn-secondary" onClick={() => setSelected(new Set())} disabled={selected.size === 0}>Clear</button>
              </div>
            </div>

            <div className="pb-grid">
              {filtered.map(renderTile)}
              {images.length === 0 && (
                <button className="pb-empty" onClick={chooseFolder} disabled={busy}>
                  <strong>Choose a source folder</strong>
                  <span>Scan a synced OneDrive folder or a local packshot batch.</span>
                </button>
              )}
              {images.length > 0 && filtered.length === 0 && (
                <div className="pb-empty">
                  <strong>No images match the current filter</strong>
                  <span>Try another EAN, product keyword, or folder.</span>
                </div>
              )}
            </div>
          </main>
        </div>

        <div className="pb-copybar">
          <div className="path-picker pb-output">
            <input value={outputFolder} onChange={(event) => setOutputFolder(event.target.value)} placeholder="Select output folder for copied images" />
            <button className="btn btn-secondary" onClick={chooseOutput} disabled={busy}>Output</button>
          </div>
          <label className="pb-toggle">
            <input type="checkbox" checked={preserveFolders} onChange={(event) => setPreserveFolders(event.target.checked)} disabled={groupByEan} />
            <span /> Preserve folders
          </label>
          <label className="pb-toggle">
            <input type="checkbox" checked={groupByEan} onChange={(event) => setGroupByEan(event.target.checked)} />
            <span /> Group by EAN
          </label>
          <button className="btn btn-primary" onClick={copySelected} disabled={busy || selected.size === 0 || !outputFolder}>
            Copy selected
          </button>
        </div>

        {lastCopy && (
          <div className="pb-result">
            <strong>{lastCopy.copiedCount} copied</strong>
            <span>{lastCopy.errorCount} error(s)</span>
            <span>{lastCopy.destination}</span>
          </div>
        )}
      </section>

      {hover && (
        <div
          className="pb-hover"
          style={{
            left: Math.max(12, Math.min(hover.x + 18, window.innerWidth - 430)),
            top: Math.max(12, Math.min(hover.y + 18, window.innerHeight - 560)),
          }}
        >
          {isCloudOnly(hover.image) && !shellThumbMisses.has(hover.image.path) ? (
            <img
              src={shellThumbSrc(hover.image.path)}
              alt={hover.image.name}
              onError={() => setShellThumbMisses((prev) => new Set(prev).add(hover.image.path))}
            />
          ) : isCloudOnly(hover.image) && !onlineThumbMisses.has(hover.image.path) ? (
            <img
              src={onlineThumbSrc(hover.image.path)}
              alt={hover.image.name}
              onError={() => setOnlineThumbMisses((prev) => new Set(prev).add(hover.image.path))}
            />
          ) : isCloudOnly(hover.image) ? (
            <div className="pb-hover-cloud">
              <strong>Cloud-only file</strong>
              <span>No cached Windows or SharePoint thumbnail is available. Full preview stays disabled to avoid downloading from OneDrive.</span>
            </div>
          ) : (
            <img src={imageSrc(hover.image.path)} alt={hover.image.name} />
          )}
          <div className="pb-hover-meta">
            <strong title={hover.image.name}>{hover.image.name}</strong>
            <span>{hover.image.relativePath}</span>
            <span>
              {isCloudOnly(hover.image)
                ? "Dimensions skipped"
                : (hoverMeta?.width || 0) > 0 ? `${hoverMeta?.width} x ${hoverMeta?.height}` : "Dimensions loading"}
              {" - "}
              {formatSize(hoverMeta?.sizeBytes ?? hover.image.sizeBytes)}
            </span>
            <span>OneDrive: {hoverMeta?.oneDriveState ?? hover.image.oneDriveState}</span>
            <span>EAN: {hover.image.eans.length ? hover.image.eans.join(", ") : "Not detected"}</span>
          </div>
        </div>
      )}

      <style>{`
        .packshot-browser-view {
          min-height: 100%;
        }
        .pb-shell {
          display: grid;
          gap: 18px;
        }
        .pb-header {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: flex-end;
          padding: 22px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
        }
        .pb-kicker {
          color: var(--accent);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0;
          text-transform: uppercase;
        }
        .pb-header h1 {
          margin: 6px 0 0;
          color: var(--text-primary);
          font-size: 24px;
        }
        .pb-header-actions,
        .pb-main-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .pb-toolbar {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(220px, 0.7fr);
          gap: 12px;
        }
        .pb-path,
        .pb-output {
          min-width: 0;
        }
        .pb-search {
          width: 100%;
        }
        .pb-stats {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }
        .pb-stats div {
          display: grid;
          gap: 6px;
          padding: 14px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
        }
        .pb-stats span {
          color: var(--text-muted);
          font-size: 12px;
        }
        .pb-stats strong {
          color: var(--text-primary);
          font-size: 24px;
        }
        .pb-layout {
          display: grid;
          grid-template-columns: 260px minmax(0, 1fr);
          gap: 16px;
          min-height: 520px;
        }
        .pb-groups {
          display: grid;
          align-content: start;
          gap: 8px;
          max-height: calc(100vh - 330px);
          padding: 10px;
          overflow: auto;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
        }
        .pb-group {
          position: relative;
          display: grid;
          gap: 4px;
          width: 100%;
          padding: 12px 44px 12px 12px;
          border: 1px solid transparent;
          border-radius: 8px;
          background: var(--bg-input);
          color: var(--text-primary);
          text-align: left;
          cursor: pointer;
        }
        .pb-group:hover,
        .pb-group.active {
          border-color: var(--accent);
        }
        .pb-group strong,
        .pb-group small {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .pb-group small {
          color: var(--text-muted);
        }
        .pb-group span {
          position: absolute;
          top: 12px;
          right: 12px;
          color: var(--accent);
          font-size: 12px;
          font-weight: 800;
        }
        .pb-main {
          min-width: 0;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          overflow: hidden;
        }
        .pb-main-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 18px;
          border-bottom: 1px solid var(--border);
        }
        .pb-main-head h2 {
          margin: 0;
          color: var(--text-primary);
          font-size: 18px;
        }
        .pb-main-head span {
          color: var(--text-muted);
          font-size: 13px;
        }
        .pb-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(178px, 1fr));
          gap: 14px;
          max-height: calc(100vh - 390px);
          min-height: 430px;
          padding: 16px;
          overflow: auto;
        }
        .pb-card {
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-input);
          overflow: hidden;
        }
        .pb-card.selected {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.18);
        }
        .pb-thumb-btn {
          position: relative;
          display: block;
          width: 100%;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
        }
        .pb-thumb-btn img {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: contain;
          background: var(--bg-card);
        }
        .pb-cloud-placeholder {
          display: grid;
          place-items: center;
          align-content: center;
          gap: 8px;
          width: 100%;
          aspect-ratio: 4 / 3;
          background:
            linear-gradient(135deg, rgba(15, 118, 110, 0.12), rgba(37, 99, 235, 0.12)),
            var(--bg-card);
          color: var(--text-primary);
        }
        .pb-cloud-placeholder span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 52px;
          height: 32px;
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 800;
        }
        .pb-cloud-placeholder strong {
          font-size: 13px;
        }
        .pb-check,
        .pb-cloud {
          position: absolute;
          padding: 4px 8px;
          border-radius: 999px;
          color: white;
          font-size: 11px;
          font-weight: 800;
          background: rgba(0, 0, 0, 0.68);
        }
        .pb-check {
          left: 8px;
          top: 8px;
        }
        .pb-cloud {
          right: 8px;
          top: 8px;
        }
        .pb-cloud.cloud-only {
          background: rgba(217, 119, 6, 0.9);
        }
        .pb-cloud.local {
          background: rgba(5, 150, 105, 0.9);
        }
        .pb-card-meta {
          display: grid;
          gap: 5px;
          padding: 11px;
        }
        .pb-card-meta strong,
        .pb-card-meta span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .pb-card-meta strong {
          color: var(--text-primary);
          font-size: 13px;
        }
        .pb-card-meta span,
        .pb-card-meta em {
          color: var(--text-muted);
          font-size: 12px;
          font-style: normal;
        }
        .pb-empty {
          display: grid;
          place-items: center;
          align-content: center;
          gap: 8px;
          min-height: 210px;
          padding: 24px;
          border: 1px dashed var(--border);
          border-radius: 8px;
          background: var(--bg-input);
          color: var(--text-primary);
          text-align: center;
        }
        .pb-empty span {
          color: var(--text-muted);
        }
        .pb-copybar {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto auto auto;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
        }
        .pb-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
        }
        .pb-toggle input {
          width: 16px;
          height: 16px;
          accent-color: var(--accent);
        }
        .pb-toggle span {
          display: none;
        }
        .pb-result {
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 12px 14px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          color: var(--text-primary);
          font-size: 13px;
        }
        .pb-result span:last-child {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--text-muted);
        }
        .pb-hover {
          position: fixed;
          z-index: 200;
          width: 400px;
          pointer-events: none;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-modal);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }
        .pb-hover img {
          display: block;
          width: 100%;
          max-height: 390px;
          object-fit: contain;
          background: var(--bg-input);
        }
        .pb-hover-cloud {
          display: grid;
          place-items: center;
          align-content: center;
          gap: 8px;
          min-height: 220px;
          padding: 24px;
          background:
            linear-gradient(135deg, rgba(217, 119, 6, 0.16), rgba(37, 99, 235, 0.12)),
            var(--bg-input);
          color: var(--text-primary);
          text-align: center;
        }
        .pb-hover-cloud span {
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.45;
        }
        .pb-hover-meta {
          display: grid;
          gap: 5px;
          padding: 12px;
          color: var(--text-primary);
          font-size: 12px;
        }
        .pb-hover-meta strong,
        .pb-hover-meta span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .pb-hover-meta span {
          color: var(--text-secondary);
        }
        @media (max-width: 1120px) {
          .pb-toolbar,
          .pb-layout,
          .pb-copybar {
            grid-template-columns: 1fr;
          }
          .pb-stats {
            grid-template-columns: repeat(3, 1fr);
          }
          .pb-groups,
          .pb-grid {
            max-height: none;
          }
        }
      `}</style>
    </div>
  );
}
