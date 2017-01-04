const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  twitter: { type: String, trim: true },
  github: { type: String, trim: true },
  image: { type: String, trim: true },
  bio: { type: String, trim: true },
  website: { type: String, trim: true },
  projects: [{ type: mongoose.Schema.ObjectId, ref: 'Project' }]
});

module.exports = mongoose.model('User', userSchema);
