---
title: Express Authentication
type: lesson
duration: "1:25"
creator:
    name: Alex Chin
    city: London
competencies: Programming, Server Applications
---

# Express Authentication

### Objectives
*After this lesson, students will be able to:*

- Understand how to integrate bcrypt into an Express app
- Build the foundation to create a JWT authenticated app

### Preparation
*Before this lesson, students should already be able to:*

- Students should have seen bcrypt in use
- Students should understand the concept of hashing

## Integrating Bcrypt into an Express app

Previously, we have used bcrypt to take a cleartext password and create a hashed password to save into the database. However, we haven't integrated this into an Express app.

During this lesson, we are going to develop two endpoints:

- `POST /api/register`
- `POST /api/login`

### Look at the starter-code

*Send over the starter-code.*

You should have a basic express app setup with this folder structure:

```
.
├── app.js
├── config
│   ├── config.js
│   └── routes.js
├── controllers
│   └── authentications.js
├── models
│   └── user.js
└── package.json

3 directories, 6 files
```

If you take a look at the routes file you will see:

### Router

```js 
const express  = require("express");
const router   = express.Router();

// Your routes go here!

module.exports = router;
```

And in the authentications controller, you should also see:

### Authentications Controller

```js
module.exports = {
  register: authenticationsRegister,
  login:    authenticationsLogin
};

const User = require("../models/user");

function authenticationsRegister(req, res){

}

function authenticationsLogin(req, res){
  
}
```

We are going to fill in these with the logic from the user model that has been setup to hash passwords with some basic validation:

### User model

```js
const mongoose = require("mongoose");
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
  .virtual("passwordConfirmation")
  .set(setPasswordConfirmation);

userSchema
  .path("passwordHash")
  .validate(validatePasswordHash);

userSchema.methods.validatePassword = validatePassword;

module.exports = mongoose.model("User", userSchema);

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
      return this.invalidate("password", "A password is required.");
    }

    if (this._password !== this._passwordConfirmation) {
      return this.invalidate("passwordConfirmation", "Passwords do not match.");
    }
  }
}

function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash);
}
```

## Register

First, we need to link up the router to the authentication controller. 

We need to:

1. Require the authentications controller
2. Create a route for `POST /api/register`

```js
const express  = require("express");
const router   = express.Router();

const authentications = require("../controllers/authentications");

router.route("/register")
  .post(authentications.register);

module.exports = router;
```

Great! 

Next, we need to write the logic for the authentications controller.

```js
function authenticationsRegister(req, res){
  User.create(req.body.user, (err, user) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    return res.status(201).json({
      message: `Welcome ${user.username}!`,
      user
    });
  });
}
```

The logic here is:

1. Try to create a user with the details (`req.body.user`)
2. Unless something has gone wrong, we will create the user
3. Inside the user model however, the users' password and passwordConfirmation will be validated and their password hashed by bcrypt and saved to the database

### Let's test it

Let's test that in Insomnia.

We need to post:

<img width="514" alt="screen shot 2016-09-06 at 17 59 05" src="https://cloud.githubusercontent.com/assets/40461/18283141/ce0e79c4-745b-11e6-908f-cfd70d1be7c1.png">

Great! This should allow us to register a user.

## Login

Again, we need to write the route for the login endpoint:

```js
const express  = require("express");
const router   = express.Router();

const authentications = require("../controllers/authentications");

router.route("/register")
  .post(authentications.register);
router.route("/login")
  .post(authentications.login);

module.exports = router;
```

Next, we need to write the logic in the controller action:

```js
function authenticationsLogin(req, res){
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    return res.status(200).json({
      message: "Welcome back.",
      user
    });
  });
}
```

Let's think about what is going on here:

1. We are looking to see if there is a user with this email address (`req.body.email`)
2. Then we are using the userSchema method to check if they have been given a valid password (`req.body.password`)
3. If they have provided us the correct details, then confirm that they have logged in correctly!

### Let's test it

Now we can test this in Insomnia:

<img width="514" alt="screen shot 2016-09-06 at 17 59 05" src="https://cloud.githubusercontent.com/assets/40461/18283419/09c6be3a-745d-11e6-8816-c84d97eea381.png">

## Limiting JSON output

One thing that we want to do now that we can register users, is to potentially limit the JSON that is outputted by our API.

It wouldn't be sensible to send our users' passwordHash details all the time. 

To do this we can add this code in our user model:

```js
userSchema.set("toJSON", {
  transform: function(doc, ret) {
    delete ret.passwordHash;
    delete ret.email;
    delete ret.__v;
    return ret;
  }
});
```

Here we are **black-listing** the passwordHash, email and __v keys from our JSON output of our Mongoose object. 

We can also **white0list** the key/value pairs that will appear in our JSON output. The syntax looks like this:

```js
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      _id: ret._id,
      username: ret.username
    };
    return returnJson;
  }
});
```

Usually, blacklisting is prefered as the object that you are outputting could be quite large!

## Conclusion (5 mins)

So we have now made two endpoints that will enable a user to register to our API. 

However, what we haven't done is to have any way of keeping someone "logged in".

We will need to move onto the next lesson to do that!