const Director = require('../models/director');

function directorsNew(req, res) {
  return res.render('directors/new', { error: null });
}

function directorsCreate(req, res) {
  const director = new Director(req.body.director);
  director.save(err => {
    if (err) return res.render('directors/new', { error: err.message });
    return res.redirect('/directors');
  });
}

function directorsIndex(req, res) {
  Director.find({}, (err, directors) => {
    if (err) return res.render('directors/index', { directors: null, error: 'Something went wrong.' });
    return res.render('directors/index', { directors });
  });
}

function directorsShow(req, res) {
  Director.findById(req.params.id, (err, director) => {
    if (err) return res.render('directors/show', { director: {}, error: 'Something went wrong.' });
    if (!director) return res.render('directors/show', { director: {}, error: 'No director was found!' });
    return res.render('directors/show', { director, error: null });
  });
}

function directorsEdit(req, res) {
  Director.findById(req.params.id, (err, director) => {
    if (err) return res.render('directors/edit', { director: {}, error: 'Something went wrong.' });
    if (!director) return res.render('directors/edit', { director: {}, error: 'No director was found!' });
    return res.render('directors/edit', { director, error: null });
  });
}

function directorsUpdate(req, res) {
  Director.findById(req.params.id, (err, director) => {
    if (err) return res.render('directors/edit', { director: {}, error: 'Something went wrong.' });
    if (!director) return res.render('directors/edit', { director: {}, error: 'No director was found!' });

    for (const field in Director.schema.paths) {
      if ((field !== '_id') && (field !== '__v')) {
        if (req.body.director[field] !== undefined) {
          director[field] = req.body.director[field];
        }
      }
    }

    director.save((err, director) => {
      if (err) return res.render('directors/edit', { director: {}, error: 'Something went wrong.' });
      return res.redirect(`/directors/${director._id}`);
    });
  });
}

function directorsDelete(req, res) {
  Director.findByIdAndRemove(req.params.id, err => {
    if (err) return res.render('directors/show', { director: {}, error: 'Something went wrong.' });
    return res.redirect('/directors');
  });
}

module.exports = {
  index: directorsIndex,
  new: directorsNew,
  create: directorsCreate,
  show: directorsShow,
  edit: directorsEdit,
  update: directorsUpdate,
  delete: directorsDelete
};
