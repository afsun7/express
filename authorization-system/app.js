const express = require("express");
const { notFound, errorHandler } = require("./utils/error-handler");
const { AllRouters } = require("./router/index.routes");
require("./config/mongo.config");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AllRouters);
app.use(notFound);
app.use(errorHandler);
app.listen(3000, () => {
  console.log("server run on port 3000");
});
