#!/usr/bin/env bash
# Hands off the actual build process to the container using the internalized script
docker compose -f docker-compose.dev.yml run --rm dev-env bash ./build-internal.sh "$@"
