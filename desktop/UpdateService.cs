using System.Diagnostics;
using System.Windows;
using Velopack;
using Velopack.Sources;

namespace Grimoire.Desktop;

public static class UpdateService
{
    private const string ReleaseRepositoryUrl = "https://github.com/Shishiba389/Grimoire_Release";
    private static readonly SemaphoreSlim UpdateLock = new(1, 1);

    public static async Task CheckDownloadAndApplySilentlyAsync(Action<string>? log = null)
    {
        if (!await UpdateLock.WaitAsync(0))
            return;

        try
        {
            var source = new GithubSource(ReleaseRepositoryUrl, accessToken: null, prerelease: false);
            var manager = new UpdateManager(source);

            if (!manager.IsInstalled)
            {
                log?.Invoke("Updater inactive outside installer build");
                return;
            }

            if (manager.UpdatePendingRestart != null)
            {
                log?.Invoke("Applying downloaded update...");
                ApplyAndRestart(manager, manager.UpdatePendingRestart);
                return;
            }

            log?.Invoke("Checking for updates...");
            var update = await manager.CheckForUpdatesAsync();
            if (update == null)
            {
                log?.Invoke("GRIMOIRE is up to date");
                return;
            }

            log?.Invoke($"Downloading update {update.TargetFullRelease.Version}...");
            await manager.DownloadUpdatesAsync(update, progress =>
            {
                if (progress is 0 or 25 or 50 or 75 or 100)
                    log?.Invoke($"Downloading update {progress}%...");
            });

            log?.Invoke("Installing update...");
            ApplyAndRestart(manager, update.TargetFullRelease);
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex);
            log?.Invoke("Update check skipped");
        }
        finally
        {
            UpdateLock.Release();
        }
    }

    private static void ApplyAndRestart(UpdateManager manager, VelopackAsset update)
    {
        manager.WaitExitThenApplyUpdates(update, silent: true, restart: true);
        Application.Current.Dispatcher.Invoke(() => Application.Current.Shutdown());
    }
}
