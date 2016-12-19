---
title: Intro to Babel
type: lesson
duration: "0.45"
creator:
    name: Alex Chin
    city: London
competencies: Programming, ES6
---

# Intro to Babel

### Objectives
*After this lesson, students will be able to:*

- Understand the difference between compiling and transpiling
- Explain how to use the babel-cli to convert a file form ES6 to ES6
- Manually convert a file using babel

### Preparation
*Before this lesson, students should already be able to:*

- Must understand some basic JavaScript
- Should have node installed
- Should have done some basic ES6

## What is Babel?

We're going to have a look at ES6, with some of it's new features:

- `let` and `const` instead of `var`
- `=>` arrow functions
- `class` syntax

However, we can't use ES6 in all browsers at the moment so we need to learn how to run our ES6 code. Although a lot is now supported in browsers like Chrome.

This will work. However, tools like [Babel](https://babeljs.io/) have been created to allow us to convert ES6 code into ES6 code. There are alternatives, like [Traceur](https://github.com/google/traceur-compiler) from Google which are also good. However, we're going to look at Babel today.

### Compiling vs transpiling

**Compiling** is the general term for taking source code written in one language and transforming it into another

**Transpiling** is a specific term for taking source code written in one language and transforming it into another language that has a similar level of abstraction.

So TypeScript to Javascript would be transpiling. As would ES6 to ES5.

However, Ruby to C would be compiling.

## Setup a project to use ES6

First let's create a new html file:

```bash
$ touch index.html
```

Then let's create some boilerplate html code.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Intro to ES6</title>
</head>
<body>

</body>
</html>
```

Next let's make two folders, dist and src

```bash
$ mkdir dist src
```

Inside these two files, we need to add two main files.

```bash
$ touch dist/main.js src/main.js
```

The dist version is going to be the compiled version with the source being the one that we're writing in ES6 and traspiling with babel.

We need to link the main file in the `index.html` file:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Intro to ES6</title>
</head>
<body>

  <script type="text/javascript" src="dist/main.js"></script>
</body>
</html>
```

## Installing Babel CLI

First we need to install Babel, which is an npm package. This means we need a `package.json` file.

Let's create that with:

```bash
$ npm init
```

(Accept the defaults).

While you can install Babel CLI globally on your machine, it’s much better to install it locally project by project. 

There are two primary reasons for this.

1. Different projects on the same machine can depend on different versions of Babel allowing you to update one at a time.
2. It means you do not have an implicit dependency on the environment you are working in. Making your project far more portable and easier to setup.

We can install Babel CLI locally by running:

```bash
$ npm install --save-dev babel-cli
```

## Adding some ES6

Let's now add some ES6 code to the `src/main.js` file.

```js
let log = "Hello world!";
console.log(`So classic, much ${log}`);
```

## Using Babel

Whilst we can run Babel from the command-line with a command like: 

```bash
$ babel src -d dist --source-maps
```

We can create an npm script command so that we use the localling installed version of Babel that is in our project.

```json
{
  "name": "intro-to-babel",
  "version": "1.0.0",
  "description": "An intro to babel",
  "scripts": {
    "build": "babel src -d dist --source-maps"
  },
  "author": "Alex Chin",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.11.4"
  }
}
```

## .babelrc

With this setup, Babel actually won't do anything. We haven't told Babel what to convert our code to. To do this, we need to setup a `.babelrc` file.

> Note: Pre-6.x, Babel enabled certain transformations by default. However, Babel 6.x does not ship with any transformations enabled. You need to explicitly tell it what transformations to run. The simplest way to do this is by using a preset, such as the ES2015 Preset. 

Let's install this plugin:

```bash
$ npm install babel-preset-es2015 --save-dev
```

Then to enable this, we're going to add the [ES2015 Preset](https://babeljs.io/docs/plugins/preset-es2015/) to a setup file for babel called `.babelrc`:

```bash
$ touch .babelrc
```

Add to this file:

```json
{
  "presets": ["es2015"]
}
```

Now from our terminal we can run:

```bash
$ npm run build
```

You should see the log:

```bash
src/main.js -> dist/main.js
```

If you have a look, there should be two files output in the dist directory

- A transpiled main.js

```js
"use strict";

var log = "Hello world!";
console.log("So classic, much " + log);
//# sourceMappingURL=main.js.map
```

- A source map

```
{"version":3,"sources":["../src/main.js"],"names":[],"mappings":";;AAAA,IAAI,GAAG,GAAG,cAAc,CAAC;AACzB,OAAO,CAAC,GAAG,uBAAqB,GAAG,CAAG,CAAC","file":"main.js","sourcesContent":["let log = \"Hello world!\";\nconsole.log(`So classic, much ${log}`);"]}
```

#### What is a source map?

Basically a source map is a way to map a combined/minified file back to an unbuilt state. 

A source map provides a way of mapping code within a compressed file back to it’s original position in a source file. This means that – with the help of a bit of software – you can easily debug your applications even after your assets have been optimized. The Chrome and Firefox developer tools both ship with built-in support for source maps.

## Conclusion (5 mins)
- What is the difference between transpiling and compiling?
- What is annoying about this setup?
