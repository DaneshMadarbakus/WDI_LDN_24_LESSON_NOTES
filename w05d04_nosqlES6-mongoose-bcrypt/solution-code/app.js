const mongoose = require('mongoose');
const config   = require('./config/config');
const User     = require('./models/user');

mongoose.connect(config.db);

User.collection.drop();

const user = User({
  username: 'alex',
  email: 'alex@alex.com',
  password: 'password',
  passwordConfirmation: 'password'
});

// We are registering this user by saving them in the database
user.save((err, user) => {
  if (err) return console.log(err);
  if (!user) return console.log('No user found');

  // Now we need to "authenticate" (login) the user with:
  // - email
  // - password

  User.findOne({ email: 'alex@alex.com' }, (err, user) => {
    if (err) return console.log(err);
    if (!user) return console.log('No user was found with this email.');

    console.log(user.validatePassword('password2'));
  });
});
