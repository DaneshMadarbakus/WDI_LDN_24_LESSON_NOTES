const mongoose = require('mongoose');
const config   = require('../config/config');

mongoose.connect(config.db);

const User     = require('../models/user');

User.collection.drop();

const users = [
  // {
  //   name: 'Miriam',
  //   image: '/images/miriam.jpg'
  // }
];

users.forEach(user => User.create(user, (err, user) => console.log(`${ user.name } was saved.`)));
