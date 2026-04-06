# Phase 3: Rebrand Audit — Lidarr → Melodarr

**Date**: 2026-04-06
**Scope**: Safe first-pass identity rebrand. No namespace/assembly/DB changes.

---

## Summary

This phase performed a controlled identity rebrand of visible, user-facing references from "Lidarr" to "Melodarr". The focus was on documentation, GitHub templates, frontend UI strings (including all Settings/System wiki links and help text), localization values, and backend assembly metadata while preserving build stability and deferring high-risk deep namespace changes to Phase 4.

---

## Changes Made

### Group 1: Documentation & Repo Metadata

| File | Changes |
|------|---------|
| `README.md` | Project name, description, badge removal, fork attribution added |
| `CONTRIBUTING.md` | Project identity references updated; build paths preserved |
| `SECURITY.md` | Project name updated; TODO for contact details |
| `CLA.md` | Title and introduction rebranded |
| `CODE_OF_CONDUCT.md` | Contact email updated with TODO placeholder |
| `package.json` | name, description, author fields updated |

### Group 2: GitHub Templates & Config

| File | Changes |
|------|---------|
| `.github/FUNDING.yml` | Cleared Lidarr funding links; TODO placeholder added |
| `.github/PULL_REQUEST_TEMPLATE.md` | Wiki link updated to Melodarr; TODO for wiki setup |
| `.github/ISSUE_TEMPLATE/bug_report.yml` | Environment examples and log links rebranded |
| `.github/ISSUE_TEMPLATE/feature_request.yml` | Project name in description updated |
| `.github/ISSUE_TEMPLATE/config.yml` | TODO for Melodarr Discord link |

### Group 3: Frontend — User-Visible Strings

| File | Changes |
|------|---------|
| `frontend/src/index.ejs` | Meta description, page title |
| `frontend/src/login.html` | Meta, title, wiki link, copyright footer |
| `frontend/src/Components/Page/ErrorPage.js` | Error message text |
| `frontend/src/Components/Page/Header/PageHeader.js` | Logo alt text, donate & translate links |
| `frontend/src/Components/Page/LoadingPage.js` | Logo variable renamed; TODO for Melodarr logo |
| `frontend/src/Calendar/iCal/CalendarLinkModalContent.js` | Modal header text ("Melodarr Calendar Feed") |
| `frontend/src/Components/Page/PageConnector.js` | localStorage test key: `lidarrTest` → `melodarrTest` |
| `frontend/src/Diag/ConsoleApi.js` | Console activation message; `window.LidarrApi` → `window.MelodarrApi` |
| `frontend/src/Components/Loading/LoadingMessage.js` | Loading message: "Previously on Melodarr..." |
| `frontend/src/Store/Middleware/createPersistState.js` | localStorage key: `lidarr` → `melodarr` |
| `frontend/src/System/Status/MoreInfo/MoreInfo.js` | Community links updated to Melodarr placeholders |
| `frontend/src/System/Status/Donations/Donations.js` | Donation entry rebranded |
| `frontend/src/Settings/CustomFormats/.../AddSpecificationModalContent.js` | Help text + wiki link |
| `frontend/src/Settings/Profiles/Quality/QualityProfileFormatItems.js` | Quality profile description |
| `frontend/src/Activity/History/Details/HistoryDetails.js` | File-not-found error message |

### Group 3b: Frontend — Wiki Links & Settings Strings

| File | Changes |
|------|---------|
| `frontend/src/System/Plugins/Plugins.js` | Restart messages (×2) + plugin wiki link |
| `frontend/src/Settings/General/GeneralSettings.js` | Restart dialog confirm text |
| `frontend/src/Settings/Indexers/Options/IndexerOptions.js` | RSS sync wiki link |
| `frontend/src/Settings/General/UpdateSettings.js` | Update mechanism wiki links (×2) |
| `frontend/src/Settings/DownloadClients/RemotePathMappings/RemotePathMappings.js` | Wiki link + app name (`Lidarr` → `Melodarr`) |
| `frontend/src/Settings/Metadata/MetadataProvider/MetadataProvider.js` | Write metadata wiki link |
| `frontend/src/Settings/Notifications/Notifications/NotificationEventItems.js` | Connections wiki link |
| `frontend/src/FirstRun/AuthenticationRequiredModalContent.js` | Forced auth wiki link |
| `frontend/src/Components/FileBrowser/FileBrowserModalContent.js` | Network drives FAQ wiki link |
| `frontend/src/Store/Selectors/createHealthCheckSelector.js` | SignalR wiki link |
| `frontend/src/Search/AddNewItem.js` | TODO comments for deferred `lidarr:` search prefix |

### Group 3c: Localization

| File | Changes |
|------|---------|
| `src/NzbDrone.Core/Localization/Core/en.json` | `EmbedCoverArtHelpText` value: "Lidarr" → "Melodarr" |
| `src/NzbDrone.Core/Localization/Core/en.json` | `LidarrRequiresRestartToApplyPluginChanges` value: "Lidarr" → "Melodarr" |

> **Note**: Translation _keys_ (e.g., `RestartLidarr`, `LidarrTags`) were NOT renamed. These are internal identifiers used across dozens of frontend files. The _values_ use `{appName}` variable substitution, so they already display correctly. Renaming keys is a Phase 4 concern.

### Group 4: Backend — Display Strings & Build Metadata

| File | Changes |
|------|---------|
| `src/Directory.Build.props` | `<Product>` → Melodarr, `<Company>` → melodarr, `<Copyright>` updated |
| `src/NzbDrone.Common/EnvironmentInfo/BuildInfo.cs` | `AppName` → "Melodarr" |

---

## Deliberately NOT Changed (Deferred to Phase 4+)

| Item | Reason |
|------|--------|
| `window.Lidarr` global object (30+ references) | Frontend-backend handshake; high breakage risk |
| `Lidarr.ics` calendar feed route | Backend route in `CalendarFeedController.cs`; URL path change |
| `lidarr:` search prefix | Backend protocol in `SkyHookProxy.cs` line 435; tests depend on it |
| `lidarrGreen` CSS/JS theme token | Coordinated CSS + JS refactor needed |
| Translation key names (`RestartLidarr`, `LidarrTags`, etc.) | Internal identifiers; values already use `{appName}` |
| `Lidarr:Postgres`, `Lidarr:App` config sections (Bootstrap.cs) | Config file compatibility; breaking change |
| C# namespaces (`NzbDrone.*`, `Lidarr.*`) | Massive cross-file refactor; build risk |
| Assembly names / `.csproj` file names | Build pipeline dependency; needs coordinated rename |
| MSBuild property names (`LidarrRootDir`, `LidarrProject`, etc.) | Tied to `.csproj` filenames; build will break |
| Database identifiers | Runtime data integrity risk |
| Docker image names / CI pipeline references | Infrastructure change; separate phase |
| Solution file (`Lidarr.sln`) | Build command compatibility |

---

## TODOs Requiring User Action

- [ ] Provide Melodarr Discord invite URL (used in SECURITY.md, issue config, login page)
- [ ] Provide Melodarr Wiki URL (used in CONTRIBUTING.md, PR template, login page, 10+ Settings pages)
- [ ] Provide Melodarr contact email (used in CODE_OF_CONDUCT.md, SECURITY.md)
- [ ] Create/provide Melodarr SVG logo (replaces base64-encoded Lidarr logo in LoadingPage.js)
- [ ] Set up GitHub Sponsors or OpenCollective for FUNDING.yml
- [ ] Acknowledge that `AppName = "Melodarr"` changes default config/log directory from `~/.config/Lidarr` to `~/.config/Melodarr`

---

## Verification

| Check | Status |
|-------|--------|
| Frontend build (`yarn build`) | ✅ compiled successfully |
| Backend build (`dotnet build`) | ⏳ blocked — .NET 8 SDK not available in current env |
| Remaining `Lidarr` grep in frontend | ✅ all remaining are deferred items (window.Lidarr, translate keys, theme token, search prefix) |

---

## Known Risks

1. **Config directory change**: `BuildInfo.AppName = "Melodarr"` means the app will look for config/logs in `~/.config/Melodarr` (Linux), `%AppData%\Melodarr` (Windows), etc. instead of the Lidarr paths. This is expected for a fresh fork.
2. **`window.MelodarrApi`**: The console API global was renamed, but `window.Lidarr` (the main runtime config object) was NOT. Any scripts or browser extensions relying on `window.LidarrApi` will need updating.
3. **localStorage migration**: Users upgrading from Lidarr will lose persisted UI state (table sort, column visibility, etc.) since the localStorage key changed from `lidarr` to `melodarr`. This is expected for a fork.
