---
title: Mongo-backed Models with Mongoose
type: lesson
duration: "1:25"
creator:
    name: Alex Chin, Gerry Mathe
    city: London
competencies: Server Applications
---

# Mongo-backed Models with Mongoose

### Objectives
*After this lesson, students will be able to:*

- Update & destroy a model
- Initialise & create a new instance of a model
- Perform basic CRUD queries using Mongoose

### Preparation
*Before this lesson, students should already be able to:*

- Describe how Mongo documents work
- Describe how an ORM works
- Create a basic NodeJS app

## Using MongoDB with Node - Intro (5 mins)

NodeJS and MongoDB work really well together. However, to make it even easier, Mongoose is the most common Node.js ORM to manipulate data using MongoDB.

CRUD functionality is something that is necessary in almost most every application, as we still have to create, read, update, and delete data.

The MEAN stack is becoming very popular at the moment:

- **M**ongo
- **E**xpress
- **A**ngular
- **N***ode

For today, we will use a couple of Node files to play with and use MongoDB using the Mongoose ORM.

#### What Is Mongoose?

Mongoose is an object modeling package - think ORM for Node - and it gives us the MongoDB CRUD commands as well as the ability to connect to the MongoDB.

## Setting up Mongoose in your app - Codealong (5 mins)

Create a new package.json and install the relevant npm packages:

1. `mkdir family-tree`
2. `cd family-tree`
3. `npm init`
4. `touch app.js` in family-tree directory

To use Mongoose in your Node app:

```bash
$ npm install mongoose --save
```

With the package installed, lets use it - open app.js and add:

```javascript
// Require mongoose
const mongoose    = require("mongoose");
const databaseURL = "mongodb://localhost/family-tree";

mongoose.connect(databaseURL);
```

We can use mongoose's `.connect()` function to connect to our mongoDB.

In this example, we are connecting to a local database named `family-tree`. If we did not already have a db called "family-tree", this last parameter would be used as the name of a new database we are creating.

You can now execute all the mongoDB commands over the database `family-tree`.

P.S. Don't forget to run mongo! If you want, you can use [launchctl](https://gist.github.com/tonypujals/9630872) to start mongo automatically on login.

## Working with Models - Codealong (20 mins)

#### Defining a Model

We must build a Mongoose Model before we can use any of our new CRUD operations. You can think of models a bit like JavaScript constructor functions. Just like a `schema.rb` file in Rails, our Mongoose Schema is what we'll use to define our document attributes.

Think about it like this: a document is the equivalent of a record/row in a relational database; only here, our attributes - or columns - are flexible.

**Note:** It's almost **the opposite** from ActiveRecord's ORM. Instead of mapping the database fields onto our class, we're using a constructor function to limit what our database will hold.

From within our family-tree app:

```bash
mkdir models
touch models/user.js
```

Now let's add:

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  meta: {
    age: Number,
    website: String,
    address: String,
    country: String
  },
}, {
  timestamps: true
});
```

MongoDB is schemaless, meaning: all the documents in a collection can have different fields, but for the purpose of a web app, often containing validations, it's better to use a schema that will cast and validate each type. Also, if you try to save data to a key that is not declared in the schema, the data will not be saved.

At the moment we only have the schema, representing the structure of the data we want to use. To save some data, we will need to make this file a Mongoose model and export it:

```javascript
const mongoose = require("mongoose");

// The "bouncer" to our database nightclub
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  meta: {
    age: Number,
    website: String,
    address: String,
    country: String
  },
}, {
  timestamps: true
});

// make this available to our other files
module.exports = mongoose.model('User', userSchema);
```

Notice that you can use hashes and nested attributes inside a hash.

**Note:** `meta` is not a special keyword here!

Here's a look at the datatypes we can use in Mongoose documents:

- String
- Number
- Date
- Boolean
- Array
- Buffer
- Mixed
- ObjectId

Also, notice we create the Mongoose Model with `mongoose.model`. Remember, we can define custom methods here - this would be where we could write a method to encrypt a password.

#### Create a new User

Now we can use this mongoose model by requiring the User model in app.js:

```javascript
const User = require('./models/user');

// create a new user called chris
const person = new User({
  firstName: "Alex",
  meta: {
    age: 27
  }
});

console.log(person)
```

**Note: We haven't tried saved this record yet and therefore the validation hasn't run!**

## Interacting with MongoDB's CRUD - Demo (15 mins)

Let's hop into an interactive shell and test out CRUD functionality.  To do this, from our app directory, we'll have to type in `node` and then require our Models manually.

**Note:** You might want to make a note of these queries in another file?

#### Create

We'll try to create a user:

```js
const person = new User({
  firstName: "Alex",
  meta: {
    age: 27
  }
})

person.save((err, user) => {
  if (err) return console.log(err);

  return console.log(`User was created! ${user}`);
})
```

Due to our validation on email, we should get:

```bash
{ [ValidationError: User validation failed]
  message: 'User validation failed',
  name: 'ValidationError',
  errors:
   { email:
      { [ValidatorError: Path `email` is required.]
        message: 'Path `email` is required.',
        name: 'ValidatorError',
        properties: [Object],
        kind: 'required',
        path: 'email',
        value: undefined } } }
```

Let's fix this by adding an email to our person.

```javascript
const User = require('./models/user');

const person = new User({
  firstName: "Alex",
  meta: {
    age: 27
  },
  email: "alex@alex.com"
})

person.save((err, user) => {
  if (err) return console.log(err);
  return console.log("User was created!", user);
})
```

Great, we should now have saved a user!

#### What about Read?

Just like other ORMs such as ActiveRecord (Ruby), we can use the Mongoose equivalent of `.all`, `.find_by_` and `.find` to get a hold of what we're looking for.

Inside `app.js`, **comment out the code to save a new user** and underneath let's add:

```javscript
// Get all of the users (like .all in ActiveRecord)
User.find({}, (err, users) => {
  if (err) return console.log(err);
  return console.log(users);
});
```

This should give us all of the users.

**CFU:** **Q.** Which RESTful action would you use this method in? **A.** Index

The ActiveRecord equivalent of `.find` is `.findById`:

```javascript
// Get one User (.find in ActiveRecord)
User.findById("572733e9cfef9557890b3b92", (err, user) => {
  if (err) return console.log(err);
  return console.log(user);
})
```

**CFU:** **Q.** Which RESTful action would you use this method in? **A.** Show

Similar `.find_by_` in ActiveRecord, you'll can also get the first record that matches a search with the attributes defined:

```javascript
//Find One
User.findOne({ firstName: 'Alex' }, (err, user) => {
  if (err) return console.log(err);
  return console.log(user);
});
```

**Note:** If the attribute is not defined, the result will be `null`.

#### Update

For update, you can do it in one of two ways (that are super easy!) - using `.findByIdAndUpdate()` or `.findOneAndUpdate()`:

```javascript
// Update
User.findByIdAndUpdate("572733e9cfef9557890b3b92", {
  meta: { age: 31 }
}, {
  new: true
}, (err, user) => {
  if (err) return console.log(err);
  return console.log(user);
})
```

To return the newly updated object, you can pass the optional object: `{ new: true }` without this, you will get the old object before the changes.

To break this down in to separate variables, to look at how you are passing arguments to the `findByIdAndUpdate` function:

```js
var id = "572733e9cfef9557890b3b92";
var user = {
  meta: { age: 31 }
}
var newTrue = {
  new: true
}
var callbackFunction = (err, user) => {
  if (err) return console.log(err);
  return console.log(user);
}

User.findByIdAndUpdate(id, user, newTrue, callbackFunction);
```

#### Destroy

Mongoose gives you two easy methods to delete documents - `findByIdAndRemove()`and `.findOneAndRemove()`.

```javascript
User.findByIdAndRemove("572733e9cfef9557890b3b92", err => {
  if (err) return console.log(err);
  return console.log("Deleted!")
});
```

## Custom Methods (20 mins)

When defining a schema, you can also add custom methods and call these methods on the models. You can even overwrite the default Mongoose document methods.

There are two different types of methods you can define in a schema `methods` and `statics`. These are similar to instance (`methods`) vs class (`statics`) methods.

#### .methods

Let's write a `sayHello` function under our schema:

```javascript
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  meta: {
    age: Number,
    website: String,
    address: String,
    country: String,
  },
}, {
  timestamps: true
});

userSchema.methods.sayHello = function() {
  console.log("Hi " + this.firstName);
};

module.exports = mongoose.model('User', userSchema);
```

We can use that in app.js:

```js
User.findOne((err, user) => {
  if (err) return console.log(err);
  console.log(user)
  user.sayHello();
})
```

Now run the app with `node app.js` to see the result!

To give a real world scenario, when securely signing up a new user, you would create model method to encrypt the password given by the user so that it is not existing vulnerably in your database.

#### .statics

Let's make a new `statics` method on our User model. This method could allow us to call `.all` on `User` to make us feel like we are using ActiveRecord again!

```js
userSchema.statics.all = function(callback) {
  return this.find({}, callback)
}
```

We can use this in our app.js:

```js
User.all((err, users) => {
  if (err) return console.log(err);
  return console.log(users);
});
```

#### Hooks

Further, you can define methods to help automatically populate key(s) of your model. For example:

```javascript
userSchema.pre('save', (next) => {
  if (!this.firstName) {
    this.firstName = "Frank";
  }
  next();
});
```

## Independent Practice (20 mins)

Using the code we just wrote and the [official Mongoose Models docs](http://mongoosejs.com/docs/models.html), make another model from scratch representing a WDI course.

- Think about the properties it needs.
- Then create a few courses in the node terminal

## Conclusion (5 mins)

Mongoose is just a bridge to use MongoDB inside a NodeJS environment. There are a lot of options when creating a schema with Mongoose, we've just seen a few for the moment.

- How does Mongoose compare to ActiveRecord?
- How does the schema in Mongoose/Mongo/Express compare to Rails?
