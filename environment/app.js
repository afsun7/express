const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const NodeEnv = process.env.NODE_ENV;
dotenv.config({ path: path.join(__dirname, `.env.${NodeEnv}`) });
app.get("/", (req, res, next) => {
  res.send("server run");
});
app.listen(process.env.PORT, () => {
  console.log(`server run on port ${process.env.PORT}`);
});
