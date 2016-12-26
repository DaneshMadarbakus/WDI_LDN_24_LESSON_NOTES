const router    = require('express').Router();

const movies    = require('../controllers/movies');
const directors = require('../controllers/directors');
const comments  = require('../controllers/comments');

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

router.route('/movies/:id/comments')
  .post(comments.create);

router.route('/directors')
  .get(directors.index)
  .post(directors.create);
router.route('/directors/new')
  .get(directors.new);
router.route('/directors/:id')
  .get(directors.show)
  .put(directors.update)
  .delete(directors.delete);
router.route('/directors/:id/edit')
  .get(directors.edit);

module.exports = router;
