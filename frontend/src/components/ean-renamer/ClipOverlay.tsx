import { memo } from "react";
import type { ClipProgress } from "./types";

type Props = {
  progress: ClipProgress | null;
  onCancel: () => void;
};

export const ClipOverlay = memo(function ClipOverlay({ progress, onCancel }: Props) {
  return (
    <div className="ren-clip-overlay">
      <div className="ren-clip-overlay-inner">
        <div className="ren-clip-spinner" />
        <strong>AI Classifying images...</strong>
        {progress && (
          <>
            {progress.phase === "classifying" && progress.total > 0 ? (
              <>
                <div className="ren-clip-bar-wrap">
                  <div
                    className="ren-clip-bar"
                    style={{ width: `${(progress.processed / progress.total) * 100}%` }}
                  />
                </div>
                <span>{progress.processed} / {progress.total} images</span>
                {progress.batch_speed > 0 && <span>{progress.batch_speed} img/s</span>}
                {progress.eta_seconds > 0 && <span>~{Math.ceil(progress.eta_seconds)}s remaining</span>}
              </>
            ) : (
              <span style={{ opacity: 0.8 }}>
                {progress.phase === "loading_model" && "Loading CLIP model..."}
                {progress.phase === "loading_taxonomy" && "Loading taxonomy..."}
                {progress.phase === "loading_references" && "Loading reference images..."}
                {progress.phase === "scanning" && "Scanning folder for images..."}
                {progress.phase === "preparing_prompts" && "Preparing text embeddings..."}
                {progress.phase === "error" && (progress.error || "Classification failed")}
              </span>
            )}
          </>
        )}
        <button className="btn btn-secondary btn-sm" onClick={onCancel} style={{ marginTop: 8 }}>
          Cancel
        </button>
      </div>
    </div>
  );
});
