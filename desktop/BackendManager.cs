using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Net.NetworkInformation;

namespace Grimoire.Desktop;

public sealed class BackendManager
{
    public static BackendManager Instance { get; } = new();

    private Process? _backendProcess;
    private readonly HttpClient _http = new() { Timeout = TimeSpan.FromSeconds(3) };
    private readonly SemaphoreSlim _startLock = new(1, 1);

    public int Port { get; private set; } = 7788;
    public string BaseUrl => $"http://127.0.0.1:{Port}";
    public event Action<string>? Log;

    private BackendManager() { }

    public async Task<bool> StartAsync()
    {
        await _startLock.WaitAsync();
        try
        {
            if (_backendProcess is { HasExited: false } && await IsRunningAsync())
                return true;

            Stop();

            Port = FindFreePort(7788);
            var backendDir = FindBackendDir();
            var python = FindPython(backendDir);

            if (python == null || backendDir == null)
            {
                Log?.Invoke("ERROR: Could not find Python venv or backend directory");
                return false;
            }

            Log?.Invoke($"Starting backend on port {Port}...");

            var psi = new ProcessStartInfo
            {
                FileName = python,
                Arguments = $"-m uvicorn main:app --host 127.0.0.1 --port {Port} --timeout-keep-alive 30",
                WorkingDirectory = backendDir,
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
            };

            psi.Environment["PYTHONDONTWRITEBYTECODE"] = "1";

            _backendProcess = Process.Start(psi);
            if (_backendProcess == null)
            {
                Log?.Invoke("ERROR: Failed to start backend process");
                return false;
            }

            _backendProcess.OutputDataReceived += (_, e) => { if (e.Data != null) Log?.Invoke(e.Data); };
            _backendProcess.ErrorDataReceived += (_, e) => { if (e.Data != null) Log?.Invoke(e.Data); };
            _backendProcess.BeginOutputReadLine();
            _backendProcess.BeginErrorReadLine();

            for (int i = 0; i < 60; i++)
            {
                await Task.Delay(500);
                if (await IsRunningAsync())
                {
                    Log?.Invoke("Backend is ready");
                    return true;
                }
            }

            Log?.Invoke("ERROR: Backend did not start within 30 seconds");
            return false;
        }
        finally
        {
            _startLock.Release();
        }
    }

    public async Task<bool> EnsureRunningAsync()
    {
        if (_backendProcess is { HasExited: false } && await IsRunningAsync())
            return true;
        Log?.Invoke("Backend is offline. Restarting...");
        return await StartAsync();
    }

    public void Stop()
    {
        if (_backendProcess is { HasExited: false })
        {
            try
            {
                _backendProcess.Kill(entireProcessTree: true);
                _backendProcess.WaitForExit(5000);
            }
            catch { }
        }
        _backendProcess?.Dispose();
        _backendProcess = null;
    }

    public async Task<bool> IsRunningAsync()
    {
        try
        {
            var resp = await _http.GetAsync($"{BaseUrl}/health");
            return resp.IsSuccessStatusCode;
        }
        catch
        {
            return false;
        }
    }

    private static string? FindBackendDir()
    {
        var exe = Process.GetCurrentProcess().MainModule?.FileName;
        if (exe == null) return null;

        var dir = Path.GetDirectoryName(exe)!;
        // Walk up to find the backend folder
        for (int i = 0; i < 5; i++)
        {
            var candidate = Path.Combine(dir, "backend");
            if (Directory.Exists(candidate) && File.Exists(Path.Combine(candidate, "main.py")))
                return candidate;

            candidate = Path.Combine(dir, "..", "backend");
            if (Directory.Exists(candidate) && File.Exists(Path.Combine(candidate, "main.py")))
                return Path.GetFullPath(candidate);

            dir = Path.GetDirectoryName(dir)!;
        }

        return null;
    }

    private static string? FindPython(string? backendDir)
    {
        if (backendDir == null) return null;

        // Installer build bundles a portable Python runtime here. Prefer it over
        // a virtual environment because Windows venvs retain the build-machine
        // Python path in pyvenv.cfg and are not safely portable.
        var bundledPython = Path.Combine(backendDir, "python", "python.exe");
        if (File.Exists(bundledPython)) return bundledPython;

        // Check venv first
        var venvPython = Path.Combine(backendDir, ".venv", "Scripts", "python.exe");
        if (File.Exists(venvPython)) return venvPython;

        // Fallback to system python
        var systemPython = FindInPath("python.exe");
        return systemPython;
    }

    private static string? FindInPath(string exe)
    {
        var path = Environment.GetEnvironmentVariable("PATH") ?? "";
        foreach (var dir in path.Split(';'))
        {
            var full = Path.Combine(dir.Trim(), exe);
            if (File.Exists(full)) return full;
        }
        return null;
    }

    private static int FindFreePort(int preferred)
    {
        if (!IsPortInUse(preferred)) return preferred;
        for (int p = preferred + 1; p < preferred + 100; p++)
        {
            if (!IsPortInUse(p)) return p;
        }
        return preferred;
    }

    private static bool IsPortInUse(int port)
    {
        var props = IPGlobalProperties.GetIPGlobalProperties();
        foreach (var ep in props.GetActiveTcpListeners())
        {
            if (ep.Port == port) return true;
        }
        return false;
    }
}
