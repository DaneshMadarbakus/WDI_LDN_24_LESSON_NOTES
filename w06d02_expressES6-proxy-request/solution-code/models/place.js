const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true, unique: true  },
  nickname: { type: String, trim: true, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Place', placeSchema);
