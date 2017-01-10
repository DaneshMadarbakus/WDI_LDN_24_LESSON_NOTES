const mongoose = require('mongoose');
const config   = require('../config/config');
const data     = require('./data');
const Place    = require('../models/place');

mongoose.connect(config.db);

Place.collection.drop();

data.forEach(place => {
  Place.create(place, (err, place) => {
    console.log(`${place.name} was created`);
  });
});
