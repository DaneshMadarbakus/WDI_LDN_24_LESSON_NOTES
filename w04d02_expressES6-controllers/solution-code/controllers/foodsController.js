let foods = require("../data/foods");

// INDEX
function foodsIndex(req, res) {
  res.render("foods/index", { foods });
}

// NEW
function foodsNew(req, res) {
  res.render("foods/new");
}

// CREATE
function foodsCreate(req, res) {
  let food = req.body.food;
  food.id = foods.length;
  foods.push(food);
  res.redirect(302, "/foods");
}

// SHOW
function foodsShow(req, res) {
  const id = parseInt(req.params.id);
  const food = foods[id];
  res.render("foods/show", { food });
}

// EDIT
function foodsEdit(req, res) {
  const id = parseInt(req.params.id);
  res.render("foods/edit", { food: foods[id] });
}

// UPDATE
function foodsUpdate(req, res) {
  const id = parseInt(req.params.id);
  let food = req.body.food;
  food.id  = id;
  foods[id] = food;
  res.redirect(302, `/foods/${id}`);
}

// DELETE
function foodsDelete(req, res) {
  const id = req.params.id;
  foods.splice(id, 1);
  foods = foods.map(food => {
    food.id--;
    return food;
  });
  res.redirect(302, "/");
}

module.exports = {
  index:  foodsIndex,
  new:    foodsNew,
  create: foodsCreate,
  show:   foodsShow,
  edit:   foodsEdit,
  update: foodsUpdate,
  delete: foodsDelete
};
