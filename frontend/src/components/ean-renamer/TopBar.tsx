import { memo, type RefObject } from "react";
import type { RenImage, ClipProgress, SettingsState, OutputMode, NamingMode, ViewMode, BulkWorkItem, ImageMatchItem } from "./types";

type ImageMatchSummary = { matched: number; total: number } | null;

type Props = {
  viewMode: ViewMode;
  setViewMode: (m: ViewMode) => void;
  folderPath: string;
  detectedEan: string;
  customEan: string;
  setCustomEan: (v: string) => void;
  productName: string;
  setProductName: (v: string) => void;
  productNameContinuous: boolean;
  setProductNameContinuous: (v: boolean) => void;
  images: RenImage[];
  totalImages: number;
  selectedCount: number;
  masterSessionId: string;
  imageMatches: Map<string, ImageMatchItem>;
  imageMatchSummary: ImageMatchSummary;
  clipBusy: boolean;
  clipProgress: ClipProgress | null;
  showSettings: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
  eanValid: boolean;
  bulkRootPath: string;
  bulkItems: BulkWorkItem[];
  settingsRef: RefObject<HTMLDivElement | null>;
  onPickFolder: () => void;
  onOpenPath: () => void;
  onRefresh: () => void;
  onMatchImages: (images: RenImage[], sessionId: string) => void;
  onAutoSort: () => void;
  onAutoClassify: () => void;
  onCancelClassify: () => void;
  onReturnToBulk: () => void;
  onLoadBulkFolder: (path: string) => void;
};

export const TopBar = memo(function TopBar(props: Props) {
  const {
    viewMode, setViewMode, folderPath, detectedEan, customEan, setCustomEan,
    productName, setProductName, productNameContinuous, setProductNameContinuous,
    images, totalImages, selectedCount, masterSessionId, imageMatches,
    imageMatchSummary, clipBusy, clipProgress, showSettings, setShowSettings,
    settings, setSettings, eanValid, bulkRootPath, bulkItems, settingsRef,
    onPickFolder, onOpenPath, onRefresh, onMatchImages, onAutoSort,
    onAutoClassify, onCancelClassify, onReturnToBulk, onLoadBulkFolder,
  } = props;

  return (
    <div className="ren-topbar">
      <div className="ren-topbar-row">
        <div className="ren-mode-switch">
          <button className={viewMode === "single" ? "active" : ""} onClick={() => setViewMode("single")}>Single Folder</button>
          <button
            className={viewMode === "bulk" ? "active" : ""}
            onClick={() => {
              onReturnToBulk();
              if ((bulkRootPath || folderPath) && bulkItems.length === 0) onLoadBulkFolder(bulkRootPath || folderPath);
            }}
          >
            Bulk Working
          </button>
        </div>
        <div className="ren-folder-group">
          <input className="ren-path-input" readOnly value={folderPath} placeholder="No folder selected" />
          <button className="btn btn-primary btn-sm" onClick={onPickFolder}>Pick Folder</button>
          <button className="btn btn-secondary btn-sm" onClick={onOpenPath} disabled={!folderPath}>Open</button>
          <button className="btn btn-secondary btn-sm" onClick={onRefresh} disabled={!folderPath}>Refresh</button>
          {masterSessionId && viewMode === "single" && (
            <>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => images.length > 0 && onMatchImages(images, masterSessionId)}
                disabled={!folderPath || images.length === 0}
                title="Match image file names against master data"
              >
                Match{imageMatchSummary ? ` (${imageMatchSummary.matched}/${imageMatchSummary.total})` : ""}
              </button>
              <button
                className="btn btn-accent btn-sm"
                onClick={onAutoSort}
                disabled={imageMatches.size === 0}
                title="Auto-sort images into columns by matched product"
              >
                Auto-Sort
              </button>
            </>
          )}
          {images.length > 0 && !clipBusy && (
            <button
              className="btn btn-clip btn-sm"
              onClick={onAutoClassify}
              disabled={clipBusy || images.length === 0}
              title="Use CLIP AI to auto-classify images into categories"
            >
              AI Classify
            </button>
          )}
          {clipBusy && clipProgress && (
            <div className="ren-clip-progress">
              <span className="ren-clip-phase">
                {clipProgress.phase === "loading_model" ? "Loading model" :
                 clipProgress.phase === "loading_taxonomy" ? "Loading taxonomy" :
                 clipProgress.phase === "loading_references" ? "Loading refs" :
                 clipProgress.phase === "scanning" ? "Scanning" :
                 clipProgress.phase === "preparing_prompts" ? "Preparing" :
                 clipProgress.phase === "classifying" ? "Classifying" : clipProgress.phase}
              </span>
              {clipProgress.phase === "classifying" && (
                <span className="ren-clip-count">{clipProgress.processed}/{clipProgress.total}</span>
              )}
              {clipProgress.eta_seconds > 0 && (
                <span className="ren-clip-eta">~{Math.ceil(clipProgress.eta_seconds)}s</span>
              )}
              <button className="btn btn-sm btn-danger" onClick={onCancelClassify}>Cancel</button>
            </div>
          )}
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
  );
});
