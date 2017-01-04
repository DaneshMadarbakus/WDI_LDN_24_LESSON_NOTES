const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  github: { type: String, trim: true },
  website: { type: String, trim: true }
});

module.exports = mongoose.model('Project', projectSchema);
