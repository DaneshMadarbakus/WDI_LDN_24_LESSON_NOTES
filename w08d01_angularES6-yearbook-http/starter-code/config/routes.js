const express  = require('express');
const router   = express.Router();

const users    = require('../controllers/users');

router.route('/users')
  .get(users.index)
  .post(users.create);
router.route('/users/:id')
  .get(users.show)
  .patch(users.update)
  .put(users.update)
  .delete(users.delete);

module.exports = router;
