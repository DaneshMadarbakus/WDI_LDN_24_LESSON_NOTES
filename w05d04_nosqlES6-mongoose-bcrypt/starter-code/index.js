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
