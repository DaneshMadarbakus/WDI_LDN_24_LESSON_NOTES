const express = require('express');
const router  = express.Router();

const shoes = require('../controllers/shoes');

router.route('/shoes')
  .post(shoes.create)
  .get(shoes.index);

router.route('/shoes/:id')
  .get(shoes.show)
  .put(shoes.update)
  .patch(shoes.update)
  .delete(shoes.delete);

module.exports = router;
