const { check } = require("express-validator");

module.exports = [
  check("email").isEmail().withMessage("Invalid email"),
  check("password").notEmpty().withMessage("Password is required"),
];
