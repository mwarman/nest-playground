# NestJS Playground

## About

This project is a playground NestJS application containing experiments and samples for various capabilities of NestJS.

The main elements of the application technology stack are:

- NestJS - the foundation
- TypeScript

## Experiment - PostgreSQL with TypeORM

The goal of this experiment is to illustrate how to manage transactional data in a PostgreSQL database using the TypeORM library. See the [NestJS database guide](https://docs.nestjs.com/techniques/database) for additional information.

> **NOTE:** For ease of local development, this experiment includes Docker and Docker Compose to run the application and database.

### Dependencies

```
# dependencies for database
npm install @nestjs/typeorm typeorm pg

# dependencies for configuration
npm install @nestjs/config joi
```

### Application Changes

The `TypeOrmModule` is bootstrapped within `AppModule`. The `ConfigModule` is also bootstrapped here as well and is used to supply much of the configuration for the TypeOrmModule.

> **INFO:** See the `exp/config` branch for more details on configuring NestJS applications.

The `TodosModule` illustrates how to use TypeORM to perform standard database CRUD operations. The `Todo` class is the persistent `Entity` and uses annotations to map the class attributes to database columns. Each Entity has a dedicated Repository. The `todosRepository` is injected into the `TodosService`. The service methods use the repository to create, fetch, update, and delete Todo items from the database.

### Docker

To run PostgreSQL in a Docker container, issue the following commands. This is useful for developers who wish to run the database in a container, but the NestJS application outside of a container.

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

The experiment includes Docker and Docker compose configuration files.

> **INFO:** See the `exp/docker` experiment for more details regarding Docker.

The Docker Compose configuration, `docker-compose.yml`, allows developers to perform local application changes, including hot reloads when source files are changed. The compose file also includes dependencies, such as a PostgreSQL database container. Data is persisted on Docker volumes between restarts.

To start the docker compose application stack, issue the following command:

```
# use the --build option the first time to create the Docker image
docker compose up --build [--detach]

# on subsequent starts, omit the --build option
docker compose up [--detach]
```

The `Dockerfile` is organized into stages. This facilitates not only an optimized production docker image, but also a local development image that allows hot reloading when source files change.

The compose command above builds the `development` stage of the application image and starts the NestJS application with `npm run start:dev`, i.e. in _watch_ mode. The compose spec maps the entire project directory to a volume in the application container which facilitates hot reloading. The stack logs are printed directly to the console, unless started with `--detach`.

Press `ctrl-C` or `cmd-C` to stop the stack.

> **NOTE:** If started with `--detach` use `docker compose down` to stop the stack.

To clean up all Docker compose stack resources, **including** volumes, run the following command even if the stack is stopped:

```
docker compose down -v
```

This is useful to reset the database back to an empty state.

### Further Reading

[NestJS Database Guide](https://docs.nestjs.com/techniques/database)  
[TypeORM](https://typeorm.io/)  
[PostgreSQL DOI](https://hub.docker.com/_/postgres)  
[How to use the Postgres Docker Official Image](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/)  
[NestJS, Redis, and Postgres local development with Docker Compose](https://www.tomray.dev/nestjs-docker-compose-postgres)

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
