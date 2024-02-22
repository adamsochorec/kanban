const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the user schema with fields for name, email, password, and date
let userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the User model based on the defined schema
module.exports = mongoose.model("User", userSchema);
