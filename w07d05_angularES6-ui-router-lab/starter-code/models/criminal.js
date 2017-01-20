const mongoose = require('mongoose');

const CriminalSchema = mongoose.Schema({
  name: String,
  location: String,
  status: String
});

module.exports = mongoose.model('Criminal', CriminalSchema);
