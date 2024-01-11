const { body } = require("express-validator");

module.exports = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 1, max: 24 })
    .withMessage("Please enter a name between 1 and 24 characters."),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6, max: 50 })
    .withMessage("Please enter a password between 6 and 50 characters."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];
