const Movie = require('../models/movie');

function commentsCreate(req, res) {
  Movie.findById(req.params.id, (err, movie) => {
    if (err) return res.render('movies/show', { movie: {}, error: 'Something went wrong.' });
    if (!movie) return res.render('movies/show', { movie: {}, error: 'No movie was found!' });

    movie.comments.push(req.body.comment);

    movie.save((err, movie) => {
      if (err) return res.render('movies/show', { movie: {}, error: 'Something went wrong.' });
      return res.redirect(`/movies/${movie._id}`);
    });
  });
}

module.exports = {
  create: commentsCreate
};
