#!/usr/bin/env bash

show_menu() {
    clear
    local status="Stopped"
    if docker ps --format '{{.Names}}' | grep -q "^melodarr-dev-env$"; then
        status="\033[32mRunning\033[0m"
    elif docker ps -a --format '{{.Names}}' | grep -q "^melodarr-dev-env$"; then
        status="\033[31mStopped/Exited\033[0m"
    fi

    echo -e "========================================"
    echo -e "      MELODARR DEVELOPMENT TOOLKIT      "
    echo -e "========================================"
    echo -e " Status:  $status"
    if [ "$status" = "\033[32mRunning\033[0m" ]; then
        echo -e " URL:     \033[36mhttp://localhost:8686\033[0m"
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
    echo "[0] Exit"
    echo "========================================"
    read -p "Please select an option [0-8]: " choice
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
            docker compose -f docker-compose.dev.yml ps
            read -p "Press Enter to return to menu..."
            show_menu
            ;;
        3)
            ./shell.sh
            show_menu
            ;;
        4)
            read -p "Run full build? (Y/n): " confirm
            if [[ "$confirm" =~ ^[Yy]$ ]] || [[ -z "$confirm" ]]; then
                ./build.sh --backend --frontend --packages -f net8.0 -r linux-x64
            fi
            read -p "Press Enter to return to menu..."
            show_menu
            ;;
        5)
            echo "1) Unit"
            echo "2) Integration"
            echo "3) Automation"
            read -p "Select Test Type [1-3]: " ttype
            case $ttype in
                1) ./test.sh Linux Unit Test ;;
                2) ./test.sh Linux Integration Test ;;
                3) ./test.sh Linux Automation Test ;;
                *) echo "Skipping test execution." ;;
            esac
            read -p "Press Enter to return to menu..."
            show_menu
            ;;
        6)
            docker compose -f docker-compose.dev.yml down
            read -p "Press Enter to return to menu..."
            show_menu
            ;;
        7)
            echo "Wiping database and configuration files..."
            docker compose -f docker-compose.dev.yml exec dev-env bash -c 'rm -rf ~/.config/Melodarr/*.db ~/.config/Melodarr/*.db-* ~/.config/Melodarr/config.xml' 2>/dev/null || true
            curl -s -X POST http://localhost:8686/api/v1/system/restartdb 2>/dev/null || true
            sleep 2
            echo "Database wiped and backend restart triggered."
            read -p "Press Enter to return to menu..."
            show_menu
            ;;
        8)
            echo "Running Frontend Linter..."
            docker compose -f docker-compose.dev.yml exec dev-env bash -c 'yarn lint'
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
