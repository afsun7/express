const express = require("express");
const { errorHandler, notFound } = require("../../mongoose/utils/errorHandler");
const {
  loginValidator,
  registerValidator,
} = require("./validator/auth.validator");
const { validationResult } = require("express-validator");
const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.post("/login", loginValidator(), (req, res, next) => {
  const error = validationResult(req);
  let obj = {};
  error?.errors?.forEach((err) => {
    obj[err.path] = err.msg;
  });
  res.send(obj);
});

app.post("/register", registerValidator(), (req, res, next) => {
  const error = validationResult(req);
  let obj = {};
  error?.errors?.forEach((err) => {
    obj[err.path] = err.msg;
  });
  res.send(obj);
});
app.use(errorHandler);
app.use(notFound);
app.listen(3000, () => {
  console.log("server run on port 3000");
});
