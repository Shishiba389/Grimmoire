import { memo, useState, type RefObject } from "react";
import type { BulkWorkItem, ImageMatchItem } from "./types";
import { thumbnailUrl } from "./types";

type BulkMatchSummary = { total: number; matched: number; ambiguous: number; unmatched: number } | null;

type Props = {
  bulkItems: BulkWorkItem[];
  bulkWarnings: string[];
  bulkReadyCount: number;
  bulkMissingCount: number;
  bulkDoneCount: number;
  masterSessionId: string;
  masterRowCount: number;
  masterColumns: string[];
  bulkMatchSummary: BulkMatchSummary;
  busy: boolean;
  bulkRootPath: string;
  folderPath: string;
  mappingInputRef: RefObject<HTMLInputElement | null>;
  masterInputRef: RefObject<HTMLInputElement | null>;
  onImportLegacy: (file: File | undefined, source: "file" | "master") => void;
  onMasterUpload: (file: File | undefined) => void;
  onMasterPick: () => void;
  onShowMatchModal: () => void;
  onOpenNextBatch: () => void;
  onLoadBulkFolder: (path: string) => void;
  onUpdateItem: (key: string, patch: Partial<BulkWorkItem>) => void;
  onOpenItemSingle: (item: BulkWorkItem) => void;
  onSkipItem: (key: string) => void;
};

function ImageMatchRow({ match, thumbSrc }: { match: ImageMatchItem; thumbSrc: string }) {
  return (
    <div className="ren-bulk-img-row">
      <img src={thumbSrc} alt={match.image_name} loading="lazy" draggable={false} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      <div className="ren-bulk-img-info">
        <div className="ren-bulk-img-old" title={match.image_name}>{match.image_name}</div>
        <div className="ren-bulk-img-match-fields">
          <span className="ren-bulk-img-label">EAN</span>
          <span className={`ren-bulk-img-value ${match.best_ean ? "matched" : "empty"}`}>
            {match.best_ean || "—"}
          </span>
          <span className="ren-bulk-img-label">Product</span>
          <span className={`ren-bulk-img-value ${match.best_product ? "matched" : "empty"}`} title={match.best_product || ""}>
            {match.best_product || "—"}
          </span>
        </div>
      </div>
      {match.best_tier && (
        <span className={`ren-tier-badge ren-tier-${match.best_tier}`} style={{ fontSize: 9, alignSelf: "flex-start" }}>
          {match.best_tier.toUpperCase()} {Math.round(match.best_confidence * 100)}%
        </span>
      )}
    </div>
  );
}

function ImageViewModal({ item, rootPath, onClose }: { item: BulkWorkItem; rootPath: string; onClose: () => void }) {
  const matches = item.imageMatches || [];
  const images = item.images.length > 0 ? item.images : item.sampleImages;
  const matchMap = new Map(matches.map((m) => [m.image_name, m]));

  return (
    <div className="ren-modal-overlay" onClick={onClose}>
      <div className="ren-bulk-view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ren-bulk-view-modal-head">
          <div>
            <strong>{item.name}</strong>
            <span>{images.length} images</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
        </div>
        <div className="ren-bulk-view-modal-body">
          <table className="ren-bulk-view-table">
            <thead>
              <tr>
                <th style={{ width: 56 }}></th>
                <th>Old Name</th>
                <th>EAN</th>
                <th>Product Name</th>
                <th style={{ width: 70 }}>Match</th>
              </tr>
            </thead>
            <tbody>
              {images.map((img) => {
                const match = matchMap.get(img.name);
                return (
                  <tr key={img.id}>
                    <td>
                      <img src={thumbnailUrl(img.id, rootPath)} alt={img.name} loading="lazy" draggable={false}
                        style={{ width: 48, height: 36, objectFit: "cover", borderRadius: 4 }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </td>
                    <td title={img.name} className="ren-bulk-view-oldname">{img.name}</td>
                    <td className={match?.best_ean ? "ren-ok" : ""}>{match?.best_ean || "—"}</td>
                    <td title={match?.best_product || ""} className="ren-bulk-view-product">
                      {match?.best_product || "—"}
                    </td>
                    <td>
                      {match?.best_tier ? (
                        <span className={`ren-tier-badge ren-tier-${match.best_tier}`}>
                          {match.best_tier.toUpperCase()} {Math.round(match.best_confidence * 100)}%
                        </span>
                      ) : (
                        <span style={{ color: "var(--text-muted)", fontSize: 11 }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export const BulkWorkingView = memo(function BulkWorkingView(props: Props) {
  const {
    bulkItems, bulkWarnings, bulkReadyCount, bulkMissingCount, bulkDoneCount,
    masterSessionId, masterRowCount, masterColumns, bulkMatchSummary,
    busy, bulkRootPath, folderPath, mappingInputRef, masterInputRef,
    onImportLegacy, onMasterUpload, onMasterPick, onShowMatchModal,
    onOpenNextBatch, onLoadBulkFolder, onUpdateItem, onOpenItemSingle, onSkipItem,
  } = props;

  const [viewItem, setViewItem] = useState<BulkWorkItem | null>(null);
  const rootPath = bulkRootPath || folderPath;

  return (
    <div className="ren-bulk">
      <div className="ren-bulk-toolbar">
        <div className="ren-bulk-summary">
          <div><span>Folders</span><strong>{bulkItems.length}</strong></div>
          <div><span>Images</span><strong>{bulkItems.reduce((sum, item) => sum + item.imageCount, 0)}</strong></div>
          <div><span>Matched</span><strong className="ren-ok">{bulkReadyCount}</strong></div>
          <div><span>Missing</span><strong className={bulkMissingCount ? "ren-warn" : ""}>{bulkMissingCount}</strong></div>
          <div><span>Done</span><strong>{bulkDoneCount}</strong></div>
        </div>
        <div className="ren-bulk-tools">
          <input ref={mappingInputRef} type="file" hidden accept=".txt,.csv,.tsv,.xlsx,.xls" onChange={(e) => void onImportLegacy(e.currentTarget.files?.[0], "file")} />
          <input ref={masterInputRef} type="file" hidden accept=".xlsx,.xls,.csv,.txt,.tsv" onChange={(e) => void onMasterUpload(e.currentTarget.files?.[0])} />
          <button className="btn btn-secondary btn-sm" onClick={() => mappingInputRef.current?.click()}>Import EAN + Name</button>
          <button className="btn btn-primary btn-sm" onClick={() => void onMasterPick()} disabled={busy} title={masterColumns.length ? masterColumns.join(" · ") : undefined}>
            {masterSessionId ? `Master Data (${masterRowCount})` : "Match Master Data"}
          </button>
          {bulkMatchSummary && (
            <button className="btn btn-secondary btn-sm" onClick={onShowMatchModal}>
              Review Matches ({bulkMatchSummary.matched}/{bulkMatchSummary.total})
            </button>
          )}
          <button className="btn btn-secondary btn-sm" onClick={onOpenNextBatch} disabled={bulkItems.length === 0 || busy}>Open Next Batch</button>
          <button className="btn btn-secondary btn-sm" onClick={() => (bulkRootPath || folderPath) && onLoadBulkFolder(bulkRootPath || folderPath)} disabled={!(bulkRootPath || folderPath) || busy}>Rescan</button>
        </div>
      </div>
      {bulkWarnings.length > 0 && <div className="ren-bulk-warning">{bulkWarnings.join(" ")}</div>}
      {bulkItems.length === 0 ? (
        <div className="ren-bulk-empty">
          <strong>Select a root folder to start Bulk Working</strong>
          <span>The scan lists direct images and each subfolder with image counts. Video files such as MP4 are ignored.</span>
        </div>
      ) : (
        <div className="ren-bulk-grid">
          {bulkItems.map((item) => {
            const ready = !!item.ean.trim();
            const hasImageMatches = item.imageMatches && item.imageMatches.length > 0;
            const statusText = item.status === "pending" ? (ready ? "ready" : "missing") : item.status;
            const images = item.images.length > 0 ? item.images : item.sampleImages;
            const matchMap = hasImageMatches ? new Map(item.imageMatches!.map((m) => [m.image_name, m])) : null;

            return (
              <article key={item.key} className={`ren-bulk-card ${ready ? "ready" : "missing"} status-${item.status} ${hasImageMatches ? "has-matches" : ""}`}>
                <div className="ren-bulk-card-head">
                  <div>
                    <strong title={item.relativePath}>{item.name}</strong>
                    <span>{item.relativePath === "." ? "Root folder" : item.relativePath}</span>
                  </div>
                  <span className={`ren-bulk-status ${ready ? "ready" : "missing"} status-${item.status}`}>{statusText}</span>
                </div>

                {hasImageMatches ? (
                  <div className="ren-bulk-img-list">
                    {images.slice(0, 5).map((img) => {
                      const match = matchMap!.get(img.name);
                      if (!match) return null;
                      return <ImageMatchRow key={img.id} match={match} thumbSrc={thumbnailUrl(img.id, rootPath)} />;
                    })}
                    {images.length > 5 && (
                      <div className="ren-bulk-img-more">+{images.length - 5} more images</div>
                    )}
                  </div>
                ) : (
                  <div className="ren-bulk-thumbs">
                    {item.sampleImages.map((image) => <img key={image.id} src={thumbnailUrl(image.id, rootPath)} alt={image.name} loading="lazy" draggable={false} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />)}
                    {item.sampleImages.length === 0 && <span>No images</span>}
                  </div>
                )}

                <div className="ren-bulk-meta">
                  <span>{item.imageCount} images</span>
                  <span>{item.imageIds.length} files queued</span>
                  {item.matchTier && (
                    <span className={`ren-tier-badge ren-tier-${item.matchTier}`}>
                      {item.matchTier.toUpperCase()} {item.matchConfidence != null ? `${Math.round(item.matchConfidence * 100)}%` : ""}
                    </span>
                  )}
                  {!item.matchTier && <span>{ready ? `EAN ${item.ean}` : "EAN needed"}</span>}
                </div>
                <label className="ren-bulk-field">
                  <span>EAN</span>
                  <input value={item.ean} onChange={(e) => onUpdateItem(item.key, { ean: e.target.value, matchSource: "manual" })} placeholder="Enter EAN" />
                </label>
                <label className="ren-bulk-field">
                  <span>Product name</span>
                  <input value={item.productName} onChange={(e) => onUpdateItem(item.key, { productName: e.target.value, matchSource: "manual" })} placeholder="Optional" />
                </label>
                <div className="ren-bulk-card-actions">
                  {hasImageMatches && (
                    <button className="btn btn-secondary btn-sm" onClick={() => setViewItem(item)} title="View all images with match details">
                      Open View
                    </button>
                  )}
                  <button className="btn btn-primary btn-sm" onClick={() => void onOpenItemSingle(item)}>Open Batch</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => onSkipItem(item.key)} disabled={item.status === "done"}>Skip</button>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {viewItem && <ImageViewModal item={viewItem} rootPath={rootPath} onClose={() => setViewItem(null)} />}
    </div>
  );
});
