---
title: Callbacks
type: lesson
duration: "1:25"
creator:
    name: Alex Chin
    city: London
competencies: Programming
---

# Callbacks

### Objectives
*After this lesson, students will be able to:*

- Explain what callbacks are and how to use them
- Explain how to use anonymous and named callbacks
- Dealing the with the `this` problem
- Explain briefly what causes callback hell
- Show the problem with giving parameters to a callback

### Preparation
*Before this lesson, students should already be able to:*

- Understand how to define a function
- Explain how to do something
- Do or build something

## Callbacks 

In JavaScript, functions are first-class objects; that is, functions are of the type Object and they can be used in a first-class manner like any other object (String, Array, Number, etc.) since they are in fact objects themselves. 

They can be stored in variables, passed as arguments to functions, created within functions, and returned from functions.

### So what?

Let's start by creating a new html file and a JS file:

```js
$ touch index.html
$ touch app.js
```

Inside the index.html add some boilerplate code and then require the app.js file:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Callbacks</title>
    <script src="./app.js" charset="utf-8"></script>
  </head>
  <body>

  </body>
</html>
```

Now inside app.js - let's add some code:

```js
function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}
```

Now let's create another function:

```js
function greet(name, callback){
  console.log("Hello, " + callback(name));
}
```

Now let's call that function:

```js
greet("alex", capitalize);
```

Run this code by opening up the `index.html` in the browser and looking in the console. You should see:

```
Hello, Alex
```

So we have passed the capitalize function to the greet function as if it were a variable.

### What have we seen here?

- We can pass functions around like variables and return them in functions and use them in other functions. 
- When we pass a callback function as an argument to another function, we are only **passing the function definition**. 
- We are **not executing the function** in the parameter. In other words, we aren’t passing the function with the trailing pair of executing parenthesis `()` like we do when we are executing a function.

**Note:** that the callback function is not executed immediately. It is “called back” (hence the name) at some specified point inside the containing function’s body. 

## Callbacks with eventListeners

One of the first places you will see callbacks in your Javascript journey will be with eventListeners.

Let's add an element inside the `<body>` of the html code:

```html
<div id="hello">Alex</div>
```

Now inside `app.js`, comment out and add a click eventListener for that div we just created:

```js
document.getElementById("hello").addEventListener("click", function(){
  console.log("A div with id of #hello was clicked!");
});
```

As we are loading our script at the top of the page and the DOM hasn't been loaded yet - we need to wrap everything in a "DOMContentLoaded" eventListener:

```js
window.addEventListener("DOMContentLoaded", function(){
  document.getElementById("hello").addEventListener("click", function(){
    console.log("A div with id of #hello was clicked!");
  });
});
```

Great, when you click on the div - you should now see the console log.

### How many callbacks are there?

So, in the code above - there are two callbacks being used:

1. The anonymous function that is being fired after the DOMContentLoaded eventListener
2. The anonymous function that is being fired after the click event

### Named callbacks

These don't have to be anonymous function - let's rename these to be named functions:

```js
window.addEventListener("DOMContentLoaded", init);

function init(){
  document.getElementById("hello").addEventListener("click", clicker);
}

function clicker(){
  console.log("A div with id of #hello was clicked!");
}
```

Much nicer! I think you'll agree that this is easier to read! It's actually also easier to test because the functions are named.

### Callback hell

What is What is ["callback hell"](http://callbackhell.com/) - aka. pyramid of doom.

![pyr-1](https://cloud.githubusercontent.com/assets/40461/8271348/2f04d48a-180a-11e5-8d5f-31677648b103.png)

Asynchronous javascript, or javascript that uses callbacks, is hard to get right intuitively. A lot of code ends up looking like this:

```js
fs.readdir(source, function(err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function(filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function(err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function(width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(destination + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
```

See all the instances of `function` and `})`? Eek! This is affectionately known as callback hell.

Here are two solutions to this problem:

1. **Name your functions** and declare them and pass just the name of the function as the callback, instead of defining an anonymous function in the parameter of the main function.
2. **Modularity**: Separate your code into modules, so you can export a section of code that does a particular job. Then you can import that module into your larger application.

You will get a chance to practise this, the more Javascript code you write.

## OOP and callbacks

Let's refactor this code to be OOP.

```js
var CallbackLesson = CallbackLesson || {};

CallbackLesson.init = function(){
  document.getElementById("hello").addEventListener("click", CallbackLesson.clicker);
};

CallbackLesson.clicker = function(){
  console.log("A div with id of #hello was clicked!");
};

window.addEventListener("DOMContentLoaded", CallbackLesson.init);
```

We've done this to show you that you can use object in your callbacks.


## Arguments with Callbacks

A common problem that you will face with callbacks is how to pass arguments.

Let's say that we wanted to pass the string: `A div with id of #hello was clicked!` as an argument to the clicker function.

Most people will do this:

```js
var CallbackLesson = CallbackLesson || {};

CallbackLesson.init = function(){
  document.getElementById("hello").addEventListener("click", CallbackLesson.clicker("A div with id of #hello was clicked!"));
};

CallbackLesson.clicker = function(string){
  console.log(string);
};

window.addEventListener("DOMContentLoaded", CallbackLesson.init);
```

If you reload the page, you will see that the string has been logged out straight away.

### By why?

[i]: Ask the class

When we pass a function as a callback, we specifically don't invoke it with `()`. This means that we want to fun the function immediately when JavaScript reads this.

To get around this problem, we need to wrap the function we want to pass arguments to in another function:

```js
CallbackLesson.init = function(){
  document.getElementById("hello").addEventListener("click", function(){
    CallbackLesson.clicker("A div with id of #hello was clicked!");
  });
};
```

## Problems with `this`

Let's change this code back to the way it was:

[i]: Send over by Slack

```js
var CallbackLesson = CallbackLesson || {};

CallbackLesson.init = function(){
  document.getElementById("hello").addEventListener("click", CallbackLesson.clicker);
};

CallbackLesson.clicker = function(){
  console.log("A div with id of #hello was clicked!");
};

window.addEventListener("DOMContentLoaded", CallbackLesson.init);
```

Another common issue that you might run into when using callbacks is that weird things happen with `this`. Let's log out the `this` in both of the callback functions.

```js
var CallbackLesson = CallbackLesson || {};

CallbackLesson.init = function(){
  console.log("1", this);
  document.getElementById("hello").addEventListener("click", CallbackLesson.clicker);
};

CallbackLesson.clicker = function(){
  console.log("2", this);
  console.log("A div with id of #hello was clicked!");
};

window.addEventListener("DOMContentLoaded", CallbackLesson.init);
```

### What do you think `this` will be?

1. Window
2. The div with the id of #hello

What would we need to do to make `this` refer to the object `CallbackLesson`?

### Option 1. Wrap the call in a function

One thing we could do to change the value of `this` would be to wrap the call in an anonymous function. This would allow you invoke the function `clicker` on the object `CallbackLesson`.

```js
var CallbackLesson = CallbackLesson || {};

CallbackLesson.init = function(){
  console.log("1", this);
  document.getElementById("hello").addEventListener("click", function(){
    CallbackLesson.clicker();
  });
};

CallbackLesson.clicker = function(){
  console.log("2", this);
  console.log("A div with id of #hello was clicked!");
};

window.addEventListener("DOMContentLoaded", CallbackLesson.init);
```

### Option 2. Use bind to change the value of `this`

We can use `bind`, `call` or `apply` to change the value of this. You might not come across this until you write very modular JS code. However it's a good set of tools to know now.

```js
var CallbackLesson = CallbackLesson || {};

CallbackLesson.init = function(){
  console.log("1", this);
  document.getElementById("hello").addEventListener("click", CallbackLesson.clicker.bind(CallbackLesson));
};

CallbackLesson.clicker = function(){
  console.log("2", this);
  console.log("A div with id of #hello was clicked!");
};

window.addEventListener("DOMContentLoaded", CallbackLesson.init);
```

## Conclusion

We use A LOT of callbacks in Javascript. Try to use named functions as much as possible so that you don't get into callback hell...

###Related Homework	

- [Art of Node](https://github.com/maxogden/art-of-node#callbacks)
- [Javascipt is Sexy](http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/)
- [Closures](http://javascriptissexy.com/understand-javascript-closures-with-ease/)





