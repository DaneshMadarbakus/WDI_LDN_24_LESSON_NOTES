---
title: Intro to ES6
type: lesson
duration: "1:25"
creator:
    name: Alex Chin
    city: London
competencies: Programming, ES6
---

# Intro to ES6

### Objectives
*After this lesson, students will be able to:*

- Understand some of the new features of ES6
- Understand why JavaScript is changing
- Be able to visualise ES6 code transpiling to ES5 code

### Preparation
*Before this lesson, students should already be able to:*

- Should have a firm understanding of JavaScript
- Should be able to run a node file

## ES6/ECMA2015? What is it even called?

The idea of this lesson is that there should be no typing. If you want to test some syntax out as I go through examples, you can do so either on:

- [ES6Fiddle](http://www.es6fiddle.net/)
- [JSBin](https://jsbin.com/?js,output)
- [BabelRepl](https://babeljs.io/repl/)
- [ES6Console](http://es6console.com/)

We're going to be looking at [ES6Console](http://es6console.com/) for this lesson because visually, it's the easiest to understand. 

It shows the ES6 on the left, the ES5 on the right and a console on the bottom. (The console isn't perfect but it'll do for this lesson).

This will allow us to compare ES6 code with the transpiled ES5 code. 

> Transpilation is compilation from one language to another language with a similar level of abstraction.

Then it will allow us to run the code and take a look at the output.

### Why are we changing JS?

> "Programs must be written for **people to read**, and only incidentally for computers to execute." - Abelson and Sussman (Structure and Interpretation of Computer Programs)

We need to program for people. 

Every language develops as time moves on. Chaucer wrote English like this:

> Whan that Aprillë with his schowrës swoot
> The drought of Marche had perced to the roote,
> And bathed every veyne in swich licour,
> Of which vertue engendred is the flour;"

But that now doesn't really even read like English! 

Coding languages are no different. Developers are constantly reaching for terms that don't exist or fall into habits of typing certain phrases or patterns that perhaps get shortened over time. 

The [TC39 committee](http://www.ecma-international.org/memento/TC39.htm) (responsible for ES6 standardization) have taken care of most of the concerns about JavaScript, and now ES6 is getting a lot of new features added, and existing bad parts fixed. If you want to know about the JavaScript good vs bad parts, check out Douglas Crockford’s book [JavaScript, the Good Parts](https://www.amazon.co.uk/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742).

### What is this new version of JS called?

[ES5, ES6, ES2016, ES.Next: What's going on with JavaScript versioning?](http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/) is a blog post that explains this very well.

Essentially, most developers refer to the new Javascript as ES6 because ES2015 doesn't make that much sense now that we are in 2016.

However, time will tell whether next year's spec (they have committed to releasing one per year) will be popularly known as ES7 or ECMA2016.

## `var`

The `let` keyword is a new keyword available to us in ES6 that allows us to define a block-scoped variable. 

Up to now, we have been using `var` to define a variable:

```js
var name = "Alex";
```

The scope of the `var` exists in function scope. Let's consider this by moving this declaration inside a function.

```js
function sayName() {
  var name = "Ben";
}

sayName();
console.log(name);
```

When we run this code, we should see that nothing was output on the right hand side. This is because the name variable is not accessible outside the scope of the function in which it was defined.

> CFU - Ensure that everyone is comfortable with this before moving forward. 

## `let`

In JS, we've never had the ability to use "block-scoping" until `let` has come along.

Let's consider:

```js
if (true) {
  var name = "Alex";
}

console.log(name);
=> Alex
```

However, if we change this to a `let` we see that we get the same affect as if we were inside a function.

```js
if (true) {
  let name = "Alex";
}

console.log(name);
```

Another example would be:

```js
for (var i = 0; i < 10; i++) {
  console.log(i)
}

console.log("outside", i);

=>
0
1
2
3
4
5
6
7
8
9
outside 10
```

If we use `let` however, we get:

```js
for (let i = 0; i < 10; i++) {
  console.log(i)
}

console.log("outside", i);

=>
0
1
2
3
4
5
6
7
8
9
```

> Note: There is actually an error that i is undefined here but it's not showing in our REPL.

## `const`

Next, we're going to have a look at using `const`. In other languages there is this idea of a constant value, often written in capitals, that is immutable (cant be changed).

In JavaScript, some people used to use the convention of capitals to fake this. E.g.

```js
var API_KEY = "121noainsoaindaoisnd";
console.log(API_KEY);
```

However, this is mutable...

```js
var API_KEY = "121noainsoaindaoisnd";
API_KEY = null;

console.log(API_KEY);
=> null
```

Let's try this with a `const` variable:

```js
const API_KEY = "121noainsoaindaoisnd";
API_KEY = null;
```

You can see that we get an error. This is because this new `const` variable is read-only, it can't be changed.

> **Note:** One thing to note is that complex objects such as objects and arrays are not completely immunable. Their properties and objects stored inside them are not protected.

```js
const someObject = {color: "red"};
someObject.color = "blue";

console.log(someObject);
=> {color: "blue"};
```

If you want fully immutable object, you can use libraries like [Immutable.js](https://facebook.github.io/immutable-js/) and [Mori](http://swannodette.github.io/mori/).

### When to use `var`, `let`, `const`? 

Most of the time, you should use `const` over `let`. To be honest, in ES6 - you should almost never need to use `var`. **`var` is now the weakest signal available when you define a variable in JavaScript.**

### Hoisting & initialization

> **Warning** 

With `let` and `const` in ES6, it’s no longer safe to check for an identifier’s existence using `typeof`:

```js
function foo () {
  typeof bar;
  let bar = 'baz';
}
foo(); // ReferenceError: can't access lexical declaration
       // `bar' before initialization
```

All declarations (`var`, `let`, `const`, `function`, `function*`, `class`) are hoisted in JavaScript. This means that if a name is declared in a scope, in that scope the identifier will always reference that particular variable.

However... `let` and `const` are not initialized with `undefined`.

But that's okay because you SHOULD always initialize your identifiers before you try to use them.

## Template strings

Next, we're going to have a look at string interpolation. This is a feature that lots of people wanted. This is called "template literals" or "string templates".

#### Multiline string

Doing multi-line strings in Javascript was quite difficult but now it's very easy. You need to use the backtick character to achieve this:

```js
let name = `Hello
everyone
this
is
cool`;

console.log(name);
```

#### Concatenation

Previously, in ES5, you need to do something like this to join strings:

```js
var firstName = "Alex";
var lastName  = "Chin";

console.log("My name is " + firstName + " " + lastName);
```

However, now with ES6 you can do:

```js
let firstName = "Alex";
let lastName  = "Chin";

console.log(`My name is ${firstName} + ${lastName}`); 
```

This is fantastic!

A more complicated example might be:

```js
let person = {
  firstName: "Alex",
  lastName: "Chin",
  sayName: function(){
    return `My name is ${this.firstName} ${this.lastName}`
  }
}

let name = person.sayName();

console.log(name);
```

Great!

## Enhanced Object Literals

So in the previous example, we could actually use another new feature of ES6 - enhanced Object Literals. 

The new things you can do with object literals are: 

- __proto__
- property shorthand
- method shorthand
- super calls
- computed (dynamic) property names

We're not going to go through them all, but let's consider the previous example, where we can remove the `function` from the right-hand side of sayName.

```js
let person = {
  firstName: "Alex",
  lastName: "Chin",
  sayName(){
    return `My name is #{this.firstName} ${this.lastName}`
  }
}

let name = person.sayName();
console.log(name);
```

Let's do another example:

```js
function createPerson(name, age) {
  return { 
    type: 'Person', 
    name: name, 
    age: age 
  };
}
```

This can be re-written as:

```js
function createPerson(name, age) {
  return { 
    type: 'Person', 
    name, 
    age 
  };
}
```

This is just syntactic sugar and is called **object literal property value shorthand**.

## Arrow functions

The inspiration for this syntax came from CoffeeScript. You can see a talk by Jeremy Ashkenas here:

- [Jeremy Ashkenas: CoffeeScript as a JS/Next](https://www.youtube.com/watch?v=QTj6Q_zV1yg&feature=youtu.be&list=PL3)

Arrow functions are really cool. They are a quicker way to write anonymous functions in Javascript.

Take a normal anonymous function in ES5:

```js
var add = function(a,b) {
  return a + b;
}

console.log(add(2,3));
``` 

Let's re-write this with an ES6 arrow function:

```js
var add = (a, b) => {
  return a + b;
}
```

We can actually dry this up and do two things here:

```js
var add = (a, b) => a + b;
```

1. Remove the curly braces
2. Remove the return

Now this is much DRYer. This is pretty great.

Let's consider this with the use of `map`:

```js
let numbers = [2,3,4,5,6,7];
let doubled = numbers.map(function(n){
  return n * 2;
}

console.log(doubled);
```

However, using arrow functions we can do:

```js
let numbers = [2,3,4,5,6,7];
let doubled = numbers.map((n) => n * 2);

console.log(doubled);
```

Which is really clean! We can actually make this even cleaner when there is a single parameter and we can remove the brackets:

```js
let numbers = [2,3,4,5,6,7];
let doubled = numbers.map(n => n * 2);

console.log(doubled);
```

Really nice!

### Lexical scope with arrow functions

There are a couple of things that might trip you up with arrow functions though. One is lexical scope.

Lets consider:

```js
let person = {
  name: "Alex",
  sayName: () => {
    console.log(`Hi my name is ${this.name}`);
  }
}

console.log(person.sayName());
```

This will give an error. `this` inside the arrow function is still the parent's value of this - so in this case it would be `window`.

So if we want to DRY up the code above, we need to use the object-shorthand syntax:

```js
let person = {
  name: "Alex",
  sayName() {
    console.log(`Hi my name is ${this.name}`);
  }
}

console.log(person.sayName());
```

This is equivalent to doing:

```js
let person = {
  name: "Alex",
  sayName: function() {
    console.log(`Hi my name is ${this.name}`);
  }
}

console.log(person.sayName());
```

A more practical example of when lexical scope is useful. First, let us consider this code:

There is something **wrong** with it:

```js
let person = {
  name: "Alex",
  interests: ["JS", "Ruby", "Go"],
  showInterests: function() {
    this.interests.forEach(function(interest){
      console.log(`${this.name} likes ${interest}`);
    });
  }
}

console.log(person.showInterests());
```

The problem is that `this.name` now doesn't refer to the object but as it's in a callback function it refers back to something else. We can change this though!

Previously, we could have stored the value of `this` in a variable in `self`:

```js
let person = {
  name: "Alex",
  interests: ["JS", "Ruby", "Go"],
  showInterests: function() {
    let self = this;
    this.interests.forEach(function(interest){
      console.log(`${self.name} likes ${interest}`);
    });
  }
}

console.log(person.showInterests());
```

But now with ES6, we could use an arrow function: 

```js
let person = {
  name: "Alex",
  interests: ["JS", "Ruby", "Go"],
  showInterests: function() {
    this.interests.forEach(interest => {
      console.log(`${this.name} likes ${interest}`);
    });
  }
}

console.log(person.showInterests());
```

This is really useful!

## Default + Rest + Spread

In Ruby, it's possible to set a default value for a argument in a function definition... and now it is in Javascript!

### Default arguments

```js
function hello(greeting, name="Alex"){
  console.log(`${greeting} ${name}`);
}

hello("Hi")
=> Hi Alex
```

This doesn't have to be the last argument.

```js
function hello(greeting="Hi", name="Alex"){
  console.log(`${greeting} ${name}`);
}

hello()
```

### Rest parameter

Ruby has something called the splat argument, which "soaks-up" the rest of the arguments. Now ES6 has something similar called [rest arguments](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/rest_parameters).

This HAS to be the last argument and it's prefixed with three dots. This creates an array an puts all of the remaining arguments into this array. (It has all of the array methods unlike the `arguments` object).

```js
function hello(greeting, ...names){
  console.log(`${greeting} ${names.join(", ")}`);
}

hello("Yo", "Alex", "Mike", "Rane");
```

### Spread operator

The spread operator allows for a complex object to be expanded into arguments when more than one argument is expected:

```js
function hello(greeting, firstPerson, secondPerson){
  console.log(`${greeting} ${firstPerson} and ${secondPerson}`);
}

hello("Yo", ...["Alex", "Mike"]);
```

## Destructuring

### Using Objects

ES6 also gives us a new way of extracting and assigning variables from objects in JS. So far, we should be familiar with the dot syntax and the square bracket syntax. E.g.:

```js
let person = {
  name: "Alex",
  age: 28,
  location: "London"
}

console.log(person.age);    // 28
console.log(person["age"]); // 28
```

However, we can use a new tactic called destructuring to do:

```js
let { age: personAge } = person;

console.log(personAge);
```

This is a little confusing when you have seen it for the first time. The structure of this is:

```js
let { key: newVariable } = Object

// You can also use the square bracket syntax

let key = "age";
let { [key]: newVariable } = Object
```

With object-shorthand notation, you can also do:

```js
let { age } = person

console.log(age);
```

This can be made a bit more complicated when you want to get multiple values.

### Using Arrays

```js
let numbers = [1,2,3,4];

let first = numbers[0];
let second = numbers[1]; 
```

With destructuring this would look like this.

```js
let numbers = [1,2,3,4];

let [first, second] = numbers;
console.log(first, second);
```

This can get very weird if we use blank spaces:

```js
let numbers = [1,2,3,4];

let [first, second,,fourth] = numbers;
console.log(first, second, fourth);
```

## Conclusion (5 mins)

There are some other features of ES6 that we haven't gone through. Here is a list of some of them you want to research them yourselves:

- classes
- iterators + for..of
- generators
- unicode
- modules
- module loaders
- map + set + weakmap + weakset
- proxies
- symbols
- subclassable built-ins
- promises
- math + number + string + array + object APIs
- binary and octal literals
- reflect api
- tail calls

However, we've gone over the bits that you will need to pick up soon. Feel free to read around the subject and practise some more!

## Further Reading
- [Eric Elliott](https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75#.6tci62ldr)
- [Let's learn ES6](https://www.youtube.com/playlist?list=PL57atfCFqj2h5fpdZD-doGEIs0NZxeJTX)
- [lukehoban](https://github.com/lukehoban/es6features)