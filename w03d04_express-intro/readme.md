---
title: Intro to Express
type: lesson
duration: '1:30'
creator:
    name: Alex Chin
    city: London
competencies: Server Applications
---

# Intro to Express

### Objectives
*After this lesson, students will be able to:*

- Understand how to get started with Express 4
- Use the Node HTTP module to create a basic web server with Node
- Create and use EJS templates
- Understand how to use morgan to improve logging
- Understand how to install and use nodemon 

### Preparation
*Before this lesson, students should already be able to:*

- Explain HTTP requests/responses
- Write and explain basic JavaScript

## Intro to Express

[Express.js](http://expressjs.com/) describes itself as "a minimal and flexible node.js web application framework". 

### What is a web framework?

When you want to make a website from scratch, there are common tasks that you will need to do. Frameworks hide the boilerplate and infrastructural code related to handling HTTP requests and responses. Just how much is hidden depends on the framework. 

Express is a minimal web framework and if you've used [Sinatra](http://www.sinatrarb.com/) in the Ruby world, a lot of this will be familiar.

### What is this magic?

Like any abstraction, Express hides difficult bits of creating a web framework and says "don't worry, you don't need to understand this part". It does things for you so that you don't have to bother. In other words, it's magic. 

It's good magic, too. Express is used by a lot of people incuding MySpace, Klout and Netflix.

But [all magic comes at a price](http://shapeshed.com/all-magic-comes-with-a-price/) because you might not understand the inner workings of Express. This is like driving a car; I drive a car just fine without intimate knowledge of its workings but I'd be better off with that knowledge. What if things break? What if you want to get all the performance you can out of the car?

So let's understand Express from the bottom, with Node.

## Bottom layer: Node's HTTP server

Node has an [HTTP module](http://nodejs.org/api/http.html) which you can use to make a simple webserver. Let's create a simple webserver:

```bash
$ touch node-webserver.js
```

Now, let's open that file and require the http module. For more about the require function, [check out Nodejitsu's docs](http://docs.nodejitsu.com/articles/getting-started/what-is-require).

```javascript
var http = require("http");
```

The variable `http` now contains the http module that has a number of different methods - one being `createServer` which will setup a server so that we can process HTTP requests.

The next thing we want to do is to put a server in a variable called `app` by using `http.createServer`. This takes a function that listens for requests. 

```javascript
var http = require("http");

// Build the server
var app = http.createServer(function(request, response) {
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });
  response.end("Hello world!");
});
```

The last thing we do is tell the server to listen for requests coming in on port `3000` (this can be another number) and then we just log that out to our terminal just to let ourselves know that it is working.

```javascript
var http = require("http");

// Build the server
var app = http.createServer(function(request, response) {
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });
  response.end("Hello world!");
});

// Start that server, baby
app.listen(3000, "localhost");
console.log("Server running at http://localhost:3000/");
```

Now, if we run the file with:

```javascript
$ node web-server.js
```

We can navigate to `http://localhost:3000` and we should see the words "Hello world!". It doesn't matter whether we visit `http://localhost:3000/test` or `http://localhost:3000/?query=hello` - we will only get the same response.

Okay, back to the request handler function. That thing is _important_.

## The request handler

If you are interested in reading more about the HTTP module, you can have a look at the docs [here](http://nodejs.org/api/http.html).

#### Request

Whenever we make a request to the server, that request handler function is called.

`request` is a HTTP request that comes from the client. In many apps, you'll see this shortened to `req`. 

Let's look at it. To do that, we'll modify the above request handler a bit:

```javascript
var http = require("http");

// Build the server
var app = http.createServer(function(request, response) {

  // Build the answer
  var answer = "";
  answer += "Request URL: " + request.url + "n";
  answer += "Request type: " + request.method + "n";
  answer += "Request headers: " + JSON.stringify(request.headers) + "n";

  // Send answer
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });
  response.end(answer);
});

// Start that server, baby
app.listen(3000, "localhost");
console.log("Server running at http://localhost:3000/");
```

Now run the server with `node web-server.js` and navigate to `http://localhost:3000/`.

You should see (make sure you show the RAW rather than parsed information if you have a JSON viewer in Chrome):

```
Request URL: /
Request type: GET
Request headers: {"host":"localhost:3000","connection":"keep-alive","cache-control":"max-age=0","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36","accept-encoding":"gzip, deflate, sdch","accept-language":"en-US,en;q=0.8","cookie":"_ga=GA1.1.1085447703.1451670763"}
```

This output shows:

- The URL we've requested `/`
- The HTTP method `GET`
- The headers we've sent, like the user-agent and more complicated HTTP stuff.

If you visit `http://localhost:3000/another-url`, you'll see the request URL change. If you visit it with a different browser, the user-agent will change. If you send it a POST request, you'll see the method change.

#### Response

The `response` is the next part. Just like the prior argument is often shortened, this is often shortened to the three-letter `res`. 

With each response, you get the response all ready to send, and then you call `response.end`. Eventually, you _must_ call this method; even [the Node docs say so](http://nodejs.org/api/). This method does the actual sending of data. You can try making a server where you don't call it, and it just hangs forever.

Before you send it out, you'll want to write some headers. In our example, we do this:

```js
response.writeHead(200, { "Content-Type": "text/plain" });
```

This does two things. First, it sends [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) 200, which means "OK, everything is good". Then, it sets some response headers. In this case, it's saying that we're sending back the plaintext content-type. We could send another data type like JSON or HTML.

### Changing the output based on the URL

Using the information contained in `req`, you could do something a bit more complicated:

```bash
touch node-webserver2.js
```

Inside that, let's add a new example with a homepage and an about page:

```js
var http = require("http");

http.createServer(function(req, res) {

  // Homepage
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Welcome to the homepage!");
  }

  // About page
  else if (req.url == "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Welcome to the about page!");
  }

  // 404'd!
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 error! File not found.");
  }

}).listen(3000, "localhost");
console.log("Server running at http://localhost:3000/");
```

Let's run this with:

```js
$ node node-webserver2.js
```

Try visiting both `http://localhost:3000/` and `http://localhost:3000/about`.

You could clean this up and make it prettier, or you could be hardcore [like the npm.org folks](https://github.com/isaacs/npm-www#design-philosophy) and tough it out with vanilla Node. 

But you could also build a framework... a framework like Express.

## Middleware, the middle layer

The middle layer of this JavaScript cake is conveniently called "middleware". We'll look at what this means in a little more detail in a bit. 

### Installing Express

Let's say we wanted to write the "hello world" app that we had above but with Express this time.

First we need to install `express`. We do this using `npm` which is Node's package manager.

Let's first use the `npm init` command to make a new `package.json` file.

```bash
$ npm init
```

Let's use this information:

- **name:** intro-to-express
- **entry:** point: app.js

For the rest, you can just press enter. Next, install express with

```bash
$ npm install express --save
```

You should now see a new directory called node_modules. The `--save` will add this package to the package.json file, take a look:

```json
"dependencies": {
  "express": "^4.13.4"
}
```

Next, let's make a new file called `app.js`:

```bash
$ touch app.js
```

Once you've done that, the app is pretty similar.

First, we require Express. We then require Node's HTTP module just like we did before.

```javascript
// Require the stuff we need
var express = require("express");
var http    = require("http");
```

Then we make a variable called `app` like we did before, but instead of creating the server using the http module, we call `express()`.

```javascript
// Require the stuff we need
var express = require("express");
var http = require("http");

// Build the app
var app = express();
```

We then add some middleware -- it's just a function. We pass this to `app.use`, and this function looks an awful lot like the request handlers from above. In fact, _I copy-pasted it_.

```javascript
// Require the stuff we need
var express = require("express");
var http = require("http");

// Build the app
var app = express();

// Add some middleware
app.use(function(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello world!");
});
```

Then we create the server and start listening. `http.createServer` took a function before, so guess what -- `app` is just a function. It's an Express-made function that starts going through all the middleware until the end. But it's just a request handler like before.

```javascript
// Require the stuff we need
var express = require("express");
var http = require("http");

// Build the app
var app = express();

// Add some middleware
app.use(function(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello world!");
});

// Start it up!
http.createServer(app).listen(3000);
console.log("Express is up and running");
```

Let's run this code with:

```bash
$ node app.js
```

You should now see "Hello world!".

## http.createServer vs app.listen();

Worth noting that you might see people using `app.listen(3000)` instead of `http.createServer(app).listen(3000);` - which actually just defers to `http.createServer`. That's just a shorthand. The source code looks like [this](https://github.com/strongloop/express/blob/9e6b881f8566f26f2d2ea017657455ec7c674ad6/lib/application.js#L524-L548):

```javascript
app.listen = function(){
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

Therefore, the http module is no longer needed, unless you need to directly work with it (socket.io/SPDY/HTTPS). Our app can now look like: 

```javascript
var express = require("express");
var app = express();

// Add some middleware
app.use(function(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello world!");
});

// Start it up!
app.listen(3000);
console.log("Express is up and running");
```

If you run the app with `node app.js` then everything will work exactly the same.

## What is middleware?

Remember the request handlers from earlier? Each piece of middleware is just another request handler. You start by looking at the first request handler, then you look at the next one, then the next, and so on.

Here's what middleware basically looks like:

```javascript
function myFunMiddleware(request, response, next) {
  // Do stuff with the request and response.
  // When we're all done, call next() to defer to the next middleware.
  next();
}
```

### Basic logging middleware

When we start a server, we start at the topmost middleware and work our way to the bottom. So if we wanted to add simple logging to our app, we could do it!

```js
var express = require("express");
var app     = express();

// Logging middleware
app.use(function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});

// Send "hello world"
app.use(function(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello world!");
});

app.listen(3000);
console.log("Express is up and running");
```

If you run this app and visit `http://localhost:3000`, you'll see that your server is logging some stuff and you'll see your page.

```bash
Express is up and running
In comes a GET to /
```

It's important to note that anything that works in the vanilla Node.js server also works in middleware.

### Morgan

While you can totally write your own, there's a _ton_ of middleware out there. Let's remove our custom logger and use [Morgan](https://github.com/expressjs/morgan), a nice logger for Express. 

```bash
$ npm install morgan --save
```

and give this a try:

```js
var express = require("express");
var morgan  = require("morgan");
var app     = express();

app.use(morgan());
// Fun fact: morgan() returns a function.

app.use(function(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello world!");
});

app.listen(3000);
console.log("Express is up and running");
```

Visit `http://localhost:3000` and you'll see some logging! Thanks, Morgan.

## A small app with Express

One could imagine stringing together some middleware to build an app. Maybe you'd do it like this:

```javascript
var express = require("express");
var morgan  = require("morgan");
var app     = express();

app.use(morgan('dev'));

// Homepage
app.use(function(request, response, next) {
  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the homepage!n");
    // The middleware stops here.
  } else {
    next();
  }
});

// About page
app.use(function(request, response, next) {
  if (request.url == "/about") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the about page!n");
    // The middleware stops here.
  } else {
    next();
  }
});

// 404'd!
app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 error!n");
});

app.listen(3000);
console.log("Express is up and running");
```

Try it out by visiting: `http://localhost:3000/`, `http://localhost:3000/about` and `http://localhost:3000/cat` (for the 404).

However... "This is ugly! I don't like it," you say. 

The Express folks are smart. They know that this ugliness won't do. They're smart people.

## Top layer: routing

We've finally reached the top!

Express gives us something called "routing" which is better explained with code than with English:

```javascript
var express = require("express");
var app     = express();

app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get("/", function(request, response) {
  response.end("Welcome to the homepage!");
});

app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});

app.get("*", function(request, response) {
  response.end("404!");
});

app.listen(3000);
console.log("Express is up and running");
```

_Ooh._ That's hot.

After the basic requires, we say "every request goes through this function" with `app.all`. And that function looks an awful lot like middleware!

The three calls to `app.get` are Express's routing system. They could also be `app.post`, which respond to POST requests, or PUT, or any of the HTTP verbs. 

The first argument is a path, like `/about` or `/`. The second argument is a request handler similar to what we've seen before. To quote [the Express documentation](http://expressjs.com/api.html#app.VERB):

> [These request handlers] behave just like middleware, with the one exception that these callbacks may invoke `next('route')` to bypass the remaining route callback(s). This mechanism can be used to perform pre-conditions on a route then pass control to subsequent routes when there is no reason to proceed with the route matched.

In short: they're basically middleware like we've seen before. They're just functions, just like before.

These routes can get smarter. Above:

```js
app.get("*", function(request, response) {
  response.end("404!");
});
```

### Advanced Request handling

Express augments the request and response objects that you're passed in every request handler. [The API docs](http://expressjs.com/api.html) explain everything, but let's look at a couple of examples.

One nicety they give you is a `redirect` method. Here are some examples:

```js
app.get("/go", function(request, response) {
  response.redirect("/");
});

app.get("/google", function(request, response) {
  response.redirect("http://www.google.com/");
});
```

**Note:** You will need to comment out to prevent the error "Can't set headers after they are sent." This error  means that you're already in the Body or Finished state, but some function tried to set a header or statusCode.

```
// app.all("*", function(request, response, next) {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   next();
// });
```

### sendFile

This isn't in vanilla Node, but Express adds this stuff. It adds things like `sendFile` which lets you just send a whole file.

Navigate to: `http://soundbible.com/mp3/Audience_Applause-Matthiew11-1206899159.mp3` and right click an "Save As" in the directory that you are in.

Then let's add a route handler:

```js
app.get("/mp3", function(request, response) {
  response.sendFile(__dirname + "/Audience_Applause-Matthiew11-1206899159.mp3");
});
```

The request alos gets a number of other cool properties, like `request.ip` to get the IP address and `request.files` to get uploaded files.

Conceptually, there's not much to know, other than the fact that Express extends the request and response. For everything Express gives you, check out the docs.

## Views

Express can handle also handle views. 

Express is setup to work easily with two templating engines:

- [**Jade**](http://jade-lang.com/) - a templating language that relys on code indentation
- [**EJS**](http://www.embeddedjs.com/) - very similar to HTML. Almost idential to the Ruby version ERB (embedded Ruby).

We're going to start by looking at EJS. 

First, we need to install EJS, because it's not bundled with Express. Add it to your `package.json` with: 

```bash
$ npm install ejs --save
```

Here's what the setup in app.js looks like:

```js
var express = require("express");
var app     = express();

// Set the view directory to /views
app.set("views", __dirname + "/views");

// Let's use the Express templating language
app.set("view engine", "ejs");
```

We are using an express `settings` to say that we are going to put "our views files in a folder called 'views'". 

Then use another express settings to say that we're going to "use EJS" to render these views.

### Making a view file

Now, we've set up these views. How do we use them?

Let's start by making a file called `index.ejs` and put it into a directory called `views`. 

```bash
$ mkdir views
$ touch views/index.ejs
```

Next, you want to open that up in Sublime and add some basic html boilerplate:

```ejs
<!doctype html>
<html>
<head>
  <title>Intro to Express</title>
</head>
<body>
</body>
</html>
```

Now inside the body tag, add:

```ejs
<body>
  <%= message %>
</body>
```

These new tags `<%=` & `%>` are EJS tags used for printing variables onto the page.

There is another set of tags `<%` & `%>`, without the equals sign that are non-printing:

```ejs
<% if (message) { %>
  <%= message %>
<% } %>
```

We need to render the view from within Express. Let's update the homepage action. Here's what that looks like:

```javascript
app.get("/", function(request, response) {
  response.render("index", { message: "I love coding" });
});
```

Express adds a method to `response`, called `render`. It does a bunch of smart stuff, but it basically looks at the view engine and views directory (the stuff we defined earlier) and renders `index.ejs`.

## Static Files

If we want to serve static files like css or js files, we need to setup our application to do this.

First, let's create a new folder - the convention is that the folder should be called `public`:

```bash
$ mkdir public
$ mkdir public/css
$ touch public/css/style.css
```

Then inside this css file, lets add:

```css
body {
  background: red;
}
```

Now let's require that file in out index.html:

```ejs
<!doctype html>
<html>
<head>
  <title>Intro to Express</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <% if (message) { %>
    <%= message %>
  <% } %>
</body>
</html>
```

Then in `app.js` we need to setup some [middleware](http://expressjs.com/en/starter/static-files.html).

```js
// Setup public folder to serve static files
app.use(express.static(__dirname + "/public"));
```

Now, if you reload the app - you should see that the body is red!

## Nodemon

It's annoying to have to stop and start the server everytime you change a file isn't it!

There are a couple of different options to get around this - but a really good one is [nodemon](http://nodemon.io/).

Install with:

```bash
$ npm install nodemon -g
```

Now instead of running the code with `node` use `nodemon`:

```bash
$ nodemon app.js
```

You can now leave the server running!

## Summary

We've done quite a lot here. We've looked at: 

- How to use the Node `http` module 
- How to setup express
- How to create route actions
- How to setup express to serve views
- How to setup express to serve static files

Don't worry that, we will be using Express a lot during this course!

### What is Connect?

When you're Googling for answers about Express, you might see references to something called Connect.

Express used to be built on a thing called [Connect](https://github.com/senchalabs/connect), which is like Express but it's _just_ the middleware layer. Connect middleware is compatible with Express middleware (but not the other way around).

### Frameworks built ontop of Express

There are a number of other [frameworks](https://github.com/visionmedia/express/wiki#wiki-frameworks-built-with-express) that are built ontop of Express. You might see them out in the wild but it's best to learn how to use express.

## Reference

- [Connect middleware](http://stephensugden.com/middleware_guide/)
- [Understanding Express 3](http://evanhahn.com/understanding-express-3/)
- [Express 4](http://evanhahn.com/understanding-express/)