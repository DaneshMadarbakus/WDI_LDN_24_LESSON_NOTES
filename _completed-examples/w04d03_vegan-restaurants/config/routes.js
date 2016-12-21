const express     = require('express');
const router      = express.Router();

const restaurants = require('../controllers/restaurants');

router.route('/').get((req, res) => res.render('home'));

router.route('/restaurants')
  .get(restaurants.index)
  .post(restaurants.create);
router.route('/restaurants/new')
  .get(restaurants.new);
router.route('/restaurants/:id')
  .get(restaurants.show)
  .put(restaurants.update)
  .delete(restaurants.delete);
router.route('/restaurants/:id/edit')
  .get(restaurants.edit);

module.exports = router;
