---
title: Angular Yearbook with `$http`
type: homework
duration: n/a
creator:
    name: Alex Chin
    city: London
competencies: Programming, Server Applications
---

# Angular Yearbook with `$http`

## Introduction

To practise using `$http` to make requests to an API, we've provided you with some starter-code.

This starter-code has API endpoints for a RESTful a User resource. There is no authentication on the API, so it should be open for you to make calls from your Angular front-end.

The starter-code already includes:

- Angular
- UiRouter
- Bootstrap

## Add some users

You will need to add some images for your classmates and then seed them in the `db/seeds.js` file.

## Task

Your task is to build out the Angular front-end using `$http` and `UiRouter` to make calls to the API endpoints.

You should make all of the CRUD actions:

- **Create** CREATE
- **Read** INDEX/SHOW
- **Update** UPDATE
- **Delete** DELETE

Add some basic styling to the app using Bootstrap.

## Tip

You can separate the different RESTful actions into more than one controller if you want, e.g.

- `users-index.controller.js` => `UsersIndexCtrl`
- `users-show.controller.js` => `UsersShowCtrl`
- `users-new.controller.js` => `UsersNewCtrl`
- `users-edit.controller.js` => `UsersEditCtrl`
