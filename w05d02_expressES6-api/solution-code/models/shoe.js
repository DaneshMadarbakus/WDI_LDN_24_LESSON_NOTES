const mongoose = require("mongoose");

const shoeSchema = mongoose.Schema({
  brand:    { type: String },
  color:    { type: String },
  laced:    { type: Boolean },
  material: { type: String },
  price:    { type: Number }
}, {
  timestamps: true
});

// Ensure that the number is saved as an integer by returned as a float
shoeSchema.path('price')
.get(value => (value/100).toFixed(2))
.set(value => value*100);

// Unsure that the object is sent as JSON
shoeSchema.set('toJSON', { getters: true, virtuals: false });

module.exports = mongoose.model("Shoe", shoeSchema);
