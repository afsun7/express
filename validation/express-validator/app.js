const express = require("express");
const { errorHandler, notFound } = require("./utils/errorHandler");
const {
  loginValidator,
  registerValidator,
} = require("./validator/auth.validator");
const { validationResult } = require("express-validator");
const { checkValidation } = require("./middleWare/validator");
const { idValidator } = require("./validator/blog.validator");

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.post("/login", loginValidator(), checkValidation, (req, res, next) => {
  res.send(req.body);
});

app.post(
  "/register",
  registerValidator(),
  checkValidation,
  (req, res, next) => {
    res.send(req.body);
  }
);
app.get("/blogs/:id", idValidator, checkValidation, (req, res, next) => {
  res.send(req.params);
});
app.use(errorHandler);
app.use(notFound);
app.listen(3000, () => {
  console.log("server run on port 3000");
});
