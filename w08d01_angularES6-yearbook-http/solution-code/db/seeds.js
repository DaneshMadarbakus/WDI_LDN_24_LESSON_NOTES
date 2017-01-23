const mongoose = require('mongoose');
const config   = require('../config/config');

mongoose.connect(config.db);

const User     = require('../models/user');

User.collection.drop();

const users = [
  {
    name: 'Miriam',
    image: '/images/miriam.jpg'
  }, {
    name: 'Caz',
    image: '/images/caz.jpg'
  }, {
    name: 'Paul',
    image: '/images/paul.jpg'
  }, {
    name: 'Abi',
    image: '/images/abi.jpg'
  }, {
    name: 'Alfredo',
    image: '/images/alfredo.jpg'
  }, {
    name: 'Alicia',
    image: '/images/alicia.jpg'
  }, {
    name: 'Ajay',
    image: '/images/ajay.jpg'
  }, {
    name: 'Ben',
    image: '/images/ben.jpg'
  }, {
    name: 'Sam H',
    image: '/images/samh.jpg'
  }, {
    name: 'Nat',
    image: '/images/nat.jpg'
  }, {
    name: 'Will',
    image: '/images/will.jpg'
  }, {
    name: 'Ryan',
    image: '/images/ryan.jpg'
  }, {
    name: 'Laura',
    image: '/images/laura.jpg'
  }, {
    name: 'Jonnie',
    image: '/images/jonnie.jpg'
  }, {
    name: 'Dan',
    image: 'https://www.ephotozine.com/articles/skydiving-photography-techniques-12084/images/Mike_sky_diver2.jpg'
  }, {
    name: 'Sam Y',
    image: '/images/samy.jpg'
  }
];

users.forEach(user => User.create(user, (err, user) => console.log(`${ user.name } was saved.`)));
