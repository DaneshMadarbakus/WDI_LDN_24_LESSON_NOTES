---
title: Making a Test Framework Lesson
type: lesson
duration: "1:30"
creator:
    name: Alex Chin
    city: London
competencies: Testing
---

# Making a Test Framework

### Objectives
*After this lesson, students will be able to:*

- Understand the concept of a creating tests
- Be familiar with the concept of TDD
- Recognise common testing syntax & patterns before using a framework

### Preparation
*Before this lesson, students should already be able to:*

- Write and call functions in JavaScript
- Can create an object in JavaScript

## What is testing - Intro (15 mins)

Testing is the process of making sure your code does what it's supposed to.

### Manual testing

Manual testing, or error-driven development, is just what it sounds like: checking all the code works as expected after you change any source code, including testing your application from your web interface. This is limited by the time you need to test *everything* whenever you change *anything*. The larger the code base gets, the harder it is to check every line and every page every time a change is made.

### Automated testing

Automated testing is achieved by writing code that checks your code. This may involve writing some code that plays through scenarios that address various possible input values and the expected outcomes.

When you write very small tests that check very small sections of classes or models, we call that "unit" testing.

As your code base grows, so does you test coverage. You should get to a situation where you can run your test code at any time, and every single line of your code gets passed through to ensure it's still returning what you expected it to when it was first written.

#### What is TDD?

TDD stands for test-driven development. Also called red/green development, in TDD, you write the tests first, before writing any code and then write code that makes the test pass.

The test will initially fail - that's the point of the 'red' - and the expectations of the test will drive how you will write your actual code - this is referred to as your implementation - until the test passes, or goes 'green'.

Frequently, TDD is approached with pair programming - two developers working together at one machine. Often, one person writes a test; then, the other writes the implementation, and they alternate throughout the day. In an interview, you might be given some test code and be asked to write the implementation code; or you might be asked to write the tests for some outline functionality to demonstrate your familiarity with this process.

The process is also referred to as red/green/refactor because once the test passes (and it's "green"), you can review the code you've written and any other parts of the code that's affected to see if it can be cleaned up at all. No new functionality is added at this stage - the desired outcome is still for the tests to pass, just as they had before, but with more efficient code.

<p align="center">
<img src="http://www.pathfindersolns.com/wp-content/uploads/2012/05/red-green-refactorFINAL2.png">
</p>

### Testing at the end?

Often developers do not write their code TDD, this might be because there isn't time or there isn't enough budget. Developers often "intend" to write tests but they don't don't get around to it. 

It is a great habit to get into!

## Setup the HTML & JS - Codealong (5 mins)

We're going to actually build a very basic testing framework from scratch so that you can better understand how test frameworks work.

The first thing that we have to do, so that we can run our JS and inspect the output that it gives, is to create an HTML file and load a JavaScript file. 

So let's do this.

```bash
$ touch index.html
$ touch app.js
$ atom .
```

Now using the Sublime shortcut, type `html` and press tab in your text editor and you should get some boilerplate HTML: 

```html
<!DOCTYPE html>
<html>
  <head>
    <title></title>
  </head>
  <body>

  </body>
</html>
```

You now want to load your `app.js` script into this page:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Making a test framework</title>
    <script src="./app.js" charset="utf-8"></script>
  </head>
  <body>

  </body>
</html>
```

To check that this has loaded, inside your `app.js` file - add: 

```js
alert("hello");
```

If you now open the `index.html` file in your browser - you should see that alert pop-up.

## describe & it - Codealong (5 mins)

Most test frameworks use very similar syntax, this is the case whether you are looking at JavaScript or Ruby. 

So, to get used to this convention - we're going to follow this syntax style without actually using a testing framework.

### describe

We're going to group our tests using a function called `describe`, so let's create that in `app.js`:

```js
// The `describe` function is for grouping related specs.
function describe(description, callback) {
}
```

Inside this function, we just want to `console.log` the description we have provided it and then execute the callback function after this - remember that functions in Javascript are first class!

```js
function describe(description, callback) {
  console.log(description);
  callback();
}
```

Let's now call this function at the end of the file:

```js
describe("These are the specs for a car object", function(){
  // Individual specs go here
});
```

### it

Now each spec/test that we write is going to be inside an `it` function. This actually looks very like the `describe` function:

```js
// Specs/Tests are defined by calling the `it` function
function it(description, callback) {
  console.log(description);
  callback();
}
```

Now let's call this inside our `describe` function call:

```js
describe("These are the specs for a car object", function(){
  // Individual specs go here
  it("should exist", function(){
  	// The logic of your test should go here
  });
});
```

## Expect - Codealong (5 mins)

Expectations (similar to assertions) are a really important part of testing. Testing is all about checking that your code functions as you expect, expections and assertions are just bits of code that do just that! 

We're going to use an `expect` function to check whether or not we are getting what we expect from our code.

Our `expect` function is going to return an object `{}` that is going to have some functions as properties. These functions are going to do some sort of a check using Boolean logic.

### toBe

The first example is going to be a `toBe` function which is going to check if what we provide as a condition `===` the object that we provide to the `expect` function.

This sounds complicated now, but it will make sense when we use it.

```js
function expect(object){
  return {
  	toBe: function(condition){
      return console.log(object === condition);
    }
  }
}
```

Let's now use this in our `it` block:

```
describe("These are the specs for a car", function(){
  it("should exist (be true)", function(){
    expect(!!car).toBe(true);
  });
});
```

### TDD

If we run this code in the browser, we should now get the error `car is not defined`:

<img width="345" alt="screen shot 2016-01-21 at 23 35 33" src="https://cloud.githubusercontent.com/assets/40461/12498072/b1af2d00-c097-11e5-9151-2b6c8514d1fc.png">

This is great because we have written the test before actually creating the object. This is **Test Driven Development**. 

We now need to write the code to make the test pass! So above the describe block, let's create a car:

```js
var car = {}
```

If you refresh the page, you should now see:

<img width="241" alt="screen shot 2016-01-21 at 23 34 39" src="https://cloud.githubusercontent.com/assets/40461/12498055/9ab8b814-c097-11e5-9b80-e1bf9704b141.png">

Let's actually update our `expect` function to say pass or fail, instead of true. 

We can actually make this `console.log` a different color using some uncommon syntax. This is just for effect, nothing else. [More info on styling your console output](https://developer.chrome.com/devtools/docs/console#styling-console-output-with-css).

```js
function expect(object){
  function log(result) {
    if (!!result) {
      console.log('%c' + "pass", 'color: green');
    } else {
      console.log('%c' + "fail", 'color: red');
    }
  }
  return {
    toBe: function(condition){
      return log(object === condition);
    }
  }
}
```

Here, we have created a new function, `log` that we have are using to `console.log` either pass or fail depending on whether the result of the Boolean logic is true or false.

### toBeDefined

Let's create another property of our expect object that is going to check whether something is defined (not undefined):

```js
function expect(object){
  function log(result) {
    console.log(!!result ? "pass" : "fail");
  }
  return {
    toBe: function(condition){
      return log(object === condition);
    },
    toBeDefined: function() {
      return log(typeof object !== "undefined");
    }
  }
}
```

This time, we don't have to pass in an argument to this function because we are checking for `undefined`.

Let's now write a spec to use this function: 

```js
describe("These are the specs for a car", function(){
  it("should exist (be true)", function(){
    expect(!!car).toBe(true);
  });
  it("should be defined", function(){
    expect(car).toBeDefined();
  });
});
```

If you refresh your page, you should now see:

<img width="266" alt="screen shot 2016-01-21 at 23 48 47" src="https://cloud.githubusercontent.com/assets/40461/12498310/8d42c678-c099-11e5-8335-3046b29ed812.png">

Great two tests passing!

## Independent Practise - (20 mins)

Different test frameworks use different expectation libraries. Our library is going to have these functions:

```
function expect(object){
  function log(result) {
    if (!!result) {
      console.log('%c' + "pass", 'color: green');
    } else {
      console.log('%c' + "fail", 'color: red');
    }
  }
  return {
    toBe: function(condition){
      return log(object === condition);
    },
    toBeDefined: function() {
      return log(typeof object !== "undefined");
    },
    toBeUnDefined: function() {
      // check if something is undefined
    },
    toEqual: function(condition){
      // check if something is equal to a condition
    },
    toBeTruthy: function() {
      // check if something is truthy
    },
    toBeFalsey: function(){
      // check if something is falsey
    },
    toBeNull: function(){
      // check if something is null
    },
    toContain: function(condition){
	  // check if something, an array or a string, contains the condition
    }
  };
}
```

As you write the logic for these functions, you will need to add corresponding specs.

You will end up with a car object that looks something like this:

```js
var car = {
  wheels: 5,
  owners: ["Alex", "Mike", "Gerry", "Steve"],
  crashes: null,
  mot: true,
};
```

## Independent Practise Solution - (10 mins)

Go through some class solutions and demo the solution code.

## Summary - (5 mins)

Even though we haven't used a testing framework. We've basically made one ourselves. So later on in the course when we come across this syntax, you will be familiar with it!