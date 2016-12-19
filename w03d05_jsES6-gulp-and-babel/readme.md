---
title: Gulp and Babel
type: lesson
duration: "1:00"
creator:
    name: Alex Chin
    city: London
competencies: Programming, ES6
---

# Gulp and Babel

### Objectives
*After this lesson, students will be able to:*

- Understand how to setup Gulp and Babel
- Create a modern ES6 workflow
- Understand what a JS task runner can be used for

### Preparation
*Before this lesson, students should already be able to:*

- Should understand what babel does
- Should understand the difference between ES6 and ES6
- Should understand basic JS

## Intro to Gulp (15 mins)

Support is getting quite good with ES6 with some browsers and with Node. We've also had a look at using babel. However, at the moment, our babel code is only running when we run our babel command. What we really want to do is to get babel to watch changes in our files and re-run when we need to update our dist files.

We're going to do this with something called [gulp](http://gulpjs.com/).

### What is gulp?

> Gulp is a task/build runner for development. It allows you to do a lot of stuff within your development workflow. You can compile sass files, uglify and compress js files and much more. The kicker for gulp is that its a streaming build system which doesn't write temp files.

When developing in JS, the more complicated your workflow becomes, the more you need to automate things. There are two main "task-runners" or "build-process" to help you achieve this...

- [Grunt](http://gruntjs.com/)
- [Gulp](http://gulpjs.com/)

We will have a look at Grunt at another time. However, more and more people are favouring gulp because it doesn't write temp files and instead uses something called vinyl streams. Which means it's faster!

### Getting started with gulp

Gulp requires a file called `gulpfile.js` so first, let's make a file called `gulpfile.js`. We'll come back to what this does in a minute. 

```js
$ touch gulpfile.js
```

Next, let's make a new `package.json` file with:

```bash
$ npm init
```

You can press enter for everything.

#### Installing babel-cli and a preset

Now we want to install `babel-cli` and `babel-preset-es2015` as devDependencies of this project.

> **Remember** that babel 6 requires a preset, whereas older versions of babel would automatically convert ES6.

```bash
$ npm install babel-cli babel-preset-es2015 --save-dev
``` 

Next, we want two folders, one for our src files (`src`) and one for our `dist` files (could also be called `build` by convention).

```bash
$ mkdir src dist
```

Great. Now, we want to add a source file to our `src` directory. 

```bash
$ touch src/main.js
```

## Setting up gulp

Great. Now we want to setup our `gulpfile.js`.
First we want to install `gulp` and `gulp-babel` and require them in our gulpfile.

```bash
$ npm install gulp gulp-babel --save-dev
```

Then require them at the top of our `gulpfile.js`:

```js
const gulp  = require("gulp");
const babel = require("gulp-babel");
```

### Making a task

A gulp file consists of making several "tasks". Each task does one or more jobs that you want to accomplish. 

There are **so** many tasks that you can do. We're going to make a task to run babel using the plugin `gulp-babel`.

First, we need to make a task:

```js
gulp.task('es6', () => {
  
});
```

Next, we need to tell the task what `src` files to look at. For this task, we want to look at our `main.js` file inside our `src` directory:

```js
gulp.task('es6', () => {
  return gulp.src('src/main.js')
});
```

> **Note:** This could also be a wildcard, e.g. `src/**/*.js`

Now, how gulp works is that it will read our files and create using something called "vinyl" a stream of that file that we can "pipe" through some other functions in order to change the contents of that file. Finally, we will need to set a destination file to out put the result. 

Initially, we're going to pipe the file through the babel plugin that we saved to the `const` babel:

```js
gulp.task('es6', () => {
  return gulp.src('src/main.js')
    .pipe(babel())
});
```

Babel takes a setup object, where we need to specify the preset we want babel to use:

```js
gulp.task('es6', () => {
  return gulp.src('src/main.js')
    .pipe(babel({
      presets: ['es2015']
    }))
});
```

Lastly, we want to specify the destination directory and destination filename:

```js
gulp.task('es6', () => {
  return gulp.src('src/main.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});
```

#### Default

Currently, if we wanted to run this task we would need to specify the name of the task:

```bash
$ gulp es6
```

However, if we create a "default" task we can specify one or an array of tasks to run when we simply type `gulp`.

So let's set this up. We're actually going to use a built in function of gulp called `gulp.watch` to enable this default task to re-run anytime there is a change to the specified files:

```js
const gulp  = require("gulp");
const babel = require("gulp-babel");

gulp.task('es6', () => {
  return gulp.src('src/main.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', () => {
  gulp.watch('src/main.js', ['es6']);
});
```

Great! Now try running:

```bash
$ gulp
```

You should see something similar to:

```
[10:44:10] Starting 'default'...
[10:44:10] Finished 'default' after 7.79 ms
```

To stop this task, press "ctrl + c".

We can actually improve this default task slightly by ensuring that the es6 task runs before the watch task with:

```js
gulp.task('default', ['es6'], () => {
  gulp.watch('src/main.js', ['es6']);
});
```

Now you should see something that looks like this:

```
[10:46:54] Starting 'es6'...
[10:46:54] Finished 'es6' after 139 ms
[10:46:54] Starting 'default'...
[10:46:54] Finished 'default' after 8.42 ms
```

### Adding some es6

Let's test that this is running by adding some es6 to our `src/main.js` file.

Ensure that you have gulp running. 

Now let's add:

```js
let log = "Hello world";
console.log(`How classic, much ${log}`);
```

You should see that when you save the terminal should log:

```
[10:48:55] Starting 'es6'...
[10:48:55] Finished 'es6' after 22 ms
```

Now you should see that a `main.js` has appeared in the dist directory! It should be in ES5:

```js
"use strict";

var log = "Hello world";
console.log("How classic, much " + log);
```

#### Making a change

Let's make a change to see if our watch is working:

```js
let log = "Goodbye world";
console.log(`How classic, much ${log}`);
```

Should output in `dist/main.js`:

```js
"use strict";

var log = "Goodbye world";
console.log("How classic, much " + log);
```

Great!


gulp --tasks

## Traceur

There are other options to do this, with the most famous being [Traceur](https://github.com/google/traceur-compiler). There are a number of companies who use this, with GoSquared being just one.

## Conclusion (5 mins)
- What is babel?
- What is a build process?
- What is the default task?
