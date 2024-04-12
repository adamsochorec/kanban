// Import necessary modules
const router = require("express").Router();
const pizza = require("../models/pizza"); // Assuming there's a pizza model
const { verifyToken } = require("../validation");

// CRUD operations

// Create pizza - POST
router.post(
  "/",
  /* verifyToken, */ (req, res) => {
    // Extract data from the request body
    const data = req.body;

    // Insert new pizza data into the database
    pizza
      .insertMany(data)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
);

// Read all pizzas - GET
router.get("/", (req, res) => {
  // Retrieve all pizzas from the database
  pizza
    .find()
    .then((data) => {
      res.send(mapArray(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read all pizzas in stock - GET
router.get("/available", (req, res) => {
  // Retrieve pizzas that are currently in stock
  pizza
    .find({ available: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Read specific pizza by ID - GET
router.get("/:id", (req, res) => {
  // Retrieve a specific pizza by its ID
  pizza
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// Update specific pizza by ID - PUT
router.put("/:id", (req, res) => {
  // Extract pizza ID from the request parameters
  const id = req.params.id;

  // Update the pizza with the provided ID using the request body data
  pizza
    .findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update pizza with id=" +
            id +
            ". Maybe pizza was not found!",
        });
      } else {
        res.send({ message: "Pizza was successfully updated." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating pizza with id=" + id });
    });
});

// Delete specific pizza by ID - DELETE
router.delete(
  "/:id",
  /*verifyToken,*/ (req, res) => {
    // Extract pizza ID from the request parameters
    const id = req.params.id;

    // Delete the pizza with the provided ID
    pizza
      .findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message:
              "Cannot delete pizza with id=" +
              id +
              ". Maybe pizza was not found!",
          });
        } else {
          res.send({ message: "Pizza was successfully deleted." });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error deleting pizza with id=" + id });
      });
  }
);

function mapArray(inputArray) {
  let outputArray = inputArray.map((element) => mapData(element));
  return outputArray;
}
function mapData(element) {
  let outputObj = {
    task: element.task,
    description: element.description,
    status: element.status,
    time: element.time,
  };
  return outputObj;
}

// Export the router for use in other files
module.exports = router;
