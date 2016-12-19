const express = require('express');
const router  = express.Router();

router.get('/',         (req, res) => res.render('index', { header: 'Home'}));
router.get('/contact',  (req, res) => res.render('index', { header: 'Contact'}));
router.get('/about',    (req, res) => res.render('index', { header: 'About'}));

router.get('/projects', (req, res) => res.render('projects'));

module.exports = router;
