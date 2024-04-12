const mongoose = require("mongoose");
const { type } = require("os");

const Schema = mongoose.Schema;

// Define the pizza schema with fields for name, ingredients, price, and available status
let pizzaSchema = new Schema({
  task: { type: String },
  description: { type: String },
  status: { type: String },
  time: { type: Number },
});

// Create and export the pizza model based on the defined schema
module.exports = mongoose.model("pizza", pizzaSchema);
