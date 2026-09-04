import { apiUrl } from "../ToolShared";

/* ── Image & Folder types ── */

export type RenImage = {
  id: string;
  name: string;
  extension: string;
  width: number | null;
  height: number | null;
  sizeBytes: number;
  ean: string;
  relativePath: string;
};

export type FolderResult = {
  folderPath: string;
  ean: string;
  images: RenImage[];
};

export type BulkFolderItem = {
  key: string;
  folderPath: string;
  relativePath: string;
  name: string;
  imageCount: number;
  documentCount: number;
  imageIds: string[];
  images: RenImage[];
  sampleImages: RenImage[];
};

export type BulkScanResult = {
  folderPath: string;
  totalFolders: number;
  totalImages: number;
  folders: BulkFolderItem[];
};

export type BulkMappingEntry = {
  ean?: string | null;
  productName?: string | null;
  source?: string | null;
};

export type BulkMatchCandidate = {
  ean: string;
  product_name: string | null;
  confidence: number;
  tier: "ean" | "code" | "name";
  match_source: string;
};

export type BulkMatchResult = {
  key: string;
  name: string;
  candidates: BulkMatchCandidate[];
  selected_index: number | null;
  status: "matched" | "ambiguous" | "unmatched";
};

export type BulkMatchResponse = {
  results: BulkMatchResult[];
  summary: { total: number; matched: number; ambiguous: number; unmatched: number };
};

export type MasterDataUploadResponse = {
  session_id: string;
  row_count: number;
  columns_detected: string[];
  warnings: string[];
};

export type ImageMatchItem = {
  image_name: string;
  best_ean: string | null;
  best_product: string | null;
  best_confidence: number;
  best_tier: "ean" | "code" | "name" | null;
  status: "matched" | "ambiguous" | "unmatched";
};

export type ImageMatchResponse = {
  matches: ImageMatchItem[];
  matched_count: number;
  total_count: number;
};

export type BulkWorkItem = BulkFolderItem & {
  ean: string;
  productName: string;
  matchSource: "manual" | "folder" | "file" | "master" | "missing";
  matchTier: "ean" | "code" | "name" | null;
  matchConfidence: number | null;
  status: "pending" | "active" | "done" | "skipped";
  imageMatches?: ImageMatchItem[];
};

export type KanbanColumn = {
  key: string;
  title: string;
  fixed?: boolean;
  imageIds: string[];
};

export type DuplicateGroup = {
  id: string;
  imageIds: string[];
  first: boolean;
};
export type DuplicateBuckets = Record<string, DuplicateGroup[]>;
export type DuplicateLabels = Record<string, string>;
export type NamingMode = "per-category" | "continuous" | "prefixed" | "custom-name";
export type OutputMode = "copy" | "in-folder";

export type RenamePlanItem = {
  id: string;
  category: string;
  oldName: string;
  newName?: string;
  outputPath?: string;
  outputRelativePath?: string;
  status?: "rename" | "conflict" | "skip";
};

export type RenameResult = {
  items: RenamePlanItem[];
  renamed?: number;
  skipped?: number;
  skippedCount?: number;
  conflicts?: number | string[];
  logPath?: string;
};

export type SettingsState = {
  outputMode: OutputMode;
  namingMode: NamingMode;
};

export type ViewMode = "single" | "bulk";

export type HoverPreviewState = {
  image: RenImage;
  x: number;
  y: number;
} | null;

export type PriorityFirstMap = Record<string, Set<string>>;

/* ── CLIP types ── */

export type ClipProgress = {
  job_id: string;
  phase: string;
  processed: number;
  total: number;
  batch_speed: number;
  eta_seconds: number;
  error: string | null;
};

export type ClipCategoryScore = { category: string; score: number; raw_score: number };

export type ClipImageClassification = {
  image_id: string;
  relative_path: string;
  main_category: string;
  subcategory: string;
  confidence: "auto" | "review" | "uncertain";
  calibrated_score: number;
  score_gap: number;
  top_categories: ClipCategoryScore[];
  is_video: boolean;
  rule_overrides: string[];
};

export type ClipResult = {
  job_id: string;
  folder_path: string;
  total_images: number;
  classifications: ClipImageClassification[];
  category_counts: Record<string, number>;
  model_version: string;
  taxonomy_version: string;
};

/* ── Constants ── */

export const CLIP_CATEGORY_TO_COLUMN: Record<string, string> = {
  "01_packshot": "packshot",
  "02_lifestyle_human": "lifestyle-human",
  "02_lifestyle_scene_setup": "lifestyle-normal",
  "02_lifestyle_collection": "lifestyle-normal",
  "02_lifestyle_color_background_or_packshot_low_priority": "lifestyle-normal",
  "03_artwork": "artwork",
  "04_video": "unsorted",
  "99_uncertain": "unsorted",
};

export const COLUMN_TO_CLIP_CATEGORY: Record<string, string> = {
  "packshot": "01_packshot",
  "lifestyle-human": "02_lifestyle_human",
  "lifestyle-normal": "02_lifestyle_scene_setup",
  "artwork": "03_artwork",
};

export const DEFAULT_COLUMNS: KanbanColumn[] = [
  { key: "unsorted", title: "Unsorted", fixed: true, imageIds: [] },
  { key: "packshot", title: "Packshot", imageIds: [] },
  { key: "lifestyle-human", title: "Lifestyle/Human", imageIds: [] },
  { key: "lifestyle-normal", title: "Lifestyle/Normal", imageIds: [] },
  { key: "artwork", title: "Artwork", imageIds: [] },
  { key: "duplicate", title: "Duplicate", fixed: true, imageIds: [] },
];

export const EMPTY_DUPLICATE_BUCKETS: DuplicateBuckets = {
  packshot: [],
  "lifestyle-human": [],
  "lifestyle-normal": [],
  artwork: [],
};

export const DEFAULT_DUPLICATE_LABELS: DuplicateLabels = {
  packshot: "PACK SHOT",
  "lifestyle-human": "HUMAN",
  "lifestyle-normal": "NORMAL LIFESTYLE",
  artwork: "ARTWORK",
};

/* ── Helpers ── */

export function validateEan13(code: string): boolean {
  if (!/^\d{13}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += Number(code[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === Number(code[12]);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

export function thumbnailUrl(id: string, folderPath: string): string {
  return apiUrl(`/api/ean-renamer/images/${encodeURIComponent(id)}/thumbnail?folderPath=${encodeURIComponent(folderPath)}`);
}

export function columnCategoryKey(key: string): string {
  if (key === "lifestyle-human") return "lifestyle_human";
  if (key === "lifestyle-normal") return "lifestyle_normal";
  return key;
}

export function outputLabelForColumn(col: KanbanColumn): string {
  if (col.key === "packshot") return "PACKSHOT";
  if (col.key === "lifestyle-human") return "HUMAN";
  if (col.key === "lifestyle-normal") return "NORMAL LIFESTYLE";
  return col.title;
}

export function planOutput(item: RenamePlanItem): string {
  return item.outputPath || item.outputRelativePath || item.newName || "";
}
