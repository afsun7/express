const notFound = (req, res, next) => {
  return res.status(404).json({
    statusCode: res.statusCode,
    error: {
      type: "Not Found",
      message: "not found" + req.url + "route",
    },
  });
};
const errorHandler = (error, req, res, next) => {
  return res.json({
    statusCode: error.status || 500,
    error: {
      message: error.message || "internalServerError ",
    },
  });
};

const errorModel = {
  notFound,
  errorHandler,
};

module.exports = errorModel;
