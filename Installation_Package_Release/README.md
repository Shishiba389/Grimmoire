# GRIMOIRE Release Packaging

This folder contains the local packaging tooling for GRIMOIRE installer releases.

## Prerequisites

- [Inno Setup 6](https://jrsoftware.org/isinfo.php) (ISCC.exe must be on PATH or in default install location)
- [GitHub CLI](https://cli.github.com/) (`gh`) for uploading releases
- .NET SDK, Node.js, Python 3.11 (for the build steps)

## Build Installer

```powershell
powershell -ExecutionPolicy Bypass -File .\Build-Installer.ps1
```

Options:
- `-Version "1.2.0"` — override version (default: read from .csproj)
- `-SkipNodeRestore` — skip `npm ci`
- `-SkipBackendRuntime` — skip Python/Node bundling
- `-CleanBuild` — wipe `build/` before starting

Output is written to:

```text
Installation_Package_Release\Releases\Grimoire-<version>-Setup.exe
```

## Upload Release

Set a GitHub token with permission to create releases, then run:

```powershell
$env:GITHUB_TOKEN = "..."
powershell -ExecutionPolicy Bypass -File .\Upload-GitHubRelease.ps1 -Version 1.0.0
```

The generated installer is uploaded to:

```text
https://github.com/Shishiba389/Grimoire_Release
```

Keep source code in the private development repository. Only upload generated installer assets from `Releases`.
