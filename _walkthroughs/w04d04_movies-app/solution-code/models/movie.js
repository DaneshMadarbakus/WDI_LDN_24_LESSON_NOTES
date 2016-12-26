const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  director: { type: mongoose.Schema.ObjectId, ref: 'Director' },
  comments: [{
    body: { type: String, trim: true }
  }, {
    timestamps: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
