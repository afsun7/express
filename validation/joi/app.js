const express = require("express");
const { errorHandler, notFound } = require("./utils/errorHandler");
const {
  loginValidationSchema,
  registerValidationSchema,
} = require("./validator/auth.validator");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", async (req, res, next) => {
  try {
    await loginValidationSchema.validateAsync(req.body);
    res.send(req.body);
  } catch (error) {
    next(error);
  }
});
app.post("/register", async (req, res, next) => {
  try {
    await registerValidationSchema.validateAsync(req.body);
  } catch (error) {
    next(error);
  }
  res.send(req.body);
});
app.use(errorHandler);
app.use(notFound);
app.listen(3000, () => {
  console.log("server run on port 3000");
});
