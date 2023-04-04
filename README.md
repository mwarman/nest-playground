# NestJS Playground

## About

This project is a playground NestJS application containing experiments and samples for various capabilities of NestJS.

The main elements of the application technology stack are:

- NestJS - the foundation
- TypeScript

## Experiment - Caching with Redis

The goal of this experiment is to extend the basic caching experiment, `exp/caching`, to use Redis as the cache store.

### Dependencies

The following dependencies are required for this experiment:

- `cache-manager`
- `cache-manager-redis-yet`
- `@nestjs/config`
- `joi`

### Application Changes

The `CacheModule` is registered within the `AppModule` imports. The `registerAsync` method is used to configure the Redis `CacheStore` using the injected `ConfigService` dependency. The `CacheModule` is configured as a _global_ module. Therefore, it is not necessary to explicitly _import_ it in the `TodosModule`.

The `TodosController` provides an example of instrumenting a CRUD REST API for caching. The `CacheInterceptor` decorates the controller class. This interceptor automatically caches the responses for all `@Get` methods. The cache key is the route path.

The `CacheInterceptor` does **not** automatically delete cache keys when data ischanged in `@Post`, `@Put`, `@Patch`, or `@Delete` methods. The `clearCache` function demonstrates one way of programmatically deleting certain cache keys when data is updated. This approach could be moved to a dedicated Provider for reusability.

### Docker Compose

The experiment includes Docker and Docker compose configuration files.

> **INFO:** See the `exp/docker` experiment for more details regarding Docker.

The Docker Compose configuration, `docker-compose.yml`, allows developers to perform local application changes, including hot reloads, when source files are changed. The compose file also includes dependencies, such as a Redis container. Data is persisted on Docker volumes between restarts.

To start the docker compose application stack, issue one of the following commands.

```
# use the --build option the first time to create the app Docker image
docker compose up --build [--detach]

# on subsequent starts, omit the --build option
docker compose up [--detach]
```

The `Dockerfile` is organized into stages. This facilitates not only an optimized production image, but also a local development image that allows hot reloading when source files change.

The compose command above builds the `development` stage of the application image and starts the NestJS application with `npm run start:dev`, i.e. in _watch_ mode. The compose spec maps the entire project directory to a volume in the application container which facilitates hot reloading. The stack logs are printed directly to the console, unless started with `--detach`.

Press `ctrl-C` or `cmd-C` to stop the stack.

> **NOTE:** If started with `--detach` use `docker compose down` to stop the stack.

To clean up all Docker compose stack resources, **including** volumes, run the following command even if the stack is stopped.

```
docker compose down -v
```

This is useful to reset the environment back to the initial state.

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
