const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require("../validation");
const jwt = require("jsonwebtoken");

// User registration endpoint
router.post("/register", async (req, res) => {
  try {
    // Validate the user input (name, email, password)
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the email is already registered
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // Create a new user object and save it to the database
    const userObject = new User({
      name: req.body.name,
      email: req.body.email,
      password,
    });

    const savedUser = await userObject.save();
    res.json({ error: null, data: savedUser._id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// User login endpoint
router.post("/login", async (req, res) => {
  try {
    // Validate user login info
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    // If login info is valid, find the user
    const user = await User.findOne({ email: req.body.email });

    // Throw error if email is wrong (user does not exist in DB)
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // User exists -- check for password correctness
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // Throw error if password is wrong
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create authentication token with username and id
    const token = jwt.sign(
      {
        // Payload
        name: user.name,
        id: user._id,
      },
      // Token secret
      process.env.TOKEN_SECRET || "your_default_secret",
      {
        expiresIn: process.env.JWR_EXPIRES_IN || "1h",
      }
    );

    // Attach auth token to the header
    res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
