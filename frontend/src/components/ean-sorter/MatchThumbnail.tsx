import { useState } from "react";
import { apiUrl } from "../ToolShared";
import type { MatchResult } from "./types";

interface Props {
  folder: string;
  result: MatchResult;
}

type PreviewState = {
  x: number;
  y: number;
} | null;

export function MatchThumbnail({ folder, result }: Props) {
  const [preview, setPreview] = useState<PreviewState>(null);
  const [failed, setFailed] = useState(false);
  const best = result.candidates[result.selected_index ?? 0];
  const src = apiUrl(
    `/api/ean-sorter/thumbnail?folder=${encodeURIComponent(folder)}&image_path=${encodeURIComponent(result.image_path)}`,
  );

  function updatePreview(e: React.MouseEvent<HTMLImageElement>) {
    setPreview({ x: e.clientX, y: e.clientY });
  }

  if (failed) {
    return <span className="sor-match-thumb sor-thumb-placeholder">No image</span>;
  }

  return (
    <>
      <img
        className="sor-match-thumb"
        src={src}
        alt={result.image_name}
        loading="lazy"
        draggable={false}
        onError={() => setFailed(true)}
        onMouseEnter={updatePreview}
        onMouseMove={updatePreview}
        onMouseLeave={() => setPreview(null)}
      />
      {preview && (
        <div
          className="sor-img-preview sor-match-preview"
          style={{
            left: Math.max(12, Math.min(preview.x + 18, window.innerWidth - 390)),
            top: Math.max(12, Math.min(preview.y + 18, window.innerHeight - 470)),
          }}
        >
          <img src={src} alt={result.image_name} />
          <div className="sor-match-preview-copy">
            <strong>{result.image_name}</strong>
            <span>{result.source_folder}</span>
            <small>
              {best
                ? `${best.ean} · ${best.product_name || "No product name"} · ${Math.round(best.confidence * 100)}%`
                : "No matching candidate"}
            </small>
          </div>
        </div>
      )}
    </>
  );
}
