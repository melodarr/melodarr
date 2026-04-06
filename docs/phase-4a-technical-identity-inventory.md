# Phase 4A: Technical Identity Inventory

This document maps out the remaining technical references to `Lidarr`, `lidarr`, and `LIDARR` in the codebase. As Phase 3 addressed user-facing visual branding, Phase 4 focuses on structural, architectural, storage, and protocol-level identifiers.

### Inventory Summary
The inventory reveals over 400 remaining references to the "Lidarr" identity. These span across critical sub-systems including C# namespaces, project and solution files, database filenames, configuration section parsing, and external API query payloads. Because many of these deeply couple with storage expectations and external integrations, mass renaming without a carefully phased approach risks data loss or breaking existing deployments.

### Remaining Identity Categories

Based on our `grep` and codebase audit, remaining references fall into the following buckets:

| Category | Examples / Locations | Description |
| :--- | :--- | :--- |
| **Compile-time / Internal** | `Lidarr.csproj`, `Lidarr.Api.V1`, `namespace Lidarr.*` | Solution structure, project filenames, and C# namespaces. Safest to rename, but touches nearly every file. |
| **Runtime / Config Coupled** | `config.GetSection("Lidarr:Postgres")` (`Bootstrap.cs`) | Expected root structure for JSON/YAML configurations loaded at runtime. |
| **Storage / Database Coupled** | `lidarr.db`, `lidarr.db-journal`, `lidarr_backup_*.zip` | Hardcoded filenames for SQLite databases, journals, and backup zip files. |
| **Protocol / External Integration Coupled** | `lidarr:f59c...` (`SkyHookProxy.cs`), `MusicBrainzSeries.cs` | External metadata querying prefixes used to search MBIDs or process inbound responses. |
| **Backward-Compatibility Sensitive** | `ImportListSyncService.cs`, API routes (`Lidarr.ics`) | Legacy routes or database structures that clients/users might depend on if they migrate to Melodarr. |
| **Unknown / Manual Review Needed** | `Lidarr.Update` | Code for updater executables. May reference external repos or specific update payload structures. |

### Safe Future Renames
The following items are structurally safe to rename in a coordinated sweep without requiring runtime fallbacks:
- **C# Namespaces**: Changing `Lidarr.Api.V1` to `Melodarr.Api.V1` and subsequent `using` statements.
- **Projects and Solutions**: Renaming `.csproj`, `.sln`, `.runsettings` strings.
- **Test Payloads**: Test fixtures containing `Lidarr` in assertions or descriptions.
- **Leftover Log Messages**: A few lingering hardcoded strings (e.g. `DownloadedTracksImportService.cs`, `TwitterService.cs`).

### Compatibility-Sensitive Areas
Changing the following identifiers requires careful attention:
- **Configuration Sections**: If users bring their `appsettings.json` or `config.xml` from a Lidarr installation, `Bootstrap.cs` will fail to bind if it expects `Melodarr:Postgres` but finds `Lidarr:Postgres`.
- **SkyHook Search Prefix**: The `lidarr:` prefix (e.g., `lidarr:854a1807-025b-42a8-ba8c-2a39717f1d25`) used to route to SkyHook's API. Changing this to `melodarr:` might break external queries if the SkyHook infrastructure hard-requires `lidarr:`, or breaks integrations that explicitly use `lidarr:` as a search token identifier.
- **Localization Placeholders**: Files in `Localization/Core/*.json` use `lidarr:` for placeholder examples (e.g. `eg. Breaking Benjamin, lidarr:854a...`). These placeholders often rely on the protocol token working as-is.

### Migration Risks
Changing persistence logic carries significant risks:
- **Database Names**: If `lidarr.db` is renamed to `melodarr.db` (in `PathExtensions.cs`), on boot the application might fail to find the existing DB and prompt as a new install, causing data loss for migrating users.
- **Backup/Restore Flow**: `BackupService.cs` expects `lidarr_backup_...` and explicitly pulls `lidarr.db` out of the ZIP. If this is blindly changed, older backups might become unrestorable, or migration from Lidarr will be severed.

### Recommended Phase 4B/4C/4D Plan

**Phase 4B: Internal Renames (Low Risk)** - ✅ COMPLETED
1. Swept and renamed all project folders, files, `.csproj`, and `.sln`.
2. Mass replaced `namespace Lidarr.` to `namespace Melodarr.` and `using Lidarr.` -> `using Melodarr`.
3. Updated internal test references (e.g. `InternalsVisibleTo("Melodarr.Core.Test")`).
4. Re-ran `dotnet build` to confirm `Melodarr.sln` compiles successfully with no errors.

**Phase 4C: Protocol & Config Bridges (Medium Risk)** - ✅ COMPLETED
1. Introduced fallback config loading in `Bootstrap.cs` to check for `Melodarr:Postgres`, falling back to `Lidarr:Postgres` if migrating, along with `App`, `Auth`, `Server`, `Log`, and `Update` configuration blocks.
2. Updated `IsMbidQuery` in `SkyHookProxy.cs` to natively accept both `melodarr:` and `lidarr:` protocols so older clients still work.
3. Updated `ImportListSyncService.cs` to emit `melodarr:` by default but retaining support for backward queries.
4. Exported `window.Melodarr` to the frontend `index.ejs`, while maintaining `window.Lidarr` as a legacy interface proxy for existing scripts.

**Phase 4D: Storage Migrations (High Risk)**
1. Implement a database rename/fallback step on boot if `lidarr.db` exists but `melodarr.db` does not.
2. Update `BackupService.cs` to generate `melodarr_backup_*.zip` but explicitly accept and map `lidarr.db` out of legacy backups for restore logic.

### Build Validation
Any changes during Phase 4 **must** be validated with full build processes (`dotnet build`) along with `dotnet test`, validating both the `Melodarr.Test.Common` infrastructure as well as runtime stability to ensure no DI or module resolutions fail.
