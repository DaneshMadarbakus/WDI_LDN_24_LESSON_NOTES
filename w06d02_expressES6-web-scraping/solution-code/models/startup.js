const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  url: { type: String, trim: true },
  twitter: { type: String, trim: true },
  description: { type: String, trim: true },
  location: { type: String, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Startup', startupSchema);
