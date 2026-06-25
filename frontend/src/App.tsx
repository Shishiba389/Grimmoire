import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import {
  NotificationProvider,
  useNotifications,
} from "./contexts/NotificationContext";
import Settings from "./components/Settings";
import {
  DataQcView as RealDataQcView,
  EanRenamerView as RealEanRenamerView,
  EanSorterView as RealEanSorterView,
  ImagesCheckView as RealImagesCheckView,
  PackshotBrowserView as RealPackshotBrowserView,
  ImageEditView as RealImageEditView,
  BulkWorkingView as RealBulkWorkingView,
} from "./components/ToolViews";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { apiJson, apiUrl } from "./components/ToolShared";

/* â”€â”€â”€ SVG Icons â”€â”€â”€ */

function IconDashboard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconDataQC() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  );
}

function IconImageEdit() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

function IconImagesCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 15l3-3 2 2 3-4 2 3" />
      <circle cx="8" cy="8" r="1" />
      <path d="M17 7l3 3" />
      <path d="M20 7l-3 3" />
    </svg>
  );
}

function IconPackshotBrowser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h10" />
      <path d="M7 12h4" />
      <path d="M14 12l3 3" />
      <path d="M17 12l-3 3" />
      <circle cx="9" cy="16" r="1" />
    </svg>
  );
}

function IconEANSorter() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="2" height="16" />
      <rect x="6" y="4" width="1.5" height="16" />
      <rect x="10" y="4" width="2.5" height="16" />
      <rect x="14" y="4" width="1" height="16" />
      <rect x="17" y="4" width="2" height="16" />
      <rect x="21" y="4" width="1" height="16" />
    </svg>
  );
}

function IconEANRenamer() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z" />
      <path d="M15 5l4 4" />
    </svg>
  );
}

function IconBulkWorking() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconCredits() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0114 0" />
      <path d="M18 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
    </svg>
  );
}

function IconGuide() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z" />
      <path d="M8 7h8" />
      <path d="M8 11h6" />
      <path d="M8 15h5" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function IconFolder() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  );
}

function IconUpload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IconCollapse() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function GrimoireLogo() {
  return (
    <img
      src="/icons/logo.png"
      alt="GRIMOIRE"
      style={{ width: 28, height: 28, borderRadius: 6, objectFit: "contain" }}
    />
  );
}

/* â”€â”€â”€ Keyboard shortcuts â”€â”€â”€ */

const SHORTCUTS: Record<string, string> = {
  "/": "1",
  "/data-qc": "2",
  "/image-edit": "3",
  "/images-check": "4",
  "/packshot-browser": "5",
  "/ean-sorter": "6",
  "/ean-renamer": "7",
  "/bulk-working": "8",
  "/guide": "9",
  "/credits": "0",
};

/* â”€â”€â”€ Sidebar â”€â”€â”€ */

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: IconDashboard, img: null, mono: false },
  { to: "/data-qc", label: "Data QC", icon: IconDataQC, img: "/icons/data-qc.png", mono: false },
  { to: "/image-edit", label: "Image Edit", icon: IconImageEdit, img: "/icons/image-edit.png", mono: false },
  { to: "/images-check", label: "Images Check", icon: IconImagesCheck, img: null, mono: false },
  { to: "/packshot-browser", label: "Packshot Browser", icon: IconPackshotBrowser, img: "/icons/ean-sorter-gallery.png", mono: false },
  { to: "/ean-sorter", label: "EAN Sorter", icon: IconEANSorter, img: "/icons/ean-sorter.png", mono: true },
  { to: "/ean-renamer", label: "EAN Renamer", icon: IconEANRenamer, img: "/icons/ean-renamer.png", mono: false },
  { to: "/bulk-working", label: "Bulk Working", icon: IconBulkWorking, img: null, mono: false },
  { to: "/guide", label: "Guide", icon: IconGuide, img: null, mono: false },
  { to: "/credits", label: "Credits", icon: IconCredits, img: null, mono: false },
];

function Sidebar({
  collapsed,
  onToggle,
  onOpenSettings,
}: {
  collapsed: boolean;
  onToggle: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <nav className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-brand">
        <GrimoireLogo />
        {!collapsed && <span className="sidebar-brand-text">GRIMOIRE</span>}
      </div>

      <div className="sidebar-nav">
        {!collapsed && <div className="sidebar-section-label">Main</div>}
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
            title={collapsed ? item.label : undefined}
          >
            {item.img ? (
              <img src={item.img} alt="" className={`sidebar-link-img${item.mono ? " icon-mono" : ""}`} />
            ) : (
              <item.icon />
            )}
            {!collapsed && <span className="sidebar-link-text">{item.label}</span>}
            {!collapsed && SHORTCUTS[item.to] && (
              <kbd className="sidebar-kbd">Ctrl+{SHORTCUTS[item.to]}</kbd>
            )}
          </NavLink>
        ))}
      </div>

      <div className="sidebar-bottom">
        <button
          className="sidebar-link sidebar-link-btn"
          onClick={onOpenSettings}
          title={collapsed ? "Settings" : undefined}
        >
          <IconSettings />
          {!collapsed && <span className="sidebar-link-text">Settings</span>}
        </button>
        <button
          className="sidebar-link sidebar-link-btn"
          onClick={onToggle}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <IconCollapse />
          {!collapsed && <span className="sidebar-link-text">Collapse</span>}
        </button>
      </div>
    </nav>
  );
}

/* â”€â”€â”€ Breadcrumb â”€â”€â”€ */

const ROUTE_NAMES: Record<string, string> = {
  "/": "Dashboard",
  "/data-qc": "Data Quality Control",
  "/image-edit": "Image Edit",
  "/images-check": "Images Check",
  "/packshot-browser": "Packshot Browser",
  "/ean-sorter": "EAN Sorter",
  "/ean-renamer": "EAN Renamer",
  "/bulk-working": "Bulk Working",
  "/guide": "Guide",
  "/credits": "Credits",
};

function Breadcrumb() {
  const location = useLocation();
  const name = ROUTE_NAMES[location.pathname] ?? "Page";
  const isHome = location.pathname === "/";

  return (
    <div className="breadcrumb">
      {!isHome && (
        <>
          <NavLink to="/" className="breadcrumb-link">
            Dashboard
          </NavLink>
          <IconChevron />
        </>
      )}
      <span className="breadcrumb-current">{name}</span>
    </div>
  );
}

/* â”€â”€â”€ Notification panel â”€â”€â”€ */

function NotificationPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { notifications, markAllRead, dismiss, clearAll } = useNotifications();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onClose]);

  if (!open) return null;

  const timeAgo = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="notif-panel" ref={panelRef}>
      <div className="notif-panel-header">
        <h3>Notifications</h3>
        <div className="notif-panel-actions">
          <button onClick={markAllRead}>Mark all read</button>
          <button onClick={clearAll}>Clear</button>
        </div>
      </div>
      <div className="notif-panel-body">
        {notifications.length === 0 ? (
          <div className="notif-empty">No notifications yet</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`notif-item ${n.read ? "" : "unread"} notif-${n.type}`}
            >
              <div className="notif-dot" />
              <div className="notif-content">
                <div className="notif-title">{n.title}</div>
                {n.message && <div className="notif-msg">{n.message}</div>}
                <div className="notif-time">{timeAgo(n.timestamp)}</div>
              </div>
              <button className="notif-dismiss" onClick={() => dismiss(n.id)}>
                âœ•
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* â”€â”€â”€ Top Bar â”€â”€â”€ */

type CommandItem = {
  to: string;
  title: string;
  desc: string;
  keywords: string[];
};

type FileSearchResult = {
  name: string;
  path: string;
  folder: string;
  relativePath: string;
  root: string;
  sizeBytes: number;
  width: number;
  height: number;
};

const APP_VERSION = "2026.06.24.2";

const COMMANDS: CommandItem[] = [
  { to: "/", title: "Dashboard", desc: "Overview, releases, quick actions", keywords: ["home", "dashboard", "main", "release"] },
  { to: "/data-qc", title: "Data QC", desc: "Audit master data and generate reports", keywords: ["data", "qc", "audit", "master", "report", "quality"] },
  { to: "/image-edit", title: "Image Edit", desc: "Batch resize, canvas, upscale, export", keywords: ["image", "edit", "upscale", "resize", "background", "canvas"] },
  { to: "/images-check", title: "Images Check", desc: "Scan folders and delete rejected images", keywords: ["images", "check", "delete", "clean", "review", "gallery", "slideshow"] },
  { to: "/packshot-browser", title: "Packshot Browser", desc: "Browse synced packshot folders, hover preview, select, copy, and export reports", keywords: ["packshot", "browser", "finder", "preview", "hover", "onedrive", "copy", "ean"] },
  { to: "/ean-sorter", title: "EAN Sorter", desc: "3-tier smart matching and auto-sort into EAN folders", keywords: ["ean", "sort", "sorter", "barcode", "folder", "status", "match", "master", "tier"] },
  { to: "/ean-renamer", title: "EAN Renamer", desc: "Rename or copy product images with master data matching", keywords: ["ean", "rename", "renamer", "copy", "packshot", "product name", "master", "match"] },
  { to: "/bulk-working", title: "Bulk Working", desc: "Process multiple EAN folders with kanban, CLIP, and batch renaming", keywords: ["bulk", "working", "batch", "kanban", "clip", "folder", "ean", "rename"] },
  { to: "/guide", title: "Guide", desc: "When to use each tab and how to handle common cases", keywords: ["guide", "help", "how", "workflow", "tab", "case", "huong dan"] },
  { to: "/credits", title: "Credits", desc: "MDX team credits", keywords: ["credits", "team", "about"] },
];

const GRIMOIRE_TIPS = [
  "Run Preview before any in-folder rename so conflicts are visible before files move.",
  "Images Check scans every subfolder, so point it at the highest product folder you trust.",
  "Packshot Browser scans filenames first, then loads previews on demand so synced OneDrive folders stay responsive.",
  "Use EAN_ProductName in EAN Renamer only when the product name should control continuous numbering.",
  "EAN Sorter writes EAN_report.xlsx in the scanned folder after sorting.",
  "Use Copy mode first when testing a new naming rule.",
  "The top search can jump to tools or reveal files in recent output folders.",
];

function commandMatches(command: CommandItem, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  return `${command.title} ${command.desc} ${command.keywords.join(" ")}`.toLowerCase().includes(q);
}

function recentSearchRoots() {
  const roots = new Set<string>();
  const add = (value: string | null) => {
    if (!value) return;
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) parsed.forEach((item) => typeof item === "string" && roots.add(item));
      else if (parsed && typeof parsed === "object") Object.values(parsed).forEach((item) => typeof item === "string" && roots.add(item));
      else if (typeof parsed === "string") roots.add(parsed);
    } catch {
      roots.add(value);
    }
  };
  add(localStorage.getItem("grimoire-ean-renamer-output-roots"));
  add(localStorage.getItem("grimoire-ean-sorter-root"));
  add(localStorage.getItem("grimoire-images-check-root"));
  add(localStorage.getItem("grimoire-packshot-browser-root"));
  return Array.from(roots);
}

function formatSearchSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function TopSearch() {
  const navigate = useNavigate();
  const { notify } = useNotifications();
  const [query, setQuery] = useState("");
  const [fileResults, setFileResults] = useState<FileSearchResult[]>([]);
  const [focused, setFocused] = useState(false);

  const commands = useMemo(() => COMMANDS.filter((item) => commandMatches(item, query)).slice(0, 6), [query]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setFileResults([]);
      return;
    }
    const roots = recentSearchRoots();
    if (roots.length === 0) {
      setFileResults([]);
      return;
    }
    const timer = window.setTimeout(async () => {
      try {
        const result = await apiJson<{ results: FileSearchResult[] }>("/api/search/files", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q, roots, extensions: [".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".avif"], limit: 40 }),
        });
        setFileResults(result.results || []);
      } catch {
        setFileResults([]);
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [query]);

  const openFileFolder = (path: string) => {
    if (window.__grimoire?.revealInExplorer) {
      window.__grimoire.revealInExplorer(path);
    } else {
      void apiJson("/api/local/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });
    }
    notify("Opening output location", { type: "info" });
    setFocused(false);
  };

  const showPanel = focused && query.trim().length > 0;

  return (
    <div className="topbar-search command-search">
      <IconSearch />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && commands[0]) {
            navigate(commands[0].to);
            setFocused(false);
          }
          if (e.key === "Escape") setFocused(false);
        }}
        placeholder="Search features, tools, output files..."
      />
      {showPanel && (
        <div className="command-results" onMouseDown={(e) => e.preventDefault()}>
          {commands.length > 0 && <div className="command-label">Tools</div>}
          {commands.map((item) => (
            <button key={item.to} className="command-row" onClick={() => { navigate(item.to); setFocused(false); }}>
              <strong>{item.title}</strong>
              <span>{item.desc}</span>
              <em>{item.keywords.slice(0, 5).join(" · ")}</em>
            </button>
          ))}
          {fileResults.length > 0 && <div className="command-label">Output files</div>}
          {fileResults.map((item) => (
            <button key={item.path} className="command-row file" onClick={() => openFileFolder(item.path)}>
              <strong>{item.name}</strong>
              <span>{item.relativePath}</span>
              <em>{item.width && item.height ? `${item.width}x${item.height} · ` : ""}{formatSearchSize(item.sizeBytes)}</em>
            </button>
          ))}
          {commands.length === 0 && fileResults.length === 0 && (
            <div className="command-empty">No matching tool or recent output file.</div>
          )}
        </div>
      )}
    </div>
  );
}

function TopBar({ collapsed }: { collapsed: boolean }) {
  const { theme, toggle } = useTheme();
  const { unreadCount } = useNotifications();
  const [backendUp, setBackendUp] = useState<boolean | null>(null);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const check = () =>
      fetch(apiUrl("/health"))
        .then((r) => r.ok && setBackendUp(true))
        .catch(() => setBackendUp(false));
    check();
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className="topbar"
      style={{ left: collapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-width)" }}
    >
      <Breadcrumb />
      <TopSearch />
      <div className="topbar-spacer" />
      <div className="topbar-actions">
        {backendUp !== null && (
          <span className={`status-online ${backendUp ? "" : "offline"}`}>
            <span className="dot" />
            {backendUp ? "Online" : "Offline"}
          </span>
        )}
        <button
          className="topbar-btn"
          onClick={toggle}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <IconSun /> : <IconMoon />}
        </button>
        <div style={{ position: "relative" }}>
          <button
            className="topbar-btn"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <IconBell />
            {unreadCount > 0 && (
              <span className="badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
            )}
          </button>
          <NotificationPanel
            open={notifOpen}
            onClose={() => setNotifOpen(false)}
          />
        </div>
        <div className="topbar-user">
          <img src="/icons/tray.png" alt="" className="topbar-avatar-img" />
          <span className="topbar-username">GRIMOIRE</span>
        </div>
      </div>
    </header>
  );
}

/* â”€â”€â”€ Dashboard â”€â”€â”€ */

const FEATURES = [
  {
    to: "/data-qc",
    title: "Data Quality Control",
    desc: "Audit master data, validate fields, generate quality reports",
    icon: IconDataQC,
    img: "/icons/data-qc.png",
    mono: false,
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
  },
  {
    to: "/image-edit",
    title: "Image Edit",
    desc: "AI background removal, upscaling, batch canvas editing",
    icon: IconImageEdit,
    img: "/icons/image-edit.png",
    mono: false,
    gradient: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
  },
  {
    to: "/packshot-browser",
    title: "Packshot Browser",
    desc: "Browse synced packshot folders, hover preview images, select files, and copy them to output",
    icon: IconPackshotBrowser,
    img: "/icons/ean-sorter-gallery.png",
    mono: false,
    gradient: "linear-gradient(135deg, #0f766e 0%, #2563eb 100%)",
  },
  {
    to: "/ean-sorter",
    title: "EAN Sorter",
    desc: "3-tier smart matching (EAN, article code, product name) with deep scan and auto-sort",
    icon: IconEANSorter,
    img: "/icons/ean-sorter.png",
    mono: true,
    gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)",
  },
  {
    to: "/ean-renamer",
    title: "EAN Renamer",
    desc: "Drag-and-drop image renaming with master data matching and bulk folder mode",
    icon: IconEANRenamer,
    img: "/icons/ean-renamer.png",
    mono: false,
    gradient: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
  },
];

const QUICK_ACTIONS = [
  {
    to: "/ean-sorter",
    title: "Scan Folder",
    desc: "Quick-scan a folder for EAN barcodes",
    icon: IconFolder,
    bg: "#059669",
  },
  {
    to: "/image-edit",
    title: "Batch Process",
    desc: "Upload images for bulk editing",
    icon: IconUpload,
    bg: "#0891b2",
  },
  {
    to: "/data-qc",
    title: "Run Audit",
    desc: "Start a data quality check",
    icon: IconDataQC,
    bg: "#4f46e5",
  },
];

const BANNERS = [
  {
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 35%, #4338ca 100%)",
    accentColor: "#818cf8",
    svgPattern: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs><pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="rgba(129,140,248,0.15)"/></pattern><pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0V60H0" fill="none" stroke="rgba(129,140,248,0.06)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#dots)"/><rect width="100%" height="100%" fill="url(#grid)"/><circle cx="85%" cy="25%" r="120" fill="rgba(99,102,241,0.08)"/><circle cx="70%" cy="70%" r="80" fill="rgba(129,140,248,0.06)"/></svg>`,
    to: "/data-qc",
    title: "Data Quality Control",
    desc: "Audit master data, validate fields, generate missing data reports and quality checks across brands.",
    btn: "Open Data QC",
  },
  {
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 35%, #0ea5e9 100%)",
    accentColor: "#7dd3fc",
    svgPattern: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs><pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 20h15l5-5 5 5h15" fill="none" stroke="rgba(125,211,252,0.1)" stroke-width="1"/><path d="M20 0v15l5 5-5 5v15" fill="none" stroke="rgba(125,211,252,0.1)" stroke-width="1"/><circle cx="20" cy="20" r="2" fill="rgba(125,211,252,0.12)"/></pattern></defs><rect width="100%" height="100%" fill="url(#circuit)"/><circle cx="80%" cy="30%" r="100" fill="rgba(14,165,233,0.1)"/><circle cx="25%" cy="75%" r="70" fill="rgba(56,189,248,0.06)"/></svg>`,
    to: "/image-edit",
    title: "Image Edit",
    desc: "AI-powered background removal, smart upscaling, batch canvas editing for product images.",
    btn: "Open Image Edit",
  },
  {
    gradient: "linear-gradient(135deg, #052e16 0%, #065f46 35%, #059669 100%)",
    accentColor: "#6ee7b7",
    svgPattern: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs><pattern id="hex" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse"><path d="M28 0l28 16v32l-28 16L0 48V16z" fill="none" stroke="rgba(110,231,183,0.08)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#hex)"/><circle cx="75%" cy="35%" r="110" fill="rgba(5,150,105,0.1)"/><circle cx="30%" cy="80%" r="60" fill="rgba(52,211,153,0.06)"/></svg>`,
    to: "/ean-sorter",
    title: "EAN Sorter",
    desc: "3-tier smart matching with deep scan, auto-sort by EAN, article code, or product name.",
    btn: "Open EAN Sorter",
  },
  {
    gradient: "linear-gradient(135deg, #451a03 0%, #92400e 35%, #d97706 100%)",
    accentColor: "#fcd34d",
    svgPattern: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs><pattern id="diag" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 20L20 0" fill="none" stroke="rgba(252,211,77,0.07)" stroke-width="1"/></pattern><pattern id="dots2" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="16" cy="16" r="1.5" fill="rgba(252,211,77,0.1)"/></pattern></defs><rect width="100%" height="100%" fill="url(#diag)"/><rect width="100%" height="100%" fill="url(#dots2)"/><circle cx="82%" cy="28%" r="90" fill="rgba(217,119,6,0.1)"/><circle cx="20%" cy="70%" r="65" fill="rgba(251,191,36,0.06)"/></svg>`,
    to: "/ean-renamer",
    title: "EAN Renamer",
    desc: "Drag-and-drop image renaming with master data matching and bulk folder processing mode.",
    btn: "Open EAN Renamer",
  },
];

const CHANGELOG_ENTRIES = [
  {
    version: "2026.06.24.2",
    date: "2026-06-24",
    title: "Smart image matching and auto-sort",
    type: "EAN Renamer",
    changes: [
      "Per-image matching: file names are matched against master data (EAN, article code, product name) with tier badges and confidence on each card.",
      "Auto-Sort: one click sorts matched images into product-based columns automatically, unmatched stay in Unsorted.",
      "Bulk mode now sends all image names (not just samples) for deeper matching accuracy.",
      "Click-to-select + Shift-range + drag: redesigned drag and drop with explicit multi-select.",
      "Dashboard banners redesigned with SVG patterns and glassmorphism cards.",
    ],
  },
  {
    version: "2026.06.24.0",
    date: "2026-06-24",
    title: "EAN Sorter v2 and Bulk master data matching",
    type: "EAN Sorter + EAN Renamer",
    changes: [
      "EAN Sorter rebuilt with 3-tier matching: EAN checksum, article code tokens, and product name fuzzy matching against uploaded master data.",
      "Deep scan finds all images recursively with loose image collection, ambiguous match resolution, and confidence-scored results.",
      "Frontend split from monolithic 2400-line component into modular Scanner, Review, and Categorize views.",
      "EAN Renamer bulk mode now supports master data upload and 3-tier matching with tier badges, confidence display, and match review modal.",
    ],
  },
  {
    version: "2026.06.23.3",
    date: "2026-06-23",
    title: "EAN Renamer Bulk folder queue",
    type: "EAN Renamer",
    changes: [
      "Bulk Working now acts as a folder queue: scan the root folder, pick one folder batch, then classify images in Single Folder mode.",
      "Bulk cards keep optional Custom EAN/Product Name values and prefill Single Folder when opening a batch.",
      "Completed batches are marked Done and the Single Folder view now offers Back to Bulk and Next Batch controls.",
    ],
  },
  {
    version: "2026.06.23.2",
    date: "2026-06-23",
    title: "EAN Renamer Bulk Working phase one",
    type: "EAN Renamer",
    changes: [
      "Added a Bulk Working subview for scanning a root folder into folder work items with image counts, excluding video formats.",
      "Bulk cards support manual EAN/Product Name entry plus TXT/Excel mapping or master-data matching before preview.",
      "Bulk preview and copy reuse the existing EAN Renamer naming/output rules with per-folder EAN and product data.",
    ],
  },
  {
    version: "2026.06.23.1",
    date: "2026-06-23",
    title: "EAN Renamer drag group clarity",
    type: "EAN Renamer",
    changes: [
      "Drag grouping now shows a live floating count so users know exactly how many images are being moved.",
      "Cards added to the drag group use a dedicated grouped style and badges separate from checkbox selection.",
      "Drop targets now explain whether the images will move to a column, create a Duplicate group, or add to an existing group.",
    ],
  },
  {
    version: "2026.06.23.0",
    date: "2026-06-23",
    title: "EAN Renamer drag grouping and dynamic outputs",
    type: "EAN Renamer",
    changes: [
      "Dragging an image no longer moves unrelated checked images; groups are formed by dragging across cards in the same source column.",
      "The rename preview panel is now a floating pop-up that can be shown or hidden without shrinking the board.",
      "Added categories now automatically get matching output slots and Duplicate boxes using the same naming rules as existing columns.",
    ],
  },
  {
    version: "2026.06.22.3",
    date: "2026-06-22",
    title: "Packshot folder and thumbnail hotfix",
    type: "Packshot Browser",
    changes: [
      "Selecting a parent folder now shows images from its child folders, matching the folder counts in the sidebar.",
      "Cloud-only OneDrive thumbnails now use Windows Explorer cached bitmaps more reliably without downloading original files.",
      "The large-folder workflow keeps progressive thumbnail loading while fixing empty parent-folder views.",
    ],
  },
  {
    version: "2026.06.22.2",
    date: "2026-06-22",
    title: "Guide details and banner readability",
    type: "Guide + Interface",
    changes: [
      "Expanded the Guide tab in English with detailed purpose, key features, step-by-step usage, common cases, and notes for each tool tab.",
      "Updated USER_GUIDE.txt so the external guide matches the in-app English documentation.",
      "Improved dashboard banner text contrast with a dedicated readable overlay treatment across dark and light themes.",
    ],
  },
  {
    version: "2026.06.22.1",
    date: "2026-06-22",
    title: "English in-app guide",
    type: "Guide",
    changes: [
      "Added a Guide tab to the sidebar and command search.",
      "Documented when to use each GRIMOIRE tab, safe workflow habits, and common support steps.",
      "Refreshed the desktop build with the new guide route and updated build version.",
    ],
  },
  {
    version: "2026.06.22.1",
    date: "2026-06-22",
    title: "Large-folder Packshot Browser",
    type: "Packshot Browser",
    changes: [
      "Packshot Browser now indexes folder metadata first instead of sending every image to the UI at once.",
      "The left panel prioritizes the real folder tree with image counts; the gallery loads only the selected folder.",
      "Thumbnails load progressively with a limited queue so very large OneDrive and local folders stay responsive.",
    ],
  },
  {
    version: "2026.06.22.0",
    date: "2026-06-22",
    title: "Persistent Image Edit presets and output history",
    type: "Image Edit",
    changes: [
      "Custom Image Edit dimension presets can now be saved and reused after reopening the app.",
      "Preview and completed job outputs now stay visible in the Outputs panel instead of replacing the previous result.",
      "Local folder output now writes each Image Edit folder job into a timestamped run folder to avoid overwriting older output.",
    ],
  },
  {
    version: "2026.06.19.0",
    date: "2026-06-19",
    title: "Packshot Browser tab",
    type: "Packshot Browser",
    changes: [
      "Added a dedicated Packshot Browser tab for scanning synced folders without requiring Excel input.",
      "Images can be searched by EAN, folder, filename, and product keywords with hover previews and detailed file metadata.",
      "Selected images can be copied to an output folder with folder preservation or EAN grouping plus a CSV report.",
    ],
  },
  {
    version: "2026.06.18.2",
    date: "2026-06-18",
    title: "Faster Images Check browsing",
    type: "Images Check",
    changes: [
      "Image tiles now load cached thumbnails instead of full-size product images.",
      "Hover previews no longer rerender continuously while the cursor moves.",
      "Folder sections use browser render containment to keep large scans smoother.",
    ],
  },
  {
    version: "2026.06.18.1",
    date: "2026-06-18",
    title: "Folder-aware Images Check gallery",
    type: "Images Check + Interface",
    changes: [
      "Images Check now groups scanned images by source folder and subfolder so review decisions stay tied to the exact file location.",
      "Gallery view now uses horizontal folder lanes with per-image Keep and Delete actions.",
      "Command start screen typography is more compact and removes the duplicated GRIMOIRE title effect.",
    ],
  },
  {
    version: "2026.06.18.0",
    date: "2026-06-18",
    title: "Images Check, quick search, and fullscreen fit",
    type: "Interface + Desktop",
    changes: [
      "Added Images Check with recursive folder scanning, slideshow/gallery review modes, image hover details, and confirmed permanent deletion.",
      "Startup fallback now opens a GRIMOIRE command search screen with build information and rotating app tips.",
      "Top search can jump to tools and reveal matching output files from EAN Sorter, EAN Renamer, and Images Check.",
      "Desktop window sizing now uses the full screen work area when maximized.",
    ],
  },
  {
    version: "2026.06.16.8",
    date: "2026-06-16",
    title: "DPI-aware window sizing and scroll safety",
    type: "Desktop + Interface",
    changes: [
      "Desktop window now clamps itself to the active screen work area for 125% and 150% display scaling.",
      "Main app content now scrolls inside the viewport so tool panels and actions are not clipped.",
      "Topbar spacing becomes more compact on narrow or scaled screens.",
    ],
  },
  {
    version: "2026.06.16.7",
    date: "2026-06-16",
    title: "Status folder jobs, master data cache, and image output structure",
    type: "EAN Sorter + Data QC + Image Edit",
    changes: [
      "EAN Sorter status folder creation now runs as a background job with progress polling.",
      "Master Data reads are cached by file timestamp and size to reduce repeated Excel parsing.",
      "Image Edit no longer creates one output folder per root-level image filename EAN.",
    ],
  },
  {
    version: "2026.06.16.6",
    date: "2026-06-16",
    title: "Duplicate group numbering and backend stability",
    type: "EAN Renamer + Desktop",
    changes: [
      "Duplicate column now supports multiple groups per category.",
      "Prefixed naming keeps JPG/PNG variants in the same duplicate group on the same number.",
      "Desktop host now monitors the backend and refreshes the API port after automatic restart.",
    ],
  },
  {
    version: "2026.06.16.5",
    date: "2026-06-16",
    title: "Credits tab",
    type: "Interface",
    changes: [
      "Added a dedicated Credits tab in the main sidebar.",
      "Credits page lists MDX Team ownership and contributor roles.",
      "Keyboard navigation now supports Ctrl+6 for Credits.",
    ],
  },
  {
    version: "2026.06.16.4",
    date: "2026-06-16",
    title: "Master Data tab & Status folder creation",
    type: "Data QC + EAN Sorter",
    changes: [
      "New Master Data tab: upload DQC report + master data, select brand, generate Missing_Data and Status files.",
      "EAN Sorter Categorize: upload status file to create product folders organized by status with EAN subfolders.",
      "Prefixed naming now uses full category names (Pack_shot, Human, etc.) with per-category numbering.",
    ],
  },
  {
    version: "2026.06.16.2",
    date: "2026-06-16",
    title: "EAN Renamer output isolation",
    type: "EAN Renamer",
    changes: [
      "Lifestyle/Human and Lifestyle/Normal copy outputs now create an EAN subfolder.",
      "Packshot and Artwork continue to output into category/EAN folders.",
      "Desktop startup now avoids reusing old backend processes.",
    ],
  },
  {
    version: "2026.06.16.1",
    date: "2026-06-16",
    title: "Prefixed naming and duplicate first-shot handling",
    type: "EAN Renamer",
    changes: [
      "Prefixed mode supports duplicate JPG/PNG variants sharing the same first-shot number.",
      "Product Name only uses EAN_ProductName naming when the checkbox is enabled.",
      "Custom EAN works with both Prefixed and EAN_ProductName naming flows.",
    ],
  },
  {
    version: "2026.06.16.0",
    date: "2026-06-16",
    title: "Portability and support scripts",
    type: "System",
    changes: [
      "Removed machine-specific path assumptions from desktop and startup scripts.",
      "Added setup, repair, and diagnostic scripts for testers on other Windows machines.",
      "Added installation, user, and SOP documentation files.",
    ],
  },
  {
    version: "2026.06.15",
    date: "2026-06-15",
    title: "Unified GRIMOIRE desktop toolkit",
    type: "Platform",
    changes: [
      "Integrated Data QC, Image Edit, EAN Sorter, and EAN Renamer into one desktop shell.",
      "Added WebView2 desktop wrapper with local backend bridge.",
      "Added initial dashboard, navigation, and shared UI structure.",
    ],
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const { notify } = useNotifications();
  const [bannerIdx, setBannerIdx] = useState(() => Math.floor(Math.random() * BANNERS.length));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setBannerIdx((i) => (i + 1) % BANNERS.length);
    }, 6000);
  }, []);

  useEffect(() => {
    notify("Welcome to GRIMOIRE", {
      type: "info",
      message: "All systems operational",
      browser: false,
    });
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const goToBanner = (idx: number) => {
    setBannerIdx(idx);
    startTimer();
  };

  const banner = BANNERS[bannerIdx];
  const latest = CHANGELOG_ENTRIES[0];

  return (
    <div className="view">
      {/* Banner Carousel + Latest Update */}
      <div className="hero changelog-hero">
        <div className="hero-visual changelog-visual" style={{ position: "relative", overflow: "hidden" }}>
          {BANNERS.map((b, i) => (
            <div
              key={b.to}
              style={{
                position: "absolute",
                inset: 0,
                background: b.gradient,
                opacity: i === bannerIdx ? 1 : 0,
                transition: "opacity 0.8s ease",
              }}
            >
              <div
                style={{ position: "absolute", inset: 0 }}
                dangerouslySetInnerHTML={{ __html: b.svgPattern }}
              />
            </div>
          ))}
          <div className="dashboard-glass-card" style={{ position: "relative", zIndex: 2 }}>
            <h1 style={{ color: banner.accentColor }}>{banner.title}</h1>
            <p>{banner.desc}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 18 }}>
              <button
                className="hero-btn"
                onClick={() => navigate(banner.to)}
              >
                {banner.btn} <IconArrowRight />
              </button>
              <div style={{ display: "flex", gap: 6 }}>
                {BANNERS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToBanner(i)}
                    style={{
                      width: i === bannerIdx ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      border: "none",
                      background: i === bannerIdx ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hero-info changelog-summary">
          <h3>Latest Update</h3>
          <span className="changelog-type" style={{ marginBottom: 8, display: "inline-block" }}>{latest.type}</span>
          <h4 style={{ margin: "4px 0 10px", fontSize: "1.05rem", fontWeight: 600, lineHeight: 1.3 }}>{latest.title}</h4>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.65, listStyleType: "'\\2022  '" }}>
            {latest.changes.slice(0, 3).map((c) => (
              <li key={c} style={{ marginBottom: 4 }}>{c}</li>
            ))}
          </ul>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 12 }}>
            v{latest.version} &middot; {latest.date}
          </div>
        </div>
      </div>

      <div className="section-header">
        <h2>Features</h2>
      </div>
      <div className="card-grid">
        {FEATURES.map((f) => (
          <NavLink key={f.to} to={f.to} className="feature-card">
            <div className="feature-card-cover">
              <div
                className="feature-card-gradient"
                style={{ background: f.gradient }}
              >
                <img
                  src={f.img}
                  alt={f.title}
                  className={`feature-card-icon-img${f.mono ? " icon-mono" : ""}`}
                />
              </div>
            </div>
            <div className="feature-card-body">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="feature-card-status">
                <span className="dot" />
                Ready
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      <div className="section-header">
        <h2>Quick Actions</h2>
      </div>
      <div className="quick-actions">
        {QUICK_ACTIONS.map((a) => (
          <NavLink key={a.title} to={a.to} className="quick-action">
            <div className="quick-action-icon" style={{ background: a.bg }}>
              <a.icon />
            </div>
            <div className="quick-action-text">
              <h4>{a.title}</h4>
              <p>{a.desc}</p>
            </div>
          </NavLink>
        ))}
      </div>

      <div className="section-header">
        <h2>Release Notes</h2>
      </div>
      <div className="changelog-list">
        {CHANGELOG_ENTRIES.map((entry) => (
          <article key={entry.version} className="changelog-entry">
            <div className="changelog-entry-head">
              <div>
                <span className="changelog-type">{entry.type}</span>
                <h3>{entry.title}</h3>
              </div>
              <div className="changelog-meta">
                <strong>{entry.version}</strong>
                <span>{entry.date}</span>
              </div>
            </div>
            <ul>
              {entry.changes.map((change) => (
                <li key={change}>{change}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

/* Guide */

const GUIDE_OVERVIEW = [
  ["Data QC", "Audit master data files, find missing data, rule issues, duplicates, and export review reports."],
  ["Image Edit", "Batch process product images: resize, canvas, background cleanup, upscale, naming, and export."],
  ["Images Check", "Review image folders visually, mark bad images, and delete only after confirmation."],
  ["Packshot Browser", "Search synced packshot folders by EAN, filename, folder, or keyword, then copy selected files."],
  ["EAN Sorter", "Deep scan images, match against master data using 3-tier matching (EAN, article code, product name), and sort into EAN folders."],
  ["EAN Renamer", "Copy or rename product images by EAN with master data matching, drag-and-drop categories, bulk folder mode, and naming rules."],
];

const GUIDE_TABS = [
  {
    title: "Data QC",
    purpose: "Use Data QC when the source is a master data Excel or CSV file and the goal is to find data quality issues before the file moves to the next workflow.",
    features: [
      "Upload or select master data files.",
      "Audit required fields, missing values, invalid formats, duplicates, and configured rule checks.",
      "Generate Excel reports for review, correction, and team handoff.",
      "Use rule profile settings when the validation scope needs to match the current business rules.",
    ],
    steps: [
      "Open Data QC.",
      "Select the master data file.",
      "Choose audit options if the tab exposes them for the current workflow.",
      "Run the audit and wait for the job to finish.",
      "Review the summary and exported report.",
      "Fix the source data, then run the audit again if needed.",
    ],
    cases: [
      "Use it before sending master data to operations, marketplace upload, or another system.",
      "Use it when product records are rejected because fields are missing or inconsistent.",
      "Use it when a team needs a report showing what must be corrected.",
    ],
    notes: [
      "If the file cannot be read, check sheet names, header rows, merged cells, and whether the file is actually an exported report instead of the original master data.",
      "Keep the original input file separate from the generated report.",
    ],
  },
  {
    title: "Image Edit",
    purpose: "Use Image Edit when images need batch processing for marketplace or catalog output.",
    features: [
      "Add individual image files or process an input folder.",
      "Use built-in dimension presets or save custom dimension presets for later sessions.",
      "Control width, height, aspect lock, fit mode, margins, DPI, canvas background, and layout preset.",
      "Use image filters such as whitespace removal, product fill, safe padding, white background checks, shadow removal, and background removal.",
      "Use standard upscale or Real-ESRGAN when local AI tools are available.",
      "Choose output format, quality, max file size, naming rule, and local or ZIP output.",
      "Keep recent previews and completed job outputs in the Outputs panel instead of replacing the previous result.",
    ],
    steps: [
      "Open Image Edit.",
      "Choose files with Add, or select an input folder.",
      "Pick a dimension preset or enter Width and Height manually.",
      "Click Save next to Dimension Preset if this size should be reused later.",
      "Choose layout, canvas, upscale, filter, output, and naming settings.",
      "Run Preview (First 1) to validate the output on one image.",
      "Adjust settings if needed, then click Start Processing.",
      "Use the Outputs panel to switch between recent previews and completed jobs, then download the selected job.",
    ],
    cases: [
      "Use it to make all product images 1000 x 1000, 1500 x 1500, Amazon main image size, or a saved customer-specific preset.",
      "Use it when images have too much whitespace around the product.",
      "Use it when the same input batch must be exported as JPG, PNG, WEBP, or TIFF with consistent naming.",
      "Use local folder output when the processed files should remain directly accessible in a folder; each run creates a separate timestamped output folder.",
    ],
    notes: [
      "Large images and AI upscale can take more RAM and processing time.",
      "Always preview before a large batch when changing canvas, background, or upscale settings.",
      "Do not put the output folder inside the input folder.",
    ],
  },
  {
    title: "Images Check",
    purpose: "Use Images Check when the task is visual review and cleanup of a folder tree.",
    features: [
      "Scan every supported image in a selected folder.",
      "Review images in slideshow or gallery mode.",
      "Filter by image name, folder, or path.",
      "Mark images for deletion without deleting immediately.",
      "Save deletion only after confirming the selected rejected files.",
    ],
    steps: [
      "Open Images Check.",
      "Choose the folder that contains the images to review.",
      "Click Scan all.",
      "Use slideshow mode for focused review or gallery mode for faster comparison.",
      "Mark bad images for deletion.",
      "Check the Delete count, then click Save deletion when ready.",
    ],
    cases: [
      "Use it when a packshot folder contains blurry, duplicated, wrong, or irrelevant images.",
      "Use it before Image Edit if the batch should be cleaned first.",
      "Use it after Image Edit if the output folder needs manual visual QA.",
    ],
    notes: [
      "Deletion is permanent after confirmation.",
      "If you only need to find and copy good packshots, Packshot Browser is usually safer than deleting files.",
    ],
  },
  {
    title: "Packshot Browser",
    purpose: "Use Packshot Browser when the task is finding, previewing, selecting, and copying existing packshot files.",
    features: [
      "Index local or synced folder structures without requiring an Excel file.",
      "Browse the real folder tree first, then load only the selected folder gallery.",
      "Search inside the selected folder by EAN, filename, folder, extension, and product keywords.",
      "Load images page by page so very large libraries stay responsive.",
      "Load thumbnails progressively through a limited queue instead of requesting everything at once.",
      "Hover thumbnails for larger preview and file metadata.",
      "Select files and copy them to an output folder.",
      "Export a CSV report of copied or selected files.",
      "Handle OneDrive cloud-only files carefully by using cached or SharePoint online thumbnails when possible.",
    ],
    steps: [
      "Open Packshot Browser.",
      "Choose the source packshot folder.",
      "Click Scan to build the folder index.",
      "Choose the folder to inspect from the left panel.",
      "Use search inside the selected folder if needed.",
      "Click Load more thumbnails when the folder has more results.",
      "Hover a thumbnail to inspect it.",
      "Select the files to collect.",
      "Choose an output folder.",
      "Click Copy selected and review the generated report.",
    ],
    cases: [
      "Use it when someone asks for all packshots for one EAN or product group.",
      "Use it to collect images from a OneDrive-synced library without accidentally downloading every file.",
      "Use it when the source folder must stay unchanged.",
    ],
    notes: [
      "Cloud-only OneDrive files may show placeholders if Windows has no cached thumbnail and SharePoint online preview is unavailable.",
      "Copy selected may trigger OneDrive to download the original selected files.",
      "Keep output outside the source folder.",
    ],
  },
  {
    title: "EAN Sorter",
    purpose: "Use EAN Sorter when images need to be matched against product master data and sorted into EAN folders.",
    features: [
      "Deep scan recursively finds all images across subfolders with stats and loose image detection.",
      "Upload master data (Excel with EAN, article code, or product name columns) for 3-tier matching.",
      "Tier 1: EAN checksum detection from filenames (confidence 1.0).",
      "Tier 2: Article code token matching against master data (confidence 0.8).",
      "Tier 3: Product name fuzzy matching using sequence similarity (threshold 0.6, confidence up to 0.7).",
      "Resolve ambiguous matches via dropdown before sorting.",
      "Auto-sort creates EAN folders and moves matched images with a detailed Excel report.",
      "Categorize view creates product folders organized by status with EAN subfolders.",
    ],
    steps: [
      "Open EAN Sorter.",
      "Choose the source folder.",
      "Upload master data (Excel with EAN / article code / product name columns).",
      "Click Deep Scan to find all images recursively.",
      "Collect loose images if any are found outside subfolders.",
      "Click Match to run 3-tier matching against master data.",
      "Resolve any ambiguous matches by selecting the correct EAN from dropdowns.",
      "Click Sort to create EAN folders and move images.",
      "Open Review to see the report, export to Excel, or reveal in Explorer.",
    ],
    cases: [
      "Use it when images arrive unsorted and folder names must be based on EAN.",
      "Use it when filenames contain article codes or product names instead of barcodes.",
      "Use it to separate matched and unmatched files for manual follow-up.",
    ],
    notes: [
      "Master data quality directly affects matching accuracy — ensure EAN and article code columns are clean.",
      "Tier 3 fuzzy matching may produce false positives — always review ambiguous results before sorting.",
      "Review results before applying folder changes.",
    ],
  },
  {
    title: "EAN Renamer",
    purpose: "Use EAN Renamer when selected images need structured category folders and predictable filenames.",
    features: [
      "Scan a source folder and place images into workflow columns.",
      "Classify images into Packshot, Human, Normal Lifestyle, Artwork, and Duplicate groups.",
      "Use folder-derived EANs or a Custom EAN.",
      "Choose Copy mode or in-folder Rename mode.",
      "Choose naming modes: per-category, continuous, prefixed, or EAN_ProductName behavior.",
      "Set output folders per category.",
      "Preview output names and conflicts before applying.",
      "Undo recent operations when log data is available.",
    ],
    steps: [
      "Open EAN Renamer.",
      "Pick the source folder.",
      "Drag images into the correct category columns.",
      "Set output folders if using Copy mode.",
      "Choose output mode and naming mode in settings.",
      "Enter Custom EAN or Product Name only when the current workflow requires it.",
      "Use 1st markers when specific images should become the first image in a category.",
      "Click Preview and review every output path and status.",
      "Apply Copy or Rename only after the preview is correct.",
    ],
    cases: [
      "Use Copy mode when testing a new naming rule or protecting original files.",
      "Use in-folder Rename only when the source folder is trusted and backed up.",
      "Use Duplicate groups when multiple files represent the same shot, such as JPG and PNG versions.",
      "Use Product Name naming only when filenames must include a specific product name.",
    ],
    notes: [
      "Filename conflicts must be fixed before apply.",
      "Undo depends on the operation log and may not work if files are manually moved or deleted after applying.",
      "Preview is the most important step in this tab.",
    ],
  },
  {
    title: "Settings, Repair, and Diagnostics",
    purpose: "Use the Settings and support scripts when the app behavior, theme, backend, or environment needs adjustment.",
    features: [
      "Settings controls app-level preferences exposed by the current build.",
      "REPAIR_GRIMOIRE.bat is the first recovery step for broken dependencies or startup issues.",
      "DIAGNOSE_GRIMOIRE.bat creates diagnostic output for support.",
      "START_DESKTOP.bat starts the desktop experience; START_GRIMOIRE.bat can be used for browser/dev mode.",
    ],
    steps: [
      "If a tab behaves unexpectedly, close and reopen the app first.",
      "Run REPAIR_GRIMOIRE.bat if the backend or dependencies fail.",
      "Run DIAGNOSE_GRIMOIRE.bat if repair does not solve the issue.",
      "Send the diagnostics folder to support with a short description of the workflow that failed.",
    ],
    cases: [
      "Use repair after moving the project folder, updating dependencies, or seeing backend startup errors.",
      "Use diagnostics when a bug needs to be reproduced or escalated.",
    ],
    notes: [
      "Do not delete backend storage or logs unless support asks for it.",
      "Keep source files and output folders separate during troubleshooting.",
    ],
  },
];

function GuideView() {
  return (
    <div className="view guide-view">
      <section className="guide-hero">
        <div>
          <div className="credits-kicker">Guide</div>
          <h1>GRIMOIRE User Guide</h1>
          <p>Use this guide to choose the right tab, understand each feature, follow safe workflows, and handle common product data or image cases.</p>
        </div>
      </section>

      <section className="guide-panel guide-overview">
        <h2>Quick Tab Selection</h2>
        <div className="guide-list">
          {GUIDE_OVERVIEW.map(([label, body]) => (
            <article className="guide-item" key={label}>
              <strong>{label}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="guide-tab-stack">
        {GUIDE_TABS.map((tab) => (
          <section className="guide-tab-panel" key={tab.title}>
            <div className="guide-tab-head">
              <h2>{tab.title}</h2>
              <p>{tab.purpose}</p>
            </div>
            <div className="guide-columns">
              <div>
                <h3>Key Features</h3>
                <ul>{tab.features.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h3>How To Use</h3>
                <ol>{tab.steps.map((item) => <li key={item}>{item}</li>)}</ol>
              </div>
              <div>
                <h3>Common Cases</h3>
                <ul>{tab.cases.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h3>Notes</h3>
                <ul>{tab.notes.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/* Credits */

const CREDIT_ITEMS = [
  { role: "Building & Planning", name: "Damien" },
  { role: "Idea & Planning", name: "Tomasz" },
  { role: "Tester", name: "Tyson" },
];

function CreditsView() {
  return (
    <div className="view credits-view">
      <section className="credits-panel" aria-label="GRIMOIRE credits">
        <div className="credits-kicker">Credits</div>
        <h1>MDX Team</h1>
        <p className="credits-owner">Credits belong to MDX Team.</p>

        <div className="credits-list">
          {CREDIT_ITEMS.map((item) => (
            <div className="credit-row" key={item.role}>
              <span className="credit-role">{item.role}</span>
              <strong className="credit-name">{item.name}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CommandHome() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * GRIMOIRE_TIPS.length));
  const matches = useMemo(
    () => (query.trim() ? COMMANDS.filter((item) => commandMatches(item, query)) : []),
    [query]
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setTipIndex((index) => (index + 1) % GRIMOIRE_TIPS.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="command-home">
      <div className="command-stars" aria-hidden="true">✦</div>
      <div className="command-brand">
        <span>GRIMOIRE</span>
      </div>
      <div className="command-box">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && matches[0]) navigate(matches[0].to);
          }}
          placeholder="Type a tool, workflow, EAN, image, audit..."
        />
        <div className="command-build"><strong>Build</strong><span>{APP_VERSION}</span></div>
      </div>
      {query.trim() && (
        <div className="command-home-results">
          {matches.length ? matches.map((item) => (
            <button key={item.to} onClick={() => navigate(item.to)}>
              <strong>{item.title}</strong>
              <span>{item.desc}</span>
              <em>{item.keywords.join(" · ")}</em>
            </button>
          )) : <div className="command-home-empty">No tab matches that keyword.</div>}
        </div>
      )}
      <div className="command-tip"><strong>Tip</strong><span>{GRIMOIRE_TIPS[tipIndex]}</span></div>
    </div>
  );
}
/* â”€â”€â”€ Shell (keyboard shortcuts + layout) â”€â”€â”€ */

function AppShell() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("grimoire-sidebar") === "collapsed";
  });
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("grimoire-sidebar", collapsed ? "collapsed" : "expanded");
  }, [collapsed]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && !e.shiftKey && !e.altKey) {
        const target = Object.entries(SHORTCUTS).find(([, key]) => key === e.key)?.[0];
        if (target) {
          e.preventDefault();
          navigate(target);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  return (
    <div className={`app-layout ${collapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      <TopBar collapsed={collapsed} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/data-qc"
            element={
              <RealDataQcView />
            }
          />
          <Route
            path="/image-edit"
            element={
              <RealImageEditView />
            }
          />
          <Route
            path="/images-check"
            element={
              <RealImagesCheckView />
            }
          />
          <Route
            path="/packshot-browser"
            element={
              <RealPackshotBrowserView />
            }
          />
          <Route
            path="/ean-sorter"
            element={
              <ErrorBoundary fallbackLabel="EAN Sorter encountered an error">
                <RealEanSorterView />
              </ErrorBoundary>
            }
          />
          <Route
            path="/ean-renamer"
            element={
              <ErrorBoundary fallbackLabel="EAN Renamer encountered an error">
                <RealEanRenamerView />
              </ErrorBoundary>
            }
          />
          <Route
            path="/bulk-working"
            element={
              <ErrorBoundary fallbackLabel="Bulk Working encountered an error">
                <RealBulkWorkingView />
              </ErrorBoundary>
            }
          />
          <Route path="/guide" element={<GuideView />} />
          <Route path="/credits" element={<CreditsView />} />
          <Route path="*" element={<CommandHome />} />
        </Routes>
      </main>
      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

/* â”€â”€â”€ App â”€â”€â”€ */

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </NotificationProvider>
    </ThemeProvider>
  );
}
