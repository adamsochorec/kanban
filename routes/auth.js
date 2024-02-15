const router = require("express").Router();
const user = require("../models/user");
const { registrationValidation } = require("../validation");

// registration
router.post("/register", async (req, res) => {
  // validate the user input (name, email, password)
  const { error } = registrationValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
});

// login
router.post("/login", async (req, res) => {
  return res.status(200).json({ msg: "Login route..." });
});

module.exports = router;
