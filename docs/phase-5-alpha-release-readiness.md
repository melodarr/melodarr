# Phase 5: Alpha Release Readiness

This document outlines the strategy for Melodarr's first public alpha release, focusing natively on Linux and Docker environments.

## Release Identity and Versioning
The first release will be versioned as `v0.1.0-alpha.1`. 
This resets the major/minor sequence from the inherited Lidarr 3.x tree to establish a clear boundary for Melodarr's public iteration.

- `majorVersion: 0.1.0`
- `minorVersion: incrementing build counter`
- Formatted version metadata: `${majorVersion}-alpha.${minorVersion}`

## Docker Image Strategy
Because Windows and macOS platforms are formally out of scope for Phase 5, Docker represents the primary distribution mechanism. 
The updated container registry namespace will be:
- Alpha tag: `ghcr.io/melodarr/melodarr:alpha`
- Final tag: `ghcr.io/melodarr/melodarr:latest`

## Workflow Updates
The `azure-pipelines.yml` file was updated to:
- Reset the version counters.
- Transition environmental build tags to `MELODARRVERSION`.
- Align Sentry crash reporting variables and payload namespaces to `melodarr`.

A new GitHub Action (`.github/workflows/docker-publish.yml`) acts as the primary deployment mechanism for pushing Linux builds to the GitHub Container Registry.

## Compatibility Guard
The codebase retains all Phase 4 fallback compatibility components:
- `Config.xml` legacy loading
- `[Lidarr]` configuration key intercept
- `window.Lidarr` client aliasing
- `/config/Lidarr` folder auto-migration natively on Linux/Docker
- `lidarr.db` translation
- `lidarr_backup_*.zip` archive restoration extraction

Migrations are fully idempotent.
