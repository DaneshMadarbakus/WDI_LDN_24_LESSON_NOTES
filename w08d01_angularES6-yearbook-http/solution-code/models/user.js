const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  image: { type: String, trim: true }
});

module.exports = mongoose.model('User', userSchema);
