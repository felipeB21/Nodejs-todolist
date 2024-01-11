const { body } = require("express-validator");

module.exports = [
  body("text")
    .notEmpty()
    .withMessage("Text is required")
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage("Please enter a text between 1 and 255 characters."),
];
