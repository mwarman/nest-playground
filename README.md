# NestJS Playground

## About

This project is a playground NestJS application containing experiments and samples for various capabilities of NestJS.

The main elements of the application technology stack are:

- NestJS - the foundation
- TypeScript

## Experiment - Caching (Basic)

The goal of this experiment is to implement caching for API requests. This experiment utilizes the in-memory cache.

The following dependencies are required for this experiment:

- `cache-manager`

The `CacheModule` is registered within the `AppModule` imports. Default configuration is applied during registration. The `CacheModule` is registered as a _global_ module. Therefore, it is not necessary to explicitly include it in the _imports_ of the `TodosModule`.

The `TodosController` provides an example of instrumenting a CRUD REST API for caching. The `CacheInterceptor` decorates the controller class. This interceptor automatically caches the responses for all `@Get` methods. The cache key is the route path.

The `CacheInterceptor` does not automatically delete cache keys when data is changed in `@Post`, `@Put`, `@Patch`, or `@Delete` methods. The `clearCache` function demonstrates one way of programmatically deleting certain cache keys when data is updated. This method could be moved to a dedicated Provider for reusability.

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
