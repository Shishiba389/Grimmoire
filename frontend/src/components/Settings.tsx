import { useTheme } from "../contexts/ThemeContext";
import { useNotifications } from "../contexts/NotificationContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Settings({ open, onClose }: Props) {
  const { theme, toggle } = useTheme();
  const { notify } = useNotifications();

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="setting-group">
            <h3>Appearance</h3>

            <div className="setting-row">
              <div className="setting-info">
                <div className="setting-label">Theme</div>
                <div className="setting-desc">
                  Switch between dark and light mode
                </div>
              </div>
              <button
                className={`theme-toggle ${theme}`}
                onClick={toggle}
                aria-label="Toggle theme"
              >
                <span className="theme-toggle-track">
                  <span className="theme-toggle-icon">
                    {theme === "dark" ? "🌙" : "☀️"}
                  </span>
                  <span className="theme-toggle-thumb" />
                </span>
              </button>
            </div>
          </div>

          <div className="setting-group">
            <h3>Notifications</h3>

            <div className="setting-row">
              <div className="setting-info">
                <div className="setting-label">Browser Notifications</div>
                <div className="setting-desc">
                  Receive alerts even when the app is in the background
                </div>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  if ("Notification" in window) {
                    Notification.requestPermission().then((p) => {
                      notify(
                        p === "granted"
                          ? "Notifications enabled!"
                          : "Notifications blocked",
                        { type: p === "granted" ? "success" : "warning" }
                      );
                    });
                  }
                }}
              >
                {typeof Notification !== "undefined" &&
                Notification.permission === "granted"
                  ? "Enabled"
                  : "Enable"}
              </button>
            </div>

            <div className="setting-row">
              <div className="setting-info">
                <div className="setting-label">Test Notification</div>
                <div className="setting-desc">
                  Send a test toast to verify notifications work
                </div>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() =>
                  notify("Test notification", {
                    type: "success",
                    message: "Notifications are working!",
                    browser: true,
                  })
                }
              >
                Test
              </button>
            </div>
          </div>

          <div className="setting-group">
            <h3>About</h3>
            <div className="setting-row">
              <div className="setting-info">
                <div className="setting-label">GRIMOIRE</div>
                <div className="setting-desc">
                  Unified Product Data Toolkit — v1.0.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
