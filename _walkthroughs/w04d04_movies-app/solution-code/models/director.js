const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
  name: { type: String, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Director', directorSchema);
