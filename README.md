# NestJS Playground

## About

This project is a playground NestJS application containing experiments and samples for various capabilities of NestJS.

The main elements of the application technology stack are:

- NestJS - the foundation
- TypeScript

## Repository

The base NestJS application template source code is located on the `main` branch. It remains largely untouched from initial project generation using the Nest CLI.

Individual experiments are created on dedicated branches prefixed with `exp/*`. For example, the `exp/rest-basic` branch demonstrates how to create a simple REST API. The focus is on the mechanics of routing and code organization. See the [list of repository branches](https://github.com/mwarman/nest-playground/branches/all) for all experiments.

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
