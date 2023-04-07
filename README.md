# NestJS Playground

## About

This project is a playground NestJS application containing experiments and samples for various capabilities of NestJS.

The main elements of the application technology stack are:

- NestJS - the foundation
- TypeScript

## Experiment - Auth

The goal of this experiment is to explore the fundamentals of authentication and authorization.

### Dependencies

The following dependencies are installed for this experiment:

- `@nestjs/jwt`

### Application Changes for Authentication

The `AuthModule` and related components encapsulate the authentication logic. The logic in this experiment is contrived and overly simplistic; however, it illustrates the basic approach for implementing global API authentication.

The `AuthService` implements a `signIn` method which authenticates a user with their supplied credentials and returns a JSON Web Token, abbreviated JWT, when successful. The JWT has an encrypted payload containing user attributes. The token must be passed to any endpoints which require authentication in the `Authorization` header using the _Bearer_ format, e.g. `Bearer abc123.def456`.

The `@nestjs/jwt` library provides low-level support for JWTs. The `JwtModule` is registered and configured in `AuthModule`.

The `AuthController` exposes a `signIn` endpoint which accepts the user's credentials and calls the `AuthService`.

In NestJS, _Guards_ are providers which protect endpoints. They are invoked with the endpoint request and the execution context. The `AuthGuard` authenticates a request for a protected endpoint. In this experiment, the `AuthGuard` is configured as a _global_ guard in `AuthModule` which applies it to all endpoints without needing to explicitly decorate them.

Some endpoints, such as the `/auth/signin` endpoint, need to be public. The `Public` decorator is applied to all controller classes or methods which do not require authentication. The logic in `AuthGuard` looks for the presence of the `Public` decorator, bypassing authentication when present.

### Application Changes for Authorization

Authentication verifies the identity of a client. _Authorization_ determines if a verified client is _permitted_ to perform the requested operation.

To implement a simple role-based access control (RBAC) approach, the `Roles` decorator is used on controller classes and methods to indicate which role(s) are required to access the endpoint(s). The absence of a `Roles` decorator indicates that any role (or no role, i.e. Public) is required to access the endpoint.

The `RolesGuard` authorizes a request for a protected endpoint. The `RolesGuard` is configured as a _global_ guard in `AuthModule` which applies it to all endpoints without needing to explicitly decorate them.

The `RolesGuard` compares the roles required to access the endpoint, i.e. those from the `Roles` decorator, to those roles granted to the authenticated user. If the user has at least one of the required roles, access is granted. Otherwise a `403 Forbidden` error is returned to the client.

### Postman

The Postman collection in the `/docs` directory contains all of the APIs used in this experiment.

- `/auth/login`
- `/auth/profile`
- `/users`
- `/users/:id`

### Further Reading

- [NestJS Authentication Guide](https://docs.nestjs.com/security/authentication)

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
