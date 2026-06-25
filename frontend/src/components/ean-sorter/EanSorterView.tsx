import { useState, useCallback } from "react";
import { pickFolder } from "../ToolShared";
import { useNotifications } from "../../contexts/NotificationContext";
import { useJobPolling } from "./hooks";
import { ScannerView } from "./ScannerView";
import { ReviewView } from "./ReviewView";
import { CategorizeView } from "./CategorizeView";
import type { SubView, MatchResult, SortJobRecord } from "./types";
import "./ean-sorter.css";

export function EanSorterView() {
  const { notify } = useNotifications();
  const [folder, setFolder] = useState(() => localStorage.getItem("grimoire-ean-sorter-root") || "");
  const [query, setQuery] = useState("");
  const [activeView, setActiveView] = useState<SubView>("scanner");
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [rawSortJob, setRawSortJob] = useState<SortJobRecord | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);

  const sortJob = useJobPolling(
    rawSortJob,
    useCallback((completed: SortJobRecord) => {
      notify("Sort completed", { type: "success" });
      setRawSortJob(completed);
      setActiveView("review");
    }, []),
    useCallback((failed: SortJobRecord) => {
      notify("Sort failed", { type: "error", message: failed.error || "Unknown error" });
      setRawSortJob(failed);
    }, []),
  );

  async function handlePickFolder() {
    const picked = await pickFolder("Select product image folder");
    if (picked) {
      setFolder(picked);
      localStorage.setItem("grimoire-ean-sorter-root", picked);
    }
  }

  const handleSortStarted = useCallback((job: SortJobRecord) => {
    setRawSortJob(job);
    setActiveView("review");
  }, []);

  const handleMatchResults = useCallback((results: MatchResult[]) => {
    setMatchResults(results);
  }, []);

  const NAV_ITEMS: { key: SubView; label: string; icon: string }[] = [
    { key: "scanner", label: "Scanner", icon: "/icons/ean-sorter-sort.png" },
    { key: "review", label: "Review", icon: "/icons/ean-sorter-report.png" },
    { key: "categorize", label: "Categorize", icon: "/icons/ean-sorter-categorize.png" },
  ];

  return (
    <div className="view tool-view sor-shell">
      <aside className="sor-sidebar">
        <div className="sor-brand">
          <div className="sor-brand-mark">E</div>
          <span>EAN SORTER</span>
        </div>

        <nav className="sor-nav">
          {NAV_ITEMS.map((v) => (
            <button
              key={v.key}
              className={`sor-nav-item${activeView === v.key ? " active" : ""}`}
              onClick={() => setActiveView(v.key)}
            >
              <img src={v.icon} alt="" className="sor-nav-icon" />
              {v.label}
            </button>
          ))}
        </nav>

        <div className="sor-sidebar-spacer" />

        <button className="sor-guide-btn" onClick={() => setGuideOpen(true)}>
          Guide
        </button>

        <div className="sor-mini-card">
          <span>Selected folder</span>
          <strong title={folder || "None"}>{folder || "None"}</strong>
        </div>
      </aside>

      <div className="sor-content">
        <header className="sor-topbar">
          <div className="sor-search">
            <span>Search</span>
            <input
              type="text"
              placeholder="Search EAN or image name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="sor-topbar-actions">
            <button className="sor-btn-secondary" onClick={handlePickFolder}>
              Choose folder
            </button>
          </div>
        </header>

        {activeView === "scanner" && (
          <ScannerView
            folder={folder}
            query={query}
            notify={notify}
            onSortStarted={handleSortStarted}
            onMatchResults={handleMatchResults}
          />
        )}

        {activeView === "review" && (
          <ReviewView
            folder={folder}
            query={query}
            notify={notify}
            matchResults={matchResults}
            sortJob={sortJob}
          />
        )}

        {activeView === "categorize" && (
          <CategorizeView folder={folder} query={query} notify={notify} />
        )}
      </div>

      {guideOpen && (
        <div className="sor-modal" onClick={(e) => { if (e.target === e.currentTarget) setGuideOpen(false); }}>
          <div className="sor-modal-card">
            <div className="sor-panel-head">
              <h2>Guide</h2>
              <button className="sor-btn-icon" onClick={() => setGuideOpen(false)}>Close</button>
            </div>
            <div className="sor-guide-copy">
              <p>1. Click <strong>Choose folder</strong> and select the product image folder.</p>
              <p>2. Upload master data (Excel with EAN / article code / product name columns).</p>
              <p>3. Click <strong>Deep Scan</strong> to find all images recursively.</p>
              <p>4. Click <strong>Match</strong> to run 3-tier matching (EAN, Code, Product Name).</p>
              <p>5. Resolve any ambiguous matches by selecting the correct EAN from the dropdown.</p>
              <p>6. Click <strong>Sort</strong> to create EAN folders and move images.</p>
              <p>7. Open <strong>Review</strong> to see the report, export to Excel, or reveal in Explorer.</p>
              <p>8. Use <strong>Categorize</strong> to organize remaining images into category folders.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
