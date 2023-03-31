#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "nestdb" <<-EOSQL
  GRANT ALL PRIVILEGES ON SCHEMA public TO nestapp;
EOSQL