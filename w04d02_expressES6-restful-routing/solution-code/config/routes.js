const express = require('express');
const router  = express.Router();

let id = 4;
const books = [
  {
    id: 1,
    title: 'Harry Potter',
    author: 'J K Rowling',
    description: 'Kid gets scar. Finds magic. Stuff.'
  },
  {
    id: 2,
    title: 'Harry Potter 2',
    author: 'J K Rowling',
    description: 'Snaaaaaake. Secret emo diary. Same baddy.'
  },
  {
    id: 3,
    title: 'Harry Potter 3',
    author: 'J K Rowling',
    description: 'RESPECT THE BIRD-HORSE. Bad man is good man. Same bad guy.'
  }
];

// A home route
router.get('/',               (req, res) => res.render('home'));

// RESTful routes for the Book resource
// All URLS should contain /books

// INDEX
router.get('/books', (req, res) => {
  return res.render('books/index', { books });
});
// NEW
router.get('/books/new', (req, res) => {
  return res.render('books/new');
});
// SHOW
router.get('/books/:id', (req, res) => {
  let book = books.filter(book => {
    return book.id == req.params.id;
  })[0];
  return res.render('books/show', { book });
});
// CREATE
router.post('/books', (req, res) => {
  let book = req.body.book;
  book.id  = id;
  books.push(book);
  id++;
  return res.redirect('/books');
});
// EDIT
router.get('/books/:id/edit', (req, res) => {
  let book = books.filter(book => {
    return book.id == req.params.id;
  })[0];
  return res.render('books/edit', { book });
});
// UPDATE
router.put('/books/:id', (req, res) => {
  let index = books.findIndex(book => {
    return book.id == req.params.id;
  });
  let book = req.body.book;
  book.id  = parseInt(req.params.id);
  books[index] = book;
  return res.redirect(`/books/${book.id}`);
});
// DELETE
router.delete('/books/:id', (req, res) => {
  let index = books.findIndex(book => {
    return book.id == req.params.id;
  });
  books.splice(index, 1);
  return res.redirect('/books');
});

module.exports = router;
