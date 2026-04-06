# Phase 4C: Compatibility Bridges

This phase focuses on ensuring that data, bindings, configurations, and external integrations from the historical *Lidarr* context continue to function seamlessly after the primary identity transition to *Melodarr*.

Rather than destructively migrating data in-place during this phase, a "bridge" approach is used. The application natively uses `Melodarr` identifiers, but provides fallback parsing, interface aliasing, and backwards compatibility for `Lidarr` identifiers.

## 1. Configuration Bridge (`Bootstrap.cs`)

When Lidarr launches, it traditionally loads configuration blocks like `Lidarr:App`, `Lidarr:Postgres`, `Lidarr:Server` etc. from `config.xml` or `appsettings.json`. Migrating this indiscriminately means legacy configurations fail to load, potentially leaving the app unconfigured on start.

**Resolution**: Updated `Bootstrap.cs` to utilize a `GetBridgedSection` method. This helper function checks the configuration root for a `Melodarr:{key}` block. If the block is empty or missing, it transparently falls back to `Lidarr:{key}`.

*This guarantees backward compatibility for existing user configs while preferring natively formatted ones for new installs.*

## 2. Frontend Global Object Alias (`window.Melodarr`)

The entire React frontend was built relying on a `window.Lidarr` global object, which holds important initial state like `urlBase` bootstrapped inside `index.ejs`. Over 300 frontend files referenced `window.Lidarr`.

**Resolution**:
1. All `window.Lidarr` usages within `frontend/src` were natively renamed to `window.Melodarr`.
2. Inside `index.ejs`, where initial state is constructed, `window.Melodarr` is explicitly published.
3. An alias `window.Lidarr = window.Melodarr;` was immediately declared underneath.

*This allows any legacy custom dashboard scripts or untested edge cases relying on `window.Lidarr.urlBase` to continue working, without coupling our modern source files to the old name.*

## 3. SkyHook Protocol Fallback (`SkyHookProxy.cs`)

The application interacts with external metadata sources, primarily MusicBrainz and the community SkyHook service. In these API contracts and inside the application, search tokens were typically prefixed with `lidarr:` or `lidarrid:`.
For example, import lists frequently issued searches matching `"lidarr:f59c5520-5f46-4d2c-b2c4-822eabf53419"`.

**Resolution**:
1. `SkyHookProxy.IsMbidQuery` was updated to accept `melodarr:` and `melodarrid:` logic hooks, executing the exact same routing as the original `lidarr:` hooks.
2. `ImportListSyncService` was updated to emit native `melodarr:` prefixes for new queries.
3. `SkyHookProxySearchFixture` (tests) were updated to ensure both variants are validated.

*This bridges the search API behavior, permitting legacy import plugins and searches from downstream clients to succeed, while moving our native internal generation to `melodarr:`.*
