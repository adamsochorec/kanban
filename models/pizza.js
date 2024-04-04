const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the pizza schema with fields for name, ingredients, price, and available status
let pizzaSchema = new Schema({
  name: { type: String },
  ingredients: { type: String },
  price: { type: Number },
  available: { type: Boolean },
});

// Create and export the pizza model based on the defined schema
module.exports = mongoose.model("pizza", pizzaSchema);
