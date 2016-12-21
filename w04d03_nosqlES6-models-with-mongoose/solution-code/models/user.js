const mongoose = require("mongoose");

// The "bouncer" to our database nightclub
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  meta: {
    age: Number,
    website: String,
    address: String,
    country: String
  },
}, {
  timestamps: true
});

// userSchema.methods.sayHello = () => {
//   console.log(`Hi ${this.firstName}`);
// };

// userSchema.statics.all = (callback) => {
//   return this.find({}, callback)
// }

module.exports = mongoose.model("User", userSchema);
