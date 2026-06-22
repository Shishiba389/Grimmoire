import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { apiJson, apiUrl, pickFolder, useJobPolling, statusLabel, type JobRecord } from "./ToolShared";
import { useNotifications } from "../contexts/NotificationContext";

/* ── Types ── */

type OutputMode = "local" | "zip";
type FitMode = "contain" | "cover" | "stretch";
type MarginMode = "default" | "custom";
type MarginUnit = "px" | "%";
type LayoutPreset = "manual" | "canva_fill" | "object_aware_canvas" | "canva_manual" | "auto_compose" | "ai_canvas_expand";
type CanvasBg = "white" | "smart" | "edge_extend" | "blur_cover" | "ai_expand";
type UpscaleMode = "none" | "real_esrgan_ncnn";
type StandardUpscale = "pillow_lanczos" | "pillow_bicubic" | "opencv_lanczos4" | "opencv_cubic";
type ClarityEnhance = "auto" | "none" | "light" | "medium" | "strong";
type EsrganModel = "realesrgan-x4plus" | "realesrgan-x4plus-anime" | "realesr-animevideov3";
type AutoComposeStyle = "centered" | "rule_of_thirds" | "product_hero" | "lifestyle";
type BgRemovalMode = "border_white" | "rembg" | "sam2";
type OutputFormat = "jpg" | "png" | "webp" | "tiff";
type NamingRule = "keep_original" | "sequential" | "ean_prefix" | "custom_template";
type LogLevel = "INFO" | "SUCCESS" | "WARN" | "ERROR";

interface LogEntry {
  id: number;
  timestamp: string;
  level: LogLevel;
  message: string;
}

interface QueueItem {
  id: string;
  file?: File;
  name: string;
  thumbnail?: string;
  dimensions?: string;
  progress: number;
  status: "pending" | "running" | "completed" | "failed";
  elapsed?: string;
  eta?: string;
}

interface DimensionPreset {
  label: string;
  w: number;
  h: number;
}

interface OutputItem {
  id: string;
  kind: "preview" | "job";
  label: string;
  url?: string;
  jobId?: string;
  outputPath?: string | null;
  createdAt: string;
}

/* ── Constants ── */

const DIMENSION_PRESETS: DimensionPreset[] = [
  { label: "Custom", w: 0, h: 0 },
  { label: "Marketplace Square 800", w: 800, h: 800 },
  { label: "Marketplace Square 1000", w: 1000, h: 1000 },
  { label: "Marketplace Square 1200", w: 1200, h: 1200 },
  { label: "Marketplace Square 1500", w: 1500, h: 1500 },
  { label: "Amazon Main 2000", w: 2000, h: 2000 },
  { label: "Shopify 2048", w: 2048, h: 2048 },
  { label: "Web Banner 1920x1080", w: 1920, h: 1080 },
  { label: "Print A4 2480x3508", w: 2480, h: 3508 },
];

const PIPELINE_STEPS = [
  "1. Read source",
  "2. Crop",
  "3. AI upscale",
  "4. Fit to dimension",
  "5. Margin/DPI",
  "6. Rename/export",
];

const CANVAS_BG_WARNINGS: Partial<Record<CanvasBg, string>> = {
  ai_expand: "AI Expand uses a generative model and may produce unexpected results on complex backgrounds.",
  blur_cover: "Blur cover works best on images with a single dominant subject.",
  edge_extend: "Edge extension may create visible artifacts on images with complex borders.",
};

const LAYOUT_WARNINGS: Partial<Record<LayoutPreset, string>> = {
  ai_canvas_expand: "AI Canvas Expand requires a compatible GPU and may be slow on large batches.",
};

const CUSTOM_PRESETS_STORAGE_KEY = "grimoire-image-edit-custom-dimension-presets";
const MAX_OUTPUT_HISTORY = 12;

/* ── Defaults ── */

const DEFAULTS = {
  inputFolder: "",
  outputFolder: "",
  includeSubfolders: true,
  preserveStructure: true,
  outputMode: "zip" as OutputMode,
  preset: "Custom",
  width: 1000,
  height: 1000,
  lockAspect: true,
  fitMode: "contain" as FitMode,
  marginMode: "default" as MarginMode,
  marginUnit: "px" as MarginUnit,
  marginL: 0,
  marginT: 0,
  marginR: 0,
  marginB: 0,
  marginBeforeFit: false,
  dpi: 72,
  layoutPreset: "manual" as LayoutPreset,
  canvasBg: "white" as CanvasBg,
  autoComposeStyle: "centered" as AutoComposeStyle,
  aiExpandPrompt: "",
  upscaleMode: "none" as UpscaleMode,
  standardUpscale: "pillow_lanczos" as StandardUpscale,
  clarityEnhance: "auto" as ClarityEnhance,
  esrganModel: "realesrgan-x4plus" as EsrganModel,
  esrganScale: 4,
  esrganCpuFallback: false,
  removeWhiteSpace: false,
  autoProductFill: false,
  fillRatio: 0.85,
  safePadding: false,
  requireWhiteBg: false,
  rejectPeopleHands: false,
  removeSoftShadow: false,
  removeBgRembg: false,
  bgRemovalMode: "border_white" as BgRemovalMode,
  maxWorkers: 4,
  outputFormat: "jpg" as OutputFormat,
  quality: 92,
  maxFileSize: 0,
  namingRule: "keep_original" as NamingRule,
  customTemplate: "{name}_{index}",
};

/* ── Helpers ── */

let logCounter = 0;
function makeLog(level: LogLevel, message: string): LogEntry {
  return {
    id: ++logCounter,
    timestamp: new Date().toLocaleTimeString("en-GB", { hour12: false }),
    level,
    message,
  };
}

function logColor(level: LogLevel): string {
  switch (level) {
    case "SUCCESS": return "var(--green)";
    case "WARN": return "var(--yellow)";
    case "ERROR": return "var(--red)";
    default: return "var(--blue)";
  }
}

function namingPreview(rule: NamingRule, template: string): string {
  switch (rule) {
    case "keep_original": return "photo_001.jpg";
    case "sequential": return "001.jpg, 002.jpg, ...";
    case "ean_prefix": return "4006381_001.jpg";
    case "custom_template":
      return template
        .replace("{name}", "photo")
        .replace("{index}", "001")
        .replace("{ean}", "4006381")
        .replace("{w}", "1000")
        .replace("{h}", "1000") + ".jpg";
    default: return "";
  }
}

function outputModeForBackend(mode: OutputMode): "zip" | "local_folder" {
  return mode === "local" ? "local_folder" : "zip";
}

function loadCustomPresets(): DimensionPreset[] {
  try {
    const raw = window.localStorage.getItem(CUSTOM_PRESETS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => ({
        label: String(item?.label || "").trim(),
        w: Number(item?.w),
        h: Number(item?.h),
      }))
      .filter((item) => item.label && Number.isFinite(item.w) && Number.isFinite(item.h) && item.w > 0 && item.h > 0);
  } catch {
    return [];
  }
}

function saveCustomPresets(presets: DimensionPreset[]) {
  window.localStorage.setItem(CUSTOM_PRESETS_STORAGE_KEY, JSON.stringify(presets));
}

function namingTemplate(rule: NamingRule, template: string): string {
  switch (rule) {
    case "keep_original":
      return "{original_stem}";
    case "sequential":
      return "{index:03d}";
    case "ean_prefix":
      return "{ean}_{index:03d}";
    case "custom_template":
      return template || "{name}_{index}";
    default:
      return "{original_stem}";
  }
}

/* ── Sub-components ── */

function Field({ label, children, inline }: { label: string; children: ReactNode; inline?: boolean }) {
  return (
    <label className={`tool-field ${inline ? "ie-field-inline" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function Segmented<T extends string>({ value, options, onChange }: {
  value: T;
  options: { label: string; value: T }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="segmented">
      {options.map((o) => (
        <button key={o.value} className={value === o.value ? "active" : ""} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Stepper({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="ie-stepper">
      <button className="btn btn-secondary btn-sm" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>-</button>
      <span className="ie-stepper-value">{value}</span>
      <button className="btn btn-secondary btn-sm" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>+</button>
    </div>
  );
}

/* ── Main Component ── */

export function ImageEditView() {
  const { notify } = useNotifications();

  /* ── Form state ── */
  const [inputFolder, setInputFolder] = useState(DEFAULTS.inputFolder);
  const [outputFolder, setOutputFolder] = useState(DEFAULTS.outputFolder);
  const [files, setFiles] = useState<File[]>([]);
  const [includeSubfolders, setIncludeSubfolders] = useState(DEFAULTS.includeSubfolders);
  const [preserveStructure, setPreserveStructure] = useState(DEFAULTS.preserveStructure);
  const [outputMode, setOutputMode] = useState<OutputMode>(DEFAULTS.outputMode);

  const [preset, setPreset] = useState(DEFAULTS.preset);
  const [width, setWidth] = useState(DEFAULTS.width);
  const [height, setHeight] = useState(DEFAULTS.height);
  const [lockAspect, setLockAspect] = useState(DEFAULTS.lockAspect);
  const [fitMode, setFitMode] = useState<FitMode>(DEFAULTS.fitMode);

  const [marginMode, setMarginMode] = useState<MarginMode>(DEFAULTS.marginMode);
  const [marginUnit, setMarginUnit] = useState<MarginUnit>(DEFAULTS.marginUnit);
  const [marginL, setMarginL] = useState(DEFAULTS.marginL);
  const [marginT, setMarginT] = useState(DEFAULTS.marginT);
  const [marginR, setMarginR] = useState(DEFAULTS.marginR);
  const [marginB, setMarginB] = useState(DEFAULTS.marginB);
  const [marginBeforeFit, setMarginBeforeFit] = useState(DEFAULTS.marginBeforeFit);
  const [dpi, setDpi] = useState(DEFAULTS.dpi);

  const [layoutPreset, setLayoutPreset] = useState<LayoutPreset>(DEFAULTS.layoutPreset);
  const [canvasBg, setCanvasBg] = useState<CanvasBg>(DEFAULTS.canvasBg);
  const [autoComposeStyle, setAutoComposeStyle] = useState<AutoComposeStyle>(DEFAULTS.autoComposeStyle);
  const [aiExpandPrompt, setAiExpandPrompt] = useState(DEFAULTS.aiExpandPrompt);

  const [upscaleMode, setUpscaleMode] = useState<UpscaleMode>(DEFAULTS.upscaleMode);
  const [standardUpscale, setStandardUpscale] = useState<StandardUpscale>(DEFAULTS.standardUpscale);
  const [clarityEnhance, setClarityEnhance] = useState<ClarityEnhance>(DEFAULTS.clarityEnhance);
  const [esrganModel, setEsrganModel] = useState<EsrganModel>(DEFAULTS.esrganModel);
  const [esrganScale, setEsrganScale] = useState(DEFAULTS.esrganScale);
  const [esrganCpuFallback, setEsrganCpuFallback] = useState(DEFAULTS.esrganCpuFallback);

  const [removeWhiteSpace, setRemoveWhiteSpace] = useState(DEFAULTS.removeWhiteSpace);
  const [autoProductFill, setAutoProductFill] = useState(DEFAULTS.autoProductFill);
  const [fillRatio, setFillRatio] = useState(DEFAULTS.fillRatio);
  const [safePadding, setSafePadding] = useState(DEFAULTS.safePadding);
  const [requireWhiteBg, setRequireWhiteBg] = useState(DEFAULTS.requireWhiteBg);
  const [rejectPeopleHands, setRejectPeopleHands] = useState(DEFAULTS.rejectPeopleHands);
  const [removeSoftShadow, setRemoveSoftShadow] = useState(DEFAULTS.removeSoftShadow);
  const [removeBgRembg, setRemoveBgRembg] = useState(DEFAULTS.removeBgRembg);
  const [bgRemovalMode, setBgRemovalMode] = useState<BgRemovalMode>(DEFAULTS.bgRemovalMode);

  const [maxWorkers, setMaxWorkers] = useState(DEFAULTS.maxWorkers);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(DEFAULTS.outputFormat);
  const [quality, setQuality] = useState(DEFAULTS.quality);
  const [maxFileSize, setMaxFileSize] = useState(DEFAULTS.maxFileSize);
  const [namingRule, setNamingRule] = useState<NamingRule>(DEFAULTS.namingRule);
  const [customTemplate, setCustomTemplate] = useState(DEFAULTS.customTemplate);
  const [customDimensionPresets, setCustomDimensionPresets] = useState<DimensionPreset[]>(() => loadCustomPresets());

  /* ── Job state ── */
  const [busy, setBusy] = useState(false);
  const [startedJob, setStartedJob] = useState<JobRecord | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [outputs, setOutputs] = useState<OutputItem[]>([]);
  const [activeOutputId, setActiveOutputId] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dimensionPresets = [...DIMENSION_PRESETS, ...customDimensionPresets];
  const activeOutput = outputs.find((item) => item.id === activeOutputId) || outputs[0] || null;
  const isCustomSavedPreset = customDimensionPresets.some((item) => item.label === preset);

  const job = useJobPolling(startedJob, (done) => {
    addLog(done.status === "completed" ? "SUCCESS" : "ERROR",
      done.status === "completed" ? "Processing complete" : `Job failed: ${done.error || "unknown error"}`);
    if (done.status === "completed") {
      const outputItem: OutputItem = {
        id: `job-${done.id}`,
        kind: "job",
        label: done.original_filename || `Job ${done.id.slice(0, 8)}`,
        jobId: done.id,
        outputPath: done.output_path,
        createdAt: new Date().toLocaleTimeString("en-GB", { hour12: false }),
      };
      setOutputs((prev) => {
        const next = [outputItem, ...prev.filter((item) => item.id !== outputItem.id)];
        next.slice(MAX_OUTPUT_HISTORY).forEach((item) => {
          if (item.url) URL.revokeObjectURL(item.url);
        });
        return next.slice(0, MAX_OUTPUT_HISTORY);
      });
      setActiveOutputId(outputItem.id);
    }
    notify(done.status === "completed" ? "Image edit output ready" : "Image edit failed", {
      type: done.status === "completed" ? "success" : "error",
      message: done.error || done.output_path || undefined,
    });
  });

  /* ── Console logging ── */
  const addLog = useCallback((level: LogLevel, message: string) => {
    setLogs((prev) => [...prev, makeLog(level, message)].slice(-500));
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  /* ── Preset change ── */
  function onPresetChange(label: string) {
    setPreset(label);
    const p = dimensionPresets.find((d) => d.label === label);
    if (p && p.w > 0) {
      setWidth(p.w);
      setHeight(p.h);
    }
  }

  function saveCurrentDimensionPreset() {
    const name = window.prompt("Preset name", preset !== "Custom" ? preset : `${width} x ${height}`);
    const label = name?.trim();
    if (!label) return;
    if (DIMENSION_PRESETS.some((item) => item.label === label)) {
      notify("Use a different preset name", { type: "warning", message: "Built-in presets cannot be overwritten." });
      return;
    }
    const nextPreset = { label, w: width, h: height };
    const next = [nextPreset, ...customDimensionPresets.filter((item) => item.label !== label)];
    setCustomDimensionPresets(next);
    saveCustomPresets(next);
    setPreset(label);
    addLog("SUCCESS", `Saved preset: ${label}`);
    notify("Custom preset saved", { type: "success", message: `${label} (${width} x ${height})` });
  }

  function deleteCurrentDimensionPreset() {
    const deletedPreset = preset;
    const next = customDimensionPresets.filter((item) => item.label !== deletedPreset);
    setCustomDimensionPresets(next);
    saveCustomPresets(next);
    setPreset("Custom");
    addLog("INFO", `Deleted preset: ${deletedPreset}`);
    notify("Custom preset deleted", { type: "info" });
  }

  /* ── Width/height with lock ── */
  function onWidthChange(v: number) {
    setWidth(v);
    if (lockAspect && height > 0) setHeight(v);
    setPreset("Custom");
  }

  function onHeightChange(v: number) {
    setHeight(v);
    if (lockAspect && width > 0) setWidth(v);
    setPreset("Custom");
  }

  /* ── File handling ── */
  function handleFileAdd(fileList: FileList | null) {
    if (!fileList) return;
    const newFiles = Array.from(fileList);
    setFiles((prev) => [...prev, ...newFiles]);
    setInputFolder("");
    addLog("INFO", `Added ${newFiles.length} file(s)`);
  }

  async function chooseInputFolder() {
    const selected = await pickFolder("Select image input folder", inputFolder);
    if (!selected) return;
    setInputFolder(selected);
    setFiles([]);
    setQueue([]);
    setIncludeSubfolders(true);
    setPreserveStructure(true);
    addLog("INFO", `Selected input folder: ${selected}`);
  }

  function removeQueueItem(id: string) {
    setQueue((prev) => prev.filter((q) => q.id !== id));
  }

  /* ── Build settings object ── */
  function buildSettings(): Record<string, unknown> {
    const marginValue =
      marginMode === "custom" ? Math.max(marginL, marginT, marginR, marginB) : 0;
    const paddingValue = safePadding ? 8 : 0;
    const productFillRatio = Math.round(fillRatio * 100);
    const removeBackground = removeBgRembg || bgRemovalMode === "rembg" || bgRemovalMode === "sam2";

    return {
      width,
      height,
      fit_mode: fitMode,
      layout_preset: layoutPreset,
      canvas_background_mode: canvasBg,
      auto_compose_style: layoutPreset === "auto_compose" ? autoComposeStyle : "balanced",
      ai_canvas_expand_enabled: layoutPreset === "ai_canvas_expand" || canvasBg === "ai_expand",
      ai_canvas_expand_provider: "comfyui",
      ai_canvas_expand_prompt: (layoutPreset === "ai_canvas_expand" || canvasBg === "ai_expand")
        ? aiExpandPrompt || "clean commercial product photo background, consistent lighting"
        : "",
      margin: marginValue,
      margin_mode: marginUnit === "%" ? "percent" : "pixels",
      dpi,
      upscale_mode: upscaleMode,
      standard_upscale_method: standardUpscale,
      clarity_enhance: clarityEnhance,
      upscale_model: esrganModel,
      upscale_scale: esrganScale,
      upscale_cpu_fallback: esrganCpuFallback,
      crop_to_content: removeWhiteSpace,
      remove_white_space_around_product: removeWhiteSpace,
      auto_product_fill: autoProductFill,
      fill_ratio: autoProductFill ? fillRatio : 0.88,
      safe_padding: paddingValue,
      product_fill_enabled: autoProductFill,
      product_fill_ratio: productFillRatio,
      product_safe_padding: paddingValue,
      normalize_product_size: autoProductFill,
      product_target_occupancy: autoProductFill ? fillRatio : 0.88,
      require_white_bg: requireWhiteBg,
      require_white_background: requireWhiteBg,
      reject_people_hands: rejectPeopleHands,
      reject_human_parts: rejectPeopleHands,
      remove_shadow: removeSoftShadow,
      remove_background: removeBackground,
      background_removal_mode: removeBackground ? bgRemovalMode : "border_white",
      manual_transform_enabled: layoutPreset === "canva_manual",
      max_workers: maxWorkers,
      output_format: outputFormat,
      output_quality: quality,
      max_file_size_mb: maxFileSize > 0 ? maxFileSize : 0,
      naming_rule: namingTemplate(namingRule, customTemplate),
      include_subfolders: includeSubfolders,
      preserve_folder_structure: preserveStructure,
      output_mode: outputModeForBackend(outputMode),
    };
  }

  /* ── Reset ── */
  function resetForm() {
    setInputFolder(DEFAULTS.inputFolder);
    setOutputFolder(DEFAULTS.outputFolder);
    setFiles([]);
    setIncludeSubfolders(DEFAULTS.includeSubfolders);
    setPreserveStructure(DEFAULTS.preserveStructure);
    setOutputMode(DEFAULTS.outputMode);
    setPreset(DEFAULTS.preset);
    setWidth(DEFAULTS.width);
    setHeight(DEFAULTS.height);
    setLockAspect(DEFAULTS.lockAspect);
    setFitMode(DEFAULTS.fitMode);
    setMarginMode(DEFAULTS.marginMode);
    setMarginUnit(DEFAULTS.marginUnit);
    setMarginL(DEFAULTS.marginL);
    setMarginT(DEFAULTS.marginT);
    setMarginR(DEFAULTS.marginR);
    setMarginB(DEFAULTS.marginB);
    setMarginBeforeFit(DEFAULTS.marginBeforeFit);
    setDpi(DEFAULTS.dpi);
    setLayoutPreset(DEFAULTS.layoutPreset);
    setCanvasBg(DEFAULTS.canvasBg);
    setAutoComposeStyle(DEFAULTS.autoComposeStyle);
    setAiExpandPrompt(DEFAULTS.aiExpandPrompt);
    setUpscaleMode(DEFAULTS.upscaleMode);
    setStandardUpscale(DEFAULTS.standardUpscale);
    setClarityEnhance(DEFAULTS.clarityEnhance);
    setEsrganModel(DEFAULTS.esrganModel);
    setEsrganScale(DEFAULTS.esrganScale);
    setEsrganCpuFallback(DEFAULTS.esrganCpuFallback);
    setRemoveWhiteSpace(DEFAULTS.removeWhiteSpace);
    setAutoProductFill(DEFAULTS.autoProductFill);
    setFillRatio(DEFAULTS.fillRatio);
    setSafePadding(DEFAULTS.safePadding);
    setRequireWhiteBg(DEFAULTS.requireWhiteBg);
    setRejectPeopleHands(DEFAULTS.rejectPeopleHands);
    setRemoveSoftShadow(DEFAULTS.removeSoftShadow);
    setRemoveBgRembg(DEFAULTS.removeBgRembg);
    setBgRemovalMode(DEFAULTS.bgRemovalMode);
    setMaxWorkers(DEFAULTS.maxWorkers);
    setOutputFormat(DEFAULTS.outputFormat);
    setQuality(DEFAULTS.quality);
    setMaxFileSize(DEFAULTS.maxFileSize);
    setNamingRule(DEFAULTS.namingRule);
    setCustomTemplate(DEFAULTS.customTemplate);
    setQueue([]);
    addLog("INFO", "All settings reset to defaults");
  }

  /* ── Preview (first 1) ── */
  async function runPreview() {
    const file = files[0];
    if (!file) {
      notify("Add at least one image to preview", { type: "warning" });
      return;
    }
    addLog("INFO", `Previewing: ${file.name}`);
    setBusy(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const settings = buildSettings();
      for (const [k, v] of Object.entries(settings)) {
        if (v !== undefined) data.append(k, String(v));
      }
      const blob = await fetch(apiUrl("/api/image-edit/preview"), { method: "POST", body: data })
        .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.blob(); });
      const url = URL.createObjectURL(blob);
      const outputItem: OutputItem = {
        id: `preview-${Date.now()}`,
        kind: "preview",
        label: file.name,
        url,
        createdAt: new Date().toLocaleTimeString("en-GB", { hour12: false }),
      };
      setOutputs((prev) => {
        const next = [outputItem, ...prev];
        next.slice(MAX_OUTPUT_HISTORY).forEach((item) => {
          if (item.url) URL.revokeObjectURL(item.url);
        });
        return next.slice(0, MAX_OUTPUT_HISTORY);
      });
      setActiveOutputId(outputItem.id);
      addLog("SUCCESS", "Preview generated");
    } catch (error) {
      addLog("ERROR", `Preview failed: ${error instanceof Error ? error.message : String(error)}`);
      notify("Preview failed", { type: "error", message: error instanceof Error ? error.message : String(error) });
    } finally {
      setBusy(false);
    }
  }

  /* ── Start processing ── */
  async function startProcessing() {
    const settings = buildSettings();
    setBusy(true);
    addLog("INFO", "Starting processing job...");

    try {
      let created: JobRecord;

      if (files.length > 0) {
        const data = new FormData();
        files.forEach((f) => data.append("files", f));
        for (const [k, v] of Object.entries(settings)) {
          if (v !== undefined) data.append(k, String(v));
        }
        created = await apiJson<JobRecord>("/api/image-edit/jobs", { method: "POST", body: data });
      } else if (inputFolder) {
        created = await apiJson<JobRecord>("/api/image-edit/folder-jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input_folder_path: inputFolder,
            output_folder_path: outputFolder || null,
            output_mode: outputModeForBackend(outputMode),
            ...settings,
          }),
        });
      } else {
        throw new Error("Choose files or an input folder first.");
      }

      setStartedJob(created);

      /* Build queue items from files */
      const items: QueueItem[] = files.map((f, i) => ({
        id: `${created.id}-${i}`,
        file: f,
        name: f.name,
        thumbnail: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
        dimensions: "",
        progress: 0,
        status: "pending",
      }));
      if (items.length > 0) setQueue(items);
      if (items.length === 0 && inputFolder) {
        setQueue([{
          id: `${created.id}-folder`,
          name: inputFolder,
          dimensions: includeSubfolders ? "Scanning subfolders" : "Scanning folder",
          progress: 0,
          status: "pending",
        }]);
      }

      addLog("SUCCESS", `Job started: ${created.id}`);
      notify("Image edit job started", { type: "info", message: created.id });
    } catch (error) {
      addLog("ERROR", `Failed to start: ${error instanceof Error ? error.message : String(error)}`);
      notify("Image edit job failed to start", { type: "error", message: error instanceof Error ? error.message : String(error) });
    } finally {
      setBusy(false);
    }
  }

  /* ── Derived state ── */
  const sourceCount = files.length;
  const hasFolderSource = files.length === 0 && inputFolder.length > 0;
  const sourceLabel = hasFolderSource
    ? `Folder selected${includeSubfolders ? " (including subfolders)" : ""}`
    : `${sourceCount} file${sourceCount !== 1 ? "s" : ""} selected`;
  const canStart = files.length > 0 || inputFolder.length > 0;
  const showAiExpandPrompt = layoutPreset === "ai_canvas_expand" || canvasBg === "ai_expand";
  const warningText = CANVAS_BG_WARNINGS[canvasBg] || LAYOUT_WARNINGS[layoutPreset] || "";

  useEffect(() => {
    const summary = job?.summary;
    const backendItems = Array.isArray(summary?.items) ? summary.items : [];
    if (!job || backendItems.length === 0) return;

    setQueue(
      backendItems.map((raw, index) => {
        const item = raw as Record<string, unknown>;
        const itemId = String(item.item_id || `${job.id}-${index + 1}`);
        const statusText = String(item.status || job.status);
        const progress = Math.max(
          0,
          Math.min(100, Number(item.progress_percent ?? (statusText === "completed" ? 100 : 0)))
        );
        const widthValue = item.width ? Number(item.width) : null;
        const heightValue = item.height ? Number(item.height) : null;
        const version = `${statusText}-${String(item.finished_at_ms || item.progress_percent || progress)}`;
        return {
          id: itemId,
          name: String(
            item.output_filename ||
              item.original_filename ||
              item.relative_path ||
              `image-${index + 1}`
          ),
          thumbnail: apiUrl(
            `/api/jobs/${encodeURIComponent(job.id)}/items/${encodeURIComponent(itemId)}/thumbnail?kind=auto&v=${encodeURIComponent(version)}`
          ),
          dimensions: widthValue && heightValue ? `${widthValue} x ${heightValue}` : "",
          progress,
          status:
            statusText === "completed"
              ? "completed"
              : statusText === "failed" || statusText === "skipped"
                ? "failed"
                : statusText === "running" || job.status === "running"
                  ? "running"
                  : "pending",
          elapsed: item.elapsed_seconds ? `${Math.round(Number(item.elapsed_seconds))}s` : undefined,
          eta: item.eta_seconds ? `${Math.round(Number(item.eta_seconds))}s` : undefined,
        } satisfies QueueItem;
      })
    );
  }, [job?.id, job?.status, job?.summary]);

  /* ── Render ── */
  return (
    <div className="view tool-view ie-root">
      <div className="view-header">
        <h1>Image Edit</h1>
        <div className="view-header-actions">
          <span className="status-online"><span className="dot" />{statusLabel(job) || "Ready"}</span>
        </div>
      </div>

      <div className="ie-columns">
        {/* ═══ LEFT COLUMN ═══ */}
        <section className="tool-card ie-left">
          <h2>Input</h2>

          <Field label="Input folder">
            <div className="path-picker">
              <input value={inputFolder} onChange={(e) => setInputFolder(e.target.value)} placeholder="Path to image folder" />
              <button className="btn btn-secondary btn-sm" onClick={chooseInputFolder}>Browse</button>
            </div>
          </Field>

          <Field label="Output folder">
            <div className="path-picker">
              <input value={outputFolder} onChange={(e) => setOutputFolder(e.target.value)} placeholder="Optional output path" />
              <button className="btn btn-secondary btn-sm" onClick={async () => setOutputFolder(await pickFolder("Select image output folder", outputFolder))}>Browse</button>
            </div>
          </Field>

          <input ref={fileInputRef} type="file" multiple accept=".jpg,.jpeg,.png,.webp,.tif,.tiff,.bmp,.avif,.zip" style={{ display: "none" }} onChange={(e) => handleFileAdd(e.target.files)} />
          <button className="btn btn-secondary ie-add-btn" onClick={() => fileInputRef.current?.click()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add
          </button>

          <div className="ie-source-card">
            <strong>Source</strong>
            <span>{sourceLabel}</span>
            {files.length > 0 && (
              <div className="ie-file-list">
                {files.slice(0, 8).map((f, i) => (
                  <div className="ie-file-tag" key={`${f.name}-${i}`}>
                    <span title={f.name}>{f.name}</span>
                    <button onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}>x</button>
                  </div>
                ))}
                {files.length > 8 && <span className="muted">+{files.length - 8} more</span>}
              </div>
            )}
            {hasFolderSource && (
              <div className="ie-file-list">
                <div className="ie-file-tag">
                  <span title={inputFolder}>{inputFolder}</span>
                  <button onClick={() => setInputFolder("")}>x</button>
                </div>
              </div>
            )}
          </div>

          <label className="check-row"><input type="checkbox" checked={includeSubfolders} onChange={(e) => setIncludeSubfolders(e.target.checked)} />Include subfolders</label>
          <label className="check-row"><input type="checkbox" checked={preserveStructure} onChange={(e) => setPreserveStructure(e.target.checked)} />Preserve folder structure</label>

          <Field label="Output mode">
            <Segmented value={outputMode} options={[{ label: "Local", value: "local" }, { label: "ZIP", value: "zip" }]} onChange={setOutputMode} />
          </Field>
        </section>

        {/* ═══ MIDDLE COLUMN ═══ */}
        <section className="tool-card ie-middle">
          <h2>Processing</h2>

          {/* Pipeline strip */}
          <div className="ie-pipeline">
            {PIPELINE_STEPS.map((step, i) => (
              <span key={i} className="ie-pipeline-step">{step}</span>
            ))}
          </div>

          <div className="ie-scroll-area">
            {/* Dimension Preset */}
            <Field label="Dimension Preset">
              <div className="ie-preset-row">
                <select value={preset} onChange={(e) => onPresetChange(e.target.value)}>
                  {dimensionPresets.map((p) => <option key={p.label} value={p.label}>{p.label}</option>)}
                </select>
                <button className="btn btn-secondary btn-sm" onClick={saveCurrentDimensionPreset}>Save</button>
                {isCustomSavedPreset && <button className="btn btn-secondary btn-sm" onClick={deleteCurrentDimensionPreset}>Delete</button>}
              </div>
            </Field>

            {/* Width / Height / Lock */}
            <div className="ie-dim-row">
              <Field label="Width">
                <input type="number" min={1} value={width} onChange={(e) => onWidthChange(Number(e.target.value))} />
              </Field>
              <button className={`btn btn-sm ie-lock-btn ${lockAspect ? "active" : ""}`} title={lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio"} onClick={() => setLockAspect(!lockAspect)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  {lockAspect ? (
                    <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>
                  ) : (
                    <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 019.9-1" /></>
                  )}
                </svg>
              </button>
              <Field label="Height">
                <input type="number" min={1} value={height} onChange={(e) => onHeightChange(Number(e.target.value))} />
              </Field>
            </div>

            {/* Fit Mode */}
            <Field label="Fit Mode">
              <Segmented value={fitMode} options={[
                { label: "Contain", value: "contain" },
                { label: "Cover", value: "cover" },
                { label: "Stretch", value: "stretch" },
              ]} onChange={setFitMode} />
            </Field>

            {/* Margins */}
            <div className="ie-section-label">Margins</div>
            <div className="tool-row">
              <Field label="Mode">
                <select value={marginMode} onChange={(e) => setMarginMode(e.target.value as MarginMode)}>
                  <option value="default">Default</option>
                  <option value="custom">Custom</option>
                </select>
              </Field>
              <Field label="Unit">
                <Segmented value={marginUnit} options={[{ label: "px", value: "px" }, { label: "%", value: "%" }]} onChange={setMarginUnit} />
              </Field>
            </div>
            {marginMode === "custom" && (
              <div className="ie-margin-grid">
                <Field label="L"><input type="number" min={0} value={marginL} onChange={(e) => setMarginL(Number(e.target.value))} /></Field>
                <Field label="T"><input type="number" min={0} value={marginT} onChange={(e) => setMarginT(Number(e.target.value))} /></Field>
                <Field label="R"><input type="number" min={0} value={marginR} onChange={(e) => setMarginR(Number(e.target.value))} /></Field>
                <Field label="B"><input type="number" min={0} value={marginB} onChange={(e) => setMarginB(Number(e.target.value))} /></Field>
              </div>
            )}
            <label className="check-row"><input type="checkbox" checked={marginBeforeFit} onChange={(e) => setMarginBeforeFit(e.target.checked)} />Apply margin before fit</label>

            {/* DPI */}
            <Field label="DPI">
              <input type="number" min={1} max={1200} value={dpi} onChange={(e) => setDpi(Number(e.target.value))} />
            </Field>

            {/* Layout Preset */}
            <Field label="Layout Preset">
              <select value={layoutPreset} onChange={(e) => setLayoutPreset(e.target.value as LayoutPreset)}>
                <option value="manual">Manual</option>
                <option value="canva_fill">Canva Fill</option>
                <option value="object_aware_canvas">Object-aware canvas</option>
                <option value="canva_manual">Canva Manual</option>
                <option value="auto_compose">Auto Compose</option>
                <option value="ai_canvas_expand">AI Canvas Expand</option>
              </select>
            </Field>

            {/* Canvas Background */}
            <Field label="Canvas Background">
              <select value={canvasBg} onChange={(e) => setCanvasBg(e.target.value as CanvasBg)}>
                <option value="white">White</option>
                <option value="smart">Smart Auto</option>
                <option value="edge_extend">Extend edges</option>
                <option value="blur_cover">Blur cover</option>
                <option value="ai_expand">AI Expand</option>
              </select>
            </Field>

            {warningText && <div className="ie-warning">{warningText}</div>}

            {/* Conditional: Auto Compose Style */}
            {layoutPreset === "auto_compose" && (
              <Field label="Auto Compose Style">
                <select value={autoComposeStyle} onChange={(e) => setAutoComposeStyle(e.target.value as AutoComposeStyle)}>
                  <option value="centered">Centered</option>
                  <option value="rule_of_thirds">Rule of Thirds</option>
                  <option value="product_hero">Product Hero</option>
                  <option value="lifestyle">Lifestyle</option>
                </select>
              </Field>
            )}

            {/* Conditional: AI Expand Prompt */}
            {showAiExpandPrompt && (
              <Field label="AI Expand Prompt">
                <input value={aiExpandPrompt} onChange={(e) => setAiExpandPrompt(e.target.value)} placeholder="Describe desired background..." />
              </Field>
            )}

            {/* AI Upscale */}
            <div className="ie-section-label">AI Upscale</div>
            <Field label="Upscale Engine">
              <select value={upscaleMode} onChange={(e) => setUpscaleMode(e.target.value as UpscaleMode)}>
                <option value="none">None</option>
                <option value="real_esrgan_ncnn">Real-ESRGAN (NCNN)</option>
              </select>
            </Field>

            {upscaleMode === "none" ? (
              <>
                <Field label="Standard Upscale">
                  <select value={standardUpscale} onChange={(e) => setStandardUpscale(e.target.value as StandardUpscale)}>
                    <option value="pillow_lanczos">Pillow Lanczos</option>
                    <option value="pillow_bicubic">Pillow Bicubic</option>
                    <option value="opencv_lanczos4">OpenCV Lanczos4</option>
                    <option value="opencv_cubic">OpenCV Cubic</option>
                  </select>
                </Field>
                <Field label="Clarity Enhance">
                  <select value={clarityEnhance} onChange={(e) => setClarityEnhance(e.target.value as ClarityEnhance)}>
                    <option value="auto">Auto</option>
                    <option value="none">None</option>
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="strong">Strong</option>
                  </select>
                </Field>
              </>
            ) : (
              <>
                <Field label="Model">
                  <select value={esrganModel} onChange={(e) => setEsrganModel(e.target.value as EsrganModel)}>
                    <option value="realesrgan-x4plus">realesrgan-x4plus</option>
                    <option value="realesrgan-x4plus-anime">realesrgan-x4plus-anime</option>
                    <option value="realesr-animevideov3">realesr-animevideov3</option>
                  </select>
                </Field>
                <Field label="Scale">
                  <Segmented value={String(esrganScale) as "2" | "3" | "4"} options={[
                    { label: "2x", value: "2" },
                    { label: "3x", value: "3" },
                    { label: "4x", value: "4" },
                  ]} onChange={(v) => setEsrganScale(Number(v))} />
                </Field>
                <label className="check-row"><input type="checkbox" checked={esrganCpuFallback} onChange={(e) => setEsrganCpuFallback(e.target.checked)} />CPU Fallback</label>
              </>
            )}

            {/* Image Filters */}
            <div className="ie-section-label">Image Filters</div>
            <div className="ie-filter-grid">
              <label className="check-row"><input type="checkbox" checked={removeWhiteSpace} onChange={(e) => setRemoveWhiteSpace(e.target.checked)} />Remove white space</label>
              <label className="check-row"><input type="checkbox" checked={autoProductFill} onChange={(e) => setAutoProductFill(e.target.checked)} />Auto product fill</label>
              {autoProductFill && (
                <Field label={`Fill ratio: ${Math.round(fillRatio * 100)}%`}>
                  <input type="range" min={0.3} max={1} step={0.01} value={fillRatio} onChange={(e) => setFillRatio(Number(e.target.value))} className="ie-slider" />
                </Field>
              )}
              <label className="check-row"><input type="checkbox" checked={safePadding} onChange={(e) => setSafePadding(e.target.checked)} />Safe padding</label>
              <label className="check-row"><input type="checkbox" checked={requireWhiteBg} onChange={(e) => setRequireWhiteBg(e.target.checked)} />Require white background</label>
              <label className="check-row"><input type="checkbox" checked={rejectPeopleHands} onChange={(e) => setRejectPeopleHands(e.target.checked)} />Reject people/hands</label>
              <label className="check-row"><input type="checkbox" checked={removeSoftShadow} onChange={(e) => setRemoveSoftShadow(e.target.checked)} />Remove soft shadow</label>
              <label className="check-row"><input type="checkbox" checked={removeBgRembg} onChange={(e) => setRemoveBgRembg(e.target.checked)} />Remove background (rembg)</label>
              {removeBgRembg && (
                <Field label="BG Mode">
                  <select value={bgRemovalMode} onChange={(e) => setBgRemovalMode(e.target.value as BgRemovalMode)}>
                    <option value="border_white">Border white</option>
                    <option value="rembg">rembg</option>
                    <option value="sam2">SAM2</option>
                  </select>
                </Field>
              )}
            </div>

            {/* Workers */}
            <Field label="Max Workers">
              <Stepper value={maxWorkers} min={1} max={16} onChange={setMaxWorkers} />
            </Field>

            {/* Output */}
            <div className="ie-section-label">Output</div>
            <div className="tool-row">
              <Field label="Format">
                <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}>
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WEBP</option>
                  <option value="tiff">TIFF</option>
                </select>
              </Field>
              <Field label="Quality">
                <input type="number" min={1} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
              </Field>
            </div>

            <Field label="Max File Size (MB)">
              <input type="number" min={0} step={0.1} value={maxFileSize} onChange={(e) => setMaxFileSize(Number(e.target.value))} placeholder="0 = no limit" />
            </Field>

            {/* Naming */}
            <div className="ie-section-label">Naming</div>
            <Field label="Naming Rule">
              <select value={namingRule} onChange={(e) => setNamingRule(e.target.value as NamingRule)}>
                <option value="keep_original">Keep original</option>
                <option value="sequential">Sequential</option>
                <option value="ean_prefix">EAN prefix</option>
                <option value="custom_template">Custom template</option>
              </select>
            </Field>
            {namingRule === "custom_template" && (
              <Field label="Template">
                <input value={customTemplate} onChange={(e) => setCustomTemplate(e.target.value)} placeholder="{name}_{index}" />
              </Field>
            )}
            <div className="ie-naming-preview">Preview: <code>{namingPreview(namingRule, customTemplate)}</code></div>
          </div>

          {/* Footer buttons */}
          <div className="ie-footer">
            <button className="btn btn-secondary" onClick={resetForm}>Reset</button>
            <button className="btn btn-secondary" onClick={runPreview} disabled={busy || files.length === 0}>Preview (First 1)</button>
            <button className="btn btn-primary" onClick={startProcessing} disabled={busy || !canStart}>Start Processing</button>
          </div>
        </section>

        {/* ═══ RIGHT COLUMN ═══ */}
        <section className="tool-card ie-right">
          <div className="ie-queue-header">
            <h2>Job Queue</h2>
            <span className="ie-queue-count">{queue.length}</span>
          </div>

          <div className="ie-queue-list">
            {queue.length === 0 && <div className="empty-box">No jobs queued yet.</div>}
            {queue.map((item, idx) => (
              <div className={`ie-queue-item ie-q-${item.status}`} key={item.id}>
                <div className="ie-q-thumb">
                  {item.thumbnail ? <img src={item.thumbnail} alt="" /> : <div className="ie-q-thumb-placeholder" />}
                </div>
                <div className="ie-q-info">
                  <div className="ie-q-name">
                    <span className="ie-q-index">{idx + 1}</span>
                    <span title={item.name}>{item.name}</span>
                  </div>
                  {item.dimensions && <span className="ie-q-dims">{item.dimensions}</span>}
                  <div className="ie-q-progress-bar">
                    <div className="ie-q-progress-fill" style={{ width: `${item.progress}%` }} />
                  </div>
                  <div className="ie-q-meta">
                    <span>{item.progress}%</span>
                    {item.elapsed && <span>{item.elapsed}</span>}
                    {item.eta && <span>ETA: {item.eta}</span>}
                  </div>
                </div>
                <button className="ie-q-remove" title="Remove" onClick={() => removeQueueItem(item.id)}>x</button>
              </div>
            ))}
          </div>

          <div className="ie-output-header">
            <h2>Outputs</h2>
            <span className="ie-queue-count">{outputs.length}</span>
          </div>

          <div className="ie-output-list">
            {outputs.length === 0 && <div className="empty-box">No outputs yet.</div>}
            {outputs.map((item) => (
              <button
                key={item.id}
                className={`ie-output-item ${activeOutput?.id === item.id ? "active" : ""}`}
                onClick={() => setActiveOutputId(item.id)}
              >
                <span>{item.kind === "preview" ? "Preview" : "Job"}</span>
                <strong title={item.outputPath || item.label}>{item.label}</strong>
                <em>{item.createdAt}</em>
              </button>
            ))}
          </div>

          <div className="ie-preview-frame">
            {activeOutput?.url ? (
              <img src={activeOutput.url} alt="Preview output" />
            ) : activeOutput?.kind === "job" ? (
              <div className="empty-box">Job output is ready to download.</div>
            ) : (
              <div className="empty-box">Output preview will appear here.</div>
            )}
          </div>

          {activeOutput?.kind === "job" && activeOutput.jobId && (
            <a className="btn btn-primary ie-download-btn" href={apiUrl(`/api/jobs/${encodeURIComponent(activeOutput.jobId)}/download`)} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Download
            </a>
          )}
        </section>
      </div>

      {/* ═══ CONSOLE (full width) ═══ */}
      <div className="ie-console">
        <div className="ie-console-header">
          <div className="ie-console-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
            Console
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setLogs([])}>Clear</button>
        </div>
        <div className="ie-console-body" ref={logRef}>
          {logs.length === 0 && <div className="empty-box" style={{ padding: "12px" }}>No log entries yet.</div>}
          {logs.map((entry) => (
            <div className="ie-log-entry" key={entry.id}>
              <span className="ie-log-time">{entry.timestamp}</span>
              <span className="ie-log-level" style={{ color: logColor(entry.level) }}>{entry.level}</span>
              <span className="ie-log-msg">{entry.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
