# Melodarr Database Configuration

Melodarr uses a structured two-container deployment schema where the backend API relies on an external PostgreSQL instance for persistence. It does not run an embedded SQLite database by default when deployed via our official Docker Compose stacks.

## Environment Variables
The `.NET` backend binds exclusively to environment variables representing the `Melodarr:Postgres` configuration section.

| Variable Name | Description | Default (If mapped) |
| --- | --- | --- |
| `Melodarr__Postgres__Host` | Hostname of the Postgres container | `melodarr-db` |
| `Melodarr__Postgres__Port` | Port for the connection pool | `5432` |
| `Melodarr__Postgres__User` | Auth login for Postgres | `melodarr` |
| `Melodarr__Postgres__Password` | Auth password | `${MELODARR_DB_PASSWORD}` |
| `Melodarr__Postgres__MainDb` | Primary application DB name | `melodarr_main` |
| `Melodarr__Postgres__LogDb` | Audit/Log DB name | `melodarr_log` |

## Deployment Constraints
To ensure application stability when deployed across self-hosted Docker clusters:
1. Ensure the `melodarr-db` service exposes a functional `pg_isready` health check.
2. Ensure the `melodarr-app` definition depends on the `melodarr-db` service with the `condition: service_healthy` rule. This guarantees that the container only initializes when the DB is fully ready to accept schema migrations and pool handshakes.
3. The initialization script (`postgres-init.sh`) mounted to `/docker-entrypoint-initdb.d/init.sh` is only executed **once** when the Postgres container initializes its persistent volume data for the very first time. If you need to re-run the initialization logic, you must manually delete the `melodarr-db-data` volume and allow Postgres to re-initialize it.
