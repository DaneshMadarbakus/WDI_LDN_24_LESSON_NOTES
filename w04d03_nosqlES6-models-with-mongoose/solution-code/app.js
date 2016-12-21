// Require mongoose
const mongoose = require("mongoose");

// Connecting mongoose to the mongo database
mongoose.connect('mongodb://localhost/family-tree');

// Requiring a model
const User = require("./models/user");

// // Using that model to create a new "instance" (that hasn't been saved)
const person = new User({
  firstName: "Alex",
  meta: {
    age: 27
  },
  email: "alex@alex.com"
});

// Use the mongoose model method .save to commit to database
person.save((err, user) => {
  if (err) return console.log(err);
  console.log("User was created!", user);
});

// Get all of the users (like .all in ActiveRecord)
User.find({}, (err, users) => {
  if (err) return console.log(err);
  console.log(users);
});

// Get one User (.find in ActiveRecord)
User.findById("572733e9cfef9557890b3b92", (err, user) => {
  if (err) return console.log(err);
  console.log(user);
});

// Get one User (.find_by in ActiveRecord)
User.findOne({ firstName: "Alex" }, (err, user) => {
  if (err) return console.log(err);
  console.log(user);
});

// Update
User.findByIdAndUpdate("572733e9cfef9557890b3b92", {
  meta: { age: 31 }
}, {
  new: true
}, (err, user) => {
  if (err) return console.log(err);
  console.log(user);
});

// Separate variables to make it clearer
const id = "572733e9cfef9557890b3b92";
const user = {
  meta: { age: 31 }
};
const newTrue = {
  new: true
};
const callbackFunction = (err, user) => {
  if (err) return console.log(err);
  console.log(user);
};

User.findByIdAndUpdate(id, user, newTrue, callbackFunction);

// Removing an object
User.findByIdAndRemove("572733e9cfef9557890b3b92", err => {
  if (err) return console.log(err);
  console.log("Deleted!");
});

// Using methods
User.findOne((err, user) => {
  if (err) return console.log(err);
  console.log(user);
  user.sayHello();
});

// Using statics
User.all((err, users) => {
  if (err) return console.log(err);
  console.log(users);
});
