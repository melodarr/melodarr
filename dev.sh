#!/usr/bin/env bash

PORT=8687

echo "Shutting down existing dev stack (if any)..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v --remove-orphans || true


echo "Checking if port $PORT is cleanly available..."
PIDS=$(lsof -ti TCP:$PORT -s TCP:LISTEN 2>/dev/null)

if [ -n "$PIDS" ]; then
    for PID in $PIDS; do
        PROCESS_NAME=$(ps -p "$PID" -o comm= | head -n 1) # get binary name
        
        echo "Found process holding port $PORT: $PROCESS_NAME (PID $PID)"
        
        if echo "$PROCESS_NAME" | grep -qiE 'melodarr|dotnet|nzbdrone|rider|xcode|visual|vs'; then
            echo "Stopping lingering Melodarr/.NET process..."
            kill -9 "$PID" 2>/dev/null || echo "Kill failed (you might need to close your IDE manually)."
            sleep 1
        else
            echo "ERROR: Port $PORT is occupied by an unrecognized process."
            echo "We will not blindly kill this process. Please stop it manually and restart."
            exit 1
        fi
    done
fi

echo "Starting Melodarr Development Environment..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d || {
    echo "Docker compose up failed. Printing logs for melodarr-db:"
    docker compose -f docker-compose.yml -f docker-compose.dev.yml logs melodarr-db
    exit 1
}

echo "Ensuring melodarr_log database exists..."
if ! docker compose -f docker-compose.yml -f docker-compose.dev.yml exec -T melodarr-db psql -U melodarr -d melodarr_main -tc "SELECT 1 FROM pg_database WHERE datname = 'melodarr_log'" | grep -q 1; then
    docker compose -f docker-compose.yml -f docker-compose.dev.yml exec -T melodarr-db psql -U melodarr -d melodarr_main -c "CREATE DATABASE melodarr_log; GRANT ALL PRIVILEGES ON DATABASE melodarr_log TO melodarr;"
fi

echo "Starting watchers..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec melodarr-app bash -c 'set -e && export COREPACK_ENABLE_DOWNLOAD_PROMPT=0 && corepack enable && yarn set version stable && yarn config set nodeLinker node-modules && yarn install && echo "Building frontend..." && yarn build && echo "Linking UI to backend output..." && mkdir -p src/NzbDrone.Console/bin/Debug/net10.0 && ln -sfn /source/frontend/dist src/NzbDrone.Console/bin/Debug/net10.0/UI && dotnet restore src/Melodarr.sln && dotnet watch run -c Debug --project src/NzbDrone.Console/Melodarr.Console.csproj --framework net10.0 -- -nobrowser'
