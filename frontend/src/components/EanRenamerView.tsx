import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiJson, pickFolder as pickFolderDialog } from "./ToolShared";
import { useNotifications } from "../contexts/NotificationContext";
import {
  HoverPreview, ClipOverlay, OutputBar,
  PreviewPanel, TopBar, Footer, PreviewModal,
  ImageCard,
} from "./ean-renamer";
import type {
  RenImage, FolderResult,
  MasterDataUploadResponse, ImageMatchItem, ImageMatchResponse,
  KanbanColumn, DuplicateGroup, DuplicateBuckets, DuplicateLabels,
  NamingMode, OutputMode, RenamePlanItem, RenameResult, SettingsState,
  HoverPreviewState, PriorityFirstMap,
  ClipProgress, ClipImageClassification, ClipResult,
} from "./ean-renamer/types";
import {
  CLIP_CATEGORY_TO_COLUMN, COLUMN_TO_CLIP_CATEGORY,
  DEFAULT_COLUMNS, EMPTY_DUPLICATE_BUCKETS,
  DEFAULT_DUPLICATE_LABELS, validateEan13,
  columnCategoryKey, outputLabelForColumn,
} from "./ean-renamer/types";

function duplicateLabelForColumn(col: KanbanColumn, labels: DuplicateLabels): string {
  return labels[col.key] || outputLabelForColumn(col).toUpperCase();
}

function createDuplicateGroup(imageIds: string[] = [], first = false): DuplicateGroup {
  return {
    id: `dup-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    imageIds,
    first,
  };
}

function normalizeNamingMode(mode: NamingMode): string {
  if (mode === "per-category") return "per_category";
  if (mode === "custom-name") return "custom_name";
  return mode;
}

function normalizeOutputMode(mode: OutputMode): string {
  return mode === "in-folder" ? "rename" : "copy";
}

/* ── Component ── */

export function EanRenamerView() {
  const { notify } = useNotifications();

  /* state: source mode */

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
  const [masterSessionId, setMasterSessionId] = useState("");
  const [, setMasterRowCount] = useState(0);
  const [, setMasterColumns] = useState<string[]>([]);

  /* state: per-image matching */
  const [imageMatches, setImageMatches] = useState<Map<string, ImageMatchItem>>(new Map());
  const [imageMatchSummary, setImageMatchSummary] = useState<{ matched: number; total: number } | null>(null);

  /* state: CLIP classification */
  const [clipJobId, setClipJobId] = useState<string | null>(null);
  const [clipProgress, setClipProgress] = useState<ClipProgress | null>(null);
  const [clipClassifications, setClipClassifications] = useState<Map<string, ClipImageClassification>>(new Map());
  const [clipBusy, setClipBusy] = useState(false);
  const clipPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const folderAbortRef = useRef<AbortController | null>(null);

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
  const [dragSourceKey, setDragSourceKey] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [duplicateDropTarget, setDuplicateDropTarget] = useState<string | null>(null);
  const [duplicateGroupDropTarget, setDuplicateGroupDropTarget] = useState<string | null>(null);

  /* refs */
  const resizeRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const masterInputRef = useRef<HTMLInputElement>(null);

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
  const workflowColumns = useMemo(
    () => columns.filter((col) => col.key !== "unsorted" && col.key !== "duplicate"),
    [columns]
  );
  /* ── Folder operations ── */

  async function handlePickFolder() {
    try {
      const picked = await pickFolderDialog("Select EAN image folder", folderPath);
      if (picked) {
        await loadFolder(picked);
      }
    } catch (e) {
      notify("Failed to pick folder", { type: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }

  async function matchImagesWithMaster(imgs: RenImage[], sessionId: string) {
    try {
      const res = await apiJson<ImageMatchResponse>("/api/ean-renamer/match-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, image_names: imgs.map((i) => i.name) }),
      });
      const map = new Map<string, ImageMatchItem>();
      for (let i = 0; i < imgs.length; i++) {
        const match = res.matches[i];
        if (match && match.status !== "unmatched") map.set(imgs[i].id, match);
      }
      setImageMatches(map);
      setImageMatchSummary({ matched: res.matched_count, total: res.total_count });
      if (res.matched_count > 0) {
        notify("Image matching", { type: "info", message: `${res.matched_count}/${res.total_count} images matched with master data` });
      }
    } catch {
      setImageMatches(new Map());
      setImageMatchSummary(null);
    }
  }

  /* ── CLIP classification ── */

  function stopClipPolling() {
    if (clipPollRef.current) {
      clearInterval(clipPollRef.current);
      clipPollRef.current = null;
    }
  }

  useEffect(() => {
    apiJson("/api/ean-renamer/clip/warm-up", { method: "POST" }).catch(() => {});
    return () => stopClipPolling();
  }, []);

  async function startClipClassification(targetFolderPath: string, targetImages: RenImage[]) {
    if (!targetFolderPath || targetImages.length === 0 || clipBusy) return;
    setClipBusy(true);
    setClipProgress(null);
    setClipClassifications(new Map());
    try {
      const res = await apiJson<{ job_id: string }>("/api/ean-renamer/clip/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folder_path: targetFolderPath,
        }),
      });
      setClipJobId(res.job_id);
      notify("CLIP Classification", { type: "info", message: "Classification started..." });

      let lastPhase = "";
      let lastProcessed = -1;
      clipPollRef.current = setInterval(async () => {
        try {
          const prog = await apiJson<ClipProgress>(`/api/ean-renamer/clip/classify/${res.job_id}/progress`);

          if (prog.phase !== lastPhase || prog.processed !== lastProcessed) {
            lastPhase = prog.phase;
            lastProcessed = prog.processed;
            setClipProgress(prog);
          }

          if (prog.phase === "done" || prog.phase === "error" || prog.phase === "cancelled") {
            stopClipPolling();
            if (prog.phase === "done") {
              const resultRes = await apiJson<{ status: string; result: ClipResult | null }>(
                `/api/ean-renamer/clip/classify/${res.job_id}/result`
              );
              if (resultRes.result) {
                applyClipResults(resultRes.result, targetImages);
                notify("CLIP Classification", {
                  type: "success",
                  message: `${resultRes.result.total_images} images classified`,
                });
              }
            } else if (prog.phase === "error") {
              notify("CLIP Classification", { type: "error", message: prog.error || "Classification failed" });
            } else {
              notify("CLIP Classification", { type: "info", message: "Classification cancelled" });
            }
            setClipBusy(false);
          }
        } catch {
          stopClipPolling();
          setClipBusy(false);
        }
      }, 2000);
    } catch (e) {
      notify("CLIP Classification", { type: "error", message: e instanceof Error ? e.message : String(e) });
      setClipBusy(false);
    }
  }

  async function handleAutoClassify() {
    await startClipClassification(folderPath, images);
  }

  async function handleCancelClassify() {
    if (!clipJobId) return;
    stopClipPolling();
    setClipBusy(false);
    setClipProgress(null);
    try {
      await apiJson(`/api/ean-renamer/clip/classify/${clipJobId}/cancel`, { method: "POST" });
    } catch { /* ignore */ }
  }

  function applyClipResults(result: ClipResult, targetImages: RenImage[]) {
    const classMap = new Map<string, ClipImageClassification>();
    const columnAssignments = new Map<string, string>();
    const targetImageIds = new Set(targetImages.map((img) => img.id));

    for (const c of result.classifications) {
      if (!targetImageIds.has(c.image_id)) continue;
      classMap.set(c.image_id, c);
      const colKey = CLIP_CATEGORY_TO_COLUMN[c.main_category] || "unsorted";
      columnAssignments.set(c.image_id, colKey);
    }

    setClipClassifications(classMap);

    setColumns((prev) => {
      const newColumns = prev.map((col) => ({ ...col, imageIds: [] as string[] }));
      const colMap = new Map(newColumns.map((c) => [c.key, c]));

      for (const img of targetImages) {
        const assignedCol = columnAssignments.get(img.id);
        const target = assignedCol && colMap.has(assignedCol) ? assignedCol : "unsorted";
        colMap.get(target)!.imageIds.push(img.id);
      }

      return newColumns;
    });
  }

  async function commitCorrections() {
    if (clipClassifications.size === 0) return;
    const corrections: Array<Record<string, unknown>> = [];

    for (const col of columns) {
      if (col.key === "unsorted" || col.key === "duplicate") continue;
      for (const imgId of col.imageIds) {
        const clip = clipClassifications.get(imgId);
        if (!clip) continue;
        const predictedCol = CLIP_CATEGORY_TO_COLUMN[clip.main_category] || "unsorted";
        if (predictedCol !== col.key) {
          const correctedCategory = COLUMN_TO_CLIP_CATEGORY[col.key];
          if (!correctedCategory) continue;
          corrections.push({
            image_hash: imgId,
            relative_path: clip.relative_path,
            source_batch: folderPath,
            predicted_category: clip.main_category,
            predicted_subcategory: clip.subcategory,
            corrected_category: correctedCategory,
            corrected_subcategory: "",
            top1_score: clip.calibrated_score,
            top2_score: clip.top_categories.length > 1 ? clip.top_categories[1].score : 0,
            score_gap: clip.score_gap,
            clip_model_version: "",
            taxonomy_version: "",
            embedding_cache_key: imgId,
            created_at: new Date().toISOString(),
          });
        }
      }
    }

    if (corrections.length > 0) {
      try {
        await apiJson("/api/ean-renamer/clip/corrections/commit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder_path: folderPath, corrections }),
        });
      } catch { /* silent */ }
    }
  }

  async function loadFolder(path: string): Promise<FolderResult | null> {
    folderAbortRef.current?.abort();
    const controller = new AbortController();
    folderAbortRef.current = controller;
    try {
      const result = await apiJson<FolderResult>("/api/ean-renamer/folder/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderPath: path }),
        signal: controller.signal,
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
      setImageMatches(new Map());
      setImageMatchSummary(null);
      setClipClassifications(new Map());
      setClipJobId(null);
      setClipProgress(null);
      /* Put all images in Unsorted */
      setColumns((prev) =>
        prev.map((col) =>
          col.key === "unsorted" ? { ...col, imageIds: result.images.map((img) => img.id) } : { ...col, imageIds: [] }
        )
      );
      notify("Folder loaded", { type: "success", message: `${result.images.length} images found` });
      if (masterSessionId && result.images.length > 0) {
        void matchImagesWithMaster(result.images, masterSessionId);
      }
      return result;
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return null;
      notify("Failed to load folder", { type: "error", message: e instanceof Error ? e.message : String(e) });
      return null;
    }
  }

  async function handleRefresh() {
    if (!folderPath) return;
    await loadFolder(folderPath);
  }

  function handleOpenPath() {
    if (folderPath && window.__grimoire?.revealInExplorer) {
      window.__grimoire.revealInExplorer(folderPath);
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
      setMasterColumns(res.columns_detected);
      notify(`Master data loaded: ${res.row_count} rows`, { type: "success", message: res.columns_detected.join(" · ") });
    } catch (e) {
      notify("Master data upload failed", { type: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }

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
      setMasterColumns(res.columns_detected);
      notify(`Master data loaded: ${res.row_count} rows`, { type: "success", message: res.columns_detected.join(" · ") });
    } catch (e) {
      notify("Master data upload failed", { type: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }

  /* ── Output folder picking ── */

  async function handlePickOutput(category: string) {
    try {
      const initial = outputFolders[category] || folderPath;
      const picked = await pickFolderDialog("Select output folder for renamed copies", initial);
      if (picked) {
        setOutputFolders((prev) => ({ ...prev, [category]: picked }));
      }
    } catch (e) {
      notify("Failed to pick output folder", { type: "error", message: e instanceof Error ? e.message : String(e) });
    }
  }

  /* ── Selection ── */

  const lastClickedIdRef = useRef<string | null>(null);

  function handleCardClick(e: React.MouseEvent, id: string, colKey?: string) {
    if (e.button !== 0) return;
    if (e.shiftKey && lastClickedIdRef.current && colKey) {
      const col = columns.find((c) => c.key === colKey);
      if (col) {
        const ids = col.imageIds;
        const a = ids.indexOf(lastClickedIdRef.current);
        const b = ids.indexOf(id);
        if (a !== -1 && b !== -1) {
          const [start, end] = a < b ? [a, b] : [b, a];
          setSelected((prev) => {
            const next = new Set(prev);
            for (let i = start; i <= end; i++) next.add(ids[i]);
            return next;
          });
          lastClickedIdRef.current = id;
          return;
        }
      }
    }
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    lastClickedIdRef.current = id;
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /* ── Drag and drop ── */

  function handleDragStart(e: React.DragEvent, imageId: string, sourceKey?: string) {
    const isCardSelected = selected.has(imageId);
    const ids = isCardSelected ? Array.from(selected) : [imageId];
    setDragIds(ids);
    setDragSourceKey(sourceKey || null);
    setHoverPreview(null);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", ids.join(","));
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
    setDuplicateGroupDropTarget(null);
  }

  function handleDragLeave(e: React.DragEvent) {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setDropTarget(null);
    setDuplicateDropTarget(null);
    setDuplicateGroupDropTarget(null);
  }

  function handleDrop(e: React.DragEvent, targetColKey: string) {
    e.preventDefault();
    setDropTarget(null);
    setDuplicateDropTarget(null);
    setDuplicateGroupDropTarget(null);
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
      Object.keys(prev).forEach((key) => {
        next[key] = (prev[key] || [])
          .map((group) => ({ ...group, imageIds: group.imageIds.filter((id) => !dragIds.includes(id)) }))
          .filter((group) => group.imageIds.length > 0);
      });
      return next;
    });
    setDragIds([]);
    setDragSourceKey(null);
    setSelected(new Set());
  }

  function handleDuplicateDragOver(e: React.DragEvent, bucket: string) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    setDropTarget("duplicate");
    setDuplicateDropTarget(bucket);
    setDuplicateGroupDropTarget(null);
  }

  function handleDuplicateDragLeave(e: React.DragEvent) {
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setDuplicateDropTarget(null);
    setDuplicateGroupDropTarget(null);
  }

  function handleGroupDragLeave(e: React.DragEvent) {
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setDuplicateGroupDropTarget(null);
  }

  function handleDuplicateDrop(e: React.DragEvent, bucket: string) {
    e.preventDefault();
    e.stopPropagation();
    setDropTarget(null);
    setDuplicateDropTarget(null);
    setDuplicateGroupDropTarget(null);
    if (dragIds.length === 0) return;
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        imageIds: col.imageIds.filter((id) => !dragIds.includes(id)),
      }))
    );
    setDuplicateBuckets((prev) => {
      const next = { ...prev };
      Object.keys(prev).forEach((key) => {
        next[key] = (prev[key] || [])
          .map((group) => ({ ...group, imageIds: group.imageIds.filter((id) => !dragIds.includes(id)) }))
          .filter((group) => group.imageIds.length > 0);
      });
      next[bucket] = [...(next[bucket] || []), createDuplicateGroup([...dragIds], false)];
      return next;
    });
    setDragIds([]);
    setDragSourceKey(null);
    setSelected(new Set());
  }

  function handleAddDuplicateGroup(bucket: string) {
    setDuplicateBuckets((prev) => ({
      ...prev,
      [bucket]: [...(prev[bucket] || []), createDuplicateGroup([], false)],
    }));
  }

  function toggleDuplicateGroupFirst(bucket: string, groupId: string) {
    setDuplicateBuckets((prev) => ({
      ...prev,
      [bucket]: (prev[bucket] || []).map((group) =>
        group.id === groupId ? { ...group, first: !group.first } : group
      ),
    }));
  }

  function removeDuplicateGroup(bucket: string, groupId: string) {
    const group = (duplicateBuckets[bucket] || []).find((item) => item.id === groupId);
    const returning = group?.imageIds || [];
    setDuplicateBuckets((prev) => ({
      ...prev,
      [bucket]: (prev[bucket] || []).filter((item) => item.id !== groupId),
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
    setDragSourceKey(null);
    setDropTarget(null);
    setDuplicateDropTarget(null);
    setDuplicateGroupDropTarget(null);
    setHoverPreview(null);
  }

  const hoverThrottleRef = useRef(0);
  function updateHoverPreview(e: React.MouseEvent, image: RenImage) {
    if (dragIds.length > 0) return;
    const now = Date.now();
    if (now - hoverThrottleRef.current < 80) return;
    hoverThrottleRef.current = now;
    setHoverPreview({ image, x: e.clientX, y: e.clientY });
  }

  function handleAutoSort() {
    if (imageMatches.size === 0) return;
    const productToColumn = new Map<string, string>();
    const allImageIds = columns.flatMap((c) => c.imageIds);

    for (const id of allImageIds) {
      const img = imageMap.get(id);
      if (!img) continue;
      const match = imageMatches.get(id);
      if (!match || !match.best_product) continue;
      const productKey = (match.best_ean || match.best_product).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      if (!productToColumn.has(productKey)) {
        const existing = columns.find((c) => !c.fixed && c.key === productKey);
        if (existing) {
          productToColumn.set(productKey, existing.key);
        } else {
          const label = match.best_product.length > 25 ? match.best_product.slice(0, 25) + "…" : match.best_product;
          productToColumn.set(productKey, `auto-${productKey}`);
          setColumns((prev) => {
            if (prev.some((c) => c.key === `auto-${productKey}`)) return prev;
            const dupIdx = prev.findIndex((c) => c.key === "duplicate");
            const newCol: KanbanColumn = { key: `auto-${productKey}`, title: label, imageIds: [] };
            if (dupIdx >= 0) {
              const copy = [...prev];
              copy.splice(dupIdx, 0, newCol);
              return copy;
            }
            return [...prev, newCol];
          });
        }
      }
    }

    setColumns((prev) => {
      const next = prev.map((c) => ({ ...c, imageIds: [...c.imageIds] }));
      const unsorted = next.find((c) => c.key === "unsorted");
      if (!unsorted) return next;

      const toMove: { id: string; targetKey: string }[] = [];
      for (const id of [...unsorted.imageIds]) {
        const img = imageMap.get(id);
        if (!img) continue;
        const match = imageMatches.get(id);
        if (!match || !match.best_product) continue;
        const productKey = (match.best_ean || match.best_product).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        const targetKey = productToColumn.get(productKey);
        if (targetKey) toMove.push({ id, targetKey });
      }

      for (const { id, targetKey } of toMove) {
        unsorted.imageIds = unsorted.imageIds.filter((i) => i !== id);
        const target = next.find((c) => c.key === targetKey);
        if (target) target.imageIds.push(id);
      }

      return next;
    });

    const moved = Array.from(imageMatches.values()).filter((m) => m.best_product).length;
    notify("Auto-sorted", { type: "success", message: `${moved} images sorted by product match` });
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
    setDuplicateBuckets((prev) => ({ ...prev, [key]: prev[key] || [] }));
    setDuplicateLabels((prev) => ({ ...prev, [key]: name.trim().toUpperCase() }));
  }

  function handleRenameColumn(key: string) {
    const col = columns.find((c) => c.key === key);
    if (!col || col.fixed) return;
    const name = prompt("New name:", col.title);
    if (!name?.trim()) return;
    setColumns((prev) => prev.map((c) => (c.key === key ? { ...c, title: name.trim() } : c)));
    setDuplicateLabels((prev) => ({ ...prev, [key]: name.trim().toUpperCase() }));
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
    setOutputFolders((prev) => {
      const next = { ...prev };
      delete next[columnCategoryKey(key)];
      delete next[key];
      return next;
    });
    setDuplicateBuckets((prev) => {
      const groups = prev[key] || [];
      const returning = groups.flatMap((group) => group.imageIds);
      const next = { ...prev };
      delete next[key];
      if (returning.length > 0) {
        setColumns((current) =>
          current.map((item) =>
            item.key === "unsorted" ? { ...item, imageIds: [...item.imageIds, ...returning] } : item
          )
        );
      }
      return next;
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

    columns.forEach((col) => {
      if (col.key === "unsorted" || col.key === "duplicate") return;
      const category = columnCategoryKey(col.key);
      outputCategories[category] = col.title;
      categoryOrder.push(category);
      col.imageIds.forEach((id) => assignments.push({ id, category, categoryName: col.title }));
    });

    workflowColumns.forEach((col) => {
      const category = columnCategoryKey(col.key);
      const categoryName = col.title;
      if (!outputCategories[category]) {
        outputCategories[category] = categoryName;
        categoryOrder.push(category);
      }
      (duplicateBuckets[col.key] || []).forEach((group) => {
        group.imageIds.forEach((id) => assignments.push({ id, category, categoryName }));
      });
    });

    Object.entries(priorityFirst).forEach(([, ids]) => {
      ids.forEach((id) => allPriorityIds.push(id));
    });

    workflowColumns.forEach((col) => {
      (duplicateBuckets[col.key] || []).forEach((group) => {
        if (group.imageIds.length === 0) return;
        duplicateGroups.push({ ids: [...group.imageIds], first: group.first });
        if (group.first) {
          group.imageIds.forEach((id) => {
            if (!allPriorityIds.includes(id)) allPriorityIds.push(id);
          });
        }
      });
    });

    Object.entries(outputFolders).forEach(([category, path]) => {
      outputFolderPaths[category] = path;
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
  }, [folderPath, columns, workflowColumns, duplicateBuckets, outputFolders, customEan, productName, productNameContinuous, settings, priorityFirst]);

  async function handlePreview() {
    if (!folderPath) return;
    setBusy(true);
    void commitCorrections();
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
    void commitCorrections();
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

  useEffect(() => {
    if (dragIds.length === 0) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setDragIds([]);
      setDragSourceKey(null);
      setDropTarget(null);
      setDuplicateDropTarget(null);
      setDuplicateGroupDropTarget(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [dragIds.length]);

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
    return (
      <ImageCard
        key={id}
        id={id}
        image={img}
        colKey={colKey}
        folderPath={folderPath}
        isSelected={selected.has(id)}
        isDragging={dragIds.includes(id)}
        showPriority={!!(colKey && priorityEnabled[colKey])}
        isPriority={colKey ? isImagePriority(colKey, id) : false}
        match={imageMatches.get(id)}
        clipClassification={clipClassifications.get(id)}
        hasRenamePlan={renamePlan.some((p) => p.id === id && (p.status || "rename") === "rename")}
        onCardClick={handleCardClick}
        onToggleSelect={toggleSelect}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onHoverEnter={updateHoverPreview}
        onHoverMove={updateHoverPreview}
        onHoverLeave={() => setHoverPreview(null)}
        onTogglePriority={togglePriorityImage}
      />
    );
  }

  return (
    <div className="ren-root">
      <style>{CSS}</style>
      <input ref={masterInputRef} type="file" hidden accept=".xlsx,.xls,.csv" onChange={(e) => void handleMasterUpload(e.currentTarget.files?.[0])} />

      {/* ── Top bar ── */}
      <TopBar
        folderPath={folderPath} detectedEan={detectedEan}
        customEan={customEan} setCustomEan={setCustomEan}
        productName={productName} setProductName={setProductName}
        productNameContinuous={productNameContinuous} setProductNameContinuous={setProductNameContinuous}
        images={images} totalImages={totalImages} selectedCount={selectedCount}
        masterSessionId={masterSessionId} imageMatches={imageMatches}
        imageMatchSummary={imageMatchSummary}
        clipBusy={clipBusy} clipProgress={clipProgress}
        showSettings={showSettings} setShowSettings={setShowSettings}
        settings={settings} setSettings={setSettings}
        eanValid={eanValid}
        settingsRef={settingsRef}
        onPickFolder={handlePickFolder} onOpenPath={handleOpenPath}
        onRefresh={handleRefresh} onMatchImages={matchImagesWithMaster}
        onAutoSort={handleAutoSort} onAutoClassify={handleAutoClassify}
        onCancelClassify={handleCancelClassify}
        onMasterPick={() => void handleMasterPick()}
      />

      {/* ── Output bar ── */}
      <OutputBar
        workflowColumns={workflowColumns}
        outputFolders={outputFolders}
        onSetOutputFolders={setOutputFolders}
        onPickOutput={handlePickOutput}
      />

      {/* ── Kanban board ── */}
      {clipBusy && (
        <ClipOverlay progress={clipProgress} onCancel={handleCancelClassify} />
      )}

      <div className="ren-board">
        {columns.map((col) => {
          const isDragSourceColumn = dragIds.length > 0 && dragSourceKey === col.key;
          const isDropColumn = dragIds.length > 0 && dropTarget === col.key && col.key !== "duplicate";
          return (
          <div
            key={col.key}
            className={`ren-column ${dropTarget === col.key ? "ren-column-drop" : ""} ${isDragSourceColumn ? "ren-column-source" : ""}`}
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
                {workflowColumns.map((duplicateCol) => {
                  const key = duplicateCol.key;
                  const groups = duplicateBuckets[key] || [];
                  const label = duplicateLabelForColumn(duplicateCol, duplicateLabels);
                  return (
                    <div
                      key={key}
                      className={`ren-duplicate-section ${duplicateDropTarget === key ? "ren-duplicate-drop" : ""}`}
                      onDragOver={(e) => handleDuplicateDragOver(e, key)}
                      onDragLeave={handleDuplicateDragLeave}
                      onDrop={(e) => handleDuplicateDrop(e, key)}
                    >
                      {duplicateDropTarget === key && dragIds.length > 0 && !duplicateGroupDropTarget && (
                        <div className="ren-drop-hint ren-duplicate-hint">
                          Create duplicate group with {dragIds.length} image{dragIds.length > 1 ? "s" : ""}
                        </div>
                      )}
                      <div className="ren-duplicate-header">
                        <input
                          className="ren-duplicate-type"
                          value={label}
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
                        {groups.map((group, index) => {
                          const groupKey = `dup-${key}-${group.id}`;
                          return (
                            <div
                              key={group.id}
                              className={`ren-duplicate-group ${duplicateGroupDropTarget === group.id ? "ren-duplicate-group-drop" : ""}`}
                              onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDropTarget("duplicate");
                                setDuplicateDropTarget(key);
                                setDuplicateGroupDropTarget(group.id);
                              }}
                              onDragLeave={handleGroupDragLeave}
                              onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDropTarget(null);
                                setDuplicateDropTarget(null);
                                setDuplicateGroupDropTarget(null);
                                if (dragIds.length === 0) return;
                                setColumns((prev) =>
                                  prev.map((col) => ({
                                    ...col,
                                    imageIds: col.imageIds.filter((id) => !dragIds.includes(id)),
                                  }))
                                );
                                setDuplicateBuckets((prev) => {
                                  const next = { ...prev };
                                  Object.keys(prev).forEach((typeKey) => {
                                    next[typeKey] = (prev[typeKey] || [])
                                      .map((item) => ({
                                        ...item,
                                        imageIds: item.imageIds.filter((id) => !dragIds.includes(id)),
                                      }))
                                      .filter((item) => item.imageIds.length > 0 || item.id === group.id);
                                  });
                                  next[key] = (next[key] || []).map((item) =>
                                    item.id === group.id ? { ...item, imageIds: [...item.imageIds, ...dragIds] } : item
                                  );
                                  return next;
                                });
                                setDragIds([]);
                                setDragSourceKey(null);
                                setSelected(new Set());
                              }}
                            >
                              {duplicateGroupDropTarget === group.id && dragIds.length > 0 && (
                                <div className="ren-drop-hint ren-duplicate-hint">
                                  Add {dragIds.length} image{dragIds.length > 1 ? "s" : ""} to Group {index + 1}
                                </div>
                              )}
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
                        {groups.length === 0 && <div className="ren-duplicate-empty">Drop images here</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="ren-col-body">
                {isDropColumn && (
                  <div className="ren-drop-hint">
                    Drop {dragIds.length} image{dragIds.length > 1 ? "s" : ""} here
                  </div>
                )}
                {col.imageIds.map((id) => renderImageCard(id, col.key))}
                {col.imageIds.length === 0 && <div className="ren-col-empty">Drop images here</div>}
              </div>
            )}
          </div>
          );
        })}
        <button className="ren-add-col" onClick={handleAddColumn} title="Add category">
          +
        </button>
      </div>

      {/* ── Footer / Preview panel ── */}
      {hoverPreview && (
        <HoverPreview image={hoverPreview.image} x={hoverPreview.x} y={hoverPreview.y} folderPath={folderPath} />
      )}

      {dragIds.length > 0 && (
        <div className="ren-drag-pill" style={{ left: 16, bottom: 80, top: "auto" }}>
          <strong>{dragIds.length}</strong>
          <span>image{dragIds.length > 1 ? "s" : ""} selected</span>
          <small>drop into a column</small>
        </div>
      )}

      {previewExpanded && (
        <PreviewPanel
          renamePlan={renamePlan}
          planStats={planStats}
          previewHeight={previewHeight}
          resizeRef={resizeRef}
          busy={busy}
          folderPath={folderPath}
          onRefresh={handlePreview}
          onClose={() => setPreviewExpanded(false)}
          onResizeStart={handleResizeStart}
        />
      )}

      <Footer
        previewExpanded={previewExpanded}
        setPreviewExpanded={setPreviewExpanded} busy={busy}
        folderPath={folderPath} settings={settings}
        lastLogPath={lastLogPath}
        onPreview={handlePreview} onApply={handleApply} onUndo={handleUndo}
      />

      {/* ── Preview Modal ── */}
      {showPreviewModal && (
        <PreviewModal
          renamePlan={renamePlan}
          onApply={handleApply}
          onClose={() => setShowPreviewModal(false)}
        />
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

.ren-mode-switch {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 8px;
}

.ren-mode-switch button {
  height: 28px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.ren-mode-switch button.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
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

.ren-column-source {
  border-color: rgba(56, 189, 248, 0.55);
  box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.18);
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

.ren-drop-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 7px 9px;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 700;
  text-align: center;
  border: 1px solid rgba(249, 115, 22, 0.45);
  background: rgba(249, 115, 22, 0.12);
  color: var(--accent);
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.08);
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

.ren-duplicate-hint {
  min-height: 28px;
  padding: 6px 8px;
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

.ren-duplicate-group-drop {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
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
  -webkit-user-drag: element;
}

.ren-card * {
  -webkit-user-drag: none;
}

.ren-card img {
  pointer-events: none;
}

.ren-card:hover {
  background: var(--bg-card-hover);
}

.ren-card-dragging {
  opacity: 0.45;
  border-color: var(--accent);
}

.ren-card-selected {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent-soft);
  background: rgba(99, 102, 241, 0.06);
  cursor: grab;
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

.ren-chip-match-ean {
  background: rgba(74, 222, 128, 0.15);
  color: #4ade80;
}

.ren-chip-match-code {
  background: rgba(96, 165, 250, 0.15);
  color: #60a5fa;
}

.ren-chip-match-name {
  background: rgba(250, 204, 21, 0.15);
  color: #facc15;
}

.ren-card-match-product {
  font-size: 9px;
  color: var(--accent);
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
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

.ren-bulk {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 16px;
  overflow: auto;
  min-height: 0;
}

.ren-bulk-active {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 10px 16px 0;
  padding: 10px 12px;
  background: rgba(249, 115, 22, 0.08);
  border: 1px solid rgba(249, 115, 22, 0.35);
  border-radius: var(--radius);
  flex-shrink: 0;
}

.ren-bulk-active > div:first-child {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.ren-bulk-active span,
.ren-bulk-active small {
  color: var(--text-muted);
  font-size: 11px;
}

.ren-bulk-active strong {
  color: var(--text-primary);
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ren-bulk-active-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.ren-bulk-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  flex-shrink: 0;
}

.ren-bulk-summary {
  display: grid;
  grid-template-columns: repeat(5, minmax(70px, auto));
  gap: 10px;
}

.ren-bulk-summary div,
.ren-bulk-card-head > div,
.ren-bulk-field {
  display: flex;
  flex-direction: column;
}

.ren-bulk-summary span,
.ren-bulk-meta,
.ren-bulk-card-head span {
  color: var(--text-muted);
  font-size: 11px;
}

.ren-bulk-summary strong {
  color: var(--text-primary);
  font-size: 17px;
}

.ren-ok { color: var(--green) !important; }
.ren-warn { color: var(--yellow) !important; }

.ren-bulk-tools {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.ren-bulk-warning {
  padding: 9px 11px;
  border: 1px solid rgba(250, 204, 21, 0.35);
  border-radius: 8px;
  background: rgba(250, 204, 21, 0.08);
  color: var(--yellow);
  font-size: 12px;
  font-weight: 700;
}

.ren-bulk-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 360px;
  border: 1px dashed var(--border-light);
  border-radius: var(--radius);
  color: var(--text-secondary);
}

.ren-bulk-empty strong {
  color: var(--text-primary);
}

.ren-bulk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
  padding-bottom: 12px;
}

.ren-bulk-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.ren-bulk-card.ready { border-color: rgba(74, 222, 128, 0.35); }
.ren-bulk-card.missing { border-color: rgba(250, 204, 21, 0.35); }
.ren-bulk-card.status-active {
  border-color: rgba(249, 115, 22, 0.65);
  box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.18);
}
.ren-bulk-card.status-done {
  border-color: rgba(74, 222, 128, 0.55);
  background: rgba(74, 222, 128, 0.04);
}
.ren-bulk-card.status-skipped {
  opacity: 0.58;
}

.ren-bulk-card-head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.ren-bulk-card-head > div {
  min-width: 0;
  gap: 3px;
}

.ren-bulk-card-head strong {
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ren-bulk-status {
  align-self: flex-start;
  padding: 2px 7px;
  border-radius: 999px;
  background: var(--bg-card);
  color: var(--text-muted);
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
}

.ren-bulk-status.ready { color: var(--green); }
.ren-bulk-status.missing { color: var(--yellow); }
.ren-bulk-status.status-active { color: var(--accent); }
.ren-bulk-status.status-done { color: var(--green); }
.ren-bulk-status.status-skipped { color: var(--text-muted); }

.ren-bulk-thumbs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  min-height: 54px;
}

.ren-bulk-thumbs img,
.ren-bulk-thumbs span {
  width: 100%;
  height: 54px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-input);
  object-fit: cover;
}

.ren-bulk-thumbs span {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 12px;
}

.ren-bulk-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ren-bulk-meta span {
  padding: 2px 6px;
  border-radius: 5px;
  background: var(--bg-card);
}

.ren-bulk-field {
  gap: 4px;
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 700;
}

.ren-bulk-field input {
  height: 30px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 7px;
  color: var(--text-primary);
  padding: 0 9px;
  font: inherit;
  outline: none;
}

.ren-bulk-field input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
}

.ren-bulk-card-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

/* ── Per-image match list in bulk card ── */

.ren-bulk-card.has-matches {
  grid-column: span 1;
}

.ren-bulk-img-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: 260px;
  overflow-y: auto;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-card);
}

.ren-bulk-img-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-bottom: 1px solid var(--border);
}

.ren-bulk-img-row:last-child {
  border-bottom: none;
}

.ren-bulk-img-row img {
  width: 40px;
  height: 32px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}

.ren-bulk-img-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.ren-bulk-img-old {
  font-size: 11px;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ren-bulk-img-match-fields {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2px 6px;
  font-size: 10px;
}

.ren-bulk-img-label {
  color: var(--text-muted);
  font-weight: 700;
}

.ren-bulk-img-value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-secondary);
}

.ren-bulk-img-value.matched {
  color: var(--green);
}

.ren-bulk-img-value.empty {
  color: var(--text-muted);
}

.ren-bulk-img-more {
  text-align: center;
  padding: 6px;
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 600;
}

/* ── Open View modal ── */

.ren-bulk-view-modal {
  position: relative;
  width: min(90vw, 900px);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}

.ren-bulk-view-modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}

.ren-bulk-view-modal-head > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ren-bulk-view-modal-head strong {
  color: var(--text-primary);
  font-size: 14px;
}

.ren-bulk-view-modal-head span {
  color: var(--text-muted);
  font-size: 11px;
}

.ren-bulk-view-modal-body {
  overflow-y: auto;
  padding: 12px 16px;
}

.ren-bulk-view-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.ren-bulk-view-table th {
  text-align: left;
  padding: 6px 8px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--bg-primary);
}

.ren-bulk-view-table td {
  padding: 6px 8px;
  border-bottom: 1px solid var(--border);
  color: var(--text-secondary);
}

.ren-bulk-view-table tr:hover td {
  background: rgba(255,255,255,0.03);
}

.ren-bulk-view-oldname {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-muted) !important;
}

.ren-bulk-view-product {
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.ren-drag-pill {
  position: fixed;
  z-index: 1001;
  pointer-events: none;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 8px;
  row-gap: 1px;
  align-items: center;
  min-width: 168px;
  padding: 9px 14px;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.94);
  border: 1px solid var(--accent);
  box-shadow: var(--shadow-lg);
  animation: renHoverIn 0.15s ease;
}

.ren-drag-pill strong {
  grid-row: span 2;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
}

.ren-drag-pill span {
  color: var(--text-primary);
  font-size: 12px;
  font-weight: 800;
  line-height: 1.1;
}

.ren-drag-pill small {
  color: var(--text-muted);
  font-size: 10px;
  line-height: 1.1;
}

/* ── Footer ── */
.ren-footer {
  flex-shrink: 0;
  border-top: 1px solid var(--border);
  background: var(--bg-card);
}

.ren-preview-popover {
  position: fixed;
  left: 248px;
  right: 28px;
  bottom: 72px;
  max-height: min(58vh, 560px);
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  z-index: 45;
  overflow: hidden;
}

.ren-preview-popover-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
}

.ren-preview-popover-head strong {
  font-size: 13px;
  color: var(--text-primary);
}

.ren-preview-popover-actions {
  display: flex;
  align-items: center;
  gap: 8px;
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
  padding: 0 16px 12px;
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

/* ── Tier badges ── */
.ren-tier-badge {
  display: inline-block;
  padding: 2px 7px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  white-space: nowrap;
}
.ren-tier-ean { background: rgba(74, 222, 128, 0.15); color: #4ade80; }
.ren-tier-code { background: rgba(96, 165, 250, 0.15); color: #60a5fa; }
.ren-tier-name { background: rgba(250, 204, 21, 0.15); color: #facc15; }
.ren-tier-none { background: rgba(239, 68, 68, 0.15); color: #ef4444; }

/* ── Match modal ── */
.ren-match-modal { max-width: 900px; }
.ren-match-summary {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
.ren-match-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.ren-match-stat span { font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; }
.ren-match-stat strong { font-size: 18px; }
.ren-match-ok strong { color: #4ade80; }
.ren-match-amb strong { color: #facc15; }
.ren-match-miss strong { color: #ef4444; }
.ren-match-select {
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-input);
  color: var(--text-primary);
  font: inherit;
  font-size: 12px;
  max-width: 240px;
}
.ren-row-ambiguous { background: rgba(250, 204, 21, 0.06); }

/* ── CLIP classify ── */
.btn-clip {
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  color: #fff;
  border: none;
  font-weight: 600;
}
.btn-clip:hover:not(:disabled) { filter: brightness(1.1); }
.btn-clip:disabled { opacity: 0.5; }
.btn-danger { background: #ef4444; color: #fff; border: none; }
.btn-danger:hover { filter: brightness(1.1); }

.ren-clip-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-secondary);
  padding: 0 8px;
}
.ren-clip-phase {
  text-transform: capitalize;
  font-weight: 600;
  color: #7c3aed;
}

.ren-clip-overlay {
  position: absolute;
  inset: 0;
  z-index: 100;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}
.ren-clip-overlay-inner {
  background: var(--bg-surface, #1e1e2e);
  border-radius: 12px;
  padding: 28px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 280px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}
.ren-clip-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(124,58,237,0.2);
  border-top-color: #7c3aed;
  border-radius: 50%;
  animation: ren-spin 0.8s linear infinite;
}
@keyframes ren-spin { to { transform: rotate(360deg); } }
.ren-clip-bar-wrap {
  width: 100%;
  height: 6px;
  background: rgba(124,58,237,0.15);
  border-radius: 3px;
  overflow: hidden;
  margin: 4px 0;
}
.ren-clip-bar {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #6366f1);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.ren-chip-clip-auto {
  background: rgba(34,197,94,0.15);
  color: #22c55e;
  border: 1px solid rgba(34,197,94,0.3);
}
.ren-chip-clip-review {
  background: rgba(250,204,21,0.15);
  color: #eab308;
  border: 1px solid rgba(250,204,21,0.3);
}
.ren-chip-clip-uncertain {
  background: rgba(239,68,68,0.15);
  color: #ef4444;
  border: 1px solid rgba(239,68,68,0.3);
}
`;
