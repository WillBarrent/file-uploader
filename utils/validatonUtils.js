const { body } = require("express-validator");

const signUpValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username must be filled")
    .isAlpha()
    .withMessage("Username must only contain alphabetic letters.")
    .isLength({ min: 3, max: 15 })
    .withMessage("The length of the username is between 2 and 15 included."),
  body("password")
    .notEmpty()
    .withMessage("Password must be filled")
    .isAlphanumeric()
    .withMessage("Password must contain alphabetic letters and numbers.")
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters."),
];

const newFolderValidation = [
  body("newFolderName")
    .notEmpty()
    .withMessage("Folder name field must be filled")
    .isLength({ max: 35 })
    .withMessage("The length cannot be more than 35 letters"),
];

const editFolderValidation = [
  body("newFolderName")
    .notEmpty()
    .withMessage("Folder name field must be filled")
    .isLength({ max: 35 })
    .withMessage("The length cannot be more than 35 letters"),
];

module.exports = {
  signUpValidation,
  loginValidation,
  newFolderValidation,
  editFolderValidation,
};
