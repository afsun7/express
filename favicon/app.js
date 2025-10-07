const express = require("express");
const serveFavIcon = require("serve-favicon");
const path = require("path");
const app = express();
app.use(serveFavIcon(path.join(__dirname, "coins.svg")));
app.get("/", (req, res, next) => {
  res.send("create favorite icons");
});
app.listen(3000, () => {
  console.log("server run on port 3000");
});
