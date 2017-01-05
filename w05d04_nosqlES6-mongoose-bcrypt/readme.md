---
title: Mongoose BCrypt
type: Lesson
duration: "1:25"
creator:
    name: Alex Chin
    city: London
competencies: Server Applications
---

# Mongoose BCrypt

### Objectives
- Understand how to save a hashed password to a mongo database
- Understand how to install `bcrypt`
- Understand how to create virtual attributes
- Look at Mongoose Getter and Setter functions
- Look at Mongoose middleware
- Recall what encryption is and why it's important
- Generate a salt & encrypt a password

### Preparation

- Understand foundational concepts in authentication & encryption

## BCrypt Refresher - Intro (10 mins)

[Bcrypt](https://en.wikipedia.org/wiki/Bcrypt) is still recognized as one of the most secure ways of encrypting passwords because of the per-password salt.

_If the students have already seen Bcrypt, go through these questions to check understanding._

#### Some Bcrypt questions

- What is a salt?
- What does hashing mean?

_If not, go through an explanation of Bcrypt._

#### Bcrypt, hashing refresher

Remember, hashing is when a function is called on a variable - in this case a password - in order to produce a constant-sized output; it being a one-way function, there isn't a function to reverse or undo a hash and calling the function again - or reapplying the hash - isn't going to produce the same output again.

From another [stack post](http://stackoverflow.com/questions/1602776/what-is-password-hashing):

_"Hashing a password will take a clear text string and perform an algorithm on it (depending on the hash type) to get a completely different value. This value will be the same every time, so you can store the hashed password in a database and check the user's entered password against the hash."_

This prevents you from storing the cleartext passwords in the database (bad idea).

Bcrypt is recognized as one of the most secure ways of encrypting passwords because of the per-password salt. Even with it being slower than any other algorithms, a lot of companies still prefer to use bcrypt for security reasons.

#### What's a salt?

A salt is random data that can be added as additional input to a one-way function, in our case a one-way function that  hashes a password or passphrase. We use salts to defend against dictionary attacks, a technique for "cracking" an authentication mechanism by trying to determine the decryption key.

## Intro to Starter Code - Intro (5 mins)

We've got a very basic app here, with no controllers or routes. We're just going to look at saving a user to a database.

```bash
.
├── app.js
├── config
│   └── config.js
├── models
│   └── user.js
└── package.json

2 directories, 4 files
```

Let's have a look at the code in `app.js`:

```js
const mongoose = require('mongoose');
const config   = require('./config/config');
const User     = require('./models/user');

mongoose.connect(config.db);

User.collection.drop();

const user = User({
  username: 'Alex',
  email: 'alex@alex.com',
  password: 'password'
});
user.save((err, user) => {
  if (err) return console.log(err);
  return console.log(user);
});
```

In this code, we're just clearing our User colection in our database and then creating a new user and console logging what comes out.

If we run the app with `nodemon app.js` we should see:

```
{ __v: 0,
  username: 'alexpchin',
  email: 'alex@alex.com',
  password: 'password',
  _id: 56d1f22e838576536b5d8423 }
```

### Our goal in this lesson

During this lesson, we're going to look at saving users to a Mongo database and encrypting the passwords so using Bcrypt so that we don't store them in cleartext.

We're not going to be loooking at "registering" and "logging in", we'll tackle that in a later lesson.

## Encrypting the password - Codealong (10 mins)

If you look inside the User model, you can see that the user has an attribute of `password`. As we know, we don't want to store the the cleartext password in the database. We're going to want to encrypt this using a hashing algorithm like Bcrypt.

#### Install bcrypt

First, we're going to install a node package that allows us to use the `bcrypt` algorithm to hash our passwords. We're going to use `bcrypt` although there are a couple of other packages that we could use.

```bash
$ npm install bcrypt --save
```

This package comes with a number of methods that we can use to encrypt and decrypt passwords.

We need to ensure that we require this at the top of `user.js`:

```js
const bcrypt   = require('bcrypt');
```

### Mongoose Middleware

There are a couple of different ways that we can use bcrypt in our mongoose schema.

The first method we're going to look at is using Mongoose' middleware (also called pre and post hooks). Have a look at the [documentation](http://mongoosejs.com/docs/middleware.html).

A simple example would be this:

```js
userSchema.pre('save', function(next) {
  // Override the cleartext password with the hashed one
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
  next();
});
```

We've decided to use pre `save` mongoose middleware.

#### Problem?

However, there is a problem with this code...

_Can anyone tell what it is?_

The issue is, that this code will run whenever the user model is updated. We want to ensure that this password is encrypted only if the password has been modified.

We can achieve this with:

```js
userSchema.pre('save', function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  // Override the cleartext password with the hashed one
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
  next();
});
```

### Getter & Setter Mongoose

_Comment out the mongoose middleware code_

Another way is to use a [getter and setter](http://mongoosejs.com/docs/2.7.x/docs/getters-setters.html) function for a virtual attribute of `password`.

We're going to have a look at what a virtual attribute is in a minute!

First, we want to change the attribute of `password` to be `passwordHash` or something similar (like `passwordDigest`).

```js
passwordHash: { type: String, required: true }
```

Then we want to create what's called a "virtual attribute" of `password` to our userSchema.

```js
userSchema.virtual('password')
.set(function(password) {
  // Save on the object, just in case we want to do anything with the value
  this._password = password;
  // Save the password hash
  this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
});
```

If we break this code down a bit, we have:

#### The virtual method

```js
userSchema.virtual('password')
```

[Virtual attributes](http://mongoosejs.com/docs/2.7.x/docs/virtuals.html) are attributes
that are convenient to have around but that do not get persisted to mongodb.

#### Setter method

Setters allow you to transform the mongoose document's data before it gets to the raw mongodb document and is set as a value on an actual key.

```js
.set(function(password) {
  this._password = password;
  this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
});
```

### Let's test

Now, let's start and stop the server again and see what happens.

You should see the `console.log`:

```bash
{
  __v: 0,
  username: 'alexpchin',
  email: 'alex@alex.com',
  passwordHash: '5w2Vc84cDlPuNu2iUjcOjXLq5r55eZk18HD75mqOPgLHIwrAAJC',
  _id: 56d1f2c4eab0a98c6b40a702
}
```

### Validation for passwordHash

_What is the problem with this?_

The problem is that we are able to post to the user model without a `password` attribute and instead could post directly with a `passwordHash` like this:

```js
const user = User({
  username: 'alexpchin',
  email: 'alex@alex.com',
  passwordHash: 'password'
});
user.save((err, user) => {
  if (err) return console.log(err);
  return console.log(user);
});
```

You should now see:

```bash
{ __v: 0,
  username: 'alexpchin',
  email: 'alex@alex.com',
  passwordHash: 'password',
  _id: 56d1f2f828c8cc9e6bd6c111 }
```

In order to improve this, we can add a validation to the `passwordHash` field:

```js
userSchema.path('passwordHash')
  .validate(function(passwordHash) {
  if (this.isNew) {
    // If there has been no _password saved on the object this
    if (!this._password) {
      // Return an error message for the virtual attribute of password
      return this.invalidate('password', 'A password is required required');
    }
  }
}, null);
```

If we save our file, we should now see some mongoose Validator errors!

**Note:** Make sure to change the code back in `app.js` to:

```js
const user = User({
  username: 'alexpchin',
  email: 'alex@alex.com',
  password: 'password'
});
user.save((err, user) => {
  if (err) return console.log(err);
  return console.log(user);
});
```

## Authenticate - Codealong (10 Mins)

The last part of bcrypt that we're going to look at today is how to check that a password provided is the correct one.

In `app.js`, let's search for a user using an email:

**Note:** We need to do this inside the save to ensure that the user has been saved before we search for it!

```js
var user = User({
  username: 'alexpchin',
  email: 'alex@alex.com',
  password: 'password',
  passwordConfirmation: 'password',
});
user.save((err, user) => {
  if (err) return console.log(err);
  // return console.log(user);

  User.findOne({ email: 'alex@alex.com' }, (err, user) => {
    if (err) return console.log(err);
    if (!user) return console.log('No user found');
    return console.log(user);
  });
});
```

#### validatePassword

We need to create a method that is going to validate a password by taking a supplied password, applying the bcrypt algorithm and then comparing the result with the hashed password in the database.

`bcrypt` has two methods `compare` and `compareSync` for syncronous and asychronous checking of passwords. Let's make a method on our userSchema to check this.

In `user.js` add:

```js
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash, null);
};
```

This method will return a boolean if the password is correct.

### .methods vs .statics

There are two ways to add methods to schemas in Mongoose.

- `.methods` is similar to an instance method that can be used on a document.
- `.statics` are more like Class methods and can be used directly on the model, e.g. `User.validatePassword`

### Test this

Now in `app.js` let's console.log the result of a correct password and an incorrect password:

```js
const user = User({
  username: 'alexpchin',
  email: 'alex@alex.com',
  password: 'password'
});
user.save((err, user) => {
  if (err) return console.log(err);
  // return console.log(user);

  User.findOne({ email: 'alex@alex.com' }, (err, user) => {
    if (err) return console.log(err);
    if (!user) return console.log('No user found');

    console.log(user.validatePassword('password'));
    console.log(user.validatePassword('password2'));
  });
});
```

You should see:

```bash
true
false
```

## Independent Practice (15 minutes)

> ***Note:*** _This can be a pair programming activity or done independently._

Now that we have this code, try to build on it by adding a virtual field of passwordConfirmation.

Give an error if the `password` and the `passwordConfirmation` do not match.

### DRYing up the model

Once we have done this, we can now DRY up the model by using named functions like this:

```js
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const userSchema = new mongoose.Schema({
  username:     { type: String, unique: true, required: true },
  email:        { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }
});

userSchema
  .virtual('password')
  .set(setPassword);

userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

userSchema
  .path('passwordHash')
  .validate(validatePasswordHash);

userSchema.methods.validatePassword = validatePassword;

module.exports = mongoose.model('User', userSchema);

function setPassword(value){
  this._password    = value;
  this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
}

function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
}

function validatePasswordHash() {
  if (this.isNew) {
    if (!this._password) {
      return this.invalidate('password', 'A password is required.');
    }

    if (this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords do not match.');
    }
  }
}

function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash);
}
```

## Conclusion (5 mins)

In this lesson we've had a look at how to save encryped passwords in our mongo database. This is the first part of the authentication system that we will be building in Express.

- What is a hash?
- What is a salt?
- What is a virtual attribute?
