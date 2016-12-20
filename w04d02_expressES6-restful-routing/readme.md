---
title: Express RESTful Routing
type: lesson
duration: '2:30'
creator:
    name: Alex Chin
    city: LDN
competencies: Server Applications
--- 

# Express RESTful Routing

### Objectives
*After this lesson, students will be able to:*

- Understand how to create RESTful routes
- Understand how to render view files for RESTful routes
- Understand how to write EJS inside the view files for the RESTful routes

### Preparation
*Before this lesson, students should already be able to:*

- Understand how to use the Express Router
- Should be able to create a basic Express app

## REST Recap - Intro (10 mins)

> **Note** There are a lot of new concepts and quite a bit of coding during the lesson. So make sure you check for understanding regularly.

REST is a design pattern that helps us to decide on the way that our app's routes and resources are structured.

A RESTful resource should have the 7 RESTful routes:

| HTTP Verb | Path | Controller#Action | Used for |
| --------- | -------- | --------| ----------- |
| GET | /books | books#index | display a list of all books |
| GET | /books/new | books#new | return an HTML form for creating a new book |
| POST | /books | books#create | create a new book |
| GET | /books/:id | books#show | display a specific book |
| GET | /books/:id/edit | books#edit | return an HTML form for editing a book |
| PATCH/PUT | /books/:id | books#update | update a specific book |
| DELETE | /books/:id | books#destroy | delete a specific book |

Let's make the restful resources for an Express app.

## RESTful Routing - Intro (10 mins)

*Send over the starter-code*

**Note:** Make sure you install the packages with `npm install`.

Now let's a look at the app. The file tree is as follows:

```
.
├── app.js
├── config
│   └── routes.js
├── package.json
├── public
│   └── css
└── views
    └── index.ejs
```

We can see the routes defined in the `config/routes.js` file:

```javascript
const express = require('express');
const router  = express.Router();

// A home route
router.get('/',               (req, res) => res.render('index'));

// RESTful routes for the Book resource
// All URLS should contain /books

// INDEX
router.get('/books',          (req, res) => res.send("INDEX"));
// NEW
router.get('/books/new',      (req, res) => res.send("NEW"));
// SHOW
router.get('/books/:id',      (req, res) => res.send("SHOW"));
// CREATE
router.post('/books',         (req, res) => res.send("CREATE"));
// EDIT
router.get('/books/:id/edit', (req, res) => res.send("EDIT"));
// UPDATE
router.put('/books/:id',      (req, res) => res.send("UPDATE"));
// DELETE
router.delete('/books/:id',   (req, res) => res.send("DELETE"));

module.exports = router;
```

#### res.send vs res.end

If you pass a string to `res.send()`, it automatically assumes a Content-Type of html.

`res.end()`, however, simply calls node's underlying `end()` implementation on the response stream, so no assumptions are made for the Content-Type.

The reason it renders differently is simply a browser decision to render a "pretty" default font for HTML, and a less-styled font for unknown content types.

## Creating the RESTful views - (10 minutes)

One of our first tasks is to create the view files and serve them for the Book resource. These views files should be in a directory found at `views/books`.

```
└── views
    ├── index.ejs
    └── books
        ├── edit.ejs
        ├── index.ejs
        ├── new.ejs
        └── show.ejs
```

Let's create those files:

```bash
$ mkdir views/books
$ touch views/books/edit.ejs
$ touch views/books/index.ejs
$ touch views/books/new.ejs
$ touch views/books/show.ejs
```

> **Note:** Remember that we don't need to create views for CREATE and UPDATE actions.

Now instead of rendering text using:

```js
res.send("EDIT");
```

We should render the correct view file:

```js
res.render("books/index");
```

Let's do this for all of the actions, except the CREATE, UPDATE and DELETE. You should end up with this:

```js
const express = require('express');
const router  = express.Router();

// A home route
router.get('/',               (req, res) => res.render('index'));

// RESTful routes for the Book resource
// All URLS should contain /books

// INDEX
router.get('/books',          (req, res) => res.render("books/index"));
// NEW
router.get('/books/new',      (req, res) => res.render("books/new"));
// SHOW
router.get('/books/:id',      (req, res) => res.render("books/show"));
// CREATE
router.post('/books',         (req, res) => res.send("CREATE"));
// EDIT
router.get('/books/:id/edit', (req, res) => res.render("books/edit"));
// UPDATE
router.put('/books/:id',      (req, res) => res.send("UPDATE"));
// DELETE
router.delete('/books/:id',   (req, res) => res.send("DELETE"));

module.exports = router;
```

#### Add some content

Now you need to copy the contents of `views/index.ejs` into all of these files.

Now, to make sure that you know that you have navigated to the write page, let's update the `h1` on each page:

```ejs
<h1>Index</h1>
<h1>Edit</h1>
<h1>Create</h1>
<h1>Show</h1>
```

Fire up the app with:

```js
$ nodemon app.js
```

And check that all of these work:

- `http://localhost:3000/books`
- `http://localhost:3000/books/new`
- `http://localhost:3000/books/1`
- `http://localhost:3000/books/1/edit`

## Adding some data - (15 mins)

Now, it's difficult to understand what these RESTful routes do without some data. However, as we haven't covered a proper way of saving data yet, for now we can just "fake it" using a variable. 

So above your routes in `routes.js` add:

```js
let id = 2;
const books = [{
  id: 1,
  title: "Some interesting book",
  author: "Alex Chin",
  description: "A lot of words"
}];
```

This will become our temporary data-store for this resource!

Let's think about this variable `books`: 

1. It's an array
2. We can add to it by using `push`
3. We can remove items from it using `splice`
4. It's saved in the applications temporary memory - so if the application restarts - it will reload to it's original value.

We also have an `id` variable which will keep a record of the next id to be used when creating a record in out "database".

## INDEX - (20 mins)

Now that we have some data, let's render that data on the `books/index` page. 

#### Passing data to INDEX

Now what we're going to do is to use EJS to render the data from the `books` variable.

To pass the variable's value to the EJS file, we need to use the syntax:

```js
// INDEX
router.get('/books', (req, res) => {
  res.render("books/index", { books });
});
```

> **Note:** Notice the shorthand EJS syntax.

Where the key represents the name of the EJS variable and the value represents the value you want to allocate to it.

```js
{ ejsVariable: value }
```

#### Looping through the books in the view

First let's output the value of `books` on the index page:

```ejs
<h1>Index</h1>
<%= books %>
```

And run the app and look at `http://localhost:3000/books` we should see:

```ejs
[object Object]
```

What is this?! This is because EJS has tried to convert an array, which is a complex datatype, into a string.

**How do we get data out of this object?**

We need to use a loop. The syntax for this in EJS is a little bit fiddly. We could do either a `for` loop or a `forEach` loop. Let's do a `forEach` as it is slightly easier to read:

```ejs
<ul>
  <% books.forEach((book) => { %>
    <li>
      <ul>
        <li><%= book.title %></li>
      </ul>
    </li>
  <% }); %>
</ul>
```

We need to use `.title` to get the value of the `book` object or else you'd get another `[object Object]`.

Once you have done this, you should have got the title displayed on the page! 

## NEW - (20 mins)

Let's now look at the NEW action and create an HTML form on the `books/new` page to add a new post.

```ejs
<h1>New</h1>
<form method="post" action="/books">
  <label for="book_title">Title</label><br>
  <input type="text" name="book[title]" id="book_title"><br>

  <label for="book_author">Author</label><br>
  <input type="text" name="book[author]" id="book_author"><br>

  <label for="book_description">Description</label><br>
  <textarea name="book[description]"></textarea><br>

  <button>Create</button><br>
</form>
```

To break this down a little bit, there are some important parts to this:

- **method** Which is the HTTP verb
- **action** Which is the HTTP URL

Both of these parts (`POST /books`) point to the **CREATE** action.

- **`book[title]`** 

The names of the form inputs will become the keys in the form's body receved by the server. Traditionally, they might be parsed like this: 

```
{ 'book[title]': 'A book',
  'book[author]': 'An author',
  'book[description]': 'A description' }
```

However, when the `body-parser` npm package has it's option set to `extended: true`:

```js
app.use(bodyParser.urlencoded({ extended: true }));
```

`req.body` will become:

```
{ book: { title: 'Hello', author: 'Alex', content: 'Test' } }
```

This is much easier to deal with as we can do.

## CREATE - (20 mins)

The new form, works with the CREATE action. Let's start by logging out the body of the request in the create action:

```js
// CREATE
router.post('/books', (req, res) => {
  console.log(req.body);
  res.send("CREATE");
});
```

If you fill the form in, you should see the contents being logged in the terminal.

> **Note:** Remember that Node logs out in the terminal rather than the browser console!

#### Add the contents to the posts array

We need to push the contents of `req.body.post` into the `books` array:

```js
// CREATE
router.post('/books', (req, res) => {
  let book = req.body.book;
  books.push(book);
  res.send("CREATE");
});
```

Next, we need to redirect the user back to the INDEX action. We can do this with `res.redirect`:

```js
// CREATE
router.post('/books', (req, res) => {
  let book = req.body.book;
  books.push(book);
  res.redirect("/books");
});
```

Lastly, we want to give this new book an id. Luckily we have an `id` variable all ready to go at the top of the file. We can add that to the book, but once we've used it, we need to increment it so we don't duplicate ids.

```js
// CREATE
router.post('/books', (req, res) => {
  let book = req.body.book;
  book.id = id;
  books.push(book);
  id++;
  res.redirect("/books");
});
```

Great! Try this out - you should be able to add a new book and see it on the INDEX page.

## SHOW - (20 mins)

The next step will probably be to create a SHOW page. On the INDEX page and and make the title of the book a link where the url follows the RESTful pattern:

```ejs
<li><a href="/books/<%= book.id %>"><%= book.title %></a></li>
```

If you click this link, you should be taken to the SHOW page!

Let's add some content to this page:

```ejs
<h1><%= book.title %></h1>
<h2>by <%= book.author %></h2>
<p><%= book.description %></p>
```

Great! Try this out and you should get an error!

```
book is not defined
```

*What do you think we have forgotten?*

We haven't pass the book variable to the page!

In order to do this, we need to access the `id` variable in the url that we are looking at. We can do this with `req.params`.

```js
// SHOW
router.get('/books/:id', (req, res) => {
  let id = req.params.id;
  res.render("books/show");
});
```

Then we can use that `id` to fetch the correct book from the `books` array and pass it to the view.

The `filter` method will allow us to return a sample of an array based on an evaluation. `filter` will step through each element in the array. Every time `true` is returnd from the callback function, that current element will be pushed into a new array. Once `filter` has gone through the whole array, it will return the newly created array.

We can use the `id` from `req.params` to `filter` our books array down to any book that has the same `id`. However, we don't want an array, we want just the `book`, so we can use `[0]` to select the first element of this newly filtered array.

```js
// SHOW
router.get('/books/:id', (req, res) => {
  let book = books.filter(book => {
    return book.id == req.params.id;
  })[0];
  res.render("books/show", { book });
});
```

Great! Let's try this out.

## EDIT - (20 mins)

We're doing well! We have 3 more actions to go. 

Next up is the EDIT action. It's going to be very similar to the NEW action, so we can start by copying the form from there.

```ejs
<form method="post" action="/books">
  <label for="book_title">Title</label><br>
  <input type="text" name="book[title]" id="book_title"><br>

  <label for="book_author">Author</label><br>
  <input type="text" name="book[author]" id="book_author"><br>

  <label for="book_description">Description</label><br>
  <textarea name="book[description]"></textarea><br>

  <button>Create</button><br>
</form>
```

However, the difference is that now we can pass the value of the book to the view:

```js
// EDIT
router.get('/books/:id/edit', (req, res) => {
  let book = books.filter((book) => {
    return book.id == req.params.id;
  })[0];

  res.render('books/edit', { book });
});
```

And using this data, we can populate the values of the input form and change the value of the button:

```ejs
<form method="post" action="/books/<%= book.id %>">
  <label for="book_title">Title</label><br>
  <input type="text" name="book[title]" id="book_title" value="<%= book.title %>"><br>

  <label for="book_author">Author</label><br>
  <input type="text" name="book[author]" id="book_author" value="<%= book.author %>"><br>

  <label for="book_description">Description</label><br>
  <textarea name="book[description]"><%= book.description %></textarea><br>

  <button>Edit</button><br>
</form>
```

To check that this works, we can visit the url directly `http://localhost:3000/books/0/edit`.

But the better way would be to add an edit button to the INDEX page:

```ejs
<li><a href="/books/<%= book.id %>"><%= book.title %></a></li>
<li><a href="/books/<%= book.id %>/edit">Edit</a></li>
```

Great! 

## UPDATE - (20 mins)

However, if we use this this link we get the error:

```
Cannot POST /books/0
```

### Method override

Express straight out of the box, doesn't allow you to make `put`, `patch` or `delete` requests. It only let's you make `post` and `get` requests.

We *could* use `post`. However, if we want to use `put`, `patch` or `delete` we can install an npm package called `method-override`.

Let's do this:

```bash
$ npm install method-override --save
```

To get this to work, we need to set this up in `app.js`. First, we need to require the package.

```js
const methodOverride = require('method-override');
```

Next, we need to use the `method-override` middleware:

```js
// Use methodOverride
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
```

Then inside the edit form we add a hidden field with the value of the method that we want to change the post from.

```ejs
<form method="post" action="/books/<%= book.id %>">
  <input type="hidden" name="_method" value="put">

  <label for="book_title">Title</label><br>
  <input type="text" name="book[title]" id="book_title" value="<%= book.title %>"><br>

  <label for="book_author">Author</label><br>
  <input type="text" name="book[author]" id="book_author" value="<%= book.author %>"><br>

  <label for="book_description">Description</label><br>
  <textarea name="book[description]"><%= book.description %></textarea><br>

  <button>Edit</button><br>
</form>
```

Great! If we try to use this form now we should see UPDATE on the page! This means we have reached the right route action but we need to update the logic.

`findIndex` is array method that work almost identically to filter, but instead of returning an array, it returns the `index` of the **first** element matched by the callback function. It will return the index of the book that we want to modify.

We can then set the data from the form to that same index, effectively **overwriting** the existing book, making sure we give it the existing `id` of course!

```js
// UPDATE
router.put('/books/:id', (req, res) => {
  let index = books.findIndex((book) => {
    return book.id == req.params.id;
  });

  let book = req.body.book;
  book.id = parseInt(req.params.id);

  books[index] = book;
  res.redirect(`/books/${book.id}`);
});
```

Great! Test it out!

## DELETE - (15 mins)

Finally, we need to handle the DELETE action. All `a` links by default make GET requests. Therefore we need to use a `form` to make a `delete` request. 

Let's add this in the index page:

```ejs
<ul>
  <% books.forEach(book => { %>
    <li>
      <ul>
        <li><a href="/books/<%= book.id %>"><%= book.title %></a></li>
        <li><a href="/books/<%= book.id %>/edit">Edit</a></li>
        <li>
          <form action="/books/<%= book.id %>" method="post">
            <input type="hidden" name="_method" value="delete"/>
            <button>Delete</button>
          </form>
        </li>
      </ul>
    </li>
  <% }); %>
</ul>
```

We've had to do the same thing as the edit form in order to change the HTTP verb to `delete` in the express app.

If we test it, we should get to a page rendering DELETE. This is great, we just need to add the logic in the right route handler.

```js
// DELETE
router.delete('/books/:id', (req, res) => {
  let index = books.findIndex((book) => {
    return book.id == req.params.id;
  });
  books.splice(index, 1);
  res.redirect("/books");
});
```

Again we can find the book's index with `findIndex`, and remove it from our array with `splice`.

Great test it out!

## Conclusion (5 mins)

Quite a lot of work there!!!

How we are storing posts here is totally unconventional and you will almost never need to do something like this in a real application.

However, we are starting to deal with an application as a set of RESTful resources that we can manipulate.

This is a really important concept in web development.