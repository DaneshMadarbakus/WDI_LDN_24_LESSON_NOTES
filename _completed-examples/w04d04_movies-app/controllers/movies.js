const Movie = require('../models/movie');

function moviesNew(req, res) {
  return res.render('movies/new', { error: null });
}

function moviesCreate(req, res) {
  const movie = new Movie(req.body.movie);
  movie.save(err => {
    if (err) return res.render('movies/new', { error: err.message });
    return res.redirect('/movies');
  });
}

function moviesIndex(req, res) {
  Movie.find({}, (err, movies) => {
    if (err) return res.render('movies/index', { movies: null, error: 'Something went wrong.' });
    return res.render('movies/index', { movies });
  });
}

function moviesShow(req, res) {
  Movie.findById(req.params.id, (err, movie) => {
    if (err) return res.render('movies/show', { movie: {}, error: 'Something went wrong.' });
    if (!movie) return res.render('movies/show', { movie: {}, error: 'No movie was found!' });
    return res.render('movies/show', { movie, error: null });
  });
}

function moviesEdit(req, res) {
  Movie.findById(req.params.id, (err, movie) => {
    if (err) return res.render('movies/edit', { movie: {}, error: 'Something went wrong.' });
    if (!movie) return res.render('movies/edit', { movie: {}, error: 'No movie was found!' });
    return res.render('movies/edit', { movie, error: null });
  });
}

function moviesUpdate(req, res) {
  Movie.findById(req.params.id, (err, movie) => {
    if (err) return res.render('movies/edit', { movie: {}, error: 'Something went wrong.' });
    if (!movie) return res.render('movies/edit', { movie: {}, error: 'No movie was found!' });

    for (const field in Movie.schema.paths) {
      if ((field !== '_id') && (field !== '__v')) {
        if (req.body.movie[field] !== undefined) {
          movie[field] = req.body.movie[field];
        }
      }
    }

    movie.save((err, movie) => {
      if (err) return res.render('movies/edit', { movie: {}, error: 'Something went wrong.' });
      return res.render('movies/show', { movie, error: null });
    });
  });
}

function moviesDelete(req, res) {
  Movie.findByIdAndRemove(req.params.id, err => {
    if (err) return res.render('movies/show', { movie: {}, error: 'Something went wrong.' });
    return res.redirect('/movies');
  });
}

module.exports = {
  index: moviesIndex,
  new: moviesNew,
  create: moviesCreate,
  show: moviesShow,
  edit: moviesEdit,
  update: moviesUpdate,
  delete: moviesDelete
};
