const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the product schema with fields for name, description, price, and inStock status
let productSchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  inStock: { type: Boolean },
});

// Create and export the Product model based on the defined schema
module.exports = mongoose.model("product", productSchema);
