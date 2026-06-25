; ============================================================================
; GRIMOIRE Inno Setup Installer Script
; Generates a full installation wizard with:
;   - Welcome page
;   - Select install location
;   - Component selection (Core, CLIP AI, Reference Examples)
;   - Deep scan for old Grimoire remnants
;   - Install + Finish
; ============================================================================

#ifndef MyAppVersion
  #define MyAppVersion "1.0.1"
#endif
#ifndef MyAppDir
  #define MyAppDir "..\build\app"
#endif
#ifndef MyOutputDir
  #define MyOutputDir "Releases"
#endif
#ifndef MyIconPath
  #define MyIconPath "..\desktop\grimoire.ico"
#endif

#define MyAppName "GRIMOIRE"
#define MyAppPublisher "MDX Team"
#define MyAppExeName "Grimoire.exe"
#define MyAppURL "https://github.com/Shishiba389/Grimoire_Release"

[Setup]
AppId={{7B3C9F1A-5D2E-4A8B-B6C1-3E9F0A2D4B5C}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
AllowNoIcons=yes
OutputDir={#MyOutputDir}
OutputBaseFilename=Grimoire-{#MyAppVersion}-Setup
SetupIconFile={#MyIconPath}
UninstallDisplayIcon={app}\{#MyAppExeName}
Compression=lzma2/normal
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=admin
ArchitecturesAllowed=x64compatible
DisableProgramGroupPage=yes
VersionInfoVersion={#MyAppVersion}
VersionInfoCompany={#MyAppPublisher}
VersionInfoProductName={#MyAppName}

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Types]
Name: "full"; Description: "Full installation (recommended)"
Name: "compact"; Description: "Compact installation (no CLIP AI)"
Name: "custom"; Description: "Custom installation"; Flags: iscustom

[Components]
Name: "core"; Description: "GRIMOIRE Core Application"; Types: full compact custom; Flags: fixed
Name: "clip"; Description: "CLIP AI Image Classifier (taxonomy + reference examples)"; Types: full custom
Name: "clip\taxonomy"; Description: "Classification taxonomy (Excel prompts)"; Types: full custom
Name: "clip\references"; Description: "Reference example images (~265 files)"; Types: full custom

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: checkedonce
Name: "cleanold"; Description: "Remove previous Grimoire installations found on this machine"; GroupDescription: "Cleanup:"; Flags: unchecked

[Files]
; Core application (everything except data/)
Source: "{#MyAppDir}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs; Excludes: "data\taxonomy\*;data\reference_examples\*"; Components: core

; CLIP taxonomy data
Source: "{#MyAppDir}\data\taxonomy\*"; DestDir: "{app}\data\taxonomy"; Flags: ignoreversion recursesubdirs createallsubdirs; Components: clip\taxonomy

; CLIP reference examples
Source: "{#MyAppDir}\data\reference_examples\*"; DestDir: "{app}\data\reference_examples"; Flags: ignoreversion recursesubdirs createallsubdirs; Components: clip\references

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\Uninstall {#MyAppName}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
Type: filesandordirs; Name: "{app}\backend\storage"
Type: filesandordirs; Name: "{app}\backend\__pycache__"
Type: dirifempty; Name: "{app}"

[Code]
var
  OldInstallPaths: TStringList;
  CleanupPage: TWizardPage;
  CleanupListBox: TNewCheckListBox;
  CleanupLabel: TNewStaticText;

function FindOldGrimoireInstalls(): TStringList;
var
  RegKeys: array of String;
  I: Integer;
  InstallPath: String;
  Paths: TStringList;
begin
  Paths := TStringList.Create;
  Paths.Duplicates := dupIgnore;
  Paths.Sorted := True;

  SetArrayLength(RegKeys, 4);
  RegKeys[0] := 'SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall';
  RegKeys[1] := 'SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall';
  RegKeys[2] := 'SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall';
  RegKeys[3] := 'SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall';

  for I := 0 to 1 do
  begin
    if RegQueryStringValue(HKLM, RegKeys[I] + '\Grimoire', 'InstallLocation', InstallPath) then
      if (InstallPath <> '') and DirExists(InstallPath) and (CompareText(InstallPath, ExpandConstant('{app}')) <> 0) then
        Paths.Add(InstallPath);
  end;

  for I := 2 to 3 do
  begin
    if RegQueryStringValue(HKCU, RegKeys[I] + '\Grimoire', 'InstallLocation', InstallPath) then
      if (InstallPath <> '') and DirExists(InstallPath) and (CompareText(InstallPath, ExpandConstant('{app}')) <> 0) then
        Paths.Add(InstallPath);
  end;

  { Check common Velopack install locations }
  InstallPath := ExpandConstant('{localappdata}\Grimoire');
  if DirExists(InstallPath) then
    Paths.Add(InstallPath);

  InstallPath := ExpandConstant('{localappdata}\SquirrelTemp\Grimoire');
  if DirExists(InstallPath) then
    Paths.Add(InstallPath);

  { Check %APPDATA%\Grimoire user data }
  InstallPath := ExpandConstant('{userappdata}\Grimoire');
  if DirExists(InstallPath) then
    Paths.Add(InstallPath);

  Result := Paths;
end;

procedure CreateCleanupPage;
begin
  CleanupPage := CreateCustomPage(
    wpSelectDir,
    'Previous Installation Detected',
    'The following Grimoire-related folders were found on your machine.'
  );

  CleanupLabel := TNewStaticText.Create(CleanupPage);
  CleanupLabel.Parent := CleanupPage.Surface;
  CleanupLabel.Caption :=
    'Select folders to remove before installing the new version. ' +
    'Uncheck any folder you want to keep.';
  CleanupLabel.AutoSize := True;
  CleanupLabel.Top := 0;
  CleanupLabel.Left := 0;
  CleanupLabel.Width := CleanupPage.SurfaceWidth;
  CleanupLabel.WordWrap := True;

  CleanupListBox := TNewCheckListBox.Create(CleanupPage);
  CleanupListBox.Parent := CleanupPage.Surface;
  CleanupListBox.Top := CleanupLabel.Top + CleanupLabel.Height + 12;
  CleanupListBox.Left := 0;
  CleanupListBox.Width := CleanupPage.SurfaceWidth;
  CleanupListBox.Height := CleanupPage.SurfaceHeight - CleanupListBox.Top;
end;

procedure PopulateCleanupList;
var
  I: Integer;
begin
  CleanupListBox.Items.Clear;
  OldInstallPaths := FindOldGrimoireInstalls;

  for I := 0 to OldInstallPaths.Count - 1 do
  begin
    CleanupListBox.AddCheckBox(OldInstallPaths[I], '', 0, True, True, False, True, nil);
  end;
end;

function ShouldSkipPage(PageID: Integer): Boolean;
begin
  Result := False;
  if PageID = CleanupPage.ID then
  begin
    OldInstallPaths := FindOldGrimoireInstalls;
    Result := (OldInstallPaths.Count = 0);
  end;
end;

procedure CurPageChanged(CurPageID: Integer);
begin
  if CurPageID = CleanupPage.ID then
    PopulateCleanupList;
end;

function RemoveDirRecursive(const Dir: String): Boolean;
begin
  Result := DelTree(Dir, True, True, True);
end;

procedure PerformCleanup;
var
  I: Integer;
begin
  for I := 0 to CleanupListBox.Items.Count - 1 do
  begin
    if CleanupListBox.Checked[I] then
    begin
      Log('Removing old Grimoire folder: ' + CleanupListBox.Items[I]);
      RemoveDirRecursive(CleanupListBox.Items[I]);
    end;
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssInstall then
    PerformCleanup;
end;

procedure InitializeWizard;
begin
  CreateCleanupPage;
end;

procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
var
  UserDataDir: String;
  MsgResult: Integer;
begin
  if CurUninstallStep = usPostUninstall then
  begin
    UserDataDir := ExpandConstant('{userappdata}\Grimoire');
    if DirExists(UserDataDir) then
    begin
      MsgResult := MsgBox(
        'User data folder found at:' + #13#10 +
        UserDataDir + #13#10#13#10 +
        'This contains your correction history, embedding cache, and classifier data.' + #13#10 +
        'Do you want to remove it?',
        mbConfirmation, MB_YESNO);
      if MsgResult = IDYES then
        DelTree(UserDataDir, True, True, True);
    end;
  end;
end;
