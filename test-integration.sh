#!/usr/bin/env bash
export DOTNET_CLI_HOME=/tmp
dotnet test src/NzbDrone.Integration.Test/Melodarr.Integration.Test.csproj --filter "TestCategory!=Mono" "$@"
