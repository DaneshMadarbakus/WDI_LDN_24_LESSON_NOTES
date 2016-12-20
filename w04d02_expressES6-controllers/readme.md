---
title: Express Controllers
type: lesson
duration: '1:30'
creator:
    name: Alex Chin
    city: London
competencies: Server Applications
---

# Express Controllers

### Objectives
*After this lesson, students will be able to:*

- Understand what a controller is and how to create on using Express
- Create a separate router module and controller file for a RESTful resource

### Preparation
*Before this lesson, students should already be able to:*

- How to create a basic Express application
- How to use the Express router

## Intro to Express Controllers - (10 mins)

We have already had a look at how to use the router in Express. However, let's think about what we have done in terms of our code - we have moved some route handlers from `app.js` to `routes.js`.

Why have we done this? Essentially, we tried to organise our code! We have been trying to improve the design of our code.

One common design principle of coding is called [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) and a common web framework design pattern is the MVC pattern.

## MVC

MVC stands for:

- the **M**odel
- the **V**iew
- the **C**ontroller

### Model

The Model manages fundamental behaviours and data of the application. It can respond to requests for information, respond to instructions to change the state of its information, and even to notify observers in event-driven systems when information changes. This could be a database, or any number of data structures or storage systems. In short, it is the data and data-management of the application.

### View

The View provides the user interface of the application (or the data for it). It'll render data from the model into a form that is suitable to be displayed in the user interface.

### Controller

The Controller receives user input and makes calls to Model objects and the View to perform appropriate actions.

All in all, these three components work together to create the three basic components of MVC.

## Making a controller - Codealong (15 mins)

If we have a look at the `config/routes.js` file - we can move the route handler functions to another file. Let's first make a new directory for the new controller files:

```bash
$ mkdir controllers
$ touch controllers/foodsController.js
```

> **NOTE:** when doing the codealong for the following section, it's easier to move and rename one function at a time from `routes.js` to `foodsController.js`.

Then inside the `foodsController` let's move the `foods` array, and all of the callback functions for the food resource, from `config/routes.js`:

```javascript
let foods = [
  { id: 0, name: "Sushiritto", yumminess: "quite" },
  { id: 1, name: "Green Eggs & Ham", yumminess: "Sure!" },
  { id: 2, name: "Crayfish", yumminess: "Depending..." },
  { id: 3, name: "Foie Gras", yumminess: "omg" },
  { id: 4, name: "Kale", yumminess: "meh" }
];

// INDEX
(req, res) => {
  res.render("foods/index", { foods });
}

// NEW
(req, res) => {
  res.render("foods/new");
}

// CREATE
(req, res) => {
  let food = req.body.food;
  food.id = foods.length;
  foods.push(food);
  res.redirect(302, "/foods");
}

// SHOW
(req, res) => {
  const id = parseInt(req.params.id);
  const food = foods[id];
  res.render("foods/show", { food });
}

// EDIT
(req, res) => {
  const id = parseInt(req.params.id);
  res.render("foods/edit", { food: foods[id] });
}

// UPDATE
(req, res) => {
  const id = parseInt(req.params.id);
  let food = req.body.food;
  food.id  = id;
  foods[id] = food;
  res.redirect(302, `/foods/${id}`);
}

// DELETE
(req, res) => {
  const id = req.params.id;
  foods.splice(id, 1);
  foods = foods.map(food => {
    food.id--;
    return food;
  });
  res.redirect(302, "/");
}
```

There will be several `jshint` errors, which we will clean up next.

We now need to name these functions, and we'll use the following convention:

```
foodsIndex
foodsNew
foodsCreate
foodsShow
foodsEdit
foodsUpdate
foodsDelete
```

So we can fix the `jshint` errors by giving each function a name, and then export them:

```javascript
let foods = [
  { id: 0, name: "Sushiritto", yumminess: "quite" },
  { id: 1, name: "Green Eggs & Ham", yumminess: "Sure!" },
  { id: 2, name: "Crayfish", yumminess: "Depending..." },
  { id: 3, name: "Foie Gras", yumminess: "omg" },
  { id: 4, name: "Kale", yumminess: "meh" }
];

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
```

### Requiring the controller file

Next, we need to require the controller in the `config/routes.js` file:

```javascript
// Require Controllers
const foodsController = require("../controllers/foodsController");
```

We can now use the `foodsController` methods that we exported:

```javascript
router.get("/foods", foodsController.index);
router.get("/foods/new", foodsController.new);
router.post("/foods", foodsController.create);
router.get("/foods/:id", foodsController.show);
router.get("/foods/:id/edit", foodsController.edit);
router.put("/foods/:id", foodsController.update);
router.delete("/foods/:id", foodsController.delete);
```

### Moving data to a module

As we don't have a database yet, let's move the posts variable to its own file:

```bash
$ mkdir data
$ touch data/foods.js
```

**Note:** That this is _NOT_ conventional behaviour!

Now _move_ the declaration of the `foods` variable into this file, and export it:

```javascript
let foods = [
  { id: 0, name: "Sushiritto", yumminess: "quite" },
  { id: 1, name: "Green Eggs & Ham", yumminess: "Sure!" },
  { id: 2, name: "Crayfish", yumminess: "Depending..." },
  { id: 3, name: "Foie Gras", yumminess: "omg" },
  { id: 4, name: "Kale", yumminess: "meh" }
];

module.exports = foods;
```

Now, we need to require this file at the top of our controller.

```javascript
let foods = require("../data/foods");
```

Let's start the app up with `nodemon` and everything should work!

### Data vs Model

Later during the course, we're going to replace this file with a Model. Model files are by convention singular. We'll revisit this later.


## Refactor with router.route() - Codealong (10 mins)

You can create chainable route handlers for a route path by using `app.route()` or `router.route()`. Because the path is specified at a single location, creating modular routes is helpful, as is reducing redundancy and typos.

Let's refactor our code here:

```javascript
router.get("/foods", foodsController.index);
router.get("/foods/new", foodsController.new);
router.post("/foods", foodsController.create);
router.get("/foods/:id", foodsController.show);
router.get("/foods/:id/edit", foodsController.edit);
router.put("/foods/:id", foodsController.update);
router.delete("/foods/:id", foodsController.delete);
```

To use `router.route()`:

```javascript
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
```

**Note:** Be careful about where you put `;` as these route handlers are chained together.

Now we can clearly see that we have 5 key url paths for the post resource with different HTTP methods for each of them.

This is why sometimes the `delete` is grouped with the `show` and `update`.

## Conclusion (5 mins)

At the moment we haven't really take a look at the **M**odel part of the MVC paradigm. We will be looking into this in more detail later on in the course.

However, we've now had a look at the **V**iew & **C**ontroller parts.

### Keeping everything organised!

I hope you can see that we're starting to build bigger and bigger applications - but we are trying to keep our code organised as our codebase grows. This is an **important** part of coding!

We have separated out the logic of our route handler functions into a controller file and kept the routing logic of matching a url path to a HTTP method in `config/routes.js`. Tidy!
