## Mongo
NoSql database that contains documents in the form of binary JSON (BSON).

## Express
Back-end (Server-side) web-framework that allows us to build websites easier using JS.

## Angular
Front-end (Client-side) framework. MVVM design pattern. (2-way data-binding, modular, good documentation, widely used, jQlite).

## Node
Google's V8 engine that allows JavaScript to be run on the server-side (on your computer).

---

## Angular Specific

### angular.module
A module is a collection of services, directives, controllers, filters, and configuration information.

```js
angular.module('name', []);
```

### angular.controller
A function of JavaScript that we link to a portion of the DOM in which we 1) handle events 2) pass data to the view (using `vm`/`this`)

Not to be confused with (Express) controller.

### angular.constant
A DRY place to store a value that is not going to change that we're going to use over and over again, e.g. url, API key, some special number?

Only takes a primitive data-type. Number, String.

### angular.value
The difference between a value and a constant service is that the former can only be injected (and thus be used) in a service or a controller while the latter can also be injected into a module configuration function.. (I will discuss the module configuration function in a future post).

### angular.config
(We have used this for our Router function when setting up UI-Router).
A function that is run early on in the Angular setup to setup something that the other files rely on?

[https://thinkster.io/a-better-way-to-learn-angularjs/config-function]()

### angular.directive
`ng-app`, `ng-click`, `ng-model`, `ng-src`, `ng-if`, `ng-show`, `ng-submit`...
A special new HTML attribute with JavaScript powers.
