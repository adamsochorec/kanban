const router = require("express").Router();
const product = require("../models/product");

// CRUD operations

// Create product -- post
router.post("/", (req, res) => {
  data = req.body;

  product
    .insertMany(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});
// Read all products -- get
// Read specific product - get

module.exports = router;
