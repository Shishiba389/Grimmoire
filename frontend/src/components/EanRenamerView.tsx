import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiJson, apiUrl } from "./ToolShared";
import { useNotifications } from "../contexts/NotificationContext";

/* ── Types ── */

type RenImage = {
  id: string;
  name: string;
  extension: string;
  width: number;
  height: number;
  sizeBytes: number;
  ean: string;
  relativePath: string;
};

type FolderResult = {
  folderPath: string;
  ean: string;
  images: RenImage[];
};

type KanbanColumn = {
  key: string;
  title: string;
  fixed?: boolean;
  imageIds: string[];
};

type DuplicateTypeKey = "packshot" | "human" | "normal_lifestyle" | "artwork" | "video";
type DuplicateGroup = {
  id: string;
  imageIds: string[];
  first: boolean;
};
type DuplicateBuckets = Record<DuplicateTypeKey, DuplicateGroup[]>;
type DuplicateLabels = Record<DuplicateTypeKey, string>;
type NamingMode = "per-category" | "continuous" | "prefixed";
type OutputMode = "copy" | "in-folder";

type RenamePlanItem = {
  id: string;
  category: string;
  oldName: string;
  newName?: string;
  outputPath?: string;
  outputRelativePath?: string;
  status?: "rename" | "conflict" | "skip";
};

type RenameResult = {
  items: RenamePlanItem[];
  renamed?: number;
  skipped?: number;
  skippedCount?: number;
  conflicts?: number | string[];
  logPath?: string;
};

type SettingsState = {
  outputMode: OutputMode;
  namingMode: NamingMode;
};

type HoverPreviewState = {
  image: RenImage;
  x: number;
  y: number;
} | null;

type PriorityFirstMap = Record<string, Set<string>>;

/* ── Constants ── */

const DEFAULT_COLUMNS: KanbanColumn[] = [
  { key: "unsorted", title: "Unsorted", fixed: true, imageIds: [] },
  { key: "packshot", title: "Packshot", imageIds: [] },
  { key: "lifestyle-human", title: "Lifestyle/Human", imageIds: [] },
  { key: "lifestyle-normal", title: "Lifestyle/Normal", imageIds: [] },
  { key: "artwork", title: "Artwork", imageIds: [] },
  { key: "duplicate", title: "Duplicate", fixed: true, imageIds: [] },
];

const OUTPUT_CATEGORIES = ["Packshot", "Human", "Normal Lifestyle", "Artwork"];
const DUPLICATE_TYPES: Array<{ key: DuplicateTypeKey; label: string }> = [
  { key: "packshot", label: "PACK SHOT" },
  { key: "human", label: "HUMAN" },
  { key: "normal_lifestyle", label: "NORMAL LIFESTYLE" },
  { key: "artwork", label: "ARTWORK" },
  { key: "video", label: "VIDEO" },
];
const EMPTY_DUPLICATE_BUCKETS: DuplicateBuckets = {
  packshot: [],
  human: [],
  normal_lifestyle: [],
  artwork: [],
  video: [],
};
const DEFAULT_DUPLICATE_LABELS: DuplicateLabels = {
  packshot: "PACK SHOT",
  human: "HUMAN",
  normal_lifestyle: "NORMAL LIFESTYLE",
  artwork: "ARTWORK",
  video: "VIDEO",
};

/* ── Helpers ── */

function validateEan13(code: string): boolean {
  if (!/^\d{13}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += Number(code[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === Number(code[12]);
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

function thumbnailUrl(id: string, folderPath: string): string {
  return apiUrl(`/api/ean-renamer/images/${encodeURIComponent(id)}/thumbnail?folderPath=${encodeURIComponent(folderPath)}`);
}

function columnCategoryKey(key: string): string {
  if (key === "lifestyle-human") return "lifestyle_human";
  if (key === "lifestyle-normal") return "lifestyle_normal";
  return key;
}

function createDuplicateGroup(imageIds: string[] = [], first = false): DuplicateGroup {
  return {
    id: `dup-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    imageIds,
    first,
  };
}

function normalizeNamingMode(mode: NamingMode): string {
  return mode === "per-category" ? "per_category" : mode;
}

function normalizeOutputMode(mode: OutputMode): string {
  return mode === "in-folder" ? "rename" : "copy";
}

function planOutput(item: RenamePlanItem): string {
  return item.outputPath || item.outputRelativePath || item.newName || "";
}

/* ── Component ── */

export function EanRenamerView() {
  const { notify } = useNotifications();

  /* state: folder + images */
  const [folderPath, setFolderPath] = useState("");
  const [detectedEan, setDetectedEan] = useState("");
  const [customEan, setCustomEan] = useState("");
  const [productName, setProductName] = useState("");
  const [productNameContinuous, setProductNameContinuous] = useState(false);
  const [images, setImages] = useState<RenImage[]>([]);
  const [columns, setColumns] = useState<KanbanColumn[]>(DEFAULT_COLUMNS.map((c) => ({ ...c, imageIds: [] })));
  const [duplicateBuckets, setDuplicateBuckets] = useState<DuplicateBuckets>({ ...EMPTY_DUPLICATE_BUCKETS });
  const [duplicateLabels, setDuplicateLabels] = useState<DuplicateLabels>({ ...DEFAULT_DUPLICATE_LABELS });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [outputFolders, setOutputFolders] = useState<Record<string, string>>({});
  const [priorityFirst, setPriorityFirst] = useState<PriorityFirstMap>({});
  const [priorityEnabled, setPriorityEnabled] = useState<Record<string, boolean>>({});

  /* state: UI */
  const [showSettings, setShowSettings] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewExpanded, setPreviewExpanded] = useState(true);
  const [previewHeight, setPreviewHeight] = useState(220);
  const [hoverPreview, setHoverPreview] = useState<HoverPreviewState>(null);
  const [settings, setSettings] = useState<SettingsState>({ outputMode: "copy", namingMode: "per-category" });
  const [renamePlan, setRenamePlan] = useState<RenamePlanItem[]>([]);
  const [lastLogPath, setLastLogPath] = useState("");
  const [busy, setBusy] = useState(false);

  /* drag state */
  const [dragIds, setDragIds] = useState<string[]>([]);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [duplicateDropTarget, setDuplicateDropTarget] = useState<DuplicateTypeKey | null>(null);

  /* refs */
  const resizeRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const imageMap = useMemo(() => {
    const m = new Map<string, RenImage>();
    images.forEach((img) => m.set(img.id, img));
    return m;
  }, [images]);

  const effectiveEan = customEan.trim() || detectedEan;
  const eanValid = validateEan13(effectiveEan);
  const totalImages = images.length;
  const selectedCount = selected.size;
  const duplicateCount = Object.values(duplicateBuckets).reduce(
    (sum, groups) => sum + groups.reduce((groupSum, group) => groupSum + group.imageIds.length, 0),
    0
  );

  /* ── Folder operations ── */

  async function handlePickFolder() {
    try {
      const result = await apiJson<{ folderPath: string }>("/api/ean-renamer/folder/pick", { method: "POST" });
      if (result.folderPath) await loadFolder(result.folderPath);
    } catch (e) {
      notify("Failed to pick folder", { type: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }

  async function loadFolder(path: string) {
    try {
      const result = await apiJson<FolderResult>("/api/ean-renamer/folder/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderPath: path }),
      });
      setFolderPath(result.folderPath);
      setDetectedEan(result.ean || "");
      setImages(result.images);
      setSelected(new Set());
      setRenamePlan([]);
      setLastLogPath("");
      setDuplicateBuckets({ ...EMPTY_DUPLICATE_BUCKETS });
      setPriorityFirst({});
      setPriorityEnabled({});
      /* Put all images in Unsorted */
      setColumns((prev) =>
        prev.map((col) =>
          col.key === "unsorted" ? { ...col, imageIds: result.images.map((img) => img.id) } : { ...col, imageIds: [] }
        )
      );
      notify("Folder loaded", { type: "success", message: `${result.images.length} images found` });
    } catch (e) {
      notify("Failed to load folder", { type: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }

  async function handleRefresh() {
    if (folderPath) await loadFolder(folderPath);
  }

  function handleOpenPath() {
    if (folderPath && window.__grimoire?.revealInExplorer) {
      window.__grimoire.revealInExplorer(folderPath);
    }
  }

  /* ── Output folder picking ── */

  async function handlePickOutput(category: string) {
    try {
      const result = await apiJson<{ folderPath: string }>("/api/ean-renamer/folder/pick-output", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, initialPath: outputFolders[category] || folderPath }),
      });
      if (result.folderPath) {
        setOutputFolders((prev) => ({ ...prev, [category]: result.folderPath }));
      }
    } catch (e) {
      notify("Failed to pick output folder", { type: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }

  /* ── Selection ── */

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /* ── Drag and drop ── */

  function handleDragStart(e: React.DragEvent, imageId: string) {
    const ids = selected.has(imageId) ? Array.from(selected) : [imageId];
    setDragIds(ids);
    setHoverPreview(null);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", ids.join(","));
    /* ghost */
    const ghost = document.createElement("div");
    ghost.className = "ren-drag-ghost";
    ghost.textContent = `${ids.length} image${ids.length > 1 ? "s" : ""}`;
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 30, 16);
    requestAnimationFrame(() => ghost.remove());
  }

  function handleDragOver(e: React.DragEvent, colKey: string) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropTarget(colKey);
    setDuplicateDropTarget(null);
  }

  function handleDragLeave() {
    setDropTarget(null);
    setDuplicateDropTarget(null);
  }

  function handleDrop(e: React.DragEvent, targetColKey: string) {
    e.preventDefault();
    setDropTarget(null);
    setDuplicateDropTarget(null);
    if (targetColKey === "duplicate") return;
    if (dragIds.length === 0) return;
    setColumns((prev) => {
      const next = prev.map((col) => ({
        ...col,
        imageIds: col.imageIds.filter((id) => !dragIds.includes(id)),
      }));
      const target = next.find((c) => c.key === targetColKey);
      if (target && target.key !== "duplicate") target.imageIds = [...target.imageIds, ...dragIds];
      return next;
    });
    setDuplicateBuckets((prev) => {
      const next = { ...prev };
      DUPLICATE_TYPES.forEach(({ key }) => {
        next[key] = prev[key]
          .map((group) => ({ ...group, imageIds: group.imageIds.filter((id) => !dragIds.includes(id)) }))
          .filter((group) => group.imageIds.length > 0);
      });
      return next;
    });
    setDragIds([]);
  }

  function handleDuplicateDragOver(e: React.DragEvent, bucket: DuplicateTypeKey) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    setDropTarget("duplicate");
    setDuplicateDropTarget(bucket);
  }

  function handleDuplicateDrop(e: React.DragEvent, bucket: DuplicateTypeKey) {
    e.preventDefault();
    e.stopPropagation();
    setDropTarget(null);
    setDuplicateDropTarget(null);
    if (dragIds.length === 0) return;
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        imageIds: col.imageIds.filter((id) => !dragIds.includes(id)),
      }))
    );
    setDuplicateBuckets((prev) => {
      const next = { ...prev };
      DUPLICATE_TYPES.forEach(({ key }) => {
        next[key] = prev[key]
          .map((group) => ({ ...group, imageIds: group.imageIds.filter((id) => !dragIds.includes(id)) }))
          .filter((group) => group.imageIds.length > 0);
      });
      next[bucket] = [...next[bucket], createDuplicateGroup([...dragIds], false)];
      return next;
    });
    setDragIds([]);
  }

  function handleAddDuplicateGroup(bucket: DuplicateTypeKey) {
    setDuplicateBuckets((prev) => ({
      ...prev,
      [bucket]: [...prev[bucket], createDuplicateGroup([], false)],
    }));
  }

  function toggleDuplicateGroupFirst(bucket: DuplicateTypeKey, groupId: string) {
    setDuplicateBuckets((prev) => ({
      ...prev,
      [bucket]: prev[bucket].map((group) =>
        group.id === groupId ? { ...group, first: !group.first } : group
      ),
    }));
  }

  function removeDuplicateGroup(bucket: DuplicateTypeKey, groupId: string) {
    const group = duplicateBuckets[bucket].find((item) => item.id === groupId);
    const returning = group?.imageIds || [];
    setDuplicateBuckets((prev) => ({
      ...prev,
      [bucket]: prev[bucket].filter((item) => item.id !== groupId),
    }));
    if (returning.length > 0) {
      setColumns((prev) =>
        prev.map((col) =>
          col.key === "unsorted" ? { ...col, imageIds: [...col.imageIds, ...returning] } : col
        )
      );
    }
  }

  function handleDragEnd() {
    setDragIds([]);
    setDropTarget(null);
    setDuplicateDropTarget(null);
    setHoverPreview(null);
  }

  function updateHoverPreview(e: React.MouseEvent, image: RenImage) {
    setHoverPreview({ image, x: e.clientX, y: e.clientY });
  }

  /* ── Column management ── */

  function handleAddColumn() {
    const name = prompt("Category name:");
    if (!name?.trim()) return;
    const key = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    if (columns.some((c) => c.key === key)) {
      notify("Column already exists", { type: "warning" });
      return;
    }
    setColumns((prev) => [...prev, { key, title: name.trim(), imageIds: [] }]);
  }

  function handleRenameColumn(key: string) {
    const col = columns.find((c) => c.key === key);
    if (!col || col.fixed) return;
    const name = prompt("New name:", col.title);
    if (!name?.trim()) return;
    setColumns((prev) => prev.map((c) => (c.key === key ? { ...c, title: name.trim() } : c)));
  }

  function handleRemoveColumn(key: string) {
    const col = columns.find((c) => c.key === key);
    if (!col || col.fixed) return;
    /* Move images back to unsorted */
    setColumns((prev) => {
      const returning = col.imageIds;
      return prev
        .filter((c) => c.key !== key)
        .map((c) => (c.key === "unsorted" ? { ...c, imageIds: [...c.imageIds, ...returning] } : c));
    });
  }

  /* ── Priority first ── */

  function togglePriorityEnabled(colKey: string) {
    setPriorityEnabled((prev) => {
      const next = { ...prev, [colKey]: !prev[colKey] };
      if (!next[colKey]) {
        setPriorityFirst((pf) => {
          const n = { ...pf };
          delete n[colKey];
          return n;
        });
      }
      return next;
    });
  }

  function togglePriorityImage(colKey: string, imageId: string) {
    setPriorityFirst((prev) => {
      const current = new Set(prev[colKey] || []);
      if (current.has(imageId)) current.delete(imageId);
      else current.add(imageId);
      return { ...prev, [colKey]: current };
    });
  }

  function isImagePriority(colKey: string, imageId: string): boolean {
    return priorityFirst[colKey]?.has(imageId) ?? false;
  }

  /* ── Preview / Rename ── */

  const buildBody = useCallback(() => {
    const outputCategories: Record<string, string> = {};
    const outputFolderPaths: Record<string, string> = {};
    const assignments: Array<{ id: string; category: string; categoryName?: string }> = [];
    const categoryOrder: string[] = [];
    const allPriorityIds: string[] = [];
    const duplicateGroups: Array<{ ids: string[]; first: boolean }> = [];

    const DUPLICATE_KEY_TO_COLUMN: Record<DuplicateTypeKey, string> = {
      packshot: "packshot",
      human: "lifestyle-human",
      normal_lifestyle: "lifestyle-normal",
      artwork: "artwork",
      video: "video",
    };

    columns.forEach((col) => {
      if (col.key === "unsorted" || col.key === "duplicate") return;
      const category = columnCategoryKey(col.key);
      outputCategories[category] = col.title;
      categoryOrder.push(category);
      col.imageIds.forEach((id) => assignments.push({ id, category, categoryName: col.title }));
    });

    DUPLICATE_TYPES.forEach(({ key }) => {
      const colKey = DUPLICATE_KEY_TO_COLUMN[key];
      const category = columnCategoryKey(colKey);
      const col = columns.find((c) => c.key === colKey);
      const categoryName = col?.title || key.replace(/_/g, " ");
      if (!outputCategories[category]) {
        outputCategories[category] = categoryName;
        categoryOrder.push(category);
      }
      duplicateBuckets[key].forEach((group) => {
        group.imageIds.forEach((id) => assignments.push({ id, category, categoryName }));
      });
    });

    Object.entries(priorityFirst).forEach(([, ids]) => {
      ids.forEach((id) => allPriorityIds.push(id));
    });

    DUPLICATE_TYPES.forEach(({ key }) => {
      duplicateBuckets[key].forEach((group) => {
        if (group.imageIds.length === 0) return;
        duplicateGroups.push({ ids: [...group.imageIds], first: group.first });
        if (group.first) {
          group.imageIds.forEach((id) => {
            if (!allPriorityIds.includes(id)) allPriorityIds.push(id);
          });
        }
      });
    });

    const outputFolderMap: Record<string, string> = {
      Packshot: "packshot",
      Human: "lifestyle_human",
      "Normal Lifestyle": "lifestyle_normal",
      Artwork: "artwork",
    };
    Object.entries(outputFolders).forEach(([label, path]) => {
      outputFolderPaths[outputFolderMap[label] || label] = path;
    });

    return {
      folderPath,
      outputFolderPaths,
      customEan: customEan.trim() || undefined,
      productName: productName.trim() || undefined,
      productNameContinuous,
      namingMode: normalizeNamingMode(settings.namingMode),
      outputCategories,
      outputMode: normalizeOutputMode(settings.outputMode),
      categoryOrder,
      assignments,
      priorityIds: allPriorityIds.length > 0 ? allPriorityIds : undefined,
      duplicateGroups,
    };
  }, [folderPath, columns, duplicateBuckets, duplicateLabels, outputFolders, customEan, productName, productNameContinuous, settings, priorityFirst, priorityEnabled]);

  async function handlePreview() {
    if (!folderPath) return;
    setBusy(true);
    try {
      const result = await apiJson<RenameResult>("/api/ean-renamer/batch/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildBody()),
      });
      setRenamePlan(result.items);
      setShowPreviewModal(true);
    } catch (e) {
      notify("Preview failed", { type: "error", message: e instanceof Error ? e.message : String(e) });
    } finally {
      setBusy(false);
    }
  }

  async function handleApply() {
    if (!folderPath) return;
    setBusy(true);
    try {
      const result = await apiJson<RenameResult>("/api/ean-renamer/batch/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildBody()),
      });
      const roots = Object.values(outputFolders).filter(Boolean);
      if (settings.outputMode === "in-folder") roots.push(folderPath);
      if (roots.length > 0) {
        localStorage.setItem("grimoire-ean-renamer-output-roots", JSON.stringify(Array.from(new Set(roots))));
      }
      setRenamePlan(result.items);
      if (result.logPath) setLastLogPath(result.logPath);
      const renamed = result.renamed ?? result.items.length;
      const skipped = result.skipped ?? result.skippedCount ?? 0;
      const conflicts = Array.isArray(result.conflicts) ? result.conflicts.length : result.conflicts ?? 0;
      notify("Rename complete", {
        type: conflicts > 0 ? "warning" : "success",
        message: `${renamed} processed, ${skipped} skipped, ${conflicts} conflicts`,
      });
    } catch (e) {
      notify("Rename failed", { type: "error", message: e instanceof Error ? e.message : String(e) });
    } finally {
      setBusy(false);
    }
  }

  async function handleUndo() {
    if (!lastLogPath || !folderPath) return;
    setBusy(true);
    try {
      await apiJson("/api/ean-renamer/rename/undo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderPath, logPath: lastLogPath }),
      });
      notify("Undo complete", { type: "success" });
      setLastLogPath("");
      await loadFolder(folderPath);
    } catch (e) {
      notify("Undo failed", { type: "error", message: e instanceof Error ? e.message : String(e) });
    } finally {
      setBusy(false);
    }
  }

  /* ── Preview panel resize ── */

  function handleResizeStart(e: React.MouseEvent) {
    e.preventDefault();
    const startY = e.clientY;
    const startH = previewHeight;
    function onMove(ev: MouseEvent) {
      setPreviewHeight(Math.max(80, Math.min(500, startH - (ev.clientY - startY))));
    }
    function onUp() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }

  /* ── Close settings on outside click ── */

  useEffect(() => {
    if (!showSettings) return;
    function onClick(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [showSettings]);

  /* ── Computed plan stats ── */

  const planStats = useMemo(() => {
    let renamed = 0,
      skipped = 0,
      conflicts = 0;
    renamePlan.forEach((item) => {
      const status = item.status || "rename";
      if (status === "rename") renamed++;
      else if (item.status === "skip") skipped++;
      else conflicts++;
    });
    return { renamed, skipped, conflicts };
  }, [renamePlan]);

  /* ── Render ── */

  function renderImageCard(id: string, colKey?: string) {
    const img = imageMap.get(id);
    if (!img) return null;
    const isSelected = selected.has(id);
    const isDragging = dragIds.includes(id);
    const showPriority = colKey && priorityEnabled[colKey];
    const isPriority = colKey ? isImagePriority(colKey, id) : false;
    return (
      <div
        key={id}
        className={`ren-card ${isSelected ? "ren-card-selected" : ""} ${isDragging ? "ren-card-dragging" : ""} ${isPriority ? "ren-card-priority" : ""}`}
        draggable
        onMouseEnter={(e) => updateHoverPreview(e, img)}
        onMouseMove={(e) => updateHoverPreview(e, img)}
        onMouseLeave={() => setHoverPreview(null)}
        onDragStart={(e) => handleDragStart(e, id)}
        onDragEnd={handleDragEnd}
      >
        <input
          type="checkbox"
          className="ren-card-check"
          checked={isSelected}
          onChange={() => toggleSelect(id)}
        />
        <div className="ren-card-thumb">
          <img src={thumbnailUrl(id, folderPath)} alt={img.name} loading="lazy" />
        </div>
        <div className="ren-card-meta">
          <span className="ren-card-name" title={img.name}>{img.name}</span>
          <span className="ren-card-info">
            {img.width}&times;{img.height} &middot; {formatFileSize(img.sizeBytes)}
          </span>
          <div className="ren-card-chips">
            <span className="ren-chip">{img.extension.toUpperCase()}</span>
            {renamePlan.some((p) => p.id === id && (p.status || "rename") === "rename") && (
              <span className="ren-chip ren-chip-renamed">renamed</span>
            )}
          </div>
        </div>
        {showPriority && (
          <button
            className={`ren-priority-btn ${isPriority ? "ren-priority-active" : ""}`}
            title={isPriority ? "Remove first-image priority" : "Label as first image"}
            onClick={(e) => { e.stopPropagation(); colKey && togglePriorityImage(colKey, id); }}
          >
            ★
          </button>
        )}
        <span className="ren-card-grip" title="Drag">&#9776;</span>
      </div>
    );
  }

  return (
    <div className="ren-root">
      <style>{CSS}</style>

      {/* ── Top bar ── */}
      <div className="ren-topbar">
        <div className="ren-topbar-row">
          <div className="ren-folder-group">
            <input className="ren-path-input" readOnly value={folderPath} placeholder="No folder selected" />
            <button className="btn btn-primary btn-sm" onClick={handlePickFolder}>Pick Folder</button>
            <button className="btn btn-secondary btn-sm" onClick={handleOpenPath} disabled={!folderPath}>Open</button>
            <button className="btn btn-secondary btn-sm" onClick={handleRefresh} disabled={!folderPath}>Refresh</button>
          </div>
          <div className="ren-stat-group">
            <label className="ren-stat">
              <span>EAN</span>
              <input className="ren-stat-input" readOnly value={detectedEan} placeholder="--" />
            </label>
            <span className={`ren-ean-badge ${eanValid ? "valid" : "warn"}`}>
              {eanValid ? "✓" : "⚠"}
            </span>
            <label className="ren-stat">
              <span>Custom EAN</span>
              <input
                className="ren-stat-input"
                value={customEan}
                onChange={(e) => setCustomEan(e.target.value)}
                placeholder="Override"
              />
            </label>
            <div className="ren-stat ren-product-stat">
              <span>Product Name</span>
              <input
                className="ren-stat-input ren-product-input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Output name"
              />
              <label className="ren-product-continuous" title="Use EAN_ProductName_1, EAN_ProductName_2 naming">
                <input
                  type="checkbox"
                  checked={productNameContinuous}
                  onChange={(e) => setProductNameContinuous(e.target.checked)}
                  disabled={!productName.trim()}
                />
                <span>EAN_ProductName</span>
              </label>
            </div>
            <div className="ren-stat">
              <span>Total</span>
              <strong>{totalImages}</strong>
            </div>
            <div className="ren-stat">
              <span>Selected</span>
              <strong>{selectedCount}</strong>
            </div>
          </div>
          <div className="ren-settings-wrap" ref={settingsRef}>
            <button
              className="btn btn-secondary btn-sm ren-gear"
              onClick={() => setShowSettings((v) => !v)}
              title="Settings"
            >
              &#9881;
            </button>
            {showSettings && (
              <div className="ren-settings-popover">
                <h4>Settings</h4>
                <label className="ren-setting-row">
                  <span>Action</span>
                  <select
                    value={settings.outputMode}
                    onChange={(e) => setSettings((s) => ({ ...s, outputMode: e.target.value as OutputMode }))}
                  >
                    <option value="copy">Copy</option>
                    <option value="in-folder">In-folder rename</option>
                  </select>
                </label>
                <label className="ren-setting-row">
                  <span>Naming mode</span>
                  <select
                    value={settings.namingMode}
                    onChange={(e) => setSettings((s) => ({ ...s, namingMode: e.target.value as NamingMode }))}
                  >
                    <option value="per-category">Per category</option>
                    <option value="continuous">Continuous</option>
                    <option value="prefixed">Prefixed</option>
                  </select>
                </label>
                <label className="ren-setting-row">
                  <span>Dark mode</span>
                  <input type="checkbox" checked disabled />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Output bar ── */}
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
          {OUTPUT_CATEGORIES.map((cat) => (
            <div key={cat} className="ren-output-field" onClick={() => handlePickOutput(cat)}>
              <span className="ren-output-cat">{cat}</span>
              <span className="ren-output-path">{outputFolders[cat] || "Set output"}</span>
              {outputFolders[cat] && (
                <button
                  className="ren-output-clear"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOutputFolders((prev) => {
                      const next = { ...prev };
                      delete next[cat];
                      return next;
                    });
                  }}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setOutputFolders({})}
          disabled={Object.keys(outputFolders).length === 0}
        >
          Clear all
        </button>
      </div>

      {/* ── Kanban board ── */}
      <div className="ren-board">
        {columns.map((col) => (
          <div
            key={col.key}
            className={`ren-column ${dropTarget === col.key ? "ren-column-drop" : ""}`}
            onDragOver={(e) => handleDragOver(e, col.key)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.key)}
          >
            <div className="ren-col-header">
              <span
                className="ren-col-title"
                onDoubleClick={() => !col.fixed && handleRenameColumn(col.key)}
                title={col.fixed ? col.title : "Double-click to rename"}
              >
                {col.title}
              </span>
              <span className="ren-col-count">{col.key === "duplicate" ? duplicateCount : col.imageIds.length}</span>
              {!col.fixed && (
                <label className="ren-priority-toggle" title="Select which images get numbered as #1">
                  <input
                    type="checkbox"
                    checked={!!priorityEnabled[col.key]}
                    onChange={() => togglePriorityEnabled(col.key)}
                  />
                  <span>1st</span>
                </label>
              )}
              {!col.fixed && (
                <button className="ren-col-menu" onClick={() => handleRemoveColumn(col.key)} title="Remove column">
                  &times;
                </button>
              )}
            </div>
            {col.key === "duplicate" ? (
              <div className="ren-col-body ren-duplicate-body">
                {DUPLICATE_TYPES.map(({ key, label }) => {
                  return (
                    <div
                      key={key}
                      className={`ren-duplicate-section ${duplicateDropTarget === key ? "ren-duplicate-drop" : ""}`}
                      onDragOver={(e) => handleDuplicateDragOver(e, key)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDuplicateDrop(e, key)}
                    >
                      <div className="ren-duplicate-header">
                        <input
                          className="ren-duplicate-type"
                          value={duplicateLabels[key]}
                          placeholder={label}
                          onChange={(e) => setDuplicateLabels((prev) => ({ ...prev, [key]: e.target.value }))}
                        />
                        <button
                          className="ren-duplicate-add"
                          onClick={() => handleAddDuplicateGroup(key)}
                          title="Add another duplicate group"
                        >
                          + Group
                        </button>
                      </div>
                      <div className="ren-duplicate-images">
                        {duplicateBuckets[key].map((group, index) => {
                          const groupKey = `dup-${key}-${group.id}`;
                          return (
                            <div
                              key={group.id}
                              className="ren-duplicate-group"
                              onDragOver={(e) => handleDuplicateDragOver(e, key)}
                              onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDropTarget(null);
                                setDuplicateDropTarget(null);
                                if (dragIds.length === 0) return;
                                setColumns((prev) =>
                                  prev.map((col) => ({
                                    ...col,
                                    imageIds: col.imageIds.filter((id) => !dragIds.includes(id)),
                                  }))
                                );
                                setDuplicateBuckets((prev) => {
                                  const next = { ...prev };
                                  DUPLICATE_TYPES.forEach(({ key: typeKey }) => {
                                    next[typeKey] = prev[typeKey]
                                      .map((item) => ({
                                        ...item,
                                        imageIds: item.imageIds.filter((id) => !dragIds.includes(id)),
                                      }));
                                  });
                                  next[key] = next[key].map((item) =>
                                    item.id === group.id ? { ...item, imageIds: [...item.imageIds, ...dragIds] } : item
                                  );
                                  return next;
                                });
                                setDragIds([]);
                              }}
                            >
                              <div className="ren-duplicate-group-head">
                                <span>Group {index + 1}</span>
                                <label className="ren-priority-toggle" title="This duplicate group should get the first available number">
                                  <input
                                    type="checkbox"
                                    checked={group.first}
                                    onChange={() => toggleDuplicateGroupFirst(key, group.id)}
                                  />
                                  <span>1st</span>
                                </label>
                                <button
                                  className="ren-duplicate-remove"
                                  onClick={() => removeDuplicateGroup(key, group.id)}
                                  title="Remove this duplicate group"
                                >
                                  &times;
                                </button>
                              </div>
                              {group.imageIds.map((id) => renderImageCard(id, groupKey))}
                              {group.imageIds.length === 0 && <div className="ren-duplicate-empty">Drop group images here</div>}
                            </div>
                          );
                        })}
                        {duplicateBuckets[key].length === 0 && <div className="ren-duplicate-empty">Drop images here</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="ren-col-body">
                {col.imageIds.map((id) => renderImageCard(id, col.key))}
                {col.imageIds.length === 0 && <div className="ren-col-empty">Drop images here</div>}
              </div>
            )}
          </div>
        ))}
        <button className="ren-add-col" onClick={handleAddColumn} title="Add category">
          +
        </button>
      </div>

      {/* ── Footer / Preview panel ── */}
      {hoverPreview && (
        <div
          className="ren-hover-preview"
          style={{
            left: Math.max(12, Math.min(hoverPreview.x + 18, window.innerWidth - 340)),
            top: Math.max(12, Math.min(hoverPreview.y + 18, window.innerHeight - 430)),
          }}
        >
          <div className="ren-hover-image-wrap">
            <img
              src={thumbnailUrl(hoverPreview.image.id, folderPath)}
              alt={hoverPreview.image.name}
            />
          </div>
          <div className="ren-hover-name" title={hoverPreview.image.name}>
            {hoverPreview.image.name}
          </div>
          <div className="ren-hover-meta">
            {hoverPreview.image.width}&times;{hoverPreview.image.height} &middot; {formatFileSize(hoverPreview.image.sizeBytes)} &middot; {hoverPreview.image.extension.toUpperCase()}
          </div>
        </div>
      )}

      <div className="ren-footer">
        {previewExpanded && (
          <>
            <div className="ren-resize-handle" ref={resizeRef} onMouseDown={handleResizeStart} />
            <div className="ren-preview-panel" style={{ height: previewHeight }}>
              <div className="ren-preview-table-wrap">
                <table className="ren-preview-table">
                  <thead>
                    <tr>
                      <th>Current Name</th>
                      <th></th>
                      <th>Output Path</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renamePlan.slice(0, 50).map((item, i) => (
                      <tr key={i} className={`ren-plan-${item.status || "rename"}`}>
                        <td>{item.oldName}</td>
                        <td className="ren-arrow">&rarr;</td>
                        <td>{planOutput(item)}</td>
                      </tr>
                    ))}
                    {renamePlan.length === 0 && (
                      <tr>
                        <td colSpan={3} className="ren-table-empty">Click Preview to generate rename plan</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="ren-summary-card">
                <div className="ren-summary-item ren-summary-green">
                  <strong>{planStats.renamed}</strong>
                  <span>To rename</span>
                </div>
                <div className="ren-summary-item">
                  <strong>{planStats.skipped}</strong>
                  <span>Skipped</span>
                </div>
                <div className={`ren-summary-item ${planStats.conflicts > 0 ? "ren-summary-amber" : ""}`}>
                  <strong>{planStats.conflicts}</strong>
                  <span>Conflicts</span>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="ren-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setPreviewExpanded((v) => !v)}
          >
            {previewExpanded ? "Hide Preview" : "Show Preview"}
          </button>
          <div className="ren-actions-right">
            <button className="btn btn-secondary" onClick={handlePreview} disabled={busy || !folderPath}>
              Preview
            </button>
            <button className="btn btn-primary" onClick={handleApply} disabled={busy || !folderPath}>
              {settings.outputMode === "copy" ? "Copy" : "Rename"}
            </button>
            <button className="btn btn-secondary" onClick={handleUndo} disabled={busy || !lastLogPath}>
              Undo
            </button>
          </div>
        </div>
      </div>

      {/* ── Preview Modal ── */}
      {showPreviewModal && (
        <div className="ren-modal-overlay" onClick={() => setShowPreviewModal(false)}>
          <div className="ren-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ren-modal-header">
              <h3>Rename Preview</h3>
              <button className="ren-modal-close" onClick={() => setShowPreviewModal(false)}>&times;</button>
            </div>
            <div className="ren-modal-body">
              <table className="ren-preview-table ren-preview-table-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Current Name</th>
                    <th></th>
                    <th>Output Path</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {renamePlan.map((item, i) => (
                    <tr key={i} className={`ren-plan-${item.status || "rename"}`}>
                      <td>{i + 1}</td>
                      <td>{item.category}</td>
                      <td>{item.oldName}</td>
                      <td className="ren-arrow">&rarr;</td>
                      <td>{planOutput(item)}</td>
                      <td>
                        <span className={`ren-status-badge ren-status-${item.status || "rename"}`}>{item.status || "rename"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ren-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowPreviewModal(false)}>Close</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowPreviewModal(false);
                  handleApply();
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Inline CSS ── */

const CSS = `
/* ── Root ── */
.ren-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  font-size: 13px;
  color: var(--text-primary);
}

/* ── Top bar ── */
.ren-topbar {
  padding: 10px 16px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.ren-topbar-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.ren-folder-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.ren-path-input {
  width: 280px;
  height: 32px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0 10px;
  color: var(--text-secondary);
  font-size: 12px;
  font-family: inherit;
  outline: none;
}

.ren-stat-group {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.ren-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 11px;
  color: var(--text-secondary);
}

.ren-stat strong {
  font-size: 14px;
  color: var(--text-primary);
}

.ren-stat-input {
  height: 28px;
  width: 120px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0 8px;
  color: var(--text-primary);
  font-size: 12px;
  font-family: inherit;
  outline: none;
}

.ren-stat-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
}

.ren-product-stat {
  min-width: 160px;
  gap: 3px;
}

.ren-product-input {
  width: 160px;
}

.ren-product-continuous {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 14px;
  color: var(--text-muted);
  font-size: 10px;
  line-height: 1;
  white-space: nowrap;
}

.ren-product-continuous input {
  width: 11px;
  height: 11px;
  margin: 0;
  accent-color: var(--accent);
}

.ren-product-continuous input:disabled + span {
  opacity: 0.55;
}

.ren-ean-badge {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}

.ren-ean-badge.valid {
  background: rgba(74, 222, 128, 0.15);
  color: var(--green);
}

.ren-ean-badge.warn {
  background: rgba(250, 204, 21, 0.15);
  color: var(--yellow);
}

/* ── Settings ── */
.ren-settings-wrap {
  position: relative;
}

.ren-gear {
  font-size: 16px;
  line-height: 1;
}

.ren-settings-popover {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 6px;
  width: 240px;
  background: var(--bg-modal);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  box-shadow: var(--shadow-lg);
  z-index: 30;
}

.ren-settings-popover h4 {
  font-size: 13px;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.ren-setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--text-secondary);
}

.ren-setting-row select {
  height: 28px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 12px;
  padding: 0 6px;
  outline: none;
}

.ren-setting-row select:focus {
  border-color: var(--accent);
}

/* ── Output bar ── */
.ren-output-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.ren-output-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
}

.ren-output-fields {
  display: flex;
  gap: 6px;
  flex: 1;
  overflow-x: auto;
}

.ren-output-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 150px;
  flex: 1;
  padding: 6px 10px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  position: relative;
  transition: border-color 0.15s;
}

.ren-output-field:hover {
  border-color: var(--accent);
}

.ren-output-cat {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
}

.ren-output-path {
  font-size: 11px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.ren-output-clear {
  position: absolute;
  top: 4px;
  right: 6px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 0;
}

.ren-output-clear:hover {
  color: var(--red);
}

/* ── Kanban board ── */
.ren-board {
  flex: 1;
  display: flex;
  gap: 10px;
  padding: 12px 16px;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 0;
}

.ren-column {
  min-width: 220px;
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.ren-column-drop {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
}

.ren-col-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.ren-col-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: default;
}

.ren-col-count {
  font-size: 11px;
  font-weight: 600;
  background: var(--bg-card);
  color: var(--text-secondary);
  padding: 1px 7px;
  border-radius: 10px;
}

.ren-col-menu {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0 2px;
  opacity: 0;
  transition: opacity 0.15s;
}

.ren-col-header:hover .ren-col-menu {
  opacity: 1;
}

.ren-col-menu:hover {
  color: var(--red);
}

.ren-priority-toggle {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.ren-priority-toggle input {
  width: 12px;
  height: 12px;
  margin: 0;
  cursor: pointer;
  accent-color: var(--amber, #f59e0b);
}

.ren-priority-toggle input:checked + span {
  color: var(--amber, #f59e0b);
}

.ren-priority-btn {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: var(--border-light);
  padding: 0 2px;
  line-height: 1;
  transition: color 0.15s;
  flex-shrink: 0;
}

.ren-priority-btn:hover {
  color: var(--amber, #f59e0b);
}

.ren-priority-active {
  color: var(--amber, #f59e0b) !important;
}

.ren-card-priority {
  border-color: var(--amber, #f59e0b);
  box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.25);
}

.ren-col-body {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ren-col-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 12px;
  min-height: 60px;
}

/* ── Card ── */
.ren-duplicate-body {
  gap: 10px;
}

.ren-duplicate-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.02);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.ren-duplicate-drop {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
}

.ren-duplicate-header {
  display: flex;
  align-items: center;
  gap: 6px;
}

.ren-duplicate-header .ren-priority-toggle {
  flex-shrink: 0;
}

.ren-duplicate-add {
  height: 30px;
  padding: 0 10px;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}

.ren-duplicate-add:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.ren-duplicate-type {
  height: 30px;
  width: 100%;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  outline: none;
}

.ren-duplicate-type:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
}

.ren-duplicate-images {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 34px;
}

.ren-duplicate-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.08);
}

.ren-duplicate-group-head {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 24px;
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 700;
}

.ren-duplicate-group-head > span:first-child {
  flex: 1;
}

.ren-duplicate-remove {
  width: 22px;
  height: 22px;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  line-height: 1;
}

.ren-duplicate-remove:hover {
  color: var(--red);
  border-color: var(--red);
}

.ren-duplicate-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  border: 1px dashed var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  font-size: 11px;
}

.ren-card {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: grab;
  transition: border-color 0.15s, opacity 0.15s, box-shadow 0.15s;
}

.ren-card:hover {
  background: var(--bg-card-hover);
}

.ren-hover-preview {
  position: fixed;
  z-index: 1000;
  width: 320px;
  pointer-events: none;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
  padding: 8px;
  animation: renHoverIn 0.12s ease;
}

.ren-hover-image-wrap {
  width: 100%;
  height: 360px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-input);
  border: 1px solid var(--border);
}

.ren-hover-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.ren-hover-name {
  margin-top: 8px;
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.ren-hover-meta {
  margin-top: 4px;
  color: var(--text-muted);
  font-size: 11px;
}

@keyframes renHoverIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.ren-card-selected {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent-soft);
}

.ren-card-dragging {
  opacity: 0.4;
}

.ren-card-check {
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: var(--accent);
}

.ren-card-thumb {
  width: 64px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background: var(--bg-input);
}

.ren-card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ren-card-meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ren-card-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ren-card-info {
  font-size: 10px;
  color: var(--text-muted);
}

.ren-card-chips {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 2px;
}

.ren-chip {
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  background: var(--bg-input);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.ren-chip-renamed {
  background: rgba(74, 222, 128, 0.15);
  color: var(--green);
}

.ren-card-grip {
  color: var(--text-muted);
  font-size: 12px;
  flex-shrink: 0;
  cursor: grab;
  opacity: 0;
  transition: opacity 0.15s;
}

.ren-card:hover .ren-card-grip {
  opacity: 1;
}

.ren-add-col {
  min-width: 44px;
  width: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px dashed var(--border-light);
  border-radius: var(--radius);
  color: var(--text-muted);
  font-size: 22px;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.ren-add-col:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* ── Drag ghost ── */
.ren-drag-ghost {
  position: fixed;
  top: -100px;
  left: -100px;
  padding: 4px 12px;
  background: var(--accent);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  pointer-events: none;
  z-index: 9999;
}

/* ── Footer ── */
.ren-footer {
  flex-shrink: 0;
  border-top: 1px solid var(--border);
  background: var(--bg-card);
}

.ren-resize-handle {
  height: 5px;
  cursor: ns-resize;
  background: transparent;
  position: relative;
}

.ren-resize-handle::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 3px;
  border-radius: 2px;
  background: var(--border-light);
  transition: background 0.15s;
}

.ren-resize-handle:hover::after {
  background: var(--accent);
}

.ren-preview-panel {
  display: flex;
  gap: 12px;
  padding: 0 16px 8px;
  overflow: hidden;
}

.ren-preview-table-wrap {
  flex: 1;
  overflow: auto;
}

.ren-preview-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.ren-preview-table th {
  text-align: left;
  padding: 6px 8px;
  font-weight: 600;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--bg-card);
}

.ren-preview-table td {
  padding: 4px 8px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}

.ren-arrow {
  text-align: center;
  color: var(--text-muted);
  width: 30px;
}

.ren-table-empty {
  text-align: center;
  color: var(--text-muted);
  padding: 20px 8px !important;
}

.ren-plan-rename td { color: var(--text-primary); }
.ren-plan-conflict td { color: var(--red); }
.ren-plan-skip td { color: var(--text-muted); }

.ren-summary-card {
  width: 160px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
}

.ren-summary-item {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.ren-summary-item strong {
  font-size: 18px;
  color: var(--text-primary);
}

.ren-summary-item span {
  font-size: 11px;
  color: var(--text-secondary);
}

.ren-summary-green strong {
  color: var(--green);
}

.ren-summary-amber strong {
  color: var(--yellow);
}

.ren-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-top: 1px solid var(--border);
}

.ren-actions-right {
  display: flex;
  gap: 8px;
}

/* ── Preview modal ── */
.ren-modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.ren-modal {
  background: var(--bg-modal);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  width: 90vw;
  max-width: 900px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
}

.ren-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

.ren-modal-header h3 {
  font-size: 15px;
  font-weight: 600;
}

.ren-modal-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 20px;
  cursor: pointer;
  padding: 0;
}

.ren-modal-close:hover {
  color: var(--text-primary);
}

.ren-modal-body {
  flex: 1;
  overflow: auto;
  padding: 0;
}

.ren-preview-table-full {
  font-size: 12px;
}

.ren-preview-table-full th,
.ren-preview-table-full td {
  padding: 8px 12px;
}

.ren-status-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.ren-status-rename {
  background: rgba(74, 222, 128, 0.15);
  color: var(--green);
}

.ren-status-conflict {
  background: rgba(239, 68, 68, 0.15);
  color: var(--red);
}

.ren-status-skip {
  background: var(--bg-input);
  color: var(--text-muted);
}

.ren-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 20px;
  border-top: 1px solid var(--border);
}
`;
