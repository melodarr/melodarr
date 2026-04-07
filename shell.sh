#!/usr/bin/env bash
# Gives you full terminal access inside the pre-configured container
docker compose -f docker-compose.dev.yml exec dev-env bash
