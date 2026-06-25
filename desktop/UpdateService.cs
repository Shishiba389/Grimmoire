using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Net.Http;
using System.Net.Http.Json;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Windows;

namespace Grimoire.Desktop;

public static class UpdateService
{
    private const string ReleaseApiUrl = "https://api.github.com/repos/Shishiba389/Grimoire_Release/releases/latest";
    private static readonly SemaphoreSlim UpdateLock = new(1, 1);

    private static readonly HttpClient Http = new()
    {
        Timeout = TimeSpan.FromSeconds(30),
        DefaultRequestHeaders =
        {
            { "User-Agent", "Grimoire-Updater" },
            { "Accept", "application/vnd.github+json" }
        }
    };

    public static string CurrentVersion =>
        Assembly.GetExecutingAssembly().GetName().Version?.ToString(3) ?? "0.0.0";

    public static async Task CheckDownloadAndApplySilentlyAsync(Action<string>? log = null)
    {
        if (!await UpdateLock.WaitAsync(0))
            return;

        try
        {
            log?.Invoke("Checking for updates...");

            var release = await Http.GetFromJsonAsync<GitHubRelease>(ReleaseApiUrl);
            if (release == null)
            {
                log?.Invoke("Could not reach update server");
                return;
            }

            var remoteVersion = ParseVersion(release.TagName);
            var localVersion = Version.Parse(CurrentVersion);

            if (remoteVersion <= localVersion)
            {
                log?.Invoke("GRIMOIRE is up to date");
                return;
            }

            var patchAsset = release.Assets?.FirstOrDefault(a =>
                a.Name.Contains("patch", StringComparison.OrdinalIgnoreCase) &&
                a.Name.EndsWith(".zip", StringComparison.OrdinalIgnoreCase));

            if (patchAsset == null)
            {
                log?.Invoke($"Update {release.TagName} available — please download the new installer from GitHub");
                return;
            }

            log?.Invoke($"Downloading update {release.TagName}...");
            var appDir = Path.GetDirectoryName(Environment.ProcessPath)!;
            var tempZip = Path.Combine(Path.GetTempPath(), $"grimoire-patch-{release.TagName}.zip");
            var tempExtract = Path.Combine(Path.GetTempPath(), $"grimoire-patch-{release.TagName}");

            await using (var stream = await Http.GetStreamAsync(patchAsset.BrowserDownloadUrl))
            await using (var file = File.Create(tempZip))
            {
                await stream.CopyToAsync(file);
            }

            log?.Invoke("Applying update...");

            if (Directory.Exists(tempExtract))
                Directory.Delete(tempExtract, true);
            ZipFile.ExtractToDirectory(tempZip, tempExtract);

            var updaterScript = Path.Combine(Path.GetTempPath(), "grimoire-update.cmd");
            var scriptContent = BuildUpdateScript(appDir, tempExtract, tempZip, Environment.ProcessPath!);
            await File.WriteAllTextAsync(updaterScript, scriptContent);

            var result = MessageBox.Show(
                $"GRIMOIRE {release.TagName} is ready to install.\n\nThe app will restart to apply the update.",
                "GRIMOIRE Update",
                MessageBoxButton.OKCancel,
                MessageBoxImage.Information);

            if (result == MessageBoxResult.OK)
            {
                Process.Start(new ProcessStartInfo
                {
                    FileName = "cmd.exe",
                    Arguments = $"/c \"{updaterScript}\"",
                    UseShellExecute = false,
                    CreateNoWindow = true,
                    WindowStyle = ProcessWindowStyle.Hidden
                });

                Application.Current.Dispatcher.Invoke(() => Application.Current.Shutdown());
            }
            else
            {
                log?.Invoke("Update postponed");
                CleanupTemp(tempZip, tempExtract);
            }
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex);
            log?.Invoke("Update check skipped");
            CleanupTempByPrefix("grimoire-patch-");
        }
        finally
        {
            UpdateLock.Release();
        }
    }

    private static string BuildUpdateScript(string appDir, string patchDir, string zipFile, string exePath)
    {
        return $"""
            @echo off
            echo Waiting for GRIMOIRE to exit...
            timeout /t 3 /nobreak >nul
            :wait
            tasklist /fi "imagename eq Grimoire.exe" 2>nul | find /i "Grimoire.exe" >nul
            if not errorlevel 1 (
                timeout /t 1 /nobreak >nul
                goto wait
            )
            echo Applying update...
            xcopy /s /y /q "{patchDir}\*" "{appDir}\"
            echo Cleaning up...
            rd /s /q "{patchDir}" 2>nul
            del /q "{zipFile}" 2>nul
            echo Starting GRIMOIRE...
            start "" "{exePath}"
            del /q "%~f0" 2>nul
            """;
    }

    private static Version ParseVersion(string tag)
    {
        var clean = tag.TrimStart('v', 'V');
        return Version.TryParse(clean, out var v) ? v : new Version(0, 0, 0);
    }

    private static void CleanupTemp(string zipFile, string extractDir)
    {
        try { File.Delete(zipFile); } catch { }
        try { Directory.Delete(extractDir, true); } catch { }
    }

    private static void CleanupTempByPrefix(string prefix)
    {
        try
        {
            var tempDir = Path.GetTempPath();
            foreach (var f in Directory.GetFiles(tempDir, $"{prefix}*"))
                try { File.Delete(f); } catch { }
            foreach (var d in Directory.GetDirectories(tempDir, $"{prefix}*"))
                try { Directory.Delete(d, true); } catch { }
        }
        catch { }
    }

    private class GitHubRelease
    {
        [JsonPropertyName("tag_name")]
        public string TagName { get; set; } = "";

        [JsonPropertyName("assets")]
        public List<GitHubAsset>? Assets { get; set; }
    }

    private class GitHubAsset
    {
        [JsonPropertyName("name")]
        public string Name { get; set; } = "";

        [JsonPropertyName("browser_download_url")]
        public string BrowserDownloadUrl { get; set; } = "";

        [JsonPropertyName("size")]
        public long Size { get; set; }
    }
}
