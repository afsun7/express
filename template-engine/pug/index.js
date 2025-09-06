const express = require("express");
const path = require("path");
const { errorHandler, notFound } = require("./utils/errorHandler");
const app = express();
const users = [
  { id: 1, name: "ali" },
  { id: 2, name: "erfan" },
  { id: 3, name: "milad" },
];
app.use(express.static("public"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", {
    link: "https://botostart.ir",
    section: "this is my section",
    users,
  });
});

app.use(notFound);
app.use(errorHandler);
app.listen(3000, () => {
  console.log("server run on port 3000");
});
