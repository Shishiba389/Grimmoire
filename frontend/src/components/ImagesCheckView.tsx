import { useMemo, useState } from "react";
import { apiJson, apiUrl, pickFolder } from "./ToolShared";
import { useNotifications } from "../contexts/NotificationContext";

type ImagesCheckItem = {
  id: string;
  name: string;
  path: string;
  relativePath: string;
  extension: string;
  sizeBytes: number;
  width: number;
  height: number;
  modifiedAt: string;
};

type ImagesCheckScanResult = {
  root: string;
  count: number;
  images: ImagesCheckItem[];
};

type ViewMode = "slideshow" | "gallery";

type FolderGroup = {
  folder: string;
  label: string;
  images: ImagesCheckItem[];
};

type HoverState = {
  image: ImagesCheckItem;
  x: number;
  y: number;
} | null;

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function imageSrc(path: string): string {
  return apiUrl(`/api/images-check/file?path=${encodeURIComponent(path)}`);
}

function thumbSrc(path: string): string {
  return apiUrl(`/api/images-check/thumb?path=${encodeURIComponent(path)}`);
}

function folderKey(relativePath: string): string {
  const normalized = relativePath.replace(/\\/g, "/");
  const index = normalized.lastIndexOf("/");
  return index >= 0 ? normalized.slice(0, index) : ".";
}

function folderLabel(folder: string): string {
  if (folder === ".") return "Root folder";
  const parts = folder.split("/").filter(Boolean);
  return parts[parts.length - 1] || folder;
}

export function ImagesCheckView() {
  const { notify } = useNotifications();
  const [folder, setFolder] = useState("");
  const [root, setRoot] = useState("");
  const [images, setImages] = useState<ImagesCheckItem[]>([]);
  const [selectedDelete, setSelectedDelete] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("slideshow");
  const [hover, setHover] = useState<HoverState>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return images;
    return images.filter((img) =>
      `${img.name} ${img.relativePath} ${img.extension}`.toLowerCase().includes(q)
    );
  }, [images, query]);

  const folderGroups = useMemo<FolderGroup[]>(() => {
    const map = new Map<string, ImagesCheckItem[]>();
    for (const image of filtered) {
      const key = folderKey(image.relativePath);
      const group = map.get(key);
      if (group) group.push(image);
      else map.set(key, [image]);
    }
    return Array.from(map.entries()).map(([folderName, groupImages]) => ({
      folder: folderName,
      label: folderLabel(folderName),
      images: groupImages,
    }));
  }, [filtered]);

  const keepCount = images.length - selectedDelete.size;

  async function chooseFolder() {
    const selected = await pickFolder("Select folder to check images", folder);
    if (selected) {
      setFolder(selected);
      await scanFolder(selected);
    }
  }

  async function scanFolder(path = folder) {
    if (!path) {
      notify("Choose a folder first", { type: "warning" });
      return;
    }
    setBusy(true);
    try {
      const result = await apiJson<ImagesCheckScanResult>("/api/images-check/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: path }),
      });
      setRoot(result.root);
      setFolder(result.root);
      setImages(result.images);
      setSelectedDelete(new Set());
      localStorage.setItem("grimoire-images-check-root", result.root);
      notify("Images scan complete", {
        type: "success",
        message: `${result.count} image files found across ${new Set(result.images.map((img) => folderKey(img.relativePath))).size} folder(s)`,
      });
    } catch (error) {
      notify("Images scan failed", {
        type: "error",
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setBusy(false);
    }
  }

  function toggleDelete(id: string) {
    setSelectedDelete((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function deleteSelected() {
    if (!root || selectedDelete.size === 0) return;
    const targets = images.filter((img) => selectedDelete.has(img.id));
    const ok = window.confirm(`Delete ${targets.length} image file(s) permanently? This cannot be undone.`);
    if (!ok) return;
    setBusy(true);
    try {
      const result = await apiJson<{ deletedCount: number; errors: Array<{ path: string; error: string }> }>(
        "/api/images-check/delete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ root, paths: targets.map((img) => img.path) }),
        }
      );
      setSelectedDelete(new Set());
      notify("Images deleted", {
        type: result.errors.length ? "warning" : "success",
        message: `${result.deletedCount} deleted, ${result.errors.length} errors`,
      });
      await scanFolder(root);
    } catch (error) {
      notify("Delete failed", {
        type: "error",
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setBusy(false);
    }
  }

  function revealRoot() {
    if (!root) return;
    if (window.__grimoire?.revealInExplorer) {
      window.__grimoire.revealInExplorer(root);
      return;
    }
    void apiJson("/api/local/reveal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: root }),
    });
  }

  function renderImageTile(img: ImagesCheckItem, mode: ViewMode) {
    const marked = selectedDelete.has(img.id);
    const imageFolder = folderKey(img.relativePath);
    return (
      <article
        key={img.id}
        className={`ic-tile ${mode}${marked ? " delete" : ""}`}
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setHover({ image: img, x: rect.right, y: rect.top });
        }}
        onMouseLeave={() => setHover(null)}
      >
        <button className="ic-img-btn" onClick={() => toggleDelete(img.id)} title={marked ? "Restore image" : "Mark for deletion"}>
          <img src={thumbSrc(img.path)} alt={img.name} loading="lazy" decoding="async" />
          <span className="ic-info">i</span>
          {mode === "slideshow" && <span className="ic-mark">{marked ? "Delete" : "Keep"}</span>}
        </button>
        <div className="ic-card-meta">
          <strong>{img.name}</strong>
          <span>{imageFolder}</span>
          <span>{img.width}x{img.height} - {formatSize(img.sizeBytes)}</span>
        </div>
        {mode === "gallery" && (
          <div className="ic-card-actions">
            <button className={!marked ? "active keep" : ""} onClick={() => marked && toggleDelete(img.id)}>
              Keep
            </button>
            <button className={marked ? "active delete" : ""} onClick={() => !marked && toggleDelete(img.id)}>
              Delete
            </button>
          </div>
        )}
      </article>
    );
  }

  return (
    <div className="view images-check-view">
      <section className="ic-shell">
        <div className="ic-head">
          <button className="ic-close" title="Images Check">x</button>
          <div>
            <h1>IMAGES CHECK</h1>
            <p>Scan every image inside a folder tree, keep the good files, and permanently delete rejected files.</p>
          </div>
          <div className="ic-mode">
            <button className={viewMode === "slideshow" ? "active" : ""} onClick={() => setViewMode("slideshow")}>
              Slideshow
            </button>
            <button className={viewMode === "gallery" ? "active" : ""} onClick={() => setViewMode("gallery")}>
              Gallery
            </button>
          </div>
        </div>

        <div className="ic-toolbar">
          <div className="path-picker ic-path">
            <input value={folder} onChange={(e) => setFolder(e.target.value)} placeholder="Select folder with images" />
            <button className="btn btn-secondary" onClick={chooseFolder} disabled={busy}>Choose folder</button>
            <button className="btn btn-primary" onClick={() => scanFolder()} disabled={busy || !folder}>
              {busy ? "Scanning..." : "Scan all"}
            </button>
          </div>
          <input className="inline-search ic-filter" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter image name, folder, or path" />
        </div>

        <div className="ic-summary">
          <div><span>Total</span><strong>{images.length}</strong></div>
          <div><span>Folders</span><strong>{folderGroups.length}</strong></div>
          <div><span>Keep</span><strong>{keepCount}</strong></div>
          <div><span>Delete</span><strong className="danger">{selectedDelete.size}</strong></div>
          <button className="btn btn-secondary" onClick={revealRoot} disabled={!root}>Open folder</button>
          <button className="btn btn-danger" onClick={deleteSelected} disabled={busy || selectedDelete.size === 0}>Save deletion</button>
        </div>

        {viewMode === "slideshow" ? (
          <div className="ic-folder-stack slideshow">
            {folderGroups.length === 0 && (
              <button className="ic-upload-card" onClick={chooseFolder} disabled={busy}>
                <span>+</span>
                <strong>Choose a folder to scan every image inside it</strong>
              </button>
            )}
            {folderGroups.map((group, index) => (
              <section className="ic-folder-section" key={group.folder}>
                <div className="ic-folder-head">
                  <div>
                    <strong>{group.label}</strong>
                    <span>{group.folder}</span>
                  </div>
                  <em>{group.images.length} images</em>
                </div>
                <div className="ic-grid slideshow">
                  {index === 0 && (
                    <button className="ic-upload-card" onClick={chooseFolder} disabled={busy}>
                      <span>+</span>
                      <strong>Choose another folder or rescan current output</strong>
                    </button>
                  )}
                  {group.images.map((img) => renderImageTile(img, "slideshow"))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="ic-gallery-groups">
            {folderGroups.map((group) => (
              <section className="ic-gallery-folder" key={group.folder}>
                <div className="ic-folder-head">
                  <div>
                    <strong>{group.label}</strong>
                    <span>{group.folder}</span>
                  </div>
                  <em>
                    {group.images.length} images / {group.images.filter((img) => selectedDelete.has(img.id)).length} delete
                  </em>
                </div>
                <div className="ic-gallery-strip">
                  {group.images.map((img) => renderImageTile(img, "gallery"))}
                </div>
              </section>
            ))}
          </div>
        )}

        {images.length === 0 && (
          <div className="ic-empty">No scan yet. Choose a folder to inspect every image across all subfolders.</div>
        )}
      </section>

      {hover && (
        <div
          className="ic-hover"
          style={{
            left: Math.min(hover.x + 18, window.innerWidth - 360),
            top: Math.min(hover.y + 18, window.innerHeight - 430),
          }}
        >
          <img src={imageSrc(hover.image.path)} alt={hover.image.name} />
          <div className="ic-hover-meta">
            <strong>{hover.image.name}</strong>
            <span>{hover.image.width} x {hover.image.height}</span>
            <span>{formatSize(hover.image.sizeBytes)}</span>
            <span>Folder: {folderKey(hover.image.relativePath)}</span>
            <span>{hover.image.relativePath}</span>
          </div>
        </div>
      )}
    </div>
  );
}
