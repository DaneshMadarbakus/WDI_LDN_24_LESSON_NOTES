const User    = require('../models/user');
const Project = require('../models/project');

function projectsCreate(req, res){
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(404).json({ error: 'No user was found.' });

    const project = new Project(req.body.project);

    project.save((err, project) => {
      if (err) return res.status(500).json(err);

      user.projects.push(project);

      user.save(err => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(project);
      });
    });
  });
}

function projectsShow(req, res) {
  const id = req.params.id;
  Project.findById({ _id: id }, (err, project) => {
    if (err) return res.status(500).json(err);
    if (!project) return res.status(404).json({ error: 'No project was found.' });
    return res.status(200).json(project);
  });
}

function projectsUpdate(req, res){
  const id = req.params.id;

  Project.findByIdAndUpdate({ _id: id }, req.body.project, (err, project) => {
    if (err) return res.status(500).json(err);
    if (!project) return res.status(404).json({ error: 'No project was found.' });
    return res.status(200).json(project);
  });
}

function projectsDelete(req, res){
  var id = req.params.id;

  Project.findByIdAndRemove({ _id: id }, (err, project) => {
    if (err) return res.status(500).json(err);
    if (!project) return res.status(404).json({ error: 'No project was found.' });
    return res.sendStatus(200);
  });
}

module.exports = {
  create: projectsCreate,
  update: projectsUpdate,
  delete: projectsDelete,
  show: projectsShow
};
