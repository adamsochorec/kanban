const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const { verifyToken } = require("./validation");

// Swagger dependencies
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const cors = require("cors");

require("dotenv-flow").config();

// CORS npm package

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json);

// Setup Swagger documentation
const swaggerDefinition = yaml.load("./swagger.yaml");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// Import pizza and authentication routes
const pizzaRoutes = require("./routes/pizza");
const authRoutes = require("./routes/auth");

// Load environment variables
require("dotenv-flow").config();

// Parse requests of content-type JSON
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.DBHOST)
  .catch((error) => console.log("Error connecting to MongoDB:" + error));

mongoose.connection.once("open", () =>
  console.log("Connected successfully to MongoDB")
);

// Welcome route
app.get("/api/welcome", (req, res) => {
  res.status(200).send({ message: "Welcome to the MEN RESTFUL API" });
});

// CRUD operations for pizzas
app.use("/api/pizzas", pizzaRoutes);

// Authentication routes
app.use("/api/user", authRoutes);

// Define the port number
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});

// Export the app for testing or other uses
module.exports = app;
