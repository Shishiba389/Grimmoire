import { useEffect, useMemo, useRef, useState } from "react";
import { apiJson, apiUrl, pickFolder } from "./ToolShared";
import { useNotifications } from "../contexts/NotificationContext";

type OneDriveState = "local" | "cloud-only";

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
  oneDriveState: OneDriveState;
};

type PackshotFolder = {
  id: string;
  path: string;
  label: string;
  parent: string;
  depth: number;
  count: number;
  sizeBytes: number;
  localCount: number;
  cloudCount: number;
};

type ScanResult = {
  root: string;
  count: number;
  scanned: number;
  truncated: boolean;
  images: PackshotImage[];
  folders: PackshotFolder[];
};

type ImageListResult = {
  root: string;
  folder: string;
  query: string;
  offset: number;
  limit: number;
  total: number;
  images: PackshotImage[];
  hasMore: boolean;
};

type ImageMeta = {
  width: number;
  height: number;
  sizeBytes: number;
  oneDriveState: OneDriveState;
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

const PAGE_SIZE = 240;
const THUMB_CONCURRENCY = 8;

const thumbQueue: Array<() => void> = [];
let activeThumbLoads = 0;

function runNextThumbJob() {
  if (activeThumbLoads >= THUMB_CONCURRENCY) return;
  const job = thumbQueue.shift();
  if (!job) return;
  activeThumbLoads += 1;
  job();
}

function scheduleThumbLoad<T>(task: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    thumbQueue.push(() => {
      task()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          activeThumbLoads = Math.max(0, activeThumbLoads - 1);
          runNextThumbJob();
        });
    });
    runNextThumbJob();
  });
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function thumbSrc(path: string): string {
  return apiUrl(`/api/packshot-browser/thumb?path=${encodeURIComponent(path)}`);
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

async function fetchImageObjectUrl(urls: string[], signal: AbortSignal): Promise<string | null> {
  for (const url of urls) {
    try {
      const response = await fetch(url, { signal });
      if (!response.ok) continue;
      const blob = await response.blob();
      if (!blob.type.startsWith("image/") && blob.size < 512) continue;
      return URL.createObjectURL(blob);
    } catch {
      if (signal.aborted) return null;
    }
  }
  return null;
}

function LazyThumbnail({ image, selected, onToggle, onHover, onLeave }: {
  image: PackshotImage;
  selected: boolean;
  onToggle: () => void;
  onHover: (event: React.MouseEvent<HTMLElement>) => void;
  onLeave: () => void;
}) {
  const holderRef = useRef<HTMLButtonElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = holderRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || src || failed) return;
    const controller = new AbortController();
    const urls = isCloudOnly(image)
      ? [shellThumbSrc(image.path), onlineThumbSrc(image.path)]
      : [thumbSrc(image.path)];
    scheduleThumbLoad(() => fetchImageObjectUrl(urls, controller.signal))
      .then((objectUrl) => {
        if (!controller.signal.aborted && objectUrl) setSrc(objectUrl);
        if (!controller.signal.aborted && !objectUrl) setFailed(true);
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => {
      controller.abort();
    };
  }, [visible, image.path, image.oneDriveState, src, failed]);

  useEffect(() => {
    return () => {
      if (src) URL.revokeObjectURL(src);
    };
  }, [src]);

  return (
    <button
      ref={holderRef}
      className="pb-thumb-btn"
      onClick={onToggle}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      title={selected ? "Unselect image" : "Select image"}
    >
      {src ? (
        <img src={src} alt={image.name} decoding="async" />
      ) : (
        <div className={`pb-thumb-placeholder${failed ? " failed" : ""}`}>
          <span>{image.extension.replace(".", "").toUpperCase()}</span>
          <strong>{failed ? "No thumbnail" : "Loading"}</strong>
        </div>
      )}
      <span className="pb-check">{selected ? "Selected" : "Select"}</span>
      <span className={`pb-cloud ${image.oneDriveState}`}>{isCloudOnly(image) ? "Cloud" : "Local"}</span>
    </button>
  );
}

export function PackshotBrowserView() {
  const { notify } = useNotifications();
  const [folder, setFolder] = useState("");
  const [root, setRoot] = useState("");
  const [folders, setFolders] = useState<PackshotFolder[]>([]);
  const [activeFolder, setActiveFolder] = useState(".");
  const [images, setImages] = useState<PackshotImage[]>([]);
  const [query, setQuery] = useState("");
  const [totalInView, setTotalInView] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [outputFolder, setOutputFolder] = useState("");
  const [preserveFolders, setPreserveFolders] = useState(true);
  const [groupByEan, setGroupByEan] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [hover, setHover] = useState<HoverState>(null);
  const [metaCache, setMetaCache] = useState<Record<string, ImageMeta>>({});
  const [lastCopy, setLastCopy] = useState<CopyResult | null>(null);

  const activeFolderInfo = useMemo(
    () => folders.find((item) => item.path === activeFolder) ?? null,
    [folders, activeFolder]
  );

  const totalCount = folders.find((item) => item.path === ".")?.count ?? 0;

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
      setFolders(result.folders || []);
      setSelected(new Set());
      setActiveFolder(".");
      setQuery("");
      setImages([]);
      setTotalInView(0);
      setHasMore(false);
      localStorage.setItem("grimoire-packshot-browser-root", result.root);
      notify("Packshot index ready", {
        type: "success",
        message: `${result.count} image(s), ${(result.folders || []).length} folder(s)`,
      });
      await loadImages({ rootPath: result.root, folderPath: ".", nextQuery: "", offset: 0, append: false });
    } catch (error) {
      notify("Packshot scan failed", {
        type: "error",
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setBusy(false);
    }
  }

  async function loadImages(options?: {
    rootPath?: string;
    folderPath?: string;
    nextQuery?: string;
    offset?: number;
    append?: boolean;
  }) {
    const rootPath = options?.rootPath ?? root;
    if (!rootPath) return;
    const folderPath = options?.folderPath ?? activeFolder;
    const nextQuery = options?.nextQuery ?? query;
    const offset = options?.offset ?? (options?.append ? images.length : 0);
    const append = options?.append ?? false;
    setLoadingImages(true);
    try {
      const result = await apiJson<ImageListResult>("/api/packshot-browser/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          root: rootPath,
          folder: folderPath,
          query: nextQuery,
          offset,
          limit: PAGE_SIZE,
        }),
      });
      setImages((prev) => append ? [...prev, ...result.images] : result.images);
      setTotalInView(result.total);
      setHasMore(result.hasMore);
    } catch (error) {
      notify("Image list failed", {
        type: "error",
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setLoadingImages(false);
    }
  }

  useEffect(() => {
    if (!root) return;
    const handle = window.setTimeout(() => {
      void loadImages({ offset: 0, append: false });
    }, 220);
    return () => window.clearTimeout(handle);
  }, [root, activeFolder, query]);

  async function copySelected() {
    if (!root || !outputFolder || selected.size === 0) {
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
          paths: Array.from(selected),
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
      const visiblePaths = images.map((image) => image.path);
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
  }, [hover?.image.path, metaCache]);

  function renderTile(image: PackshotImage) {
    const checked = selected.has(image.path);
    return (
      <article key={image.path} className={`pb-card${checked ? " selected" : ""}`}>
        <LazyThumbnail
          image={image}
          selected={checked}
          onToggle={() => toggleImage(image.path)}
          onHover={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            setHover({ image, x: rect.right, y: rect.top });
          }}
          onLeave={() => setHover(null)}
        />
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
            <h1>Folder-first image browsing for large libraries</h1>
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
            <button className="btn btn-primary" onClick={() => scanFolder()} disabled={busy || !folder}>{busy ? "Indexing..." : "Scan"}</button>
          </div>
          <input className="inline-search pb-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search within selected folder by EAN, file name, folder, keyword..." />
        </div>

        <div className="pb-stats">
          <div><span>Total indexed</span><strong>{totalCount}</strong></div>
          <div><span>Folders</span><strong>{folders.length}</strong></div>
          <div><span>Current result</span><strong>{totalInView}</strong></div>
          <div><span>Loaded</span><strong>{images.length}</strong></div>
          <div><span>Selected</span><strong>{selected.size}</strong></div>
          <div><span>Cloud in folder</span><strong>{activeFolderInfo?.cloudCount ?? 0}</strong></div>
        </div>

        <div className="pb-layout">
          <aside className="pb-folders">
            {folders.map((item) => (
              <button
                key={item.path}
                className={`pb-folder${activeFolder === item.path ? " active" : ""}`}
                style={{ paddingLeft: Math.min(18 + item.depth * 14, 62) }}
                onClick={() => {
                  setActiveFolder(item.path);
                  setImages([]);
                  setTotalInView(0);
                  setHasMore(false);
                }}
              >
                <strong title={item.path}>{item.label}</strong>
                <small title={item.path}>{item.path}</small>
                <span>{item.count}</span>
              </button>
            ))}
          </aside>

          <main className="pb-main">
            <div className="pb-main-head">
              <div>
                <h2>{activeFolderInfo?.label ?? "Choose a folder"}</h2>
                <span>{totalInView} match(es), {images.length} loaded in this page stream</span>
              </div>
              <div className="pb-main-actions">
                <button className="btn btn-secondary" onClick={toggleVisible} disabled={images.length === 0}>Select loaded</button>
                <button className="btn btn-secondary" onClick={() => setSelected(new Set())} disabled={selected.size === 0}>Clear</button>
              </div>
            </div>

            <div className="pb-grid">
              {images.map(renderTile)}
              {root && hasMore && (
                <button className="pb-load-more" onClick={() => loadImages({ offset: images.length, append: true })} disabled={loadingImages}>
                  <strong>{loadingImages ? "Loading..." : "Load more thumbnails"}</strong>
                  <span>{images.length} of {totalInView} loaded</span>
                </button>
              )}
              {root && loadingImages && images.length === 0 && (
                <div className="pb-empty">
                  <strong>Loading folder images</strong>
                  <span>Thumbnails will appear progressively with limited parallel loading.</span>
                </div>
              )}
              {!root && (
                <button className="pb-empty" onClick={chooseFolder} disabled={busy}>
                  <strong>Choose a source folder</strong>
                  <span>Index a synced OneDrive folder or a local packshot batch.</span>
                </button>
              )}
              {root && !loadingImages && images.length === 0 && (
                <div className="pb-empty">
                  <strong>No images in this view</strong>
                  <span>Choose another folder or change the search keyword.</span>
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
          <LazyThumbnail
            image={hover.image}
            selected={selected.has(hover.image.path)}
            onToggle={() => toggleImage(hover.image.path)}
            onHover={() => undefined}
            onLeave={() => undefined}
          />
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
        .packshot-browser-view { min-height: 100%; }
        .pb-shell { display: grid; gap: 18px; }
        .pb-header {
          display: flex; justify-content: space-between; gap: 16px; align-items: flex-end;
          padding: 22px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-card);
        }
        .pb-kicker { color: var(--accent); font-size: 12px; font-weight: 800; text-transform: uppercase; }
        .pb-header h1 { margin: 6px 0 0; color: var(--text-primary); font-size: 24px; }
        .pb-header-actions, .pb-main-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .pb-toolbar { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(260px, 0.75fr); gap: 12px; }
        .pb-path, .pb-output { min-width: 0; }
        .pb-search { width: 100%; }
        .pb-stats { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
        .pb-stats div {
          display: grid; gap: 6px; padding: 14px; border: 1px solid var(--border);
          border-radius: 8px; background: var(--bg-card);
        }
        .pb-stats span { color: var(--text-muted); font-size: 12px; }
        .pb-stats strong { color: var(--text-primary); font-size: 22px; }
        .pb-layout { display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 16px; min-height: 560px; }
        .pb-folders {
          display: grid; align-content: start; gap: 8px; max-height: calc(100vh - 330px);
          padding: 10px; overflow: auto; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-card);
        }
        .pb-folder {
          position: relative; display: grid; gap: 4px; width: 100%; padding: 12px 48px 12px 12px;
          border: 1px solid transparent; border-radius: 8px; background: var(--bg-input);
          color: var(--text-primary); text-align: left; cursor: pointer;
        }
        .pb-folder:hover, .pb-folder.active { border-color: var(--accent); }
        .pb-folder strong, .pb-folder small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pb-folder strong { font-size: 13px; }
        .pb-folder small { color: var(--text-muted); font-size: 11px; }
        .pb-folder span {
          position: absolute; top: 12px; right: 12px; color: var(--accent); font-size: 12px; font-weight: 800;
        }
        .pb-main {
          min-width: 0; border: 1px solid var(--border); border-radius: 8px;
          background: var(--bg-card); overflow: hidden;
        }
        .pb-main-head {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 16px 18px; border-bottom: 1px solid var(--border);
        }
        .pb-main-head h2 { margin: 0; color: var(--text-primary); font-size: 18px; }
        .pb-main-head span { color: var(--text-muted); font-size: 13px; }
        .pb-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(172px, 1fr)); gap: 14px;
          max-height: calc(100vh - 390px); min-height: 460px; padding: 16px; overflow: auto;
          content-visibility: auto;
        }
        .pb-card {
          border: 1px solid var(--border); border-radius: 8px; background: var(--bg-input);
          overflow: hidden; contain: layout paint style;
        }
        .pb-card.selected { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.18); }
        .pb-thumb-btn {
          position: relative; display: block; width: 100%; padding: 0; border: 0;
          background: transparent; cursor: pointer;
        }
        .pb-thumb-btn img {
          display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: contain; background: var(--bg-card);
        }
        .pb-thumb-placeholder {
          display: grid; place-items: center; align-content: center; gap: 8px; width: 100%; aspect-ratio: 4 / 3;
          background: linear-gradient(135deg, rgba(15,118,110,.12), rgba(37,99,235,.12)), var(--bg-card);
          color: var(--text-primary);
        }
        .pb-thumb-placeholder.failed { background: rgba(217, 119, 6, 0.12); }
        .pb-thumb-placeholder span {
          display: inline-flex; align-items: center; justify-content: center; min-width: 52px; height: 32px;
          border: 1px solid var(--border); border-radius: 8px; color: var(--text-secondary); font-size: 12px; font-weight: 800;
        }
        .pb-thumb-placeholder strong { font-size: 13px; }
        .pb-check, .pb-cloud {
          position: absolute; padding: 4px 8px; border-radius: 999px; color: white;
          font-size: 11px; font-weight: 800; background: rgba(0,0,0,.68);
        }
        .pb-check { left: 8px; top: 8px; }
        .pb-cloud { right: 8px; top: 8px; }
        .pb-cloud.cloud-only { background: rgba(217,119,6,.9); }
        .pb-cloud.local { background: rgba(5,150,105,.9); }
        .pb-card-meta { display: grid; gap: 5px; padding: 11px; }
        .pb-card-meta strong, .pb-card-meta span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pb-card-meta strong { color: var(--text-primary); font-size: 13px; }
        .pb-card-meta span, .pb-card-meta em { color: var(--text-muted); font-size: 12px; font-style: normal; }
        .pb-empty, .pb-load-more {
          display: grid; place-items: center; align-content: center; gap: 8px; min-height: 190px;
          padding: 24px; border: 1px dashed var(--border); border-radius: 8px;
          background: var(--bg-input); color: var(--text-primary); text-align: center;
        }
        .pb-empty span, .pb-load-more span { color: var(--text-muted); }
        .pb-copybar {
          display: grid; grid-template-columns: minmax(0, 1fr) auto auto auto; align-items: center; gap: 12px;
          padding: 14px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-card);
        }
        .pb-toggle {
          display: flex; align-items: center; gap: 8px; color: var(--text-primary);
          font-size: 13px; font-weight: 700; white-space: nowrap;
        }
        .pb-toggle input { width: 16px; height: 16px; accent-color: var(--accent); }
        .pb-toggle span { display: none; }
        .pb-result {
          display: flex; gap: 12px; align-items: center; padding: 12px 14px; border: 1px solid var(--border);
          border-radius: 8px; background: var(--bg-card); color: var(--text-primary); font-size: 13px;
        }
        .pb-result span:last-child { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pb-hover {
          position: fixed; z-index: 1200; width: 410px; pointer-events: none; overflow: hidden;
          border: 1px solid var(--border); border-radius: 8px; background: var(--bg-card);
          box-shadow: 0 24px 60px rgba(0,0,0,.35);
        }
        .pb-hover .pb-thumb-btn { cursor: default; }
        .pb-hover .pb-thumb-btn img, .pb-hover .pb-thumb-placeholder { aspect-ratio: 16 / 11; max-height: 360px; }
        .pb-hover .pb-check { display: none; }
        .pb-hover-meta { display: grid; gap: 6px; padding: 12px; }
        .pb-hover-meta strong, .pb-hover-meta span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pb-hover-meta strong { color: var(--text-primary); }
        .pb-hover-meta span { color: var(--text-muted); font-size: 12px; }
        @media (max-width: 1100px) {
          .pb-toolbar, .pb-layout, .pb-copybar { grid-template-columns: 1fr; }
          .pb-stats { grid-template-columns: repeat(2, 1fr); }
          .pb-folders { max-height: 260px; }
        }
      `}</style>
    </div>
  );
}
