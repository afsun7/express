const { validationResult } = require("express-validator");
function checkValidation(req, res, next) {
  const error = validationResult(req);
  let obj = {};
  error?.errors?.forEach((err) => {
    obj[err.path] = err.msg;
  });
  if (Object.keys(obj).length > 0) {
    throw {
      status: 400,
      error: obj,
      message: "validation error",
    };
  }
  next();
}

module.exports = {
  checkValidation,
};
