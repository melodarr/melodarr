#!/usr/bin/env bash
echo "Starting Melodarr Development Environment..."
docker compose -f docker-compose.dev.yml up -d

echo "Starting watchers..."
docker compose -f docker-compose.dev.yml exec dev-env bash -c 'set -e && export COREPACK_ENABLE_DOWNLOAD_PROMPT=0 && corepack enable && yarn set version stable && yarn config set nodeLinker node-modules && yarn install && echo "Building frontend..." && yarn build && echo "Linking UI to backend output..." && mkdir -p src/NzbDrone.Console/bin/Debug/net8.0 && ln -sfn /source/_output/UI src/NzbDrone.Console/bin/Debug/net8.0/UI && dotnet restore src/Melodarr.sln && dotnet watch run --project src/NzbDrone.Console/Melodarr.Console.csproj --framework net8.0 -- -nobrowser'
