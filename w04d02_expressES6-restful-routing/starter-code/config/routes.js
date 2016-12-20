const express = require('express');
const router  = express.Router();

// A home route
router.get('/',               (req, res) => res.render('index'));

// RESTful routes for the Book resource
// All URLS should contain /books

// INDEX
router.get('/books',          (req, res) => res.send('INDEX'));
// NEW
router.get('/books/new',      (req, res) => res.send('NEW'));
// SHOW
router.get('/books/:id',      (req, res) => res.send('SHOW'));
// CREATE
router.post('/books',         (req, res) => res.send('CREATE'));
// EDIT
router.get('/books/:id/edit', (req, res) => res.send('EDIT'));
// UPDATE
router.put('/books/:id',      (req, res) => res.send('UPDATE'));
// DELETE
router.delete('/books/:id',   (req, res) => res.send('DELETE'));

module.exports = router;
