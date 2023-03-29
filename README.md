# NestJS Playground

## About

This project is a playground NestJS application containing experiments and samples for various capabilities of NestJS.

The main elements of the application technology stack are:

- NestJS - the foundation
- TypeScript

## Experiment - Logging

The goal of this experiment is to illustrate the practices for logging in a NestJS application.

The `AppLogger` within the core module is a custom logger. It extends the `ConsoleLogger` which is what NestJS uses by default. It uses application configuration to enable|disable logging and set the logging level.

The `AppLogger` is configured as the global logger for the Nest application in `main.ts`. Therefore, it is able to be consumed by any provider without requiring dependency injection, using the standard `Logger` approach. See an example of this in the `GreetingService`.

There are other approaches for logging in NestJS applications including integration with SaaS logging services.

See the [NestJS guide for the Logger](https://docs.nestjs.com/techniques/logger).

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
