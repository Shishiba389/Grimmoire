import { useState, useCallback } from "react";
import { apiJson, apiUrl } from "../ToolShared";
import { useJobPolling } from "./hooks";
import type { DuplicateGroup, DuplicateDetectionResponse, SortJobRecord } from "./types";

interface Props {
  folder: string;
  notify: (msg: string, opts?: Record<string, unknown>) => void;
  onGroupingComplete: () => void;
}

const TIER_LABEL: Record<string, string> = { ean: "EAN", code: "CODE", basename: "NAME" };
const TIER_CLASS: Record<string, string> = { ean: "sor-tier-ean", code: "sor-tier-code", basename: "sor-tier-name" };

export function DuplicateDetectionView({ folder, notify, onGroupingComplete }: Props) {
  const [busy, setBusy] = useState(false);
  const [threshold, setThreshold] = useState(0.8);
  const [groups, setGroups] = useState<DuplicateGroup[]>([]);
  const [stats, setStats] = useState<{ grouped: number; ungrouped: number } | null>(null);
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());
  const [skipped, setSkipped] = useState<Set<string>>(new Set());
  const [folderNames, setFolderNames] = useState<Record<string, string>>({});
  const [rawGroupJob, setRawGroupJob] = useState<SortJobRecord | null>(null);

  const groupJob = useJobPolling(
    rawGroupJob,
    useCallback(() => {
      notify("Grouping complete", { type: "success" });
      setRawGroupJob(null);
      onGroupingComplete();
    }, [notify, onGroupingComplete]),
    useCallback((failed: SortJobRecord) => {
      notify("Grouping failed", { type: "error", message: failed.error || "Unknown error" });
      setRawGroupJob(null);
    }, [notify]),
  );

  async function doDetect() {
    if (!folder) { notify("Choose a folder first", { type: "warning" }); return; }
    setBusy(true);
    try {
      const res = await apiJson<DuplicateDetectionResponse>("/api/ean-sorter/detect-duplicates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder, threshold }),
      });
      setGroups(res.groups);
      setStats({ grouped: res.total_images_grouped, ungrouped: res.ungrouped_count });
      setConfirmed(new Set());
      setSkipped(new Set());
      setFolderNames({});
      notify(`Found ${res.groups.length} groups (${res.total_images_grouped} images)`, { type: "success" });
    } catch (err) {
      notify("Detection failed", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setBusy(false);
    }
  }

  function confirmGroup(id: string) {
    setConfirmed((prev) => new Set(prev).add(id));
    setSkipped((prev) => { const n = new Set(prev); n.delete(id); return n; });
  }

  function skipGroup(id: string) {
    setSkipped((prev) => new Set(prev).add(id));
    setConfirmed((prev) => { const n = new Set(prev); n.delete(id); return n; });
  }

  function confirmAll() {
    setConfirmed(new Set(groups.map((g) => g.group_id)));
    setSkipped(new Set());
  }

  function removeImageFromGroup(groupId: string, imagePath: string) {
    setGroups((prev) =>
      prev.map((g) =>
        g.group_id === groupId
          ? { ...g, images: g.images.filter((img) => img.path !== imagePath) }
          : g,
      ).filter((g) => g.images.length >= 2),
    );
  }

  async function doGroup() {
    const toGroup = groups
      .filter((g) => confirmed.has(g.group_id) && !skipped.has(g.group_id))
      .map((g) => ({
        group_id: g.group_id,
        action: "confirm",
        folder_name: folderNames[g.group_id] || g.suggested_folder_name,
        common_key: g.common_key,
        images: g.images.map((img) => ({ path: img.path, name: img.name })),
        removed_paths: [],
      }));

    if (toGroup.length === 0) {
      notify("No groups confirmed", { type: "warning" });
      return;
    }

    setBusy(true);
    try {
      const res = await apiJson<SortJobRecord>("/api/ean-sorter/group-into-folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder, groups: toGroup }),
      });
      setRawGroupJob(res);
    } catch (err) {
      notify("Grouping failed", { type: "error", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setBusy(false);
    }
  }

  const confirmedCount = groups.filter((g) => confirmed.has(g.group_id) && !skipped.has(g.group_id)).length;
  const isGrouping = rawGroupJob?.status === "running";

  return (
    <div className="sor-scanner-area">
      {/* Toolbar */}
      <div className="sor-panel sor-detect-toolbar">
        <div className="sor-panel-head">
          <h3>Duplicate Detection</h3>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <label style={{ fontSize: 13 }}>
              Similarity: <strong>{Math.round(threshold * 100)}%</strong>
            </label>
            <input
              type="range"
              min={50}
              max={100}
              value={Math.round(threshold * 100)}
              onChange={(e) => setThreshold(Number(e.target.value) / 100)}
              style={{ width: 120 }}
            />
            <button className="sor-btn-primary" onClick={doDetect} disabled={busy || !folder || isGrouping}>
              Detect Duplicates
            </button>
          </div>
        </div>

        {stats && (
          <div className="sor-stats-bar">
            <span className="sor-stat"><strong>{groups.length}</strong> Groups</span>
            <span className="sor-stat"><strong>{stats.grouped}</strong> Grouped</span>
            <span className="sor-stat"><strong>{stats.ungrouped}</strong> Ungrouped</span>
            <span className="sor-stat"><strong>{confirmedCount}</strong> Confirmed</span>
          </div>
        )}
      </div>

      {/* Groups list */}
      {groups.length > 0 && (
        <div className="sor-panel">
          <div className="sor-panel-head">
            <h3>Detected Groups</h3>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="sor-btn-secondary" onClick={confirmAll} disabled={busy || isGrouping}>
                Confirm All
              </button>
              <button
                className="sor-btn-primary"
                onClick={doGroup}
                disabled={busy || confirmedCount === 0 || isGrouping}
              >
                {isGrouping
                  ? `Grouping... ${groupJob?.summary?.progress_percent ?? 0}%`
                  : `Group into Folders (${confirmedCount})`}
              </button>
            </div>
          </div>

          <div className="sor-dup-groups">
            {groups.map((g) => {
              const isConfirmed = confirmed.has(g.group_id);
              const isSkipped = skipped.has(g.group_id);
              return (
                <div
                  key={g.group_id}
                  className={`sor-dup-card${isConfirmed ? " sor-dup-confirmed" : ""}${isSkipped ? " sor-dup-skipped" : ""}`}
                >
                  <div className="sor-dup-card-header">
                    <span className={`sor-tag ${TIER_CLASS[g.tier] || ""}`}>
                      {TIER_LABEL[g.tier] || g.tier}
                    </span>
                    <input
                      className="sor-dup-folder-input"
                      value={folderNames[g.group_id] ?? g.suggested_folder_name}
                      onChange={(e) =>
                        setFolderNames((prev) => ({ ...prev, [g.group_id]: e.target.value }))
                      }
                      title="Folder name"
                    />
                    <span className="sor-dup-count">{g.images.length} images</span>
                    <div className="sor-dup-actions">
                      <button
                        className={`sor-btn-sm${isConfirmed ? " sor-btn-active" : ""}`}
                        onClick={() => confirmGroup(g.group_id)}
                        disabled={isGrouping}
                      >
                        Confirm
                      </button>
                      <button
                        className={`sor-btn-sm${isSkipped ? " sor-btn-skip-active" : ""}`}
                        onClick={() => skipGroup(g.group_id)}
                        disabled={isGrouping}
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                  <div className="sor-dup-thumbs">
                    {g.images.map((img) => (
                      <div key={img.path} className="sor-dup-thumb-wrap" title={img.name}>
                        <img
                          className="sor-dup-thumb"
                          src={apiUrl(
                            `/api/ean-sorter/thumbnail?folder=${encodeURIComponent(folder)}&image_path=${encodeURIComponent(img.path)}`,
                          )}
                          alt={img.name}
                          loading="lazy"
                        />
                        <button
                          className="sor-dup-thumb-remove"
                          onClick={() => removeImageFromGroup(g.group_id, img.path)}
                          title="Remove from group"
                          disabled={isGrouping}
                        >
                          ×
                        </button>
                        <span className="sor-dup-thumb-label">{img.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {groups.length === 0 && stats && (
        <div className="sor-panel" style={{ textAlign: "center", padding: 40 }}>
          <p>No duplicate groups detected. All images have unique names.</p>
        </div>
      )}
    </div>
  );
}
