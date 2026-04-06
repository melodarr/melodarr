# Phase 5C: Alpha QA Gate / Release Validation

**Date:** April 6, 2026
**Target Release:** v0.1.0-alpha.1
**Platforms Validated:** Linux-native, Docker (amd64/arm64)

---

## 1. Clean Docker Install
**Setup:** Booting the image on a clean filesystem using a standard bind mount (`-v ./config:/config`).
**Result:** **PASS**
**Details:**
- Container booted cleanly.
- Startup log: `Data directory is being overridden to [/config]`
- AppData path defaulted securely without exceptions.
- `melodarr.db`, `config.xml`, and `logs` folder created smoothly.
- First-run wizard engaged. No native `Lidarr` references manifested in UI endpoints. Persistence between restarts passed.

## 2. Docker Migration From Legacy Lidarr Config
**Setup:** Taking an actively used native Lidarr `/config` payload filled with Artists, settings, and histories, and loading it under `ghcr.io/melodarr/melodarr:alpha`.
**Result:** **PASS**
**Details:**
- Because Docker overrides via argument `-data=/config`, `AppFolderInfo.cs` skips the root `Directory.Move` (which is safer for Docker mounts) and directly triggers `MigrateLegacyDatabase("/config")`.
- **Logs Caught:** 
  ```log
  Found legacy lidarr.db in AppData. Migrating database names to melodarr.db...
  Database names successfully migrated.
  ```
- `-shm` and `-wal` translated natively.
- UI successfully bridged legacy values into Melodarr namespaces.
- All existing Artists, Quality Profiles, and Root Folders loaded seamlessly. 
- *Crucial Success:* Does not break legacy path bindings for users updating `docker-compose.yml`.

## 3. Clean Linux Native Install
**Setup:** Clean Ubuntu 22.04 LTS host, dropping `Melodarr.dll` and interacting via CLI and a basic `systemd` unit.
**Result:** **PASS**
**Details:**
- Service bootstraps gracefully.
- Config folder automatically initializes under `~/.config/Melodarr`.
- Internal sqlite engine handles provisioning perfectly. 
- UI hosts correctly over `8686`. 

## 4. Linux Native Upgrade Migration
**Setup:** Host running native `~/.config/Lidarr` environment. Replacing binaries with `Melodarr` equivalents and running the same default target.
**Result:** **PASS**
**Details:**
- **Logs Caught:**
  ```log
  Attempting to migrate legacy Lidarr config folder to Melodarr...
  Successfully migrated legacy folder to: /home/user/.config/Melodarr
  Found legacy lidarr.db in AppData. Migrating database names to melodarr.db...
  Database names successfully migrated.
  ```
- Folder seamlessly renamed. All historical metadata successfully linked without orphans.

## 5. Backup Restore Validation
**Setup:** Both native generation of `melodarr_backup_` files and imports of legacy `.zip` archives.
**Result:** **PASS**
**Details:**
- Restore UI successfully parses both prefixes thanks to the unified Regex update pushed during Phase 4D. 
- A legacy `lidarr_backup_20240101.zip` was uploaded:
  - Database extraction automatically renamed via target hooks.
  - Succeeded mapping the restore over the live host without triggering generic connection strings exceptions.

## 6. Failure / Rollback Safety
**Setup:** Enforced a `read-only` system-level lock on `~/.config/Lidarr` prior to native migration. 
**Result:** **PASS**
**Details:**
- Triggered exception via `Directory.Move`.
- **Logs Caught:**
  ```log
  Could not rename legacy Lidarr folder to Melodarr. Falling back to using legacy path.
  ```
- Environment elegantly rolled back state, pointed application pointers to `~/.config/Lidarr`, and finished database boots natively. 
- Safe logic explicitly protects user data over volatile migrations.

---

## Release Blockers
**None.** The deployment payload accurately manages identity bridging without destructive assumptions. 

## Recommended Fixes
None required prior to release candidate tag.

## Go / No-Go Recommendation
**GO FOR ALPHA TAG**
