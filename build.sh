#!/usr/bin/env bash

# Helper script for building Melodarr backend locally using the dev container

# Ensure we're in the right directory
cd "$(dirname "$0")" || exit 1

# If container isn't running, start it up first
if ! docker ps --format '{{.Names}}' | grep -q "^melodarr-app$"; then
    echo "Development environment not running. Starting it..."
    ./dev.sh
    # Wait for it to be ready
    sleep 5
fi

echo "Building Melodarr..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec melodarr-app bash -c "cd /source && ./build-internal.sh"
echo "Build complete!"
