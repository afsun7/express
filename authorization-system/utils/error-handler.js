function notFound(req, res, next) {
  res.send({ statusCode: 404, message: "notFound page" });
}
function errorHandler(err, req, res, next) {
  const status = err?.status ? err?.status : 500;
  res.send({
    statusCode: status,
    message: err.message ?? "internal server error",
  });
}

module.exports = { notFound, errorHandler };
