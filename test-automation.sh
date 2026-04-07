#!/usr/bin/env bash
export DOTNET_CLI_HOME=/tmp
export HOME=/tmp
dotnet test src/Melodarr.sln --filter "TestCategory=Browser" "$@"
