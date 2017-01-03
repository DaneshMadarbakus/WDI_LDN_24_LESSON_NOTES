const express = require("express");
const router  = express.Router();

const shoesController = require("../controllers/shoesController");

router.route("/shoes")
  .post(shoesController.create)
  .get(shoesController.index);

router.route("/shoes/:id")
  .get(shoesController.show)
  .put(shoesController.update)
  .patch(shoesController.update)
  .delete(shoesController.delete);

module.exports = router;
