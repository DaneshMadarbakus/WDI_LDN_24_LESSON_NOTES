const express = require('express');
const router  = express.Router();

const criminalsController = require('../controllers/criminals');

router.route('/criminals')
  .get(criminalsController.index)
  .post(criminalsController.create);
router.route('/criminals/:id')
  .get(criminalsController.show)
  .put(criminalsController.update)
  .patch(criminalsController.update)
  .delete(criminalsController.delete);

module.exports = router;
