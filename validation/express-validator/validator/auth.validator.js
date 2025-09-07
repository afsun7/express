const { body } = require("express-validator");

const loginValidator = () => [
  body("email").isEmail().withMessage("email is invalid"),
  body("password")
    .isLength({ min: 6, max: 20 })
    .withMessage("password is invalid"),
];
const registerValidator = () => [
  body("fullName")
    .isLength({ min: 5, max: 35 })
    .withMessage("fullName must be at least 5 and at most 35 characters long."),
  body("age").custom((value) => {
    if (isNaN(value)) throw new Error("age must to be number");
    else if (+value > 90 || value < 12) {
      throw new Error("your age is invalid ");
    }
    return true;
  }),
  body("password")
    .isLength({ min: 6, max: 20 })
    .withMessage("password is invalid"),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password does not match with confirmPassword");
      }
      return true;
    })
    .withMessage("password is invalid"),
];
module.exports = {
  loginValidator,
  registerValidator,
};
