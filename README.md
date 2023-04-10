# NestJS Playground

## About

This project is a playground NestJS application containing experiments and samples for various capabilities of NestJS.

The main elements of the application technology stack are:

- NestJS - the foundation
- TypeScript

## Experiment - Testing

The goal of this experiment is to explore the fundamentals of _testing_ within the NestJS framework.

### Unit Tests

The `todos.controller.spec.ts` module illustrates how to create unit tests for a NestJS component.

The `beforeEach` function executes before _each_ test. It uses the NestJS `TestingModule` to instantiate the portion of the NestJS application under test. The fully configured components may be fetched for testing.

A simple _should be defined_ test checks to ensure that the components under test have been created and configured appropriately.

A nested `describe` block contains tests for a single controller function, in this case the `findAll` function. This example shows test fixture data embedded within the test; however, fixtures may be externalized for reuse.

The test itself shows the process to set up the test, that is, to mock dependencies. Next function under test is executed and results stored. Finally, the results are asserted.

### End-to-End Tests

End-to-end (E2E) tests are located in the `/tests` directory. These tests simulate executing the application in the same manner as a real request. In this example, that means handling a HTTP request in an API endpoint.

The `todos.e2e-spec.ts` module illustrates how to create E2E tests for a NestJS application.

The `beforeAll` function executes once before any of the tests. Much like a unit test, the function sets up the module to be tested. Provider implementations may be overridden as needed. Finally, a full NestJS application is created an initialized after which it is ready to receive requests.

The `supertest` library is used to create HTTP requests and assert HTTP responses.

The `afterAll` function executes once after all of the tests. This function closes the NestJS application.

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
