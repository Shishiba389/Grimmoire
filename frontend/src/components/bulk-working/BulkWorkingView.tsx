import { useState, useRef, useEffect, useMemo } from "react";
import { apiJson, pickFolder } from "../ToolShared";
import { useNotifications } from "../../contexts/NotificationContext";
import type {
  BulkWorkItem, BulkScanResult,
  BulkMatchResponse, BulkMappingEntry,
  MasterDataUploadResponse, ImageMatchItem, ImageMatchResponse,
  RenImage, FolderResult, KanbanColumn, DuplicateBuckets,
  SettingsState, RenamePlanItem, NamingMode,
  RenameResult,
  ClipProgress, ClipResult, ClipImageClassification,
  HoverPreviewState,
} from "../ean-renamer/types";
import {
  DEFAULT_COLUMNS, EMPTY_DUPLICATE_BUCKETS,
  thumbnailUrl, CLIP_CATEGORY_TO_COLUMN, columnCategoryKey,
} from "../ean-renamer/types";
import { ImageCard, OutputBar, HoverPreview, PreviewPanel, ClipOverlay } from "../ean-renamer";
import "../ean-renamer/shared.css";
import "./bulk-working.css";

function extractEanCandidate(text: string): string {
  const m = text.match(/(?<!\d)(\d{13}|\d{8})(?!\d)/);
  return m ? m[1] : "";
}

function applyMappings(items: BulkWorkItem[], entries: BulkMappingEntry[]): BulkWorkItem[] {
  const byEan = new Map<string, BulkMappingEntry>();
  const byName = new Map<string, BulkMappingEntry>();
  for (const e of entries) {
    if (e.ean) byEan.set(e.ean, e);
    if (e.source) byName.set(e.source.toLowerCase(), e);
  }
  return items.map((item) => {
    if (item.matchSource === "manual") return item;
    const mapped = byEan.get(item.ean) || byName.get(item.name.toLowerCase());
    if (!mapped) return item;
    return {
      ...item,
      ean: mapped.ean || item.ean,
      productName: mapped.productName || item.productName,
      matchSource: "file" as const,
    };
  });
}

function normalizeNamingMode(mode: NamingMode): string {
  if (mode === "per-category") return "per_category";
  if (mode === "custom-name") return "custom_name";
  return mode;
}

function normalizeOutputMode(mode: SettingsState["outputMode"]): string {
  return mode === "in-folder" ? "rename" : "copy";
}

const BULK_COLUMNS_STORAGE_KEY = "grimoire:bulk-working:columns:v1";
const DEFAULT_COLUMN_KEYS = new Set(DEFAULT_COLUMNS.map((column) => column.key));

function createWorkspaceColumns(template = DEFAULT_COLUMNS): KanbanColumn[] {
  return template.map((column) => ({ ...column, imageIds: [] }));
}

function loadWorkspaceColumns(): KanbanColumn[] {
  try {
    const raw = window.localStorage.getItem(BULK_COLUMNS_STORAGE_KEY);
    if (!raw) return createWorkspaceColumns();
    const saved = JSON.parse(raw) as Array<Pick<KanbanColumn, "key" | "title" | "fixed">>;
    if (!Array.isArray(saved)) return createWorkspaceColumns();

    const validCustom = saved.filter((column) =>
      column
      && typeof column.key === "string"
      && typeof column.title === "string"
      && !DEFAULT_COLUMN_KEYS.has(column.key)
      && /^[a-z0-9-]+$/.test(column.key),
    );
    return [...createWorkspaceColumns(), ...validCustom.map((column) => ({ ...column, imageIds: [] }))];
  } catch {
    return createWorkspaceColumns();
  }
}

function isDocument(image: RenImage): boolean {
  return image.extension.toLowerCase() === ".pdf";
}

export function BulkWorkingView() {
  const { notify } = useNotifications();


  /* ── Box list state ── */
  const [rootPath, setRootPath] = useState("");
  const [items, setItems] = useState<BulkWorkItem[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [queueQuery, setQueueQuery] = useState("");
  const [queueStatus, setQueueStatus] = useState<"all" | BulkWorkItem["status"]>("all");

  /* ── Master data ── */
  const [masterSessionId, setMasterSessionId] = useState("");
  const [masterRowCount, setMasterRowCount] = useState(0);
  const mappingInputRef = useRef<HTMLInputElement>(null);
  const masterInputRef = useRef<HTMLInputElement>(null);

  /* ── Global settings ── */
  const [globalNamingMode, setGlobalNamingMode] = useState<NamingMode>("per-category");

  /* ── Active box workspace state ── */
  const [folderPath, setFolderPath] = useState("");
  const [images, setImages] = useState<RenImage[]>([]);
  const [columns, setColumns] = useState<KanbanColumn[]>(loadWorkspaceColumns);
  const [columnManagerOpen, setColumnManagerOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [moveTarget, setMoveTarget] = useState("unsorted");
  const [duplicateBuckets, setDuplicateBuckets] = useState<DuplicateBuckets>({ ...EMPTY_DUPLICATE_BUCKETS });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [outputFolders, setOutputFolders] = useState<Record<string, string>>({});
  const [priorityFirst, setPriorityFirst] = useState<Record<string, Set<string>>>({});
  const [customEan, setCustomEan] = useState("");
  const [productName, setProductName] = useState("");
  const [includeCategoryInProductName, setIncludeCategoryInProductName] = useState(false);
  const [settings, setSettings] = useState<SettingsState>({ outputMode: "copy", namingMode: "per-category" });
  const [renamePlan, setRenamePlan] = useState<RenamePlanItem[]>([]);
  const [hoverPreview, setHoverPreview] = useState<HoverPreviewState>(null);
  const [previewHeight, setPreviewHeight] = useState(220);
  const resizeRef = useRef<HTMLDivElement>(null);
  const [dragIds, setDragIds] = useState<string[]>([]);
  const [dragSourceKey, setDragSourceKey] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);

  /* ── CLIP ── */
  const [clipBusy, setClipBusy] = useState(false);
  const [clipProgress, setClipProgress] = useState<ClipProgress | null>(null);
  const [clipClassifications, setClipClassifications] = useState<Map<string, ClipImageClassification>>(new Map());
  const clipPollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Image matching ── */
  const [imageMatches, setImageMatches] = useState<Map<string, ImageMatchItem>>(new Map());

  const activeItem = activeKey ? items.find((i) => i.key === activeKey) || null : null;

  const workflowColumns = columns.filter((c) => c.key !== "unsorted" && c.key !== "duplicate");

  const queueItems = useMemo(() => {
    const query = queueQuery.trim().toLowerCase();
    return items.filter((item) => {
      if (queueStatus !== "all" && item.status !== queueStatus) return false;
      return !query || [item.name, item.ean, item.productName, item.relativePath].some((value) => value.toLowerCase().includes(query));
    });
  }, [items, queueQuery, queueStatus]);

  const clipEligibleCount = images.filter((image) => !isDocument(image)).length;

  const planStats = (() => {
    let renamed = 0, skipped = 0, conflicts = 0;
    renamePlan.forEach((item) => {
      const status = item.status || "rename";
      if (status === "rename") renamed++;
      else if (status === "skip") skipped++;
      else conflicts++;
    });
    return { renamed, skipped, conflicts };
  })();

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

  useEffect(() => {
    const persisted = columns.map(({ key, title, fixed }) => ({ key, title, fixed }));
    window.localStorage.setItem(BULK_COLUMNS_STORAGE_KEY, JSON.stringify(persisted));
  }, [columns]);

  /* ── CLIP warm-up ── */
  useEffect(() => {
    apiJson("/api/ean-renamer/clip/warm-up", { method: "POST" }).catch(() => {});
    return () => { if (clipPollRef.current) clearInterval(clipPollRef.current); };
  }, []);

  /* ── Folder operations ── */
  async function handlePickRoot() {
    const picked = await pickFolder("Select root folder for Bulk Working", rootPath);
    if (picked) void loadBulkFolder(picked);
  }

  async function loadBulkFolder(path: string) {
    setBusy(true);
    try {
      const result = await apiJson<BulkScanResult>("/api/ean-renamer/folder/bulk-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderPath: path }),
      });
      setRootPath(result.folderPath);

      setActiveKey(null);
      const newItems: BulkWorkItem[] = result.folders.map((item) => {
        const ean = extractEanCandidate(`${item.name} ${item.relativePath}`);
        return {
          ...item,
          ean,
          productName: "",
          matchSource: (ean ? "folder" : "missing") as BulkWorkItem["matchSource"],
          matchTier: null,
          matchConfidence: null,
          status: "pending" as const,
        };
      });
      setItems(newItems);
      if (masterSessionId) void rematchItems(newItems, masterSessionId);
      notify("Bulk scan complete", { type: "success", message: `${result.totalFolders} folders, ${result.totalImages} images` });
    } catch (e) {
      notify("Bulk scan failed", { type: "error", message: e instanceof Error ? e.message : String(e) });
    } finally {
      setBusy(false);
    }
  }

  function updateItem(key: string, patch: Partial<BulkWorkItem>) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.key !== key) return item;
        const isManual = patch.matchSource === "manual" || (!patch.matchSource && (patch.ean || patch.productName));
        return {
          ...item,
          ...patch,
          matchSource: patch.matchSource || (isManual ? "manual" : item.matchSource),
          matchTier: isManual ? null : item.matchTier,
          matchConfidence: isManual ? null : item.matchConfidence,
        };
      }),
    );
  }

  /* ── Master data ── */
  async function handleMasterPick() {
    if (!window.__grimoire?.pickFile) {
      masterInputRef.current?.click();
      return;
    }
    const picked = await window.__grimoire.pickFile(
      "Select master data file",
      "Excel workbooks (*.xlsx;*.xls)|*.xlsx;*.xls|CSV (*.csv)|*.csv|All files (*.*)|*.*",
    );
    if (!picked) return;
    try {
      const res = await apiJson<MasterDataUploadResponse>("/api/ean-renamer/master-data/upload-path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: picked }),
      });
      setMasterSessionId(res.session_id);
      setMasterRowCount(res.row_count);
      // columns_detected available: res.columns_detected

      notify(`Master data loaded: ${res.row_count} rows`, { type: "success" });
      if (items.length > 0) await rematchItems(items, res.session_id);
    } catch (e) {
      notify("Master data upload failed", { type: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }

  async function handleMasterUpload(file: File | undefined) {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await apiJson<MasterDataUploadResponse>("/api/ean-renamer/master-data/upload", {
        method: "POST",
        body: form,
      });
      setMasterSessionId(res.session_id);
      setMasterRowCount(res.row_count);
      // columns_detected available: res.columns_detected

      notify(`Master data loaded: ${res.row_count} rows`, { type: "success" });
      if (items.length > 0) await rematchItems(items, res.session_id);
    } catch (e) {
      notify("Master data upload failed", { type: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }

  async function handleImportLegacy(file: File | undefined) {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    try {
      const result = await apiJson<{ entries: BulkMappingEntry[]; warnings: string[] }>("/api/ean-renamer/bulk/import-map", {
        method: "POST",
        body: form,
      });
      setItems((prev) => applyMappings(prev, result.entries));
      notify("Mapping imported", { type: result.entries.length ? "success" : "warning", message: `${result.entries.length} rows` });
    } catch (e) {
      notify("Import failed", { type: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }

  async function rematchItems(list: BulkWorkItem[], sessionId: string) {
    try {
      const res = await apiJson<BulkMatchResponse>("/api/ean-renamer/bulk/match-master", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          folders: list.map((item) => ({
            key: item.key,
            name: item.name,
            relativePath: item.relativePath,
            sampleImageNames: (item.images.length > 0 ? item.images : item.sampleImages).slice(0, 5).map((img) => img.name),
          })),
        }),
      });
      // summary available: res.summary
      const resultMap = new Map(res.results.map((r) => [r.key, r]));
      setItems((prev) =>
        prev.map((item) => {
          if (item.matchSource === "manual") return item;
          const match = resultMap.get(item.key);
          if (!match || match.status === "unmatched") return item;
          const idx = match.selected_index ?? 0;
          const best = match.candidates[idx];
          if (!best) return item;
          return {
            ...item,
            ean: best.ean || item.ean,
            productName: best.product_name || item.productName,
            matchSource: "master" as const,
            matchTier: best.tier,
            matchConfidence: best.confidence,
          };
        }),
      );
    } catch (e) {
      notify("Match failed", { type: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }

  /* ── Activate box ── */
  async function activateBox(item: BulkWorkItem) {
    setActiveKey(item.key);
    setItems((prev) =>
      prev.map((entry) =>
        entry.key === item.key
          ? { ...entry, status: "active" }
          : entry.status === "active" ? { ...entry, status: "pending" } : entry,
      ),
    );
    setBusy(true);
    try {
      const result = await apiJson<FolderResult>("/api/ean-renamer/folder/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderPath: item.folderPath }),
      });
      setFolderPath(result.folderPath);
      setImages(result.images);
      setSelected(new Set());
      setRenamePlan([]);
      setDuplicateBuckets({ ...EMPTY_DUPLICATE_BUCKETS });
      setPriorityFirst({});
      setImageMatches(new Map());
      setClipClassifications(new Map());
      setClipProgress(null);
      const documentIds = result.images.filter(isDocument).map((image) => image.id);
      const remainingIds = result.images.filter((image) => !isDocument(image)).map((image) => image.id);
      setColumns(createWorkspaceColumns().map((column) => {
        if (column.key === "artwork") return { ...column, imageIds: documentIds };
        if (column.key === "unsorted") return { ...column, imageIds: remainingIds };
        return column;
      }));
      setCustomEan(item.ean.trim());
      setProductName(item.productName.trim());
      setSettings((s) => ({ ...s, namingMode: globalNamingMode }));

      if (masterSessionId && result.images.length > 0) {
        const res = await apiJson<ImageMatchResponse>("/api/ean-renamer/match-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: masterSessionId, image_names: result.images.map((i) => i.name) }),
        });
        const map = new Map<string, ImageMatchItem>();
        for (let i = 0; i < result.images.length; i++) {
          const match = res.matches[i];
          if (match && match.status !== "unmatched") map.set(result.images[i].id, match);
        }
        setImageMatches(map);
      }

      void startClipClassification(result.folderPath, result.images);
    } catch (e) {
      notify("Failed to load folder", { type: "error", message: e instanceof Error ? e.message : String(e) });
    } finally {
      setBusy(false);
    }
  }

  function markDone() {
    if (!activeKey) return;
    setItems((prev) =>
      prev.map((item) =>
        item.key === activeKey
          ? { ...item, ean: customEan.trim() || item.ean, productName: productName.trim() || item.productName, status: "done" }
          : item,
      ),
    );
    openNext();
  }

  function skipItem(key: string) {
    setItems((prev) => prev.map((item) => (item.key === key ? { ...item, status: "skipped" } : item)));
    if (activeKey === key) openNext();
  }

  function openNext() {
    const idx = activeKey ? items.findIndex((i) => i.key === activeKey) : -1;
    const ordered = [...items.slice(idx + 1), ...items.slice(0, Math.max(0, idx + 1))];
    const next = ordered.find((i) => i.key !== activeKey && i.status !== "done" && i.status !== "skipped");
    if (next) void activateBox(next);
    else {
      setActiveKey(null);
      notify("All boxes complete", { type: "success" });
    }
  }

  /* ── CLIP ── */
  function stopClipPolling() {
    if (clipPollRef.current) { clearInterval(clipPollRef.current); clipPollRef.current = null; }
  }

  async function startClipClassification(targetPath: string, targetImages: RenImage[]) {
    if (!targetPath || targetImages.filter((image) => !isDocument(image)).length === 0 || clipBusy) return;
    setClipBusy(true);
    setClipProgress(null);
    setClipClassifications(new Map());
    try {
      const res = await apiJson<{ job_id: string }>("/api/ean-renamer/clip/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder_path: targetPath }),
      });
      clipPollRef.current = setInterval(async () => {
        try {
          const prog = await apiJson<ClipProgress>(`/api/ean-renamer/clip/classify/${res.job_id}/progress`);
          setClipProgress(prog);
          if (prog.phase === "done" || prog.phase === "error" || prog.phase === "cancelled") {
            stopClipPolling();
            if (prog.phase === "done") {
              const resultRes = await apiJson<{ result: ClipResult | null }>(`/api/ean-renamer/clip/classify/${res.job_id}/result`);
              if (resultRes.result) applyClipResults(resultRes.result, targetImages);
            }
            setClipBusy(false);
          }
        } catch { stopClipPolling(); setClipBusy(false); }
      }, 2000);
    } catch {
      setClipBusy(false);
    }
  }

  function applyClipResults(result: ClipResult, targetImages: RenImage[]) {
    const newMap = new Map<string, ClipImageClassification>();
    for (const c of result.classifications) newMap.set(c.image_id, c);
    setClipClassifications(newMap);

    setColumns((prev) => {
      const fresh = prev.map((col) => ({ ...col, imageIds: [] as string[] }));
      for (const img of targetImages) {
        const cls = newMap.get(img.id);
        const colKey = isDocument(img)
          ? "artwork"
          : cls ? (CLIP_CATEGORY_TO_COLUMN[cls.main_category] || "unsorted") : "unsorted";
        const col = fresh.find((c) => c.key === colKey) || fresh[0];
        col.imageIds.push(img.id);
      }
      return fresh;
    });
  }

  /* ── Drag & drop ── */
  function handleDragStart(e: React.DragEvent, imageId: string, sourceKey: string) {
    const ids = selected.has(imageId) ? [...selected] : [imageId];
    setDragIds(ids);
    setDragSourceKey(sourceKey);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDrop(e: React.DragEvent, targetColKey: string) {
    e.preventDefault();
    setDropTarget(null);
    if (dragIds.length === 0 || !dragSourceKey || dragSourceKey === targetColKey) return;
    setColumns((prev) =>
      prev.map((col) => {
        if (col.key === dragSourceKey) return { ...col, imageIds: col.imageIds.filter((id) => !dragIds.includes(id)) };
        if (col.key === targetColKey) return { ...col, imageIds: [...col.imageIds, ...dragIds.filter((id) => !col.imageIds.includes(id))] };
        return col;
      }),
    );
    setSelected(new Set());
    setDragIds([]);
    setDragSourceKey(null);
  }

  /* ── Column management ── */
  function handleAddColumn(e: React.FormEvent) {
    e.preventDefault();
    const name = newColumnName.trim();
    if (!name) return;
    const key = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    if (!key) {
      notify("Use letters or numbers for the category name", { type: "warning" });
      return;
    }
    if (columns.some((c) => c.key === key)) {
      notify("Column already exists", { type: "warning" });
      return;
    }
    setColumns((prev) => [...prev, { key, title: name, imageIds: [] }]);
    setNewColumnName("");
  }

  function removeCustomColumn(key: string) {
    if (DEFAULT_COLUMN_KEYS.has(key)) return;
    setColumns((prev) => {
      const removed = prev.find((column) => column.key === key);
      const movedIds = removed?.imageIds || [];
      return prev
        .filter((column) => column.key !== key)
        .map((column) => column.key === "unsorted"
          ? { ...column, imageIds: [...column.imageIds, ...movedIds.filter((id) => !column.imageIds.includes(id))] }
          : column);
    });
    setOutputFolders((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    if (moveTarget === key) setMoveTarget("unsorted");
  }

  function moveSelectedTo(targetKey: string) {
    if (selected.size === 0) return;
    const ids = [...selected];
    setColumns((prev) => prev.map((column) => {
      const withoutMoved = column.imageIds.filter((id) => !ids.includes(id));
      return column.key === targetKey
        ? { ...column, imageIds: [...withoutMoved, ...ids.filter((id) => !withoutMoved.includes(id))] }
        : { ...column, imageIds: withoutMoved };
    }));
    setSelected(new Set());
  }

  /* ── Output ── */
  async function handlePickOutput(category: string) {
    const initial = outputFolders[category] || folderPath;
    const picked = await pickFolder("Select output folder", initial);
    if (picked) setOutputFolders((prev) => ({ ...prev, [category]: picked }));
  }

  /* ── Preview / Apply ── */
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
      setRenamePlan(result.items);
      const action = settings.outputMode === "copy" ? "Copy" : "Rename";
      notify(`${action} complete`, { type: "success", message: `${result.items.length} images processed` });
      markDone();
    } catch (e) {
      notify("Apply failed", { type: "error", message: e instanceof Error ? e.message : String(e) });
    } finally {
      setBusy(false);
    }
  }

  function buildBody() {
    const assignments: Array<{ id: string; category: string; categoryName: string }> = [];
    const categoryOrder: string[] = [];
    const priorityIds = new Set<string>();
    const duplicateGroups: Array<{ ids: string[]; first: boolean }> = [];
    const outputFolderPaths: Record<string, string> = {};

    columns.forEach((column) => {
      if (column.key === "unsorted" || column.key === "duplicate") return;
      const category = columnCategoryKey(column.key);
      categoryOrder.push(category);
      column.imageIds.forEach((id) => {
        assignments.push({ id, category, categoryName: column.title });
      });

      (duplicateBuckets[column.key] || []).forEach((group) => {
        duplicateGroups.push({ ids: [...group.imageIds], first: group.first });
        group.imageIds.forEach((id) => {
          assignments.push({ id, category, categoryName: column.title });
          if (group.first) priorityIds.add(id);
        });
      });
    });

    Object.values(priorityFirst).forEach((ids) => {
      ids.forEach((id) => priorityIds.add(id));
    });

    Object.entries(outputFolders).forEach(([category, path]) => {
      if (path) outputFolderPaths[columnCategoryKey(category)] = path;
    });

    return {
      folderPath,
      customEan: customEan.trim() || undefined,
      productName: productName.trim() || undefined,
      productNameContinuous: !!productName.trim(),
      productNameWithCategory: includeCategoryInProductName && !!customEan.trim() && !!productName.trim(),
      namingMode: normalizeNamingMode(settings.namingMode),
      outputMode: normalizeOutputMode(settings.outputMode),
      categoryOrder,
      assignments,
      priorityIds: priorityIds.size > 0 ? [...priorityIds] : undefined,
      duplicateGroups,
      outputFolderPaths,
    };
  }

  /* ── Card click ── */
  function handleCardClick(e: React.MouseEvent, id: string) {
    if (e.button !== 0) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (e.ctrlKey || e.metaKey) {
        if (next.has(id)) next.delete(id);
        else next.add(id);
      } else {
        next.clear();
        next.add(id);
      }
      return next;
    });
  }

  /* ── Derived ── */
  const readyCount = items.filter((i) => i.ean.trim()).length;
  const doneCount = items.filter((i) => i.status === "done").length;
  const missingCount = items.length - readyCount;
  const imageMap = new Map(images.map((img) => [img.id, img]));

  return (
    <div className="view tool-view blk-shell">
      {/* ── Left: Box list ── */}
      <div className="blk-sidebar">
        <div className="blk-toolbar">
          <div className="blk-toolbar-row">
            <button className="btn btn-secondary btn-sm" onClick={handlePickRoot} disabled={busy}>Choose folder</button>
            <button className="btn btn-secondary btn-sm" onClick={() => rootPath && loadBulkFolder(rootPath)} disabled={!rootPath || busy}>Rescan</button>
            <button className="btn btn-primary btn-sm" onClick={handleMasterPick} disabled={busy}>
              {masterSessionId ? `Master (${masterRowCount})` : "Master Data"}
            </button>
          </div>
          <div className="blk-toolbar-row">
            <input ref={mappingInputRef} type="file" hidden accept=".txt,.csv,.tsv,.xlsx,.xls" onChange={(e) => void handleImportLegacy(e.currentTarget.files?.[0])} />
            <input ref={masterInputRef} type="file" hidden accept=".xlsx,.xls,.csv" onChange={(e) => void handleMasterUpload(e.currentTarget.files?.[0])} />
            <button className="btn btn-secondary btn-sm" onClick={() => mappingInputRef.current?.click()}>Import Map</button>
            <label style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
              Naming:
              <select
                value={globalNamingMode}
                onChange={(e) => setGlobalNamingMode(e.target.value as NamingMode)}
                style={{ fontSize: 11, padding: "2px 4px" }}
              >
                <option value="per-category">Per Category</option>
                <option value="continuous">Continuous</option>
                <option value="prefixed">Prefixed</option>
                <option value="custom-name">Custom Name</option>
              </select>
            </label>
          </div>
          <div className="blk-stats">
            <div><span>Folders</span><strong>{items.length}</strong></div>
            <div><span>Ready</span><strong style={{ color: "var(--accent)" }}>{readyCount}</strong></div>
            <div><span>Missing</span><strong style={{ color: missingCount ? "#f59e0b" : undefined }}>{missingCount}</strong></div>
            <div><span>Done</span><strong>{doneCount}</strong></div>
          </div>
        </div>

        {items.length > 0 && (
          <div className="blk-queue-controls" aria-label="Filter folders">
            <input
              value={queueQuery}
              onChange={(event) => setQueueQuery(event.target.value)}
              placeholder="Find folder, EAN, or name"
              aria-label="Find a folder"
            />
            <select value={queueStatus} onChange={(event) => setQueueStatus(event.target.value as typeof queueStatus)} aria-label="Filter by status">
              <option value="all">All status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="done">Done</option>
              <option value="skipped">Skipped</option>
            </select>
            <span>{queueItems.length} shown</span>
          </div>
        )}

        <div className="blk-list">
          {items.length === 0 && (
            <div style={{ textAlign: "center", padding: 32, color: "var(--text-secondary)" }}>
              <strong>Select a root folder to start</strong>
            </div>
          )}
          {items.length > 0 && queueItems.length === 0 && (
            <div className="blk-queue-empty">No folders match this filter.</div>
          )}
          {queueItems.map((item) => (
            <div
              key={item.key}
              className={`blk-card ${item.status}${activeKey === item.key ? " active" : ""}`}
              onClick={() => void activateBox(item)}
            >
              <div className="blk-card-head">
                <div>
                  <strong title={item.folderPath}>{item.name}</strong>
                  <small>{item.imageCount} files{item.documentCount ? ` · ${item.documentCount} PDF` : ""}</small>
                </div>
                <span className={`blk-badge ${item.status}`}>{item.status}</span>
              </div>
              <div className="blk-card-thumbs">
                {item.sampleImages.slice(0, 4).map((img) => (
                  <img key={img.id} src={thumbnailUrl(img.id, rootPath)} alt="" loading="lazy" draggable={false} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ))}
              </div>
              <div className="blk-card-fields">
                <label onClick={(e) => e.stopPropagation()}>
                  EAN
                  <input
                    value={item.ean}
                    onChange={(e) => updateItem(item.key, { ean: e.target.value, matchSource: "manual" })}
                    placeholder="Enter EAN"
                  />
                </label>
                <label onClick={(e) => e.stopPropagation()}>
                  Name
                  <input
                    value={item.productName}
                    onChange={(e) => updateItem(item.key, { productName: e.target.value, matchSource: "manual" })}
                    placeholder="Product name"
                  />
                </label>
              </div>
              <div className="blk-card-actions" onClick={(e) => e.stopPropagation()}>
                <button className="btn btn-primary btn-sm" onClick={() => void activateBox(item)}>Open</button>
                <button className="btn btn-secondary btn-sm" onClick={() => skipItem(item.key)} disabled={item.status === "done"}>Skip</button>
              </div>
              {item.matchTier && (
                <span className={`ren-tier-badge ren-tier-${item.matchTier}`} style={{ fontSize: 10, marginTop: 4, display: "inline-block" }}>
                  {item.matchTier.toUpperCase()} {item.matchConfidence != null ? `${Math.round(item.matchConfidence * 100)}%` : ""}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Workspace ── */}
      <div className="blk-workspace">
        {!activeItem ? (
          <div className="blk-workspace-empty">
            {items.length > 0 ? "Select a box from the list to start working" : "Choose a folder to begin"}
          </div>
        ) : (
          <>
            {/* ── Header row 1: title + status + actions ── */}
            <div className="blk-ws-header">
              <div className="blk-ws-row1">
                <span className="blk-ws-title" title={activeItem.folderPath}>{activeItem.name}</span>
                <div className="blk-ws-meta">
                  <span className="blk-ws-meta-item">{images.length} files{activeItem.documentCount ? ` · ${activeItem.documentCount} PDF` : ""}</span>
                  {clipClassifications.size > 0 && !clipBusy && (
                    <span className="blk-ws-clip-badge done">
                      <span className="blk-clip-dot" />
                      AI classified {clipClassifications.size}/{clipEligibleCount}
                    </span>
                  )}
                  {clipBusy && clipProgress && (
                    <span className="blk-ws-clip-badge running">
                      <span className="blk-clip-dot" />
                      {clipProgress.phase === "classifying"
                        ? `Classifying ${clipProgress.processed}/${clipProgress.total}`
                        : clipProgress.phase === "loading_model" ? "Loading model…"
                        : clipProgress.phase === "scanning" ? "Scanning…"
                        : "Preparing…"}
                    </span>
                  )}
                </div>
                <div className="blk-ws-actions">
                  <button className="btn btn-secondary btn-sm" onClick={handlePreview} disabled={busy}>Preview</button>
                  <button className="btn btn-primary btn-sm" onClick={handleApply} disabled={busy}>
                    {settings.outputMode === "copy" ? "Copy" : "Rename"}
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => markDone()} disabled={busy}>Done</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => openNext()} disabled={busy}>Next &rarr;</button>
                </div>
              </div>

              {/* ── Header row 2: EAN, name, settings ── */}
              <div className="blk-ws-row2">
                <div className="blk-field-group">
                  <span>EAN</span>
                  <input
                    value={customEan}
                    onChange={(e) => setCustomEan(e.target.value)}
                    placeholder="EAN-13"
                    style={{ width: 140 }}
                  />
                </div>
                <div className="blk-field-group">
                  <span>Name</span>
                  <input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Product name"
                    style={{ width: 180, fontFamily: "inherit" }}
                  />
                </div>
                <label
                  className="blk-category-naming-option"
                  title="Name files as EAN_ProductName_Category_1 with numbering restarted for each category"
                >
                  <input
                    type="checkbox"
                    checked={includeCategoryInProductName}
                    onChange={(e) => setIncludeCategoryInProductName(e.target.checked)}
                    disabled={!customEan.trim() || !productName.trim()}
                  />
                  <span>Include category in product name</span>
                </label>
                <div className="blk-field-group">
                  <span>Naming</span>
                  <select
                    value={settings.namingMode}
                    onChange={(e) => setSettings((s) => ({ ...s, namingMode: e.target.value as NamingMode }))}
                  >
                    <option value="per-category">Per Category</option>
                    <option value="continuous">Continuous</option>
                    <option value="prefixed">Prefixed</option>
                  </select>
                </div>
                <div className="blk-field-group">
                  <span>Action</span>
                  <select
                    value={settings.outputMode}
                    onChange={(e) => setSettings((s) => ({ ...s, outputMode: e.target.value as "copy" | "in-folder" }))}
                  >
                    <option value="copy">Copy</option>
                    <option value="in-folder">Rename in-place</option>
                  </select>
                </div>
                {clipBusy && (
                  <button className="btn btn-sm btn-danger" onClick={() => { stopClipPolling(); setClipBusy(false); }} style={{ marginLeft: "auto" }}>
                    Cancel AI
                  </button>
                )}
              </div>
            </div>

            <div className="blk-workspace-body">
              {/* Output bar */}
              <OutputBar
                workflowColumns={workflowColumns}
                outputFolders={outputFolders}
                onSetOutputFolders={setOutputFolders}
                onPickOutput={handlePickOutput}
              />

              {/* CLIP classification summary */}
              {clipClassifications.size > 0 && !clipBusy && (() => {
                const counts: Record<string, number> = {};
                for (const col of columns) {
                  if (col.key !== "duplicate") counts[col.key] = col.imageIds.length;
                }
                return (
                  <div className="blk-clip-summary">
                    <span className="blk-clip-summary-label">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11h3a3 3 0 0 1 3 3v1"/><path d="M6 14v1a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-1"/><circle cx="9" cy="21" r="1"/><circle cx="15" cy="21" r="1"/><circle cx="12" cy="6" r="2"/></svg>
                      AI Results
                    </span>
                    <div className="blk-clip-summary-items">
                      {(counts["packshot"] || 0) > 0 && <span className="blk-clip-cat packshot">Packshot {counts["packshot"]}</span>}
                      {(counts["lifestyle-human"] || 0) > 0 && <span className="blk-clip-cat lifestyle-human">Lifestyle/Human {counts["lifestyle-human"]}</span>}
                      {(counts["lifestyle-normal"] || 0) > 0 && <span className="blk-clip-cat lifestyle-normal">Lifestyle/Normal {counts["lifestyle-normal"]}</span>}
                      {(counts["artwork"] || 0) > 0 && <span className="blk-clip-cat artwork">Artwork {counts["artwork"]}</span>}
                      {(counts["unsorted"] || 0) > 0 && <span className="blk-clip-cat unsorted">Unsorted {counts["unsorted"]}</span>}
                    </div>
                  </div>
                );
              })()}

              {/* CLIP overlay */}
              {clipBusy && clipProgress && (
                <ClipOverlay progress={clipProgress} onCancel={() => {
                  stopClipPolling();
                  setClipBusy(false);
                }} />
              )}

              <div className="blk-board-tools" aria-label="Bulk assignment controls">
                <div>
                  <strong>{selected.size ? `${selected.size} selected` : "Select files"}</strong>
                  <span>Drag is optional — move a selection directly.</span>
                </div>
                <label>
                  Move selected to
                  <select value={moveTarget} onChange={(event) => setMoveTarget(event.target.value)}>
                    {columns.filter((column) => column.key !== "duplicate").map((column) => (
                      <option key={column.key} value={column.key}>{column.title}</option>
                    ))}
                  </select>
                </label>
                <button className="btn btn-secondary btn-sm" onClick={() => moveSelectedTo(moveTarget)} disabled={selected.size === 0}>
                  Move
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setColumnManagerOpen((open) => !open)} aria-expanded={columnManagerOpen}>
                  {columnManagerOpen ? "Close columns" : "Manage columns"}
                </button>
              </div>

              {columnManagerOpen && (
                <section className="blk-column-manager" aria-label="Manage output columns">
                  <div>
                    <strong>Output columns</strong>
                    <p>Custom columns become output folders and are remembered for the next batch.</p>
                  </div>
                  <form onSubmit={handleAddColumn}>
                    <label htmlFor="bulk-new-column">New column</label>
                    <input id="bulk-new-column" value={newColumnName} onChange={(event) => setNewColumnName(event.target.value)} placeholder="e.g. Detail shots" maxLength={48} />
                    <button className="btn btn-primary btn-sm" type="submit">Add</button>
                  </form>
                  <div className="blk-column-chip-list">
                    {columns.filter((column) => column.key !== "duplicate").map((column) => (
                      <span key={column.key} className="blk-column-chip">
                        {column.title}
                        {!DEFAULT_COLUMN_KEYS.has(column.key) && (
                          <button onClick={() => removeCustomColumn(column.key)} aria-label={`Remove ${column.title}`}>×</button>
                        )}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Kanban board */}
              <div className="blk-board">
                {columns.filter((c) => c.key !== "duplicate").map((col) => (
                  <div
                    key={col.key}
                    className={`blk-column${dropTarget === col.key ? " drop-active" : ""}${dragSourceKey === col.key ? " drag-source" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setDropTarget(col.key); }}
                    onDragLeave={() => setDropTarget(null)}
                    onDrop={(e) => handleDrop(e, col.key)}
                  >
                    <div className="blk-col-header">
                      <span className="blk-col-title">{col.title}</span>
                      <span className="blk-col-count">{col.imageIds.length}</span>
                    </div>
                    <div className="blk-col-body">
                      {col.imageIds.length === 0 && (
                        <div className="blk-col-empty">
                          {dragIds.length > 0 ? (
                            <span className="blk-drop-hint">Drop here</span>
                          ) : (
                            "No images"
                          )}
                        </div>
                      )}
                      {col.imageIds.map((id) => {
                        const img = imageMap.get(id);
                        if (!img) return null;
                        return (
                          <ImageCard
                            key={id}
                            id={id}
                            image={img}
                            colKey={col.key}
                            folderPath={folderPath}
                            isSelected={selected.has(id)}
                            isDragging={dragIds.includes(id)}
                            showPriority={false}
                            isPriority={false}
                            match={imageMatches.get(id)}
                            clipClassification={clipClassifications.get(id)}
                            hasRenamePlan={false}
                            onCardClick={(e: React.MouseEvent) => handleCardClick(e, id)}
                            onToggleSelect={() => {}}
                            onDragStart={(e: React.DragEvent) => handleDragStart(e, id, col.key)}
                            onDragEnd={() => { setDragIds([]); setDragSourceKey(null); }}
                            onHoverEnter={(e: React.MouseEvent) => setHoverPreview({ image: img, x: e.clientX, y: e.clientY })}
                            onHoverMove={(e: React.MouseEvent) => setHoverPreview({ image: img, x: e.clientX, y: e.clientY })}
                            onHoverLeave={() => setHoverPreview(null)}
                            onTogglePriority={() => {}}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview panel */}
              {renamePlan.length > 0 && (
                <PreviewPanel
                  renamePlan={renamePlan}
                  planStats={planStats}
                  previewHeight={previewHeight}
                  resizeRef={resizeRef}
                  busy={busy}
                  folderPath={folderPath}
                  onRefresh={handlePreview}
                  onClose={() => setRenamePlan([])}
                  onResizeStart={handleResizeStart}
                />
              )}
            </div>

            {hoverPreview && (
              <HoverPreview image={hoverPreview.image} x={hoverPreview.x} y={hoverPreview.y} folderPath={folderPath} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
