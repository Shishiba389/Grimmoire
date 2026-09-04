using System.IO;
using System.Runtime.InteropServices;
using System.Windows;
using System.Windows.Interop;
using System.Windows.Threading;
using Microsoft.Web.WebView2.Core;

namespace Grimoire.Desktop;

public partial class MainWindow : Window
{
    private readonly BackendManager _backend = BackendManager.Instance;
    private readonly DispatcherTimer _backendWatchdog;
    private bool _backendCheckInProgress;

    [DllImport("dwmapi.dll", CharSet = CharSet.Unicode, PreserveSig = false)]
    private static extern void DwmSetWindowAttribute(
        IntPtr hwnd, int attribute, ref int pvAttribute, int cbAttribute);

    private const int DWMWA_WINDOW_CORNER_PREFERENCE = 33;
    private const int DWMWCP_ROUND = 2;

    public MainWindow()
    {
        InitializeComponent();
        _backend.Log += OnBackendLog;
        _backendWatchdog = new DispatcherTimer { Interval = TimeSpan.FromSeconds(10) };
        _backendWatchdog.Tick += BackendWatchdog_Tick;
        SourceInitialized += (_, _) => ApplyRoundedCorners();
    }

    private void ApplyRoundedCorners()
    {
        try
        {
            var hwnd = new WindowInteropHelper(this).Handle;
            var preference = DWMWCP_ROUND;
            DwmSetWindowAttribute(hwnd, DWMWA_WINDOW_CORNER_PREFERENCE,
                ref preference, sizeof(int));
        }
        catch { }
    }

    private async void Window_Loaded(object sender, RoutedEventArgs e)
    {
        FitWindowToWorkArea();
        UpdateStatus("Starting backend...");

        var backendTask = _backend.StartAsync();
        var webviewTask = PrepareWebView();

        await Task.WhenAll(backendTask, webviewTask);

        var ok = backendTask.Result;
        if (!ok)
        {
            UpdateStatus("Backend failed to start. Check logs.");
            MessageBox.Show(
                "Failed to start the GRIMOIRE backend.\n\n" +
                "Please reinstall GRIMOIRE using the full installer. " +
                "If the problem continues, contact support with the installer version.",
                "GRIMOIRE - Startup Error",
                MessageBoxButton.OK,
                MessageBoxImage.Error);
            return;
        }

        UpdateStatus("Loading UI...");
        NavigateWebView();
        _backendWatchdog.Start();
        _ = Task.Run(async () =>
        {
            await Task.Delay(TimeSpan.FromSeconds(10));
            await UpdateService.CheckDownloadAndApplySilentlyAsync(OnBackendLog);
        });
    }

    private void FitWindowToWorkArea()
    {
        var workArea = SystemParameters.WorkArea;

        MinWidth = Math.Min(MinWidth, Math.Max(640, workArea.Width));
        MinHeight = Math.Min(MinHeight, Math.Max(420, workArea.Height));
        MaxWidth = double.PositiveInfinity;
        MaxHeight = double.PositiveInfinity;

        if (Width > workArea.Width) Width = workArea.Width;
        if (Height > workArea.Height) Height = workArea.Height;

        Left = workArea.Left + Math.Max(0, (workArea.Width - Width) / 2);
        Top = workArea.Top + Math.Max(0, (workArea.Height - Height) / 2);
    }

    private string? _wwwroot;

    private async Task PrepareWebView()
    {
        var userDataFolder = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "Grimoire", "WebView2");

        Directory.CreateDirectory(userDataFolder);

        var env = await CoreWebView2Environment.CreateAsync(
            userDataFolder: userDataFolder);

        await WebView.EnsureCoreWebView2Async(env);
        await WebView.CoreWebView2.Profile.ClearBrowsingDataAsync(CoreWebView2BrowsingDataKinds.AllProfile);

        var settings = WebView.CoreWebView2.Settings;
        settings.IsStatusBarEnabled = false;
        settings.AreDefaultContextMenusEnabled = true;
        settings.IsZoomControlEnabled = true;
        settings.AreDevToolsEnabled = true;

        _wwwroot = FindWwwRoot();
        if (_wwwroot != null)
        {
            WebView.CoreWebView2.SetVirtualHostNameToFolderMapping(
                "grimoire.local", _wwwroot,
                CoreWebView2HostResourceAccessKind.Allow);

            WebView.CoreWebView2.AddWebResourceRequestedFilter(
                "https://grimoire.local/*",
                CoreWebView2WebResourceContext.Document);

            WebView.CoreWebView2.WebResourceRequested += (sender, args) =>
            {
                var uri = new Uri(args.Request.Uri);
                var path = uri.AbsolutePath.TrimStart('/');
                if (!string.IsNullOrEmpty(path) && !Path.HasExtension(path))
                {
                    var indexPath = Path.Combine(_wwwroot, "index.html");
                    if (File.Exists(indexPath))
                    {
                        var stream = new FileStream(indexPath, FileMode.Open, FileAccess.Read, FileShare.Read);
                        args.Response = WebView.CoreWebView2.Environment.CreateWebResourceResponse(
                            stream, 200, "OK", "Content-Type: text/html; charset=utf-8");
                    }
                }
            };

            var proxyScript = BuildProxyScript();
            await WebView.CoreWebView2.AddScriptToExecuteOnDocumentCreatedAsync(proxyScript);
            WebView.CoreWebView2.WebMessageReceived += OnWebMessage;
        }

        WebView.CoreWebView2.NavigationCompleted += (_, args) =>
        {
            Dispatcher.Invoke(() =>
            {
                SplashGrid.Visibility = Visibility.Collapsed;
                WebView.Visibility = Visibility.Visible;
            });
        };

        WebView.CoreWebView2.DocumentTitleChanged += (_, _) =>
        {
            Dispatcher.Invoke(() =>
            {
                var docTitle = WebView.CoreWebView2.DocumentTitle;
                Title = string.IsNullOrEmpty(docTitle) || docTitle == "GRIMOIRE"
                    ? "GRIMOIRE"
                    : $"GRIMOIRE — {docTitle}";
            });
        };

        // External links open in default browser
        WebView.CoreWebView2.NewWindowRequested += (_, args) =>
        {
            args.Handled = true;
            if (!string.IsNullOrEmpty(args.Uri))
            {
                System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
                {
                    FileName = args.Uri,
                    UseShellExecute = true
                });
            }
        };
    }

    private void NavigateWebView()
    {
        if (_wwwroot != null)
        {
            var indexVersion = File.GetLastWriteTimeUtc(Path.Combine(_wwwroot, "index.html")).Ticks;
            WebView.CoreWebView2.Navigate($"https://grimoire.local/index.html?v={indexVersion}");
        }
        else
        {
            WebView.CoreWebView2.Navigate(_backend.BaseUrl);
        }
    }

    private string BuildProxyScript()
    {
        var backendUrl = _backend.BaseUrl;

        return $$"""
        (function() {
            const INITIAL_BACKEND = '{{backendUrl}}';
            window.__GRIMOIRE_API_BASE__ = window.__GRIMOIRE_API_BASE__ || INITIAL_BACKEND;
            function backendBase() {
                return (window.__GRIMOIRE_API_BASE__ || INITIAL_BACKEND).replace(/\/$/, '');
            }

            // ── Fetch proxy ──
            const _fetch = window.fetch.bind(window);
            window.fetch = function(input, init) {
                let url = input;
                if (input instanceof Request) {
                    url = input.url;
                } else if (typeof input === 'string') {
                    url = input;
                }

                if (typeof url === 'string') {
                    // Proxy /api/* and /health to backend
                    if (url.startsWith('/api') || url.startsWith('/health')) {
                        url = backendBase() + url;
                    }
                    // Also handle relative URLs that become grimoire.local/api/...
                    else if (url.includes('grimoire.local/api') || url.includes('grimoire.local/health')) {
                        url = url.replace(/https?:\/\/grimoire\.local/, backendBase());
                    }
                    else if (/^https?:\/\/127\.0\.0\.1:\d+\/(api|health)/.test(url) || /^https?:\/\/localhost:\d+\/(api|health)/.test(url)) {
                        url = url.replace(/^https?:\/\/(127\.0\.0\.1|localhost):\d+/, backendBase());
                    }
                }

                if (input instanceof Request) {
                    return _fetch(new Request(url, input), init);
                }
                return _fetch(url, init);
            };

            // ── XMLHttpRequest proxy ──
            const _xhrOpen = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function(method, url, ...rest) {
                if (typeof url === 'string') {
                    if (url.startsWith('/api') || url.startsWith('/health')) {
                        url = backendBase() + url;
                    } else if (url.includes('grimoire.local/api') || url.includes('grimoire.local/health')) {
                        url = url.replace(/https?:\/\/grimoire\.local/, backendBase());
                    } else if (/^https?:\/\/127\.0\.0\.1:\d+\/(api|health)/.test(url) || /^https?:\/\/localhost:\d+\/(api|health)/.test(url)) {
                        url = url.replace(/^https?:\/\/(127\.0\.0\.1|localhost):\d+/, backendBase());
                    }
                }
                return _xhrOpen.call(this, method, url, ...rest);
            };

            // ── Native bridge for desktop features ──
            window.__grimoire = {
                isDesktop: true,
                windowMinimize: function() {
                    window.chrome.webview.postMessage(JSON.stringify({ type: 'windowMinimize' }));
                },
                windowMaximize: function() {
                    window.chrome.webview.postMessage(JSON.stringify({ type: 'windowMaximize' }));
                },
                windowClose: function() {
                    window.chrome.webview.postMessage(JSON.stringify({ type: 'windowClose' }));
                },
                windowDragStart: function() {
                    window.chrome.webview.postMessage(JSON.stringify({ type: 'windowDragStart' }));
                },
                pickFolder: function(title, initialDir) {
                    return new Promise(function(resolve) {
                        const id = 'pick_' + Date.now();
                        window.__grimoire._pending = window.__grimoire._pending || {};
                        window.__grimoire._pending[id] = resolve;
                        window.chrome.webview.postMessage(JSON.stringify({
                            type: 'pickFolder', id: id, title: title || 'Select folder',
                            initialDir: initialDir || ''
                        }));
                    });
                },
                pickFile: function(title, filters) {
                    return new Promise(function(resolve) {
                        const id = 'pick_' + Date.now();
                        window.__grimoire._pending = window.__grimoire._pending || {};
                        window.__grimoire._pending[id] = resolve;
                        window.chrome.webview.postMessage(JSON.stringify({
                            type: 'pickFile', id: id, title: title || 'Select file',
                            filters: filters || ''
                        }));
                    });
                },
                revealInExplorer: function(path) {
                    window.chrome.webview.postMessage(JSON.stringify({
                        type: 'reveal', path: path
                    }));
                },
                _pending: {}
            };

            // Handle responses from C#
            window.chrome.webview.addEventListener('message', function(e) {
                try {
                    var msg = JSON.parse(e.data);
                    if (msg.id && window.__grimoire._pending[msg.id]) {
                        window.__grimoire._pending[msg.id](msg.result);
                        delete window.__grimoire._pending[msg.id];
                    }
                } catch(_) {}
            });
        })();
        """;
    }

    private async void BackendWatchdog_Tick(object? sender, EventArgs e)
    {
        if (_backendCheckInProgress) return;
        _backendCheckInProgress = true;
        try
        {
            var ok = await _backend.EnsureRunningAsync();
            if (ok)
            {
                await PushBackendBaseToWebView();
            }
            UpdateStatus(ok ? "Backend online" : "Backend offline");
        }
        finally
        {
            _backendCheckInProgress = false;
        }
    }

    private async Task PushBackendBaseToWebView()
    {
        if (WebView.CoreWebView2 == null) return;
        var url = _backend.BaseUrl.Replace("\\", "\\\\").Replace("'", "\\'");
        await WebView.CoreWebView2.ExecuteScriptAsync(
            $"window.__GRIMOIRE_API_BASE__ = '{url}'; window.dispatchEvent(new CustomEvent('grimoire:backend-ready', {{ detail: {{ baseUrl: '{url}' }} }}));");
    }

    private async void OnWebMessage(object? sender, CoreWebView2WebMessageReceivedEventArgs args)
    {
        try
        {
            var json = args.TryGetWebMessageAsString();
            if (string.IsNullOrEmpty(json)) return;

            var msg = System.Text.Json.JsonDocument.Parse(json);
            var root = msg.RootElement;
            var type = root.GetProperty("type").GetString();
            var id = root.TryGetProperty("id", out var idProp) ? idProp.GetString() : null;

            switch (type)
            {
                case "pickFolder":
                    await HandlePickFolder(id, root);
                    break;
                case "pickFile":
                    await HandlePickFile(id, root);
                    break;
                case "reveal":
                    HandleReveal(root);
                    break;
                case "windowMinimize":
                    Dispatcher.Invoke(() => WindowState = WindowState.Minimized);
                    break;
                case "windowMaximize":
                    Dispatcher.Invoke(() =>
                        WindowState = WindowState == WindowState.Maximized
                            ? WindowState.Normal
                            : WindowState.Maximized);
                    break;
                case "windowClose":
                    Dispatcher.Invoke(Close);
                    break;
                case "windowDragStart":
                    Dispatcher.Invoke(() =>
                    {
                        if (WindowState == WindowState.Maximized)
                        {
                            var point = System.Windows.Input.Mouse.GetPosition(this);
                            var pctX = point.X / ActualWidth;
                            WindowState = WindowState.Normal;
                            Left = point.X - (Width * pctX);
                            Top = 0;
                        }
                        DragMove();
                    });
                    break;
            }
        }
        catch { }
    }

    private async Task HandlePickFolder(string? id, System.Text.Json.JsonElement root)
    {
        var title = root.TryGetProperty("title", out var t) ? t.GetString() : "Select folder";
        var initialDir = root.TryGetProperty("initialDir", out var d) ? d.GetString() : null;

        string? result = null;
        await Dispatcher.InvokeAsync(() =>
        {
            var dialog = new Microsoft.Win32.OpenFolderDialog
            {
                Title = title,
                Multiselect = false
            };
            if (!string.IsNullOrEmpty(initialDir) && System.IO.Directory.Exists(initialDir))
                dialog.InitialDirectory = initialDir;
            if (dialog.ShowDialog(this) == true)
                result = dialog.FolderName;
        });

        if (id != null)
        {
            var escaped = (result ?? "").Replace("\\", "\\\\").Replace("'", "\\'");
            await WebView.CoreWebView2.ExecuteScriptAsync(
                $"window.chrome.webview.postMessage(JSON.stringify({{id:'{id}',result:'{escaped}'}}))");

            // Actually send from C# side
            WebView.CoreWebView2.PostWebMessageAsString(
                System.Text.Json.JsonSerializer.Serialize(new { id, result = result ?? "" }));
        }
    }

    private async Task HandlePickFile(string? id, System.Text.Json.JsonElement root)
    {
        var title = root.TryGetProperty("title", out var t) ? t.GetString() : "Select file";
        var filters = root.TryGetProperty("filters", out var f) ? f.GetString() : "";

        string? result = null;
        await Dispatcher.InvokeAsync(() =>
        {
            var dialog = new Microsoft.Win32.OpenFileDialog
            {
                Title = title,
                Filter = string.IsNullOrEmpty(filters)
                    ? "All files (*.*)|*.*"
                    : filters
            };
            if (dialog.ShowDialog(this) == true)
                result = dialog.FileName;
        });

        if (id != null)
        {
            WebView.CoreWebView2.PostWebMessageAsString(
                System.Text.Json.JsonSerializer.Serialize(new { id, result = result ?? "" }));
        }
    }

    private void HandleReveal(System.Text.Json.JsonElement root)
    {
        var path = root.TryGetProperty("path", out var p) ? p.GetString() : null;
        if (!string.IsNullOrEmpty(path) && (File.Exists(path) || Directory.Exists(path)))
        {
            System.Diagnostics.Process.Start("explorer.exe",
                File.Exists(path) ? $"/select,\"{path}\"" : $"\"{path}\"");
        }
    }

    private static string? FindWwwRoot()
    {
        var exe = System.Diagnostics.Process.GetCurrentProcess().MainModule?.FileName;
        if (exe == null) return null;

        var dir = Path.GetDirectoryName(exe)!;

        // Check wwwroot next to exe
        var candidate = Path.Combine(dir, "wwwroot");
        if (Directory.Exists(candidate) && File.Exists(Path.Combine(candidate, "index.html")))
            return candidate;

        // Dev: walk up to find frontend/dist
        var search = dir;
        for (int i = 0; i < 5; i++)
        {
            candidate = Path.Combine(search, "frontend", "dist");
            if (Directory.Exists(candidate) && File.Exists(Path.Combine(candidate, "index.html")))
                return candidate;
            search = Path.GetDirectoryName(search)!;
        }

        return null;
    }

    private void UpdateStatus(string text)
    {
        Dispatcher.Invoke(() => StatusText.Text = text);
    }

    private void OnBackendLog(string msg)
    {
        Dispatcher.Invoke(() => StatusText.Text = msg.Length > 80 ? msg[..80] + "..." : msg);
    }

    private void Window_StateChanged(object sender, EventArgs e)
    {
        if (WindowState == WindowState.Maximized)
        {
            var workArea = SystemParameters.WorkArea;
            MaxWidth = workArea.Width + 14;
            MaxHeight = workArea.Height + 14;
        }
        else
        {
            MaxWidth = double.PositiveInfinity;
            MaxHeight = double.PositiveInfinity;
        }
        PushWindowState();
    }

    private void PushWindowState()
    {
        if (WebView?.CoreWebView2 == null) return;
        var isMax = WindowState == WindowState.Maximized ? "true" : "false";
        WebView.CoreWebView2.ExecuteScriptAsync(
            $"document.documentElement.dataset.windowMaximized = '{isMax}';" +
            $"window.dispatchEvent(new CustomEvent('grimoire:window-state', {{ detail: {{ maximized: {isMax} }} }}));");
    }

    private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
    {
        _backendWatchdog.Stop();
        _backend.Log -= OnBackendLog;
        _backend.Stop();
        try { WebView?.Dispose(); } catch { }
    }
}
