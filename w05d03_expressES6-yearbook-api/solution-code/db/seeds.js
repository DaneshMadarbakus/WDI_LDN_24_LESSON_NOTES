const mongoose    = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/yearbook';
mongoose.connect(databaseURL);

const Project = require('../models/project');
const User    = require('../models/user');

Project.collection.drop();
User.collection.drop();

const project1 = new Project({
  title: 'Prep',
  description: 'A new take on homework.',
  github: 'https://github.com/benlayer291/wdi-project-2',
  website: 'https://freeprep.herokuapp.com'
});

project1.save(function(err, project) {
  if (err) return console.log(err);
  console.log('Project saved! ', project);

  const user1 = new User({
    name: 'Ben Layer',
    twitter: 'ben_layer',
    github: 'benlayer291',
    image: '/images/benlayer291.jpg',
    bio: 'Education tech is my ting.',
    website: 'http://www.benlayer.com',
    projects: [project1]
  });

  user1.save(function(err, user) {
    if (err) return console.log(err);
    console.log('User saved! ', user);
  });
});
