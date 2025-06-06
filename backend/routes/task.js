// Import necessary modules
const router = require("express").Router(); // Express router to define the routes
const task = require("../models/task"); // Document model to interact with the database
const { verifyToken } = require("../validation"); // Validation function to verify the token

// CRUD operations

// Create document - POST
router.post(
  "/",
  /* verifyToken, */ (req, res) => {
    // Extract data from the request body
    const data = req.body;

    // Insert new document data into the database
    // If the insertion is successful, return the inserted data with a 201 status code
    // If there is an error, return the error message with a 500 status code
    task
      .insertMany(data)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
);

// Read all documents - GET
router.get(
  "/",
  /* verifyToken,  */ (req, res) => {
    // Retrieve all document from the database
    // If the retrieval is successful, return the retrieved data
    // If there is an error, return the error message with a 500 status code
    task
      .find()
      .then((data) => {
        res.send(mapArray(data));
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
);

// Read specific document by ID - GET
router.get(
  "/:id",
  /* verifyToken,  */ (req, res) => {
    // Retrieve a specific document by its ID
    // If the retrieval is successful, return the retrieved data
    // If there is an error, return the error message with a 500 status code
    task
      .findById(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
);

// Update specific document by ID - PUT
router.put(
  "/:id",
  /* verifyToken,  */ (req, res) => {
    // Extract document ID from the request parameters
    const id = req.params.id;

    // Update the document with the provided ID using the request body data
    // If the update is successful, return a success message
    // If the document is not found, return a not found message with a 404 status code
    // If there is an error, return the error message with a 500 status code
    task
      .findByIdAndUpdate(id, req.body)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update document ${id}, Maybe document was not found!`,
          });
        } else {
          res.send({ message: "Document was successfully updated." });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: `Error updating document ${id}` });
      });
  }
);

// Delete specific document by ID - DELETE
router.delete(
  "/:id",
  /* verifyToken, */ (req, res) => {
    const id = req.params.id;

    // Delete the document with the provided ID
    // If the deletion is successful, return a success message
    // If the document is not found, return a not found message with a 404 status code
    // If there is an error, return the error message with a 500 status code
    task
      .findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update document ${id}, Maybe document was not found!`,
          });
        } else {
          res.send({ message: "Document was successfully deleted." });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error updating document ${id}`,
          error: err,
        });
      });
  }
);

// Function to map an array of documents to a new format
function mapArray(inputArray) {
  let outputArray = inputArray.map((element) => mapData(element));
  return outputArray;
}

// Function to map a single document to a new format
function mapData(element) {
  let outputObj = {
    id: element.id,
    name: element.name,
    description: element.description,
    status: element.status,
    duration: element.duration,
  };
  return outputObj;
}

// Export the router for use in other files
module.exports = router;
