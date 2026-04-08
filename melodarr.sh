#!/usr/bin/env bash

DC="docker compose -f docker-compose.yml -f docker-compose.dev.yml"

is_running() {
    docker ps --format '{{.Names}}' | grep -q "^melodarr-app$"
}

require_running() {
    if ! is_running; then
        echo "Container is not running. Start it first with option [1]."
        return 1
    fi
}

show_menu() {
    clear
    local status="Stopped"
    if is_running; then
        status="\033[32mRunning\033[0m"
    elif docker ps -a --format '{{.Names}}' | grep -q "^melodarr-app$"; then
        status="\033[31mStopped/Exited\033[0m"
    fi

    echo -e "========================================"
    echo -e "      MELODARR DEVELOPMENT TOOLKIT      "
    echo -e "========================================"
    echo -e " Status:  $status"
    if is_running; then
        echo -e " URL:     \033[36mhttp://localhost:8687\033[0m"
    fi
    echo -e "----------------------------------------"
    echo "[1] Start Live Environment (Watch Mode)"
    echo "[2] Show Running Status"
    echo "[3] Open Interactive Shell"
    echo "[4] Run Target Build"
    echo "[5] Run Tests"
    echo "[6] Stop Environment"
    echo "[7] Wipe Database (Reset)"
    echo "[8] Run Linter"
    echo "[9] View Logs"
    echo "[0] Exit"
    echo "========================================"
    read -p "Please select an option [0-9]: " choice
    echo ""
    handle_choice "$choice"
}

handle_choice() {
    case $1 in
        1)
            ./dev.sh
            read -p "Press Enter to return to menu..."
            show_menu
            ;;
        2)
            $DC ps
            read -p "Press Enter to return to menu..."
            show_menu
            ;;
        3)
            ./shell.sh
            show_menu
            ;;
        4)
            require_running || { read -p "Press Enter to return to menu..."; show_menu; return; }
            echo "1) Backend only"
            echo "2) Frontend only"
            echo "3) Full build (backend + frontend)"
            read -p "Select build type [1-3]: " btype
            case $btype in
                1) $DC exec melodarr-app bash -c 'dotnet build src/Melodarr.sln -c Debug' ;;
                2) $DC exec melodarr-app bash -c 'export COREPACK_ENABLE_DOWNLOAD_PROMPT=0 && yarn set version stable && yarn config set nodeLinker node-modules && yarn install && yarn build' ;;
                3) $DC exec melodarr-app bash -c 'dotnet build src/Melodarr.sln -c Debug' && \
                   $DC exec melodarr-app bash -c 'export COREPACK_ENABLE_DOWNLOAD_PROMPT=0 && yarn set version stable && yarn config set nodeLinker node-modules && yarn install && yarn build' ;;
                *) echo "Skipping build." ;;
            esac
            read -p "Press Enter to return to menu..."
            show_menu
            ;;
        5)
            require_running || { read -p "Press Enter to return to menu..."; show_menu; return; }
            echo "1) Unit"
            echo "2) Integration"
            echo "3) Automation"
            read -p "Select Test Type [1-3]: " ttype
            case $ttype in
                1) $DC exec melodarr-app bash -c 'dotnet test src/Melodarr.sln --filter "Category!=ManualTest&Category!=IntegrationTest&Category!=AutomationTest"' ;;
                2) $DC exec melodarr-app bash -c 'dotnet test src/Melodarr.sln --filter "Category=IntegrationTest"' ;;
                3) $DC exec melodarr-app bash -c 'dotnet test src/Melodarr.sln --filter "Category=AutomationTest"' ;;
                *) echo "Skipping test execution." ;;
            esac
            read -p "Press Enter to return to menu..."
            show_menu
            ;;
        6)
            $DC down
            read -p "Press Enter to return to menu..."
            show_menu
            ;;
        7)
            require_running || { read -p "Press Enter to return to menu..."; show_menu; return; }
            read -p "Are you sure you want to wipe the database? (y/N): " confirm
            if [[ "$confirm" =~ ^[Yy]$ ]]; then
                echo "Wiping PostgreSQL database and configuration files..."
                $DC exec melodarr-app bash -c 'rm -rf ~/.config/Melodarr/config.xml'
                $DC exec melodarr-db psql -U melodarr -d postgres -c 'DROP DATABASE IF EXISTS melodarr_main WITH (FORCE); CREATE DATABASE melodarr_main;'
                $DC exec melodarr-db psql -U melodarr -d postgres -c 'DROP DATABASE IF EXISTS melodarr_log WITH (FORCE); CREATE DATABASE melodarr_log;'
                echo "Database wiped. Restart the environment (option 1) to apply."
            else
                echo "Cancelled."
            fi
            read -p "Press Enter to return to menu..."
            show_menu
            ;;
        8)
            require_running || { read -p "Press Enter to return to menu..."; show_menu; return; }
            echo "Running Frontend Linter..."
            $DC exec melodarr-app bash -c 'export COREPACK_ENABLE_DOWNLOAD_PROMPT=0 && yarn set version stable && yarn config set nodeLinker node-modules && yarn install && yarn lint'
            read -p "Press Enter to return to menu..."
            show_menu
            ;;
        9)
            echo "Showing logs (Ctrl+C to stop)..."
            $DC logs -f --tail 100
            read -p "Press Enter to return to menu..."
            show_menu
            ;;
        0)
            echo "Exited toolkit."
            exit 0
            ;;
        *)
            echo "Invalid option."
            sleep 1
            show_menu
            ;;
    esac
}

# Guard check
if [ ! -f "./dev.sh" ]; then
    echo "Error: Development scripts not found."
    echo "Please run this script from the root of the Melodarr repository."
    exit 1
fi

show_menu
