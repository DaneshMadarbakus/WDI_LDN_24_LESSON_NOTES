const router = require('express').Router();

const movies = require('../controllers/movies');

router.route('/').get((req, res) => res.render('home'));

router.route('/movies')
  .get(movies.index)
  .post(movies.create);
router.route('/movies/new')
  .get(movies.new);
router.route('/movies/:id')
  .get(movies.show)
  .put(movies.update)
  .delete(movies.delete);
router.route('/movies/:id/edit')
  .get(movies.edit);

module.exports = router;
