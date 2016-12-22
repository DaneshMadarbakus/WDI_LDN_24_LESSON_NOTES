const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
