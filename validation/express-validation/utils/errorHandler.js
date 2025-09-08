const { validationMapper } = require("./express-validation-mapper");

const notFound = (req, res, next) => {
  return res.status(404).json({
    statusCode: res.statusCode,
    error: {
      type: "Not Found",
      message: "not found " + req.url + " route",
    },
  });
};
const errorHandler = (error, req, res, next) => {
  return res.status(error.status || 500).json({
    statusCode: error.status || error.statusCode || 500,
    error: {
      message: error.message || "internalServerError",
      invalidParams: validationMapper(error),
    },
  });
};

const errorModel = {
  notFound,
  errorHandler,
};

module.exports = errorModel;
