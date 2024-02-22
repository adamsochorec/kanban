// Import necessary modules
const router = require("express").Router();
const product = require("../models/product"); // Assuming there's a product model
const { verifyToken } = require("../validation");

// CRUD operations

// Create product - POST
router.post("/", (req, res) => {
  // Extract data from the request body
  const data = req.body;

  // Insert new product data into the database
  product
    .insertMany(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all products - GET
router.get("/", verifyToken, (req, res) => {
  // Retrieve all products from the database
  product
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all products in stock - GET
router.get("/instock", (req, res) => {
  // Retrieve products that are currently in stock
  product
    .find({ inStock: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific product by ID - GET
router.get("/:id", (req, res) => {
  // Retrieve a specific product by its ID
  product
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update specific product by ID - PUT
router.put("/:id", (req, res) => {
  // Extract product ID from the request parameters
  const id = req.params.id;

  // Update the product with the provided ID using the request body data
  product
    .findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update product with id=" +
            id +
            ". Maybe product was not found!",
        });
      } else {
        res.send({ message: "Product was successfully updated." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating product with id=" + id });
    });
});

// Delete specific product by ID - DELETE
router.delete("/:id", (req, res) => {
  // Extract product ID from the request parameters
  const id = req.params.id;

  // Delete the product with the provided ID
  product
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete product with id=" +
            id +
            ". Maybe product was not found!",
        });
      } else {
        res.send({ message: "Product was successfully deleted." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting product with id=" + id });
    });
});

// Export the router for use in other files
module.exports = router;
