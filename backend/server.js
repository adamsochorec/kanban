const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const { verifyToken } = require("./validation");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Load environment variables from .env files using dotenv-flow
require("dotenv-flow").config();

// Setup CORS middleware to handle CORS preflight requests and responses
app.use(function (req, res, next) {
  // Allow requests from any origin
  res.header("Access-Control-Allow-Origin", "*");
  // Allow specific headers in requests
  res.header(
    "Access-Control-Allow-Headers",
    "auth-token, Origin, X-Requested-Width, Content-Type, Accept"
  );
  // Allow specific HTTP methods
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );

  // Move to the next middleware function
  next();
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Load and serve Swagger documentation
const swaggerOptions = {
  customCss: ".swagger-ui .topbar { display: none !important; }",
};
const swaggerDefinition = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"), "utf8")
);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDefinition, swaggerOptions)
);

// Import routes
const taskRoutes = require("./routes/task");
const authRoutes = require("./routes/auth");

// Load environment variables (again, for good measure)
require("dotenv-flow").config();

// Middleware to parse requests of content-type JSON
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((error) => console.log("Error connecting to MongoDB:" + error));

// Log a message once connected to MongoDB
mongoose.connection.once("open", () =>
  console.log("Connected successfully to MongoDB")
);

// Define a welcome route
app.get("/", (req, res) => {
  // Send a welcome message with a 200 OK status
  res.status(200).send({ message: "Welcome to the MEN RESTFUL API" });
});

app.use("/tasks", taskRoutes);
app.use("/user", authRoutes);

// Define the port number the server will listen on
const PORT = process.env.PORT || 4000;

// Start the server and listen on the defined port
app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});

// Export the app module for testing or other uses
module.exports = app;
