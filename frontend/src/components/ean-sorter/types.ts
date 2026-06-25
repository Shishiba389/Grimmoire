export interface ImageRecord {
  path: string;
  name: string;
  source_folder: string;
  relative_path: string;
  size_bytes: number;
}

export interface MatchCandidate {
  ean: string;
  product_name: string | null;
  confidence: number;
  tier: "ean" | "code" | "name";
  match_source: string;
}

export interface MatchResult {
  image_path: string;
  image_name: string;
  source_folder: string;
  candidates: MatchCandidate[];
  selected_index: number | null;
  status: "matched" | "ambiguous" | "unmatched";
}

export interface MasterDataUploadResponse {
  session_id: string;
  row_count: number;
  columns_detected: string[];
  warnings: string[];
}

export interface ScanResult {
  ok: boolean;
  folder: string;
  images: ImageRecord[];
  loose_images: ImageRecord[];
  subfolder_count: number;
  total_count: number;
}

export interface MatchResponse {
  ok: boolean;
  results: MatchResult[];
  summary: {
    total: number;
    matched: number;
    ambiguous: number;
    unmatched: number;
  };
}

export interface SortJobRecord {
  id: string;
  status: "pending" | "running" | "completed" | "failed";
  error?: string | null;
  summary?: Record<string, unknown>;
}

export interface UncategorizedItem {
  name: string;
  path: string;
  kind: string;
  type: string;
  oldFolder: string;
  thumbnail: string;
}

export interface StatusProduct {
  code: string;
  barcode: string | null;
  status: string;
  name: string;
}

export interface StatusFileData {
  brand: string;
  total: number;
  products: StatusProduct[];
  statuses: Record<string, number>;
  no_barcode: StatusProduct[];
  no_barcode_count: number;
  duplicates: Record<string, number>;
  duplicate_products: StatusProduct[];
}

export type SubView = "scanner" | "review" | "categorize";
