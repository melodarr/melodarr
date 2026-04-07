#!/usr/bin/env bash
echo "Starting Melodarr Development Environment..."
docker compose -f docker-compose.dev.yml up -d

echo "Starting watchers..."
docker compose -f docker-compose.dev.yml exec dev-env bash -c 'set -e && corepack enable && yarn set version stable && yarn config set nodeLinker node-modules && yarn install && echo "Building frontend..." && yarn build && echo "Linking UI to backend output..." && mkdir -p _temp/bin/Release/Melodarr.Console/net8.0 && ln -sfn /source/_output/UI _temp/bin/Release/Melodarr.Console/net8.0/UI && dotnet restore src/Melodarr.sln && dotnet watch run --project src/NzbDrone.Console/Melodarr.Console.csproj --framework net8.0'
