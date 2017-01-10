const express = require('express');
const router  = express.Router();

const staticsController = require('../controllers/statics');
const camerasController = require('../controllers/cameras');

router.route('/')
  .get(staticsController.home);

router.route('/cameras')
  .get(camerasController.index);

module.exports = router;
