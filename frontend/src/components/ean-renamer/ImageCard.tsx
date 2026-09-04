import { memo } from "react";
import type { RenImage, ImageMatchItem, ClipImageClassification } from "./types";
import { formatFileSize, thumbnailUrl } from "./types";

type Props = {
  id: string;
  image: RenImage;
  colKey?: string;
  folderPath: string;
  isSelected: boolean;
  isDragging: boolean;
  showPriority: boolean;
  isPriority: boolean;
  match: ImageMatchItem | undefined;
  clipClassification: ClipImageClassification | undefined;
  hasRenamePlan: boolean;
  onCardClick: (e: React.MouseEvent, id: string, colKey?: string) => void;
  onToggleSelect: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string, colKey?: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onHoverEnter: (e: React.MouseEvent, image: RenImage) => void;
  onHoverMove: (e: React.MouseEvent, image: RenImage) => void;
  onHoverLeave: () => void;
  onTogglePriority: (colKey: string, id: string) => void;
};

export const ImageCard = memo(function ImageCard(props: Props) {
  const {
    id, image: img, colKey, folderPath, isSelected, isDragging, showPriority,
    isPriority, match, clipClassification: clip, hasRenamePlan,
    onCardClick, onToggleSelect, onDragStart, onDragEnd,
    onHoverEnter, onHoverMove, onHoverLeave, onTogglePriority,
  } = props;

  return (
    <div
      className={`ren-card ${isSelected ? "ren-card-selected" : ""} ${isDragging ? "ren-card-dragging" : ""} ${isPriority ? "ren-card-priority" : ""}`}
      draggable
      onClick={(e) => onCardClick(e, id, colKey)}
      onMouseEnter={(e) => onHoverEnter(e, img)}
      onMouseMove={(e) => onHoverMove(e, img)}
      onMouseLeave={onHoverLeave}
      onDragStart={(e) => onDragStart(e, id, colKey)}
      onDragEnd={onDragEnd}
    >
      <input
        type="checkbox"
        className="ren-card-check"
        checked={isSelected}
        onChange={() => onToggleSelect(id)}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="ren-card-thumb">
        <img
          src={thumbnailUrl(id, folderPath)}
          alt={img.name}
          loading="lazy"
          draggable={false}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>
      <div className="ren-card-meta">
        <span className="ren-card-name" title={img.name}>{img.name}</span>
        <span className="ren-card-info">
          {img.width}&times;{img.height} &middot; {formatFileSize(img.sizeBytes)}
        </span>
        <div className="ren-card-chips">
          <span className="ren-chip">{img.extension.toUpperCase()}</span>
          {hasRenamePlan && (
            <span className="ren-chip ren-chip-renamed">renamed</span>
          )}
          {match && (
            <span className={`ren-chip ren-chip-match-${match.best_tier || "name"}`} title={`${match.best_product || match.best_ean} (${Math.round(match.best_confidence * 100)}%)`}>
              {match.best_tier === "ean" ? "EAN" : match.best_tier === "code" ? "CODE" : "NAME"} {Math.round(match.best_confidence * 100)}%
            </span>
          )}
          {clip && (
            <span
              className={`ren-chip ren-chip-clip-${clip.confidence}`}
              title={`${clip.main_category} → ${clip.subcategory || "—"}\nScore: ${(clip.calibrated_score * 100).toFixed(0)}% | Gap: ${(clip.score_gap * 100).toFixed(0)}%`}
            >
              {clip.confidence === "auto" ? "AI" : clip.confidence === "review" ? "AI?" : "AI!"} {(clip.calibrated_score * 100).toFixed(0)}%
            </span>
          )}
        </div>
        {match && match.best_product && (
          <span className="ren-card-match-product" title={match.best_product}>
            {match.best_product}
          </span>
        )}
      </div>
      {showPriority && (
        <button
          className={`ren-priority-btn ${isPriority ? "ren-priority-active" : ""}`}
          title={isPriority ? "Remove first-image priority" : "Label as first image"}
          onClick={(e) => { e.stopPropagation(); if (colKey) onTogglePriority(colKey, id); }}
        >
          ★
        </button>
      )}
      <span className="ren-card-grip" title="Drag">&#9776;</span>
    </div>
  );
});
