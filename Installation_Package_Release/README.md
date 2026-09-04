# GRIMOIRE Full Offline Release Packaging

This folder contains the packaging tools for GRIMOIRE full offline installer releases.

## Build-machine prerequisites

- Inno Setup 6
- .NET 10 SDK
- Node.js and npm
- Python 3.11
- GitHub CLI for uploading releases
- Internet access while building, so pinned packages and model assets can be downloaded

The generated installer does not require Python, Node.js, the .NET SDK, model
downloads, or a preinstalled WebView2 Runtime on the user machine.

## Build installer

```powershell
powershell -ExecutionPolicy Bypass `
  -File .\Build-Installer.ps1 `
  -Version "2.0.1" `
  -CleanBuild
```

Options:

- `-Version "2.0.1"`: override the version read from the desktop project.
- `-SkipNodeRestore`: skip frontend `npm ci`.
- `-SkipBackendRuntime`: reuse an existing bundled runtime for packaging development only.
- `-CleanBuild`: delete the previous `build/` directory first.

The build process:

1. Builds the frontend and self-contained .NET desktop shell.
2. Creates a clean Python 3.11 runtime and installs pinned runtime packages.
3. Downloads and bundles the CLIP model for offline use.
4. Bundles the full x64 WebView2 Evergreen installer.
5. Runs offline package verification.
6. Compiles the Inno Setup installer.

Output:

```text
Installation_Package_Release\Releases\Grimoire-<version>-Setup.exe
```

## Clean installation behavior

The installer stops an older GRIMOIRE process and replaces application files
from a clean directory to prevent version conflicts. User data under
`%LOCALAPPDATA%\Grimoire` is preserved unless the user explicitly selects the
reset-user-data option.

## Upload release

```powershell
$env:GITHUB_TOKEN = "..."
powershell -ExecutionPolicy Bypass `
  -File .\Upload-GitHubRelease.ps1 `
  -Version 2.0.1
```

Release assets are uploaded to:

```text
https://github.com/Shishiba389/Grimoire_Release
```

Keep source code in the private development repository. Upload only generated
release assets from `Releases`.

## Manual patch for an existing user

Ship both `Grimoire-<version>-patch.zip` and `APPLY_PATCH.ps1`. The user saves
both files locally, closes GRIMOIRE, then runs:

```powershell
powershell -ExecutionPolicy Bypass -File .\APPLY_PATCH.ps1 `
  -PatchZip .\Grimoire-2.1.0-patch.zip `
  -InstallDir "C:\Program Files\GRIMOIRE"
```

The patch script validates its deletion manifest, removes retired files, copies
the new files, and restarts GRIMOIRE.
