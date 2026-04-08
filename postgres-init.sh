#!/bin/bash
set -e

# The default database (melodarr_main) is created by the postgres script automatically using POSTGRES_DB if specified.
# However, to be safe and explicit, and to also create the log db, we connect using the defined user and run CREATE DATABASE.

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE DATABASE melodarr_log;
	GRANT ALL PRIVILEGES ON DATABASE melodarr_log TO $POSTGRES_USER;
EOSQL
