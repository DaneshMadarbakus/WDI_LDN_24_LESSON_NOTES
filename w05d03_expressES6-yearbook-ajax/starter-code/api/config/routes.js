const express  = require('express');
const router   = express.Router();

const users    = require('../controllers/users');
const projects = require('../controllers/projects');

router.route('/')
  .get(users.index);
router.route('/users')
  .get(users.index)
  .post(users.create);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/users/:id/projects')
  .post(projects.create);
router.route('/users/:user_id/projects/:id')
  .get(projects.show)
  .put(projects.update)
  .delete(projects.delete);

module.exports = router;
