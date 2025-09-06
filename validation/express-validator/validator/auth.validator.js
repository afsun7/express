const { body } = require("express-validator");

const loginValidator = () => [
  body("email").isEmail().withMessage("email is invalid"),
  body("password")
    .isLength({ min: 6, max: 20 })
    .withMessage("password is invalid"),
  ,
];
const registerValidator = () => [
  body("fullName")
    .isLength({ min: 5, max: 35 })
    .withMessage("fullName must be at least 5 and at most 35 characters long."),
  body("age").isNumeric().withMessage("age must to be number"),
  body("password")
    .isLength({ min: 6, max: 20 })
    .withMessage("password is invalid"),
  ,
];
module.exports = {
  loginValidator,
  registerValidator,
};
