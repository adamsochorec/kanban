const Joi = require("joi");
const jwt = require("jsonwebtoken");

// Validation for user registration data
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

// Validation for user login data
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access Denied" });
  try {
    // Verify the token using the secret key
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token is not valid" });
  }
};

module.exports = { registerValidation, loginValidation, verifyToken };
