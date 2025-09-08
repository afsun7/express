const express = require("express");
const { errorHandler, notFound } = require("./utils/errorHandler");
const { validate } = require("express-validation");
const {
  loginValidation,
  registerValidation,
} = require("./validator/auth.validator");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", validate(loginValidation), (req, res) => {
  res.send(req.body);
});
app.post("/register", validate(registerValidation), (req, res) => {
  res.send(req.body);
});
app.use(errorHandler);
app.use(notFound);
app.listen(3000, () => {
  console.log("server run on port 3000");
});
