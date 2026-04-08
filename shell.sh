#!/usr/bin/env bash

# This script provides an interactive shell into the development container.

# Ensure we're in the right directory
cd "$(dirname "$0")" || exit 1

# Check if the container is running
if ! docker ps --format '{{.Names}}' | grep -q "^melodarr-app$"; then
    echo "Development container is not running."
    echo "Please start it first using ./dev.sh or option 1 in ./melodarr.sh"
    exit 1
fi

echo "Entering Melodarr development shell. Type 'exit' to leave."
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec melodarr-app bash
