import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
  timestamp: number;
  read: boolean;
}

interface NotifyOpts {
  type?: Notification["type"];
  message?: string;
  browser?: boolean;
}

interface NotificationCtx {
  notifications: Notification[];
  unreadCount: number;
  notify: (title: string, opts?: NotifyOpts) => void;
  markAllRead: () => void;
  dismiss: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationCtx>(null!);

let counter = 0;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [toasts, setToasts] = useState<Notification[]>([]);

  const notify = useCallback((title: string, opts: NotifyOpts = {}) => {
    const n: Notification = {
      id: `n-${++counter}-${Date.now()}`,
      type: opts.type ?? "info",
      title,
      message: opts.message,
      timestamp: Date.now(),
      read: false,
    };

    setNotifications((prev) => [n, ...prev].slice(0, 50));
    setToasts((prev) => [n, ...prev]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== n.id));
    }, 5000);

    if (opts.browser !== false && document.hidden && "Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(title, { body: opts.message, icon: "/favicon.ico" });
      } else if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    setToasts([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, notify, markAllRead, dismiss, clearAll }}
    >
      {children}
      {/* Toast container */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <div className="toast-icon">
              {t.type === "success" && "✓"}
              {t.type === "error" && "✕"}
              {t.type === "warning" && "⚠"}
              {t.type === "info" && "ℹ"}
            </div>
            <div className="toast-body">
              <div className="toast-title">{t.title}</div>
              {t.message && <div className="toast-msg">{t.message}</div>}
            </div>
            <button className="toast-close" onClick={() => dismiss(t.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
