const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// import product routes
const productRoutes = require("./routes/product");

require("dotenv-flow").config();

// parse request of content-type JSON
// app.use(bodyParser.json());

// routes
app.get("/api/welcome", (req, res) => {
  res.status(200).send({ message: "Welcome to the MEN RESTFUL API" });
});

mongoose
  .connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((error) => console.log("Error connecting to MongoDB:" + error));

mongoose.connection.once("open", () =>
  console.log("Connected succesfuly to MongoDB")
);

// post, put, delete -> CRUD
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 4000;

// start up the server
app.listen(PORT, function () {
  console.log("Server is running on port: ", +PORT);
});

module.exports = app;
