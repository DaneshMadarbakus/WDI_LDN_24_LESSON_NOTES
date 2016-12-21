const Restaurant = require('../models/restaurant');

function restaurantsIndex(req, res) {
  Restaurant.find({}, (err, restaurants) => {
    if (err) return console.log(err);
    return res.render('restaurants/index', { restaurants });
  });
}

function restaurantsNew(req, res) {
  return res.render('restaurants/new');
}

function restaurantsShow(req, res) {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err);
    if (!restaurant) return console.log('No restaurant found');
    return res.render('restaurants/show', { restaurant });
  });
}

function restaurantsCreate(req, res) {
  const restaurant = new Restaurant(req.body.restaurant);
  restaurant.save((err, restaurant) => {
    if (err) return console.log(err);
    return res.redirect(`/restaurants/${restaurant._id}`);
  });
}

function restaurantsEdit(req, res) {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err);
    if (!restaurant) return console.log('No restaurant found');
    return res.render('restaurants/edit', { restaurant });
  });
}

function restaurantsUpdate(req, res) {
  Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant, { new: true }, (err, restaurant) => {
    if (err) return console.log(err);
    if (!restaurant) return console.log('No restaurant found');
    return res.redirect(`/restaurants/${restaurant._id}`);
  });
}

function restaurantsDelete(req, res) {
  Restaurant.findByIdAndRemove(req.params.id, err => {
    if (err) return console.log(err);
    return res.redirect('/restaurants');
  });
}

module.exports = {
  index: restaurantsIndex,
  new: restaurantsNew,
  show: restaurantsShow,
  create: restaurantsCreate,
  edit: restaurantsEdit,
  update: restaurantsUpdate,
  delete: restaurantsDelete
};
