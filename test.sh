#!/usr/bin/env bash
docker compose -f docker-compose.dev.yml run --rm dev-env bash ./test-internal.sh "$@"
