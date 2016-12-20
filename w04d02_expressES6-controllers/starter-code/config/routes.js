const express = require("express");
const router  = express.Router();

let foods = [
  { id: 0, name: "Sushiritto", yumminess: "quite" },
  { id: 1, name: "Green Eggs & Ham", yumminess: "Sure!" },
  { id: 2, name: "Crayfish", yumminess: "Depending..." },
  { id: 3, name: "Foie Gras", yumminess: "omg" },
  { id: 4, name: "Kale", yumminess: "meh" }
];

// root path
router.get("/", (req, res) => {
  res.redirect(302, "/foods");
});

// Food Restful routes

// INDEX
router.get("/foods", (req, res) => {
  res.render('foods/index', { foods });
});

// NEW
router.get("/foods/new", (req, res) => {
  res.render('foods/new');
});

// CREATE
router.post("/foods", (req, res) => {
  let food = req.body.food;
  food.id = foods.length;
  foods.push(food);
  res.redirect(302, "/foods");
});

// SHOW
router.get("/foods/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const food = foods[id];
  res.render("foods/show", { food });
});

// EDIT
router.get("/foods/:id/edit", (req, res) => {
  const id = parseInt(req.params.id);
  res.render("foods/edit", { food: foods[id] });
});

// UPDATE
router.put("/foods/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let food = req.body.food;
  food.id  = id;
  foods[id] = food;
  res.redirect(302, `/foods/${id}`);
});

// DELETE
router.delete("/foods/:id", (req, res) => {
  const id = req.params.id;
  foods.splice(id, 1);
  foods = foods.map(food => {
    food.id--;
    return food;
  });
  res.redirect(302, "/");
});

module.exports = router;
