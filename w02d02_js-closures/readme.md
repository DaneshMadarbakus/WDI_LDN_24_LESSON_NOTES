---
title: Closures
type: lesson
duration: "1:25"
creator:
    name: Alex Chin
    city: London
competencies: Programming
---

# Closures

### Objectives
*After this lesson, students will be able to:*

- Explain what a closure means
- Explain how to create a closure
- Explain how to use a closure and why you might want to do this
- Explain what a self-executing anonymous function is

### Preparation
*Before this lesson, students should already be able to:*

- Understand how to define a function
- Understand how to define a variable
- Understand the basics of JavaScript scope


## Closures Intro

> A closure is the act of binding all free variables, and functions into a closed expression, that persist beyond the lexical scope from which they were created.

![function](https://cloud.githubusercontent.com/assets/40461/8271947/1fc976be-1829-11e5-99c1-dd941e2507d6.jpg)

Closures are functions that refer to independent (free) variables. In other words, the function defined in **the closure 'remembers' the environment in which it was created**.

Still confused?!


## I Do: Lexical scoping 

Let's have a look at the following code:

```js
function init() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  displayName();    
}
init();
```

- `init()` creates a local variable name and then a function called `displayName()`
- `displayName()` is an **inner function** that is defined inside `init()` and is only available within the body of that function. 
- `displayName()` has no local variables of its own, however it has access to the variables of outer functions and so can use the variable `name` declared in the parent function.

This is an example of **lexical scoping** (also called Static Scope) in JavaScript, the scope of a variable is defined by its location within the source code. Nested functions have access to variables declared in their outer scope.


## I Do: Javascript Virtual Machine 

I'm going to talk in VERY general kind of way about how programs are converted from a bunch of text in a file to something that can be run on a computer. *This is a very broad and deep concern in Computer Science.* 

### Javascript Phases

The Javascript Virtual Machine (VM) performs many operations to go from text in a file, i.e. code, to 1's and 0's that are stored in Memory and executed by a CPU.

The phases are:  

- **Load**: Load the javascript file.
- **Compilation**: Compile javascript code in a file to a form that can be executed.
- **Execution**: Run the javascript program.

Part of the Compilation phase, Lexical Analysis, is to look for variable declarations in the source code and build **Variable Scopes**. Scope is also called **Execution Context**. Because it provides a Context for the next phase, Execution.

### Buildng Scope.

Scope is built during the **Lexical Analysis** part of the Compilation phase. When this is done it's called **lexical scope**. This is very common in many programming languages.


## I Do: Closure

Now consider the following example:

```js
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

makeFunc();
=> function displayName();

var myFunc = makeFunc();
myFunc();
````

If you run this code it will have exactly the same effect as the previous `init()`.

What's different is that the displayName() inner function was returned from the outer function before being executed.

This does feel a little unintuitive. Normally, the local variables within a function only exist for the duration of that function's execution. Once `makeFunc()` has finished executing, it is reasonable to expect that the name variable will no longer be accessible. Since the code still works as expected, this is obviously not the case.

The solution to this puzzle is that **myFunc has become a closure**.

> A closure is a special kind of object that combines two things: a function, and the environment in which that function was created.

The environment consists of any local variables that were in-scope at the time that the closure was created. In this case, `myFunc` is a closure that incorporates both the `displayName` function AND the "Mozilla" string that existed when the closure was created.

#### Another example

Here's a slightly more interesting example — a `makeAdder` function:

```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
console.log(add5(2));  
=> 7
```

- When you create the closure, `add5` with `makeAdder(5)`, it returns a function that expects to recieve one argument `y`.

In essence, `makeAdder` is a function factory — it creates functions which can add a specific value to their argument. 

**`add5` is a closure**.

```js
var add10 = makeAdder(10);
console.log(add10(2));
=> 12
```

**`add10` is another closure**.

`add5` and `add10` are both closures. They share the same function body definition, but store different environments. In `add5`'s environment, `x` is 5. As far as `add10` is concerned, `x` is 10.


## We Do: Practical Closures

Why are closures actually useful?!

A closure lets you associate some data (the environment) with a function that operates on that data. This has obvious parallels to object oriented programming, where objects allow us to associate some data (the object's properties) with one or more methods.

Much of the code we write in web JavaScript is **event-based** — we define some behavior, then attach it to an event that is triggered by the user (such as a click or a keypress). Our code is generally attached as a callback: a single function which is executed in response to the event.

#### An example

Let's use closures to create some buttons that adjust the size of the text on an HTML page.

#### HTML

First, let's create a file:

```bash
$ touch closure.html
$ subl .
```

Let's add some basic HTML Boilerplate:

```html
<!DOCTYPE>
<html>
<head>
  <title>Practical Closures</title>
</head>
<body>

</body>
</html>
```

Let's add the links to change the font-size:

```html
<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
```

#### CSS

And add some basic CSS:

```html
 <style>
   body {
     font-family: Helvetica, Arial, sans-serif;
     font-size: 12px;
   }

   h1 {
     font-size: 1.5em;
   }

   h2 {
     font-size: 1.2em;
   }
 </style>
```

#### JS

Let's add Javascript:

```bash
$ touch app.js
```

Let's include this file inside the html:

```html
<body>
  <script type="text/javascript" src="./app.js"></script>
</body>
```

Inside the js file

```js
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```


## I Do: Emulating private methods with closures

JavaScript does not provide a native way to declare private methods. However, it is possible to emulate private methods using closures. 

Here's how to define some public functions that can access private functions and variables, using closures which is also known as the `module pattern`:

```js
var counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };   
})();

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1
```

There is a lot going on here but it's useful to look at some closures in the wild!


## We Do: Self-Executing Anonymous Functions

A related topic, let's have a look at self-executing anonymous functions.

Self-executing functions, actually don't execute themselves... they are invoked like any other function using parenthesis, `()`.

**Note**: Self-executing anonymous functions are examples of, but not the same as [Immediately-Invoked Function Expressions](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) or **IIFE** for short. 

Why?

- IIFEs don't have to be anonymous, it's only important that they're function expressions.

Example of an IIFE that is not a self-executing anonymous function:

```js
(function bleh() {
  alert('I am not anonymous');
})();
```

The function expression is called as soon as it is evaluated. Let's create another self-executing anonymous function:

```js
(function(){
  var a = "hello word";
  console.log(a);
})();

console.log(a);
=> Uncaught ReferenceError: a is not defined
```

You can also do (recommended by Douglas Crockford):

```js
(function(){
  var a = "hello word";
  console.log(a);
}());

console.log(a);
```

Those two little brackets cause everything contained in the preceding parentheses to be executed immediately. What’s useful here is that JavaScript has function level scoping. All variables and functions defined within the anonymous function aren’t available to the code outside of it, effectively using closure to seal itself from the outside world.

We can pass variables into this self-executing function like this:

```js
(function(a){
  var b = a.toUpperCase();
  console.log(b);
})("Hello world!");
```

#### Closure & Self-executing anonymous function

We can use self-executing functions to keep our code tidy! We can also pair them up with closures:

```js
var foo = (function(){
  var priv = function() { alert('Hi!'); };
  var publ = function() { priv(); };
  
  return publ;
})();

console.log(foo);
foo();
```


## Closure

#### Performance considerations

It is unwise to unnecessarily create functions within other functions if closures are not needed for a particular task, as it will negatively affect script performance both in terms of processing speed and memory consumption.

### Questions

Any questions?

###Related Homework	

- [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [Getting Closure](http://markdaggett.com/blog/2013/02/25/getting-closure/)
- [Understand closures with ease](http://javascriptissexy.com/understand-javascript-closures-with-ease/)  
- [Closure FAQ](http://jibbering.com/faq/notes/closures)
- [Closure Use Cases](http://www.bennadel.com/blog/2134-a-random-exploration-of-closure-use-cases-in-javascript.htm)
- [IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
- [Getting Closure](http://markdalgleish.com/presentations/gettingclosure/)
- [I Love My IIFE](http://gregfranko.com/blog/i-love-my-iife/)
- [Self-executing Anonymous Expressions](http://esbueno.noahstokes.com/post/77292606977/self-executing-anonymous-functions-or-how-to-write)