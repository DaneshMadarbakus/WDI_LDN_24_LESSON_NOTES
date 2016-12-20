const express = require('express');
const router  = express.Router();

// Require Controllers
const foodsController = require("../controllers/foodsController");

// root path
router.get("/", (req, res) => {
  res.redirect(302, "/foods");
});

// Food Restful routes

router.route("/foods")
  .get(foodsController.index)
  .post(foodsController.create);

router.route("/foods/new")
  .get(foodsController.new);

router.route("/foods/:id")
  .get(foodsController.show)
  .put(foodsController.update)
  .delete(foodsController.delete);

router.route("/foods/:id/edit")
  .get(foodsController.edit);

module.exports = router;
