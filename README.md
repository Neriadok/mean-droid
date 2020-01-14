# MeanDroid

![MeanDroid Logo](src/assets/logo.png)

## About

Mean-Droid is an hibrid architecture written just in [TypeScript](https://www.typescriptlang.org/docs/handbook/basic-types.html#introduction)
and which integrates [Mean](https://es.wikipedia.org/wiki/MEAN) (Mongo, Express, Angular and Node) with [Cordova](https://cordova.apache.org/docs/en/latest/guide/overview/index.html).

It also implements [Jest](https://jestjs.io/docs/en/api) for unit testing and, for functional testing,
[Gherkin (feature definition)](https://cucumber.io/docs/gherkin/reference/) and [Protractor (browser interaction)](https://www.protractortest.org/#/api).

To focus development on UX, UI and Features,
it provides custom [Schematics](https://www.npmjs.com/package/@angular-devkit/schematics) for code generation,
ensuring a separation between logic and interface.

## Index

- Prerequisites
- Installation
- Front Architecture
- Back Architecture
- Testing Architecture

## Prerequisites

- [node v13.5.0](https://nodejs.org/)
- [yarn v1.21.1](https://yarnpkg.com/)
- [mongodb v4.2.2](https://www.mongodb.com/download-center/community)
- [JDK v8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [SDK Tools or Android Studio](https://developer.android.com/studio)

## Installation

To start a project you must execute following commands in order:

Install dependencies
```sh
yarn
```

Initializing database (in windows this must be executed as super admin)
```sh
yarn db
```
Following command must be executed only in windows
```sh
net start "MongoDB"
```

Building web page
```sh
yarn build
```

Building generators
```sh
yarn generate:build
```

Initializing server and api
```sh
yarn serve
```

To ensure project is correctly installed launch tests:

Unit Testing
```sh
yarn test:code
```

Feature Testing
```sh
yarn test:features
```

To build native App

```sh
yarn platform:android
```

```sh
yarn build:android
```

## Front Architecture

Front End technologies are:
 - [Angular](https://angular.io/guide/architecture)
 - [Cordova](https://cordova.apache.org/docs/en/latest/guide/overview/index.html)

### Pages

Pages are the main presentation structure.
They are the navigation tree implementation
and integrate user interface with business logic.

User Interface must be provided with components,
html elements and scss styles. Mean while,
logic must be provided with services, guards and libs.
Having those concepts in mind,
pages must have as less logic structures as possible
and focus on calling services and libs.

You may generate new pages executing:
```sh
yarn generate:page my-page
```

### Components

Refactor and reuse, that's the main porpuse of components.
Whenever an html structure is use in many pages (many means three or more),
it's recommended to separate that code in a component for common use.

You may generate new pages executing:
```sh
yarn generate:component my-component
```

### Interfaces

It's highly recommended to use Interfaces
whenever an object is passed as param to a function or method. 

Most code editing tools provide an autocomplete boost when using interfaces or classes.

Using destructuring syntax let you focus on what a method do when it's called
and on object properties when accessing it's implementation.

Having this properties in mind your code would be cleaner, shorter and more descriptive.

### Services / Libs

Logic must be distributed in services or libs.

If the logic you are implementing
depends on the app state or requires some injected providers,
you must create services to implement it.

You may generate new services executing:
```sh
yarn generate:service my-service
```

If the logic you are implementing don't depends
neither on app state neither on injected providers,
you must create functions libraries on ```src/app/libs```
to implement it.

### Guards

To control the access to some pages depending on user permissions or any other condition
you must implement guards and provide them to the page module you want to guard.

You may generate new guards executing:
```sh
yarn generate:guard my-guard
```

## Back Architecture

Back End technologies are:
 - [Express](http://expressjs.com/api.html)
 - [Mongoose](https://mongoosejs.com/docs/api.html)
 - [Passport](http://www.passportjs.org/docs/)

### Models
You must implement models to generate new DB elements.
Models are mongoose library models composed by attributes and methods
(As any [OOP object](https://en.wikipedia.org/wiki/Object-oriented_programming)).

You may generate new models executing:
```sh
yarn generate:model my-model
```

### Endpoints

Endpoints are files that exports Api Methods related to Http Protocol Methods (Get, Post, Put, Patch, Delete).
They may contain the auth strategies call, business logic and model calls.

You may generate new endpoints executing:
```sh
yarn generate:endpoint my-endpoint
```

### Auth-strategies

Auth strategies are the implementation for [passport-custom](https://www.npmjs.com/package/passport-custom) Strategies
and works as authorization middlewares.

You may generate new strategies executing:
```sh
yarn generate:strategy my-strategy
```

## Testing Architecture

Tests technologies are:
 - [Jest](https://jestjs.io/docs/en/api)
 - [Cucumber](https://cucumber.io/)
 - [Protractor](https://www.protractortest.org/#/api)
 
For testing, this project focus on [Business Driven Development (BDD)](https://medium.com/codeops/what-is-bdd-and-why-936e80bce511).

Testing has been seen as evilness for a long time,
but applying this methodology you focus your mind on what software must do,
improving Minimal Viable Product Time to Market.

To correctly apply this methodology you must,
first of all, define Business Requisites (What does my app have to do)
and write those requisites as Features or Specs.

After it, you must implement tests before code. Tests must be simple.
For feature testing you may only prove what app should show after a user action.
For unit testing you may only prove In/Out methods (When this given, this returned).

### Features and Steps definitions

To define features it's recommended the use of [Gherkin Syntax](https://cucumber.io/docs/gherkin/reference/).
Features are a composition of steps which declare what is done by the user.

You may generate new feature executing:
```sh
yarn generate:feature my-feature
```

### Page Objects

[Page Objects](https://martinfowler.com/bliki/PageObject.html)
are an abstract representation of a page, which is composed by:
 - Elements (buttons, boxes, inputs, etc.)
 - Actions (click target button, fill target form, etc.)

In this project, page object files are autogenerated with page generation command (Look above).

To allow the Page to be tested, page object should include methods which reference those actions 
and locators to reference elements which are gonna be interacted,

To make things simpler, locators are just css locators.

So finally page object is compose of locators (elements) and actions methods.

 

(This are clearly OOP concepts =P)

### Specs

Specs are generated for all files that may contain business logic.
They are written with jest to improve test execution.
It's highly recommended to prove only exported functions or public method
which implements business logic or that are enough complex to be tested.

You must not import clasess or object that you are not testing,
use [ts-mockery](https://www.npmjs.com/package/ts-mockery) to Mock external dependencies.

The use of Angular Test-Bed is not recommended because it's focus on code integration
(Which is covered with feature tests) and slows down execution (a lot).

