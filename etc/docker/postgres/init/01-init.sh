#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER nestapp WITH PASSWORD 'nestpass';
  CREATE DATABASE nestdb;
  GRANT ALL PRIVILEGES ON DATABASE nestdb TO nestapp;
EOSQL