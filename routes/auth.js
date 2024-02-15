const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { registrationValidation } = require("../validation");

// registration
router.post("/register", async (req, res) => {
  // validate the user input (name, email, password)
  const { error } = registrationValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // check if the email is already registeted
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // has the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const userObject = new User({
    name: req.body.name,
    email: req.body.email,
    password,
  });

  try {
    const savedUser = await userObject.save();
    res.json({ error: null, data: savedUser._id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// login
router.post("/login", async (req, res) => {
  return res.status(200).json({ msg: "Login route..." });
});

module.exports = router;
