# NestJS Playground

## About

This project is a playground NestJS application containing experiments and samples for various capabilities of NestJS.

The main elements of the application technology stack are:

- NestJS - the foundation
- TypeScript

## Experiment - PostgreSQL with TypeORM

The goal of this experiment is to illustrate how to manage transactional data in a PostgreSQL database using the TypeORM library. See the [NestJS database guide](https://docs.nestjs.com/techniques/database) for additional information.

### Dependencies

```
npm install @nestjs/typeorm typeorm pg
```

### Docker

To run PostgreSQL in a Docker container, issue the following commands.

```
# pull the PostgreSQL 15.x image
docker pull postgres:15

# run a new container exposting the port for local connection
# creates a temporary volume, initializing a new database
docker container run --name nest-postgres --publish 5432:5432 --env POSTGRES_PASSWORD=nestplayground --detach postgres:15

# stop the container; preserving data in the temporary volume
docker container stop nest-postgres

# restart the container with any previously stored data
docker container start nest-postgres
```

To connect to the Docker container with a PostgreSQL client, issue the following command:

```
psql -h localhost -U postgres
```

### Docker Compose

A Docker Compose configuration file, `docker-compose.yml` is included in this experiment. The compose script allows developers to perform local application changes, including hot reloads when source files are changed. The compose file also includes dependencies, such as a PostgreSQL database container.

To start the docker compose application stack, issue the following command:

```
docker compose up --build
```

The above command builds the `development` stage of the application container and starts the NestJS application with `npm run start:dev`, i.e. in watch mode. The compose spec maps the entire project to a volume in the application container which facilitates hot reloading. The stack logs are printed directly to the console.

Press `ctrl-C` or `cmd-C` to stop the stack.

### Further Reading

[NestJS Database Guide](https://docs.nestjs.com/techniques/database)  
[TypeORM](https://typeorm.io/)  
[PostgreSQL DOI](https://hub.docker.com/_/postgres)  
[How to use the Postgres Docker Official Image](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/)

## Repository

The base NestJS application template source code is located on the `main` branch. It remains largely untouched from initial project generation using the Nest CLI.

Individual experiments are created on dedicated branches prefixed with `exp/*`. For example, the `exp/rest-basic` branch demonstrates how to create a simple REST API. The focus is on the mechanics of routing and code organization.

## Installation

### Prerequisites

It is strongly recommended that you install Node Version Manager, `nvm`. Node Version Manager simplifies working on multipleprojects with different versions of Node.js.

### Install Node

Open a terminal window an dnavigate to the project base directory. Issue the following command to install the version of Node and NPM used by the application:

```bash
# If you already have this version of Node, simply switch to it...
$ nvm use

# If you do NOT have this version of Node, install it...
$ nvm install
```

Node Version Managerinspects the `.nvmrc` file in the project base directory and uses or install the specified verion of Node and the Node Package manager, `npm`.

### Install the Dependencies

```bash
$ npm install
```

## Run the Application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This project is [MIT licensed](LICENSE).
