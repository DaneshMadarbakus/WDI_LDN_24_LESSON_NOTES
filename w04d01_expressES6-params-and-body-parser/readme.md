---
title: Params & Body Parser
type: lesson
duration: '1:00'
creator:
    name: Alex Chin
    city: London
competencies: Server Applications
---

# Params & Body Parser

### Objectives
*After this lesson, students will be able to:*

- Understand how to receive data from `req.params`
- Understand how to receive data from `req.body`
- Understand how to receive data from `req.query`
 
### Preparation
*Before this lesson, students should already be able to:*

- Explain HTTP requests/responses
- Write and explain basic JavaScript

## The problem with GET

So far, we've really only seen GET requests in our Express app. This could have been by requesting the website using the browser's URL bar or by clicking on a link.

However, this has its limitations especially when I want to send data to my app.

## Setting up an app

Let's practise by setting up a basic app with Node.

First, let's setup the package JSON with:

```bash
$ npm init
```

You can accept all of the defaults unless you want to change something.

### Optional: Linting with jshint

> **Note:** If you are using `jshint` as a package in Atom. In order to ensure that it understands linting for ES6, you need to:

> ```
$ touch .jshintrc
```

> Inside this, you need to add:
> 
> ```
{
  "esversion": 6
}
```

### Install packages

Next, install the packages that you are going to use in the app:

```bash
$ npm i express morgan body-parser ejs --save
```

We're just going to use:

- `express` (Web-framework)
- `morgan` (For better logging in the terminal)
- `body-parser` (To read the `req.body`)
- `ejs` (For our templating engine)

### Setup the main file

Next, we need to setup the main file where we need to require all of the relevant packages and setup the relevant middleware:

```js
const express    = require("express");
const morgan     = require("morgan");
const bodyParser = require("body-parser");
const app        = express();
const port       = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Running on port: ${port}`));
```

> **Note:** You can check that the app is running by using `nodemon` or `node index.js` (or whatever you main file is called).

### Creating views and public

At this point, we probably want to create a directory for views and public:

```bash
$ mkdir views public
```

### Create an index.ejs

You might also want to create an `index.ejs` file:

```bash
$ touch views/index.ejs
```

At the moment, this will be the homepage:

```ejs
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Express App</title>
</head>
<body>
  <h1>Home</h1>
</body>
</html>
```

### Add some routes

Next, we can add some a route for the homepage:

```
.
.
.
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index"));

app.listen(port, () => console.log(`Running on port: ${port}`));
```

If we visit, `http://localhost:3000` we should now see this page!

## Using Params

Great! However, sometimes we want to have a URL that has something that changes dynamically? Can you think of an example where this might happen?

- http://www.facebook.com/alexpchin
- http://www.facebook.com/rgowan

For these sorts of URLs, we need to be able to match a pattern rather than having a route-handler for each one!

> Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the `req.params` object, with the name of the route parameter specified in the path as their respective keys.

Let's add this example:

```js
app.get("/users/:id", (req, res) => console.log(req.params));
```

Navigate to:

- http://localhost:3000/users/alexpchin
- http://localhost:3000/users/rgowan

To see what is logged in the terminal!

```
{ id: "alexpchin" }
```

We can see that `req.params` acts like an object with keys and values.

> **Note:** Notice that the Node app get's stuck if you don't provide it with a `res.end` or a `next()` call!

We can if we want have more than one named parameter, e.g.

```js
app.get("/users/:id/:name", (req, res) => console.log(req.params));
```

### req.params vs req.query

In the example above, `req.params` allows us to access the url parameters.

[The docs](http://expressjs.com/api.html) also show an example that uses regular expressions, and you can do lots of other stuff with this type of routing.

`req.params` is one way that we can send information within our url. Another would be if we used a query string. An example of a query string would be:

- http://localhost:3000/users/alexpchin?s=hi

Everything after the `?` in the URL is part of the querystring. You can think of the query string as a collection of key/value pairs separated by an = sign.

If we change our route-handler to show:

```js
app.get("/users/:id", (req, res) => console.log(query));
```

We should see:

```
{ s: "hi" }
```

## Body-parser

The problem with just passing data in the URL is that there is a limit to the length of a URL. Imaging trying to send a 500 work blog post in the URL! 

So after GET requests seemed to be limited, POST requests were created.

When data is sent to the server via a POST request, the content of the request is passed as a string, but we want to access it as if it was a JSON object - similar to what we can access with `req.params` and `req.body`.

Let's create a new view file, `views/users/new.ejs`, and inside add a form like this:

```bash
$ mkdir views/users
$ touch views/users/new.ejs
```

### Method & Action

An HTTP request needs to have:

- **VERB**
- **URL**

A form needs to have:

- **METHOD** -> http verb
- **ACTION** -> http url

Let's add a form:

```html
<h1>New User</h1>

<form method="post" action="/users">
  <label>Username</label>  
  <input type="text">
  <button>Create</button><br>
</form>
```

If we were being semantically correct, we should add a unique id to the input and match it with a `for` tag on the label:

```html
<h1>New User</h1>

<form method="post" action="/users">
  <label for="user_username">Username</label>  
  <input type="text" id="user_username">
  <button>Create</button><br>
</form>
```

### Adding a name

Whenever we send data to our server, we need to add a name to each piece of data being sent. This makes sense or else we wouldn't know what each piece of data represented!

In order to achieve this, we need to give the input a `name` attribute:

```html
<h1>New User</h1>

<form method="post" action="/users">
  <label for="user_username">Username</label>  
  <input type="text" name="user[username]" id="user_username">
  <button>Create</button><br>
</form>
```

Weird syntax? We're using the square-bracket syntax so that the server can group all attributes for this new user object together.

### Make the route handlers

We also need to make a route handler so that we can display this page. We can change our route handler to look like this:

```js
app.get('/users/new', (req, res) => res.render("users/new"));
```

If we visit `http://localhost:3000/users/new` we should see the form. However, if we submit this form, we should see:

```
Cannot POST /users
```

This is because we don't have a route handler for this action. Let's make one:

```js
app.get('/users/new', (req, res) => console.log(req.body));
```

Inside this "create" action, we are logging the body of the HTTP request. We don't need to render anything.

Once this form is submitted, by default we this `req.body` will show was `undefined`. In order for it to be used, we need to use a package called `body-parser`.

### Installing body-parser

In order to read this `req.body` we need to install a new package to our `package.json` dependencies:

```bash
$ npm install body-parser --save
```

Now in `index.js`, add:

```js
const bodyParser = require("body-parser");
```

To use this, we need to add some middleware:

```js
app.use(bodyParser.urlencoded({ extended: true }));
```

The params passed with a request will be "decoded" automatically, allowing you to use dot notation when working with JavaScript objects.

> **Note:** What would happen if we turned the `extended` option to false?

### Make a post request

Navigate to `http://localhost:3000/users/new` and submit the form with some data.

Take a look at the terminal and you should see that your app can now parse `req.body`:

```
{ user: { username: 'alexpchin' } }
```

> **Note:** If you are writing an api, meant to receive and send JSON, you would change the line above to:

> ```javascript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
```

> Now the app will decode all JSON received in the body of a client request.

## Summary

We've looked at the 3 main ways to send data to an Express app. Review them on quickly so that you know the difference!