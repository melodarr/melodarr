# Phase 4B: Internal Rename Walkthrough

## Phase 4B Plan
The goal of Phase 4B was to execute the low-risk sweep of the codebase identified in the Phase 4A inventory. This involved replacing "Lidarr" with "Melodarr" exclusively in compile-time, structural, and strictly internal identifiers (such as C# namespaces, `.csproj` names, and solution structure) without breaking any storage or protocol configurations that active instances rely on. 

A high-volume automated python script was built and run at the project root to guarantee uniform coverage without losing track of syntax across multiple file types. 

## Files Renamed / Updated
- **Directories**: 
  - `src/Lidarr.Api.V1` → `src/Melodarr.Api.V1`
  - `src/Lidarr.Http` → `src/Melodarr.Http`
- **Solution & Project Files (`*.sln`, `*.csproj`)**: 
  - `Lidarr.sln` → `Melodarr.sln`
  - 14 different `Lidarr.*.csproj` files were cleanly renamed to `Melodarr.*.csproj` (e.g. `Lidarr.Host.csproj`, `Lidarr.Api.V1.csproj`).
- **Source Code (`*.cs`, `*.yaml`, `*.sh`)**: 
  - Iterated through every file, renaming `namespace Lidarr` to `namespace Melodarr`.
  - Replaced using directives: `using Lidarr` to `using Melodarr`.
  - Replaced MSBuild references such as `<RootNamespace>Lidarr` to `<RootNamespace>Melodarr`.
- **Unit Tests Metadata**: 
  - Updated `InternalsVisibleTo` properties in `AssemblyInfo.cs` targeting internal assembly bridging. 

## Internal Renames Completed
> [!NOTE]
> We successfully renamed all internal namespaces affecting compilation and intra-assembly dependency injection mapping. The overarching structure is now formally "Melodarr" at the C# assembly level.

## Deferred for 4C / 4D
> [!WARNING]
> To comply with safety bounds, the following items strictly remain `Lidarr` or `lidarr:` awaiting specialized bridging algorithms in the next phases:
> - **4C (Config Bridges):**
>   - Hardcoded `config.GetSection("Lidarr:...")` identifiers in `Bootstrap.cs`.
>   - The `lidarr:` string literal prefix used by `SkyHookProxy.cs` payload queries.
>   - The persistent `window.Lidarr` property in `index.ejs`.
> - **4D (Storage/Persistence Bridges):**
>   - SQL data files inherently named `lidarr.db`, `lidarr.db-shm`, etc.
>   - All ZIP file backups looking for `lidarr_backup_...`.

## Build/Test Validation
> [!TIP]
> **Build Succeeded.**
> Running `env DOTNET_CLI_HOME=/tmp DOTNET_NOLOGO=1 dotnet build src/Melodarr.sln` completed explicitly with zero build errors across all assemblies! 

## Issues Encountered
During execution, we encountered one initial build failure: Internal testing assemblies lost scope visibility because `[assembly: InternalsVisibleTo("Lidarr.Core.Test")]` inside `NzbDrone.Core` continued to expect the old testing assembly. A targeted string replacement fixed this immediately to `Melodarr.Core.Test` resolving the `CS0122` accessibility scope errors.

## Summary
Phase 4B is now fully complete and the build logic is 100% verified. The project structures accurately reflect the Melodarr identity, setting us up to handle the riskier database/configuration bridges in Phase 4C without mixing structural debt into the equation.
