# NestJS Playground

## About

This project is a playground NestJS application containing experiments and samples for various capabilities of NestJS.

The main elements of the application technology stack are:

- NestJS - the foundation
- TypeScript

## Experiment - Auth with Passport

The goal of this experiment is to explore the authentication using the [Passport](https://www.passportjs.org/) library.

### Dependencies

The following dependencies are installed for this experiment:

- `@nestjs/jwt`
- `@nestjs/passport`
- `passport`
- `passport-local`
- `passport-jwt`

...and the following development dependencies...

- `@types/passport-local`
- `@types/passport-jwt`

### Application Changes for Authentication

> **TIP:** This experiment builds on the `exp/auth` experiment. It may help to review that experiment first and then proceed with the Passport experiment.

The components within the `src/auth` directory tree encapsulate the authentication logic. The logic in this experiment is contrived and overly simplistic; however, it illustrates the basic approach for implementing global API authentication using Passport.

The `AuthService` implements a `validateUser` method to confirm the validity of user-supplied credentials. The `login` method creates a JSON Web Token, abbreviated JWT, for a supplied _user_ payload. The payload is encrypted into the JWT and contains user attributes. The token must be passed to any endpoints which require authentication in the `Authorization` header using the _Bearer_ format, e.g. `Bearer abc123.def456`.

The `@nestjs/jwt` library provides low-level support for JWTs. The `JwtModule` is registered and configured in `AuthModule`.

The `@nestjs/passport` library wraps the `passport` libary in familiar NestJS constructs.

The Passport library employs _Strategies_ to encapsulate various approaches to authentication. This experiment illustrates two of those strategies: _Local_ and _JWT_. The local strategy expects a username and password in the request and validates those credentials against a local data store. The JWT strategy expects a JSON Web Token in the request and validates the signed token itself.

Passport strategies are invoked using NestJS _Guards_. Passport provides the `AuthGuard` class. This experiment extends `AuthGuard` to create two specialized Guards: `LocalAuthGuard` and `JwtAuthGuard`. When these guards decorate a controller class or handler function, the respective Passport strategy is used to perform authentication.

For example, the `AuthController` has a `login` handler function which accepts the user's login credentials and returns a JWT if authentication is successful. The handler function is decorated with `@UseGuards(LocalAuthGuard)`. The guard is executed before the handler function, instructing Passport to execute the `LocalStrategy.validate()` function. This function verifies the credentials and returns a `user` object if successful, otherwise throws an exception.

The `JwtAuthGuard` is declared to be _global_ in the `AuthModule` and, therefore, is applied to all endpoints in the application.

Some endpoints, such as the `/` endpoint, need to be public, that is, they should bypass JWT authentication. The `Public` decorator is applied to all controller classes or handler functions which do not require authentication. The logic in `JwtAuthGuard` looks for the presence of the `Public` decorator, bypassing JWT authentication when present.

> **NOTE:** Since the `LocalAuthGuard` is **not** configured to be global, the guard and strategy are _only_ applied to those controller classes or handler functions decorated with the guard.

### Postman

The Postman collection in the `/docs` directory contains all of the APIs used in this experiment.

- `/auth/login`
- `/auth/profile`
- `/`

### Further Reading

- [NestJS Passport Recipe](https://docs.nestjs.com/recipes/passport)
- [Passport](https://www.passportjs.org/)

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
