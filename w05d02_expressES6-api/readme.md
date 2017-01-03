---
title: Express API
type: lesson
duration: "1:00"
creator:
    name: Alex Chin
    city: London
competencies: Server Applications
---

# Express API

### Objectives
*After this lesson, students will be able to:*

- Make an API with Express
- Test the API using Postman or Insomnia
- Understand the difference between an API and a web application

### Preparation
*Before this lesson, students should already be able to:*

- Must understand what JSON is
- Should be able to make an MVC Express app

## Express API Intro (10 mins)

So far we've used Express only to render `text/html`. However, Express as a "minimal" framework is really great to make APIs.

The majority of modern APIs now render JSON so that they can then manipulate the data programmatically - often using JavaScript.

Most likely, if you encounter Express in the wild you will use it as you API.

### MEAN

Express perhaps is most widely used as part of a stack called the "MEAN" stack:

- **M**ongo
- **E**xpress
- **A**ngular
- **N**ode

This is a popular collection of frameworks that developers use to get modern websites developed quickly. Express here is used as an API.

## Create an API from scratch (15 mins)

> **Note:** Depending on time, you can skip to using the starter-code and jump to the next section. However, if there is time it would be good to go through the process from start to finish.

Lets go through the process of creating an API from scratch using Express and Mongo as this is likely to be the setup that we are going to use for the rest of the course.

Let's start by creating a folder:

```bash
$ mkdir express-api && express-api
```

- **npm init**

Next, we need to initialize `npm` with a package.json:

```bash
$ npm init
```

You can pretty much hit `<enter>` for the defaults.

- **Install packages**

Let's install the various packages that we're going to use.

```bash
$ npm install express --save
$ npm install body-parser --save
$ npm install morgan --save
$ npm install mongoose --save
```

You could do this in one command:

```bash
$ npm install express body-parser morgan --save
```

**Tip:** You could potentially alias this if you want!

We don't need to install `ejs` or `express-ejs-layouts` because we aren't going to render any views.

- **Create index.js**

Next, let's create an `index.js` file:

```bash
$ touch index.js
```

- **Setup & run express**

Inside index.js, let's setup an express application.

```js
const express      = require('express');
const app          = express();
const port         = process.env.PORT || 3000;

// listen on port 3000
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
```

- **Setup morgan for better logging**

Now let's setup morgan for better logging.

```js
const express      = require('express');
const app          = express();
const port         = process.env.PORT || 3000;
const morgan       = require('morgan');

// Use morgan for logging
app.use(morgan('dev'));

// listen on port 3000
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
```

- **Setup body-parser**

Next, we need to setup body-parser so that Express can read the body of HTTP requests.

We want to set this up slightly differently than we have before as we want to be able to accept JSON.

```js
const express      = require('express');
const app          = express();
const port         = process.env.PORT || 3000;
const morgan       = require('morgan');
const bodyParser   = require('body-parser');

// Use morgan for logging
app.use(morgan('dev'));

// Setup body-parser to read HTTP body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// listen on port 3000
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
```

- **Connect to the database**

Lastly, let's setup mongoose to connect to our database.

```js
const express      = require('express');
const app          = express();
const port         = process.env.PORT || 3000;
const morgan       = require('morgan');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');

const databaseUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/express-api';
mongoose.connect(databaseUrl);
```

> **Note:** We're setting up `process.env.MONGOLAB_URI` only because this is the service that we use on Heroku to run Mongo.

- **Run the website**

You can now run the website to test that it works. There are currently no routes but there should be no errors.

## Create a model - (15 mins)

The next step we want to do is to create a model for our app. Let's create a model for an object!

We're going to use shoes!

```bash
$ mkdir models
$ touch models/shoe.js
```

Now inside this model, we need to create a mongoose model for a shoe.

```js
const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  brand: { type: String },
  color: { type: String },
  laced: { type: Boolean },
  material: { type: String },
  price: { type: Number }
}, {
  timestamps: true
});

// Ensure that the number is saved as an integer by returned as a float
shoeSchema.path('price')
  .get(value => (value/100).toFixed(2))
  .set(value => value*100);

// Ensure that the object is sent as JSON
shoeSchema.set('toJSON', { getters: true, setters: true, virtuals: false });

module.exports = mongoose.model('Shoe', shoeSchema);
```

#### Get & Set?!

We're using a `.get` and `.set` method to ensure that the price is saved as an integer but returned as a float with two decimal places.

#### toJSON

We can customise our JSON output when the documents toJSON method is called. We need to specify the `getters: true` to enable the `get` method to be called when the JSON is requested.

[Virtuals](http://mongoosejs.com/docs/api.html#schema_Schema-virtual) are document properties that you can get and set but that do not get persisted to MongoDB. Mongoose assigns each of your schemas an `id` virtual getter by default which returns the documents `_id` field cast to a string, or in the case of ObjectIds, its hexString.

## Make a controller & routes - (15 mins)

We're going to separate our controller logic from our routing logic to keep things a little cleaner. We don't have to do this, but it's good practise to do this.

```bash
$ mkdir controllers
$ touch controllers/shoes.js
$ mkdir config
$ touch config/routes.js
```

Inside our controller, we need to require our model:

```js
const Shoe = require('../models/shoe');
```

And then create a function that uses mongoose methods to create a shoe.

_Type out the code and then go through carefully_.

```js
const Shoe = require('../models/shoe');

function shoesCreate(req, res) {
  Shoe.create(req.body.shoe, (err, shoe) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!shoe) return res.status(500).json({ success: false, message: "Please send the correct information to create a shoe." });
    return res.status(201).json(shoe);
  });
}
```

- **res.status()** The method `.status()` allows us to manually add a status code to our HTTP response. We "can" set the wrong status code if we want but this is obviously bad practise.
- **.json()** `res.send` and `res.json` are identical when an object or array is passed but `res.json()` will also convert non-objects, such as null and undefined, which are not valid JSON.

Lastly, we need to export the function:

```js
const Shoe = require('../models/shoe');

function shoesCreate(req, res) {
  Shoe.create(req.body.shoe, (err, shoe) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!shoe) return res.status(500).json({ success: false, message: "Please send the correct information to create a shoe." });
    return res.status(201).json(shoe);
  });
}

module.exports = {
  create: shoesCreate
};
```

### Routes

Next, we need to setup the route handler for this action. We're going to do this inside our `config/routes.js` file.

```js
const express = require('express');
const router  = express.Router();

const shoes = require("../controllers/shoes");

router.route('/shoes')
 .post(shoes.create);

module.exports = router;
```

> **Note:** We're using the chainable `.route` method as this will be cleaner with more routes.

Next need to require this routes file in `index.js`.

We're going to ask express to "use" our routes and we're going to namespace our api with routes beginning with `/API`:

```js
const express        = require('express');
const app            = express();
const port           = process.env.PORT || 3000;
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const routes         = require('./config/routes');

const databaseUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/express-api';
mongoose.connect(databaseUrl);

// Use morgan for logging
app.use(morgan('dev'));

// Setup body-parser to read HTTP body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

// listen on port 3000
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
```

Great! We've done a bit of coding now without really being able to test what we've typed. This is generally not good practise. Let's now test what we've done.

### Insomnia/Postman

Using an API client (or cURL) let's make a HTTP POST request to `http://localhost:3000/api/shoes` with the data of:

```json
{
  "shoe": {
    "brand":  "Nike",
    "color":  "Black",
    "laced":  true,
    "material": "Nylon",
    "price": 49.99
  }
}
```

If everything has worked, you should see:

```
{
  "shoe": {
    "__v": 0,
    "updatedAt": "2016-02-16T14:23:05.000Z",
    "createdAt": "2016-02-16T14:23:05.000Z",
    "brand": "Nike",
    "color": "Black",
    "laced": true,
    "material": "Nylon",
    "price": "49.99",
    "_id": "56c330c9f7c7ea1a176d1d33"
  }
}
```

## Creating an index action - (10 mins)

In order for us to have a look at our shoes in the database, we need to create another action. Let's create one for index.

In our controller:

```js
function shoesIndex(req, res) {
  Shoe.find((err, shoes) => {
    if (err) return res.status(500).json({ success: false, message: err });
    if (!shoes) return res.status(500).json({ success: false, message: "No shoes found" });
    return res.status(200).json(shoes);
  });
}
```

We then need to export this at the bottom of our file:

```js
module.exports = {
  create: shoesCreate,
  index: shoesIndex
};
```

Now in our `routes.js` file, let's setup this route:

```js
router.route('/shoes')
  .post(shoes.create)
  .get(shoes.index);
```

You can now test this using Insomnia making a `GET` request to `http://localhost:3000`.

## Independent Practice (20 minutes)

> ***Note:*** _This can be a pair programming activity or done independently._

I'm sure you can guess what you need to do for this independent practise?

Your task is to write the controller functions for the rest of the restful routes.

**Note:** You don't need to have a NEW & EDIT action!

- **INDEX** - `GET /shoes`
- **CREATE** - `POST /shoes`
- **SHOW** - `GET /shoes/:id`
- **UPDATE** - `PUT/PATCH /shoes/:id`
- **DELETE** - `DELETE /shoes/:id`

## Conclusion (5 mins)

It's important to understand the difference between rendering `text/html` and rendering `application/json` as a response for your HTTP requests.

It's also really important to understand the power of an API.

- What is `res.status()`?
- What the difference between `res.send()` and `res.json()`?
