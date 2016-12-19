const express = require('express');
const router  = express.Router();

router.get('/',        (req, res) => {
  return res.render('home', { title: 'Welcome to my first website.' });
});
router.get('/about',   (req, res) => {
  return res.render('about', { title: 'About my first website.' });
});
router.get('/contact', (req, res) => {
  return res.render('contact', { title: 'Contact me about my first website.' });
});

module.exports = router;
