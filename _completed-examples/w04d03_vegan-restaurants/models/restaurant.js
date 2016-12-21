const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  description: { type: String },
  location: { type: String },
  rating: { type: Number, enum: [0,1,2,3,4,5], required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
